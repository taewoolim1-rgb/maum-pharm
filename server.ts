/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK with telemetry header
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // AI Pharmacy consulting endpoint
  app.post('/api/consult', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: '인사 및 상담 내용이 부족하거나 잘못 전달되었습니다.' });
      }

      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API Key가 서버에 설정되어 있지 않습니다. 우측 상단의 Settings > Secrets 메뉴에서 GEMINI_API_KEY를 등록해 주세요.',
        });
      }

      // Format historical messages for chats (GoogleGenAI chats expects specific message shape)
      // Format: [{ role: 'user' | 'model', parts: [{ text: string }] }]
      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const latestMessage = messages[messages.length - 1]?.content || '';

      const systemInstruction = `
        당신은 제주의 청정 자연과 따뜻한 이웃의 정을 나누는 '제주마음약국'의 대표 AI 전문 건강상담사, '마음약사'입니다.
        아래 세부지침에 맞춰 전문적이며, 신뢰도가 무척 높고, 동시에 매우 따뜻하고 다정다감하며 공감 넘치는 한국어로 답변해 주세요:
        
        1. 브랜드 페르소나 및 태도:
           - 제주도의 푸른 자연, 맑은 숨, 한라산의 정기를 상징하듯 맑고 싱그러운 인성을 담아 다정하고 정겹게 환자를 맞이합니다.
           - 답변을 시작할 때, 상대방이 설명한 고통, 불편함, 피로, 수면장애, 소화불량 등의 증상에 깊은 유감과 지극한 인간적 공감을 표현해야 합니다. 기계적인 리스트 나열로 성의 없이 넘어가지 마세요.
           - 존댓말과 친절한 경어체를 사용하여 신뢰감을 쌓아 주세요.
           
        2. 복약 지도 & 약학 정보 제공:
           - 타이레놀이나 아스피린, 일반 영양제 등 다빈도 복용 의약품에 대해 식후/식전/식간 등의 명확한 복용 시각, 복용 간격, 하루 한도량 및 주요 주의 물질을 정확하게 알려 주세요.
           - 복용하면 안 되는 위험한 약물 상호작용이 있는 경우, 반드시 붉은색 마크다운 기호 등을 활용하여 경고해 줍니다.
           
        3. 제주 맞춤형 건강기능식품 추천:
           - 비타민이나 기능성 식품 추천 요청을 받았을 때, 제주도의 특산 보건 성분(예: 제주 유기농 녹차 속 뇌 이완용 '테아닌', 싱그러운 명품 감귤 속 항산화 '비타민 C', 제주의 해초와 바다에서 얻은 뼈 튼튼 '해녀 마그네슘', 우도 땅콩 속 불포화 지방산 '레시틴' 등)을 가상의 웰니스 스토리로 연계하여 흥미진진하고 신비롭게 추천해 주세요.
           
        4. 의료 법규 준수 및 세이프가드 가이드라인 (중요):
           - 답변 말미에 "AI 상담은 의학 정보 전달 목적이며, 직접적인 의사·약사의 대면 처방 및 진단을 대체할 수 없습니다. 증상이 깊어지거나 고열, 극심한 마비, 통증이 수반되면 즉시 의료 기관을 방문하시길 권고합니다."라는 정중한 경고 및 당부의 안전 조치 가이드를 항상 포함해 주세요.
           
        답변은 가독성이 훌륭하도록 마크다운 헤더(###), 볼드 텍스트, 이모지, 글머리 기호(bullet points) 등을 가미하여 구조적으로 정리해 주세요.
      `;

      // Create chat session with instructions
      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: history,
      });

      const response = await chat.sendMessage({ message: latestMessage });
      
      // Check if reply text exists and send it
      const replyText = response.text || '죄송합니다. 답변을 처리하지 못했습니다. 다시 시도해 주세요.';
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Gemini Server Proxy Error:', error);
      return res.status(500).json({ error: error.message || '상담 처리 중 서버 에러가 발생했습니다.' });
    }
  });

  // Serve assets
  if (process.env.NODE_ENV !== 'production') {
    // Use Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static dist folder in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
