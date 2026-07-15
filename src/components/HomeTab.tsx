/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Sparkles, 
  CalendarCheck,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  X,
  LogOut,
  Key,
  Droplet,
  Shield,
  Heart,
  Activity,
  Globe,
  Sun,
  Moon,
  Bookmark,
  Info,
  Check,
  Instagram,
  Pill,
  PawPrint,
  Play,
  Pause
} from 'lucide-react';
import { TabId, Language } from '../types';

export interface NoticeItem {
  id: string;
  titleKo: string;
  titleEn: string;
  titleZh: string;
  date: string;
}

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: '1',
    titleKo: '[공지] 2026년 하절기 휴가 기간 야간 정상 조제 업무 안내',
    titleEn: '[Notice] Guide to Late-Night Compounding Services During 2026 Summer Vacation',
    titleZh: '[公告] 2026夏季休假期间正常配药指南',
    date: '2026.07.12'
  },
  {
    id: '2',
    titleKo: '[장비 도입] 정밀 ATC 자동 포장 조제 머신 2호기 업그레이드 완료',
    titleEn: '[Equipment] Precision ATC Auto-Packaging Compounding Machine Unit 2 Upgrade Completed',
    titleZh: '[设备引进] 高精度 ATC 自动包装分药机2号机升级完毕',
    date: '2026.06.28'
  },
  {
    id: '3',
    titleKo: '[예방 안내] 제주 관광객 여름철 모기 및 풀벌레 물림 예방 수칙',
    titleEn: '[Prevention] Summer Mosquito and Wild Bug Bite Prevention Rules for Jeju Tourists',
    titleZh: '[预防指南] 济州游客夏季防蚊虫叮咬注意事项',
    date: '2026.06.15'
  }
];

interface HomeTabProps {
  setActiveTab: (tab: TabId) => void;
  isPharmacyOpen: boolean;
  language: Language;
}

export default function HomeTab({ setActiveTab, isPharmacyOpen, language }: HomeTabProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Notices state with localStorage persistence
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('maum_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing notices:', e);
      }
    }
    return DEFAULT_NOTICES;
  });

  useEffect(() => {
    localStorage.setItem('maum_notices', JSON.stringify(notices));
  }, [notices]);

  // Admin authorization state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('maum_is_admin') === 'true';
  });

  // Admin login modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Notice edit/add modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [inputTitleKo, setInputTitleKo] = useState('');
  const [inputTitleEn, setInputTitleEn] = useState('');
  const [inputTitleZh, setInputTitleZh] = useState('');
  const [inputDate, setInputDate] = useState('');

  const t = {
    ko: {
      btnLocation: '약국 오시는 길',
      statsTitle: '365일 연중무휴 안심 영업',
      statsDesc: '공휴일, 명절 연휴, 야간에도 늘 한결같은 정성으로 환자분들을 위해 열려 있습니다.',
      statsTime: '월~금 08:30~22:00 / 토·일 15:00~22:00',
      noticeTitle: '마음약국 소식 및 공지사항',
      adminLogin: '관리자 로그인',
      adminActive: '관리자 권한 활성화됨',
      adminPasscodePlaceholder: '관리자 비밀번호 (기본: 1234)',
      adminPasscodeIncorrect: '비밀번호가 일치하지 않습니다.',
      adminConfirmDelete: '이 공지사항을 삭제하시겠습니까?',
      addNotice: '공지사항 추가',
      editNotice: '공지사항 수정',
      noticeTitleKo: '한국어 제목',
      noticeTitleEn: '영어 제목',
      noticeTitleZh: '중국어 제목',
      noticeDate: '작성일 (예: 2026.07.13)',
      save: '저장',
      cancel: '취소',
      logout: '로그아웃',
      verify: '인증하기',
      globalServicesTitle: '외국인 관광객 편의 및 간편 결제 서비스',
      globalServicesSubtitle: '제주를 방문하시는 글로벌 여행객들을 위해 간편 모바일 결제 및 현장 면세 즉시 환급(Tax Free) 서비스를 완벽 지원합니다.',
      alipayTitle: '알리페이 (Alipay)',
      alipayDesc: '중국 최대 모바일 결제 플랫폼 알리페이 간편 결제 지원 (QR코드 스캔 즉시 결제)',
      wechatTitle: '위챗페이 (WeChat Pay)',
      wechatDesc: '중국 대표 모바일 시스템 위챗페이 결제 지원 (★ 본점 적극 권장 결제 수단)',
      taxfreeTitle: '즉시 면세 환급 (Tax Free)',
      taxfreeDesc: '외국인 관광객 대상 구매 현장에서 번거로운 절차 없이 즉시 면세 세금 환급 지원',
      storefrontTitle: '마음약국 실물 간판 & 대표 안심 서비스',
      storefrontSubtitle: '제주 마음약국 매장에서 제공하는 핵심 전문 조제 및 취급 안내입니다.',
      storefrontPrescription: '전국 병·의원 처방 조제 가능',
      storefrontPrescriptionDesc: '한라병원 및 전국 모든 병원 처방전을 빠르고 정확하게 조제하여 드립니다.',
      storefrontPrescriptionBadge: '처방 조제 전문',
      storefrontVet: '동물의약품 공식 취급',
      storefrontVetDesc: '반려동물을 위한 심장사상충약, 내외구충제, 안약 및 상비약을 상시 완비하고 있습니다.',
      storefrontVetBadge: '동물약국 등록',
      storefrontGlobal: '글로벌 외국인 특화 (药店)',
      storefrontGlobalDesc: '영어·중국어 맞춤형 1:1 복약 지도 및 알리페이, 위챗페이, 즉시 면세 환급(Tax Free)을 완벽 지원합니다.',
      storefrontGlobalBadge: '글로벌 안심',
      instagramTitle: '마음약국 공식 인스타그램',
      instagramDesc: '',
      instagramBtn: '인스타그램 바로가기',
      categoriesTitle: '약국 전문 특화 카테고리',
      categoriesSubtitle: '고객분들의 건강과 뷰티 시너지를 극대화하기 위해 마음약국이 엄선한 핵심 특화 품목군입니다.',
      categoriesList: [
        {
          title: 'K-Beauty',
          desc: '최신 유행 K-뷰티 스킨부스터, 특화 마스크 및 프리미엄 코스메슈티컬 케어 라인업',
          tags: ['물광피부', '메디컬 뷰티', '장벽개선']
        },
        {
          title: 'PDRN products',
          desc: '조직 재생 성분인 연어 DNA 유래 PDRN 물질을 담아 탄력과 생기를 주는 스페셜 케어',
          tags: ['재생 바이오', '연어 주사 성분', '세포 탄력']
        },
        {
          title: 'Acne care',
          desc: '자극받기 쉬운 민감성 피부 및 여드름성 트러블 스킨을 위한 논코메도제닉 안심 진정 처방',
          tags: ['트러블 케어', '모공 정화', '유수분 밸런스']
        },
        {
          title: 'Scar care',
          desc: '상처 후 흔적 관리 및 수술 자국 케어를 위한 의료 기기 등급의 실리콘 겔 및 특화 패치',
          tags: ['흔적 케어', '실리콘 겔', '흉터 솔루션']
        },
        {
          title: 'Health care',
          desc: '현대인의 활력 충전, 면역 부스팅 및 일상 밸런스를 채우는 고함량 프리미엄 맞춤형 영양제',
          tags: ['면역력 부스팅', '종합 비타민', '피로 회복']
        }
      ],
      slides: [
        {
          id: 2,
          badge: '365일 야간 조제',
          title: '365일 연중무휴\n매일 밤 10시까지 불을 밝힙니다',
          subtitle: '늦은 밤 갑작스러운 통증이나 비상 상황에도 마음약국은 늘 같은 자리에서 환자분을 기다립니다.',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        },
        {
          id: 1,
          badge: '',
          title: '마음약국 실물 간판 &\n대표 안심 서비스',
          subtitle: '한 분 한 분께 정성 어린 따뜻한 복약 상담을 약속드립니다.',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 3,
          badge: '공식 인스타그램',
          title: '마음약국 공식 인스타그램',
          subtitle: '인스타그램을 팔로우하고 다양한 건강 정보와 소식을 받아보세요!',
          bgGradient: 'from-[#14051a] via-[#3d0f3c] to-[#14051a]',
          textColor: 'text-white'
        }
      ]
    },
    en: {
      btnLocation: 'Directions to Pharmacy',
      statsTitle: '365 Days Open Care',
      statsDesc: 'Always open with consistent sincerity for patients on holidays, national breaks, and late nights.',
      statsTime: 'MON~FRI 08:30~22:00 / SAT/SUN 15:00~22:00',
      noticeTitle: 'Heart Pharm News & Announcements',
      adminLogin: 'Admin Access',
      adminActive: 'Admin Session Active',
      adminPasscodePlaceholder: 'Passcode (Default: 1234)',
      adminPasscodeIncorrect: 'Incorrect passcode.',
      adminConfirmDelete: 'Are you sure you want to delete this announcement?',
      addNotice: 'Add Announcement',
      editNotice: 'Edit Announcement',
      noticeTitleKo: 'Korean Title',
      noticeTitleEn: 'English Title',
      noticeTitleZh: 'Chinese Title',
      noticeDate: 'Date (e.g., 2026.07.13)',
      save: 'Save',
      cancel: 'Cancel',
      logout: 'Logout',
      verify: 'Verify',
      globalServicesTitle: 'Tourist Convenience & Easy Payment Services',
      globalServicesSubtitle: 'We fully support hassle-free mobile checkout and instant on-site tax refunds (Tax Free) for global travelers visiting Jeju.',
      alipayTitle: 'Alipay (支付宝)',
      alipayDesc: 'Supports swift and secure payments via Alipay, China\'s premier mobile payment platform.',
      wechatTitle: 'WeChat Pay (微信支付)',
      wechatDesc: 'Supports WeChat Pay. (★ Highly recommended and preferred payment channel at our store)',
      taxfreeTitle: 'Instant Tax Free Refund',
      taxfreeDesc: 'International visitors can receive immediate, paperless on-site tax refunds upon checkout.',
      storefrontTitle: 'Maum Pharmacy Signature Services',
      storefrontSubtitle: 'Key clinical dispensing services and professional selections available at Jeju Maum Pharmacy.',
      storefrontPrescription: 'Prescription Dispensing Available',
      storefrontPrescriptionDesc: 'We dispense prescriptions from Halla Hospital and all medical clinics nationwide quickly and accurately.',
      storefrontPrescriptionBadge: 'Clinical Dispensing',
      storefrontVet: 'Licensed Veterinary Medicines',
      storefrontVetDesc: 'Full range of pet supplies including heartworm prevention, dewormers, eye drops, and OTC treatments.',
      storefrontVetBadge: 'Licensed Vet Care',
      storefrontGlobal: 'Global Care Support (药店)',
      storefrontGlobalDesc: 'Personalized English & Chinese pharmaceutical consulting, with Alipay, WeChat Pay, and instant Tax Free support.',
      storefrontGlobalBadge: 'Global Safe',
      instagramTitle: 'Official Instagram',
      instagramDesc: '',
      instagramBtn: 'Visit Instagram',
      categoriesTitle: 'Specialized Product Categories',
      categoriesSubtitle: 'Our pharmacy proudly curation of premium wellness and dermatological specialized focus areas.',
      categoriesList: [
        {
          title: 'K-Beauty',
          desc: 'Trending Korean beauty skin-boosters, specialized masks, and premium dermacosmetic skincare',
          tags: ['Glowing Skin', 'Medical Beauty', 'Barrier Repair']
        },
        {
          title: 'PDRN products',
          desc: 'Premium DNA-derived salmon-extracted PDRN treatments for skin repair, firmness, and cellular rejuvenation',
          tags: ['Bioregeneration', 'Cell Elasticity', 'Salmon DNA']
        },
        {
          title: 'Acne care',
          desc: 'Non-comedogenic, deeply soothing targeted care solutions for sensitive and acne-prone skin troubles',
          tags: ['Trouble Relief', 'Pore Purification', 'Soothe & Calm']
        },
        {
          title: 'Scar care',
          desc: 'Medical-grade silicone gels and recovery patches designed for surgical scars and skin mark restoration',
          tags: ['Mark Recovery', 'Silicone Gel', 'Scar Solution']
        },
        {
          title: 'Health care',
          desc: 'Highly potent premium multivitamins and customized nutritional supplements for ultimate daily vitality',
          tags: ['Immune Boosting', 'Daily Vitality', 'Fatigue Recovery']
        }
      ],
      slides: [
        {
          id: 2,
          badge: '365 Days Late-Night Pharmacy',
          title: 'Open 365 Days\nWe Stay Lit Until 10 PM Every Night',
          subtitle: 'Even during sudden pain or emergencies late at night, Heart Pharm is always here waiting for you.',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        },
        {
          id: 1,
          badge: '',
          title: 'Maum Pharmacy Signature Services',
          subtitle: 'We promise warm and sincere medication counseling for each and every visitor.',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 3,
          badge: 'Official Instagram',
          title: 'Official Instagram',
          subtitle: 'Follow our Instagram for health updates and news.',
          bgGradient: 'from-[#14051a] via-[#3d0f3c] to-[#14051a]',
          textColor: 'text-white'
        }
      ]
    },
    zh: {
      btnLocation: '药店交通路线',
      statsTitle: '365天全年无休安心营业',
      statsDesc: '在公休日、节日连休和夜间，始终以如一的诚挚关怀为您敞开大门。',
      statsTime: '周一~周五 08:30~22:00 / 周六/周日 15:00~22:00',
      noticeTitle: '心药店动态与公告事项',
      adminLogin: '管理员登录',
      adminActive: '管理员权限已激活',
      adminPasscodePlaceholder: '管理员密码 (默认: 1234)',
      adminPasscodeIncorrect: '密码不正确。',
      adminConfirmDelete: '确定要删除此公告吗？',
      addNotice: '添加公告',
      editNotice: '编辑公告',
      noticeTitleKo: '韩文标题',
      noticeTitleEn: '英文标题',
      noticeTitleZh: '中文标题',
      noticeDate: '发布日期 (例如: 2026.07.13)',
      save: '保存',
      cancel: '取消',
      logout: '登出',
      verify: '验证',
      globalServicesTitle: '外籍游客便利及轻松扫码支付服务',
      globalServicesSubtitle: '为莅临济州岛的全球游客，心药店特别开通了便捷移动支付和现场即时免税退税（Tax Free）全套服务。',
      alipayTitle: '支付宝支付 (Alipay)',
      alipayDesc: '全面支持中国最大的移动支付平台支付宝，直接出示付款码或扫码即可极速完成付款。',
      wechatTitle: '微信支付 (WeChat Pay)',
      wechatDesc: '全面支持微信支付。 (★ 强烈推荐！本店推荐使用微信支付，轻松扫码，畅行无忧)',
      taxfreeTitle: '现场即时免税 (Tax Free)',
      taxfreeDesc: '符合条件的外国游客，可在结账时享受当场即时免税退税，无需前往机场或港口繁琐排队。',
      storefrontTitle: '心药店实体看板与代表服务',
      storefrontSubtitle: '济州心药店为您提供最专业、最贴心的核心处方配药与药品经营指南。',
      storefrontPrescription: '韩国全国医院处方配药',
      storefrontPrescriptionDesc: '支持济州汉拿医院及韩国全国所有医院、诊所出具的处方，专业药剂师为您快速精准配药。',
      storefrontPrescriptionBadge: '专业处方配药',
      storefrontVet: '正规宠物医药品经营',
      storefrontVetDesc: '备有心丝虫预防药、体内外驱虫药、宠物眼药水、皮肤药及各类爱宠应急药品。',
      storefrontVetBadge: '宠物药店认证',
      storefrontGlobal: '外籍游客特化安心服务 (药店)',
      storefrontGlobalDesc: '提供英文、中文1:1专业用药指导，全面支持支付宝、微信支付及现场即时免税退税(Tax Free)。',
      storefrontGlobalBadge: '全球游客安心',
      instagramTitle: '心药店官方 Instagram',
      instagramDesc: '',
      instagramBtn: '访问官方 Instagram',
      categoriesTitle: '专业经营特化类别',
      categoriesSubtitle: '心药店为实现您的健康生活与肌肤美丽，精心甄选的核心特化产品品类。',
      categoriesList: [
        {
          title: 'K-Beauty',
          desc: '人气热门 K-Beauty 医美药妆、皮肤屏障修复水光护肤、特化医用面膜及调理产品',
          tags: ['水光美肌', '医美级护肤', '屏障修护']
        },
        {
          title: 'PDRN products',
          desc: '蕴含深层修护组织再生因子——三文鱼 DNA 提炼 PDRN 婴儿针，恢复肌肤强韧弹力与活力',
          tags: ['组织再生', '三文鱼成分', '细胞弹力']
        },
        {
          title: 'Acne care',
          desc: '专为易受刺激的敏感性及痘痘痤疮肌肤量身定制的温和安全控油舒缓消炎精细护理',
          tags: ['祛痘控油', '收缩毛孔', '温和舒缓']
        },
        {
          title: 'Scar care',
          desc: '有效愈合肌肤伤口、淡化痘印以及修复外科/剖腹产术后疤痕的医用级硅胶凝胶与修复贴片',
          tags: ['疤痕修复', '医用硅胶', '伤口恢复']
        },
        {
          title: 'Health care',
          desc: '针对现代人日常疲劳、免疫力低下设计的科学配比高含量优质定制进口每日膳食补充剂',
          tags: ['免疫调节', '每日活力', '抗疲劳营养']
        }
      ],
      slides: [
        {
          id: 2,
          badge: '365天夜间配药',
          title: '365天全年无休\n每晚营业至10点亮灯守护',
          subtitle: '在深夜突发疼痛 or 紧急情况下，心药店始终在同一个地方守护着您。',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        },
        {
          id: 1,
          badge: '',
          title: '心药店实体看板与代表服务',
          subtitle: '我们承诺为每一位患者提供真诚、温馨的用药咨询。',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 3,
          badge: '官方 Instagram',
          title: '心药店官方 Instagram',
          subtitle: '关注官方 Instagram，获取最新健康资讯。',
          bgGradient: 'from-[#14051a] via-[#3d0f3c] to-[#14051a]',
          textColor: 'text-white'
        }
      ]
    }
  };

  const curr = t[language] || t.ko;
  const bannerSlides = curr.slides;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length, isPaused]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  // Login handler
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAdmin(true);
      sessionStorage.setItem('maum_is_admin', 'true');
      setShowLoginModal(false);
      setPasscode('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('maum_is_admin');
  };

  // Delete notice handler
  const handleDeleteNotice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(curr.adminConfirmDelete)) {
      setNotices((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Open modal for editing notice
  const handleOpenEditNotice = (notice: NoticeItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNotice(notice);
    setInputTitleKo(notice.titleKo);
    setInputTitleEn(notice.titleEn);
    setInputTitleZh(notice.titleZh);
    setInputDate(notice.date);
    setShowEditModal(true);
  };

  // Open modal for adding notice
  const handleOpenAddNotice = () => {
    setEditingNotice(null);
    setInputTitleKo('');
    setInputTitleEn('');
    setInputTitleZh('');
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    setInputDate(formattedDate);
    setShowEditModal(true);
  };

  // Save notice (Add or Edit) handler
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitleKo.trim()) return;

    if (editingNotice) {
      // Edit mode
      setNotices((prev) =>
        prev.map((item) =>
          item.id === editingNotice.id
            ? {
                ...item,
                titleKo: inputTitleKo,
                titleEn: inputTitleEn || inputTitleKo,
                titleZh: inputTitleZh || inputTitleKo,
                date: inputDate
              }
            : item
        )
      );
    } else {
      // Add mode
      const newNotice: NoticeItem = {
        id: Date.now().toString(),
        titleKo: inputTitleKo,
        titleEn: inputTitleEn || inputTitleKo,
        titleZh: inputTitleZh || inputTitleKo,
        date: inputDate
      };
      setNotices((prev) => [newNotice, ...prev]);
    }

    setShowEditModal(false);
    setEditingNotice(null);
  };

  const getNoticeTitle = (notice: NoticeItem) => {
    if (language === 'zh') return notice.titleZh || notice.titleKo;
    if (language === 'en') return notice.titleEn || notice.titleKo;
    return notice.titleKo;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Top Welcome / Quick Payment Row at the top-right of Home screen */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mb-8">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">
            {language === 'ko' ? '제주 외국인 안심 특화 약국' : language === 'en' ? 'Jeju Foreigner-Friendly Pharmacy' : '济州外籍游客安心特化药店'}
          </span>
        </div>
        
        {/* Payment and Tax Free Badges */}
        <div className="flex flex-wrap items-center gap-2 select-none self-stretch sm:self-auto justify-end">
          {/* Alipay */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/60 shadow-xs px-2.5 py-1.5 rounded-xl" title="Alipay 支付宝">
            <div className="w-5 h-5 bg-[#00a0e9] rounded-[4px] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-white">
                <path d="M20 34h60M50 16v18M28 58h44M48 34C48 54 36 72 18 82M52 50c12 4 22 14 28 32M53 34c8 16 2 34-16 44" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-tight text-slate-700 font-sans">Alipay</span>
          </div>

          {/* WeChat Pay */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/60 shadow-xs px-2.5 py-1.5 rounded-xl" title="WeChat Pay 微信支付">
            <div className="w-5 h-5 bg-[#09bb07] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-3.5 h-3.5">
                <path d="M50 15 C30.7 15 15 30.7 15 50 C15 57.3 17.3 64.1 21.2 69.7 L17 85 L32.8 80.8 C38 83.5 43.8 85 50 85 C69.3 85 85 69.3 85 50 C85 30.7 69.3 15 50 15 Z" fill="white" />
                <path d="M36 48 L46 58 L68 36" fill="none" stroke="#09bb07" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-tight text-slate-700 font-sans">WeChat</span>
          </div>

          {/* Tax Free */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/60 shadow-xs px-2.5 py-1.5 rounded-xl" title="TAX FREE">
            <div className="bg-slate-800 text-white rounded-[3px] text-[7.5px] px-1.5 font-black py-0.5 leading-none">
              TAX
            </div>
            <span className="text-[10px] font-black tracking-tight text-slate-700 font-sans">FREE</span>
          </div>
        </div>
      </div>

      {/* 1. Hero Slider Section */}
      <section id="hero-slider" className="relative h-[480px] md:h-[540px] w-full overflow-hidden rounded-3xl shadow-xl bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].bgGradient} flex flex-col justify-center px-8 md:px-20 py-16`}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10 translate-x-12 -translate-y-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl opacity-5 -translate-x-12 translate-y-12 pointer-events-none" />

            <div className="w-full relative z-10 max-w-6xl mx-auto">
              {bannerSlides[currentSlide].id === 1 ? (
                <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto w-full">
                  {/* Slide Title and Subtitle */}
                  <div className="text-center md:text-left space-y-1.5 md:space-y-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line">
                      {bannerSlides[currentSlide].title}
                    </h2>
                    <p className="text-sm md:text-base text-emerald-200/85 font-light leading-relaxed">
                      {bannerSlides[currentSlide].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-stretch w-full">
                    {/* 1. Prescription Dispensing */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/20 shadow-xs">
                            <Pill className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/30 text-teal-300 border border-teal-500/30">
                            {curr.storefrontPrescriptionBadge}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-white pt-1">
                          {curr.storefrontPrescription}
                        </h4>
                        <p className="text-xs md:text-[13px] text-emerald-100/70 leading-relaxed font-light">
                          {curr.storefrontPrescriptionDesc}
                        </p>
                      </div>
                    </div>

                    {/* 2. Vet Medicine */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/20 shadow-xs">
                            <PawPrint className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-500/30">
                            {curr.storefrontVetBadge}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-white pt-1">
                          {curr.storefrontVet}
                        </h4>
                        <p className="text-xs md:text-[13px] text-emerald-100/70 leading-relaxed font-light">
                          {curr.storefrontVetDesc}
                        </p>
                      </div>
                    </div>

                    {/* 3. Global Special */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/20 shadow-xs">
                            <Globe className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/30">
                            {curr.storefrontGlobalBadge}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-white pt-1">
                          {curr.storefrontGlobal}
                        </h4>
                        <p className="text-xs md:text-[13px] text-emerald-100/70 leading-relaxed font-light">
                          {curr.storefrontGlobalDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : bannerSlides[currentSlide].id === 3 ? (
                <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-5">
                  {bannerSlides[currentSlide].badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      {bannerSlides[currentSlide].badge}
                    </span>
                  )}
                  
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-white whitespace-pre-line">
                    {bannerSlides[currentSlide].title}
                  </h2>
                  
                  <p className="text-sm md:text-base text-pink-100/80 leading-relaxed font-light max-w-md">
                    {bannerSlides[currentSlide].subtitle}
                  </p>

                  <div className="pt-2 flex justify-center w-full">
                    <motion.a 
                      href="https://www.instagram.com/heart.pharm/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative group/qr bg-white border border-white/20 rounded-2xl p-3 shadow-2xl hover:shadow-pink-500/10 max-w-[160px] w-full cursor-pointer block"
                      title="@heart.pharm Instagram"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#405DE6] via-[#C13584] to-[#FD1D1D] p-3 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white/95">
                          {/* Top-Left Target */}
                          <rect x="5" y="5" width="22" height="22" rx="6" fill="currentColor" />
                          <rect x="8" y="8" width="16" height="16" rx="4" fill="none" stroke="#C13584" strokeWidth="2.5" />
                          <circle cx="16" cy="16" r="4" fill="#C13584" />
                          
                          {/* Top-Right Target */}
                          <rect x="73" y="5" width="22" height="22" rx="6" fill="currentColor" />
                          <rect x="76" y="8" width="16" height="16" rx="4" fill="none" stroke="#C13584" strokeWidth="2.5" />
                          <circle cx="84" cy="16" r="4" fill="#C13584" />

                          {/* Bottom-Left Target */}
                          <rect x="5" y="73" width="22" height="22" rx="6" fill="currentColor" />
                          <rect x="8" y="76" width="16" height="16" rx="4" fill="none" stroke="#C13584" strokeWidth="2.5" />
                          <circle cx="16" cy="84" r="4" fill="#C13584" />

                          {/* Dots */}
                          <circle cx="40" cy="10" r="1.5" fill="currentColor" />
                          <circle cx="48" cy="10" r="1.2" fill="currentColor" />
                          <circle cx="56" cy="10" r="1.5" fill="currentColor" />
                          <circle cx="64" cy="10" r="1.2" fill="currentColor" />
                          
                          <circle cx="34" cy="16" r="1.2" fill="currentColor" />
                          <circle cx="42" cy="16" r="1.5" fill="currentColor" />
                          <circle cx="50" cy="16" r="1.2" fill="currentColor" />
                          <circle cx="58" cy="16" r="1.2" fill="currentColor" />
                          <circle cx="66" cy="16" r="1.5" fill="currentColor" />
                          
                          <circle cx="34" cy="22" r="1.5" fill="currentColor" />
                          <circle cx="44" cy="22" r="1.2" fill="currentColor" />
                          <circle cx="52" cy="22" r="1.5" fill="currentColor" />
                          <circle cx="60" cy="22" r="1.2" fill="currentColor" />
                          
                          <circle cx="10" cy="34" r="1.2" fill="currentColor" />
                          <circle cx="18" cy="34" r="1.5" fill="currentColor" />
                          <circle cx="26" cy="34" r="1.2" fill="currentColor" />
                          <circle cx="34" cy="34" r="1.5" fill="currentColor" />
                          <circle cx="66" cy="34" r="1.2" fill="currentColor" />
                          <circle cx="74" cy="34" r="1.5" fill="currentColor" />
                          <circle cx="82" cy="34" r="1.2" fill="currentColor" />
                          <circle cx="90" cy="34" r="1.5" fill="currentColor" />

                          <circle cx="10" cy="42" r="1.5" fill="currentColor" />
                          <circle cx="22" cy="42" r="1.2" fill="currentColor" />
                          <circle cx="30" cy="42" r="1.5" fill="currentColor" />
                          <circle cx="70" cy="42" r="1.5" fill="currentColor" />
                          <circle cx="78" cy="42" r="1.2" fill="currentColor" />
                          <circle cx="86" cy="42" r="1.5" fill="currentColor" />

                          <circle cx="14" cy="50" r="1.2" fill="currentColor" />
                          <circle cx="26" cy="50" r="1.5" fill="currentColor" />
                          <circle cx="74" cy="50" r="1.2" fill="currentColor" />
                          <circle cx="82" cy="50" r="1.5" fill="currentColor" />
                          <circle cx="90" cy="50" r="1.2" fill="currentColor" />

                          <circle cx="10" cy="58" r="1.5" fill="currentColor" />
                          <circle cx="18" cy="58" r="1.2" fill="currentColor" />
                          <circle cx="26" cy="58" r="1.5" fill="currentColor" />
                          <circle cx="70" cy="58" r="1.5" fill="currentColor" />
                          <circle cx="78" cy="58" r="1.2" fill="currentColor" />
                          <circle cx="86" cy="58" r="1.5" fill="currentColor" />

                          <circle cx="10" cy="66" r="1.2" fill="currentColor" />
                          <circle cx="18" cy="66" r="1.5" fill="currentColor" />
                          <circle cx="26" cy="66" r="1.2" fill="currentColor" />
                          <circle cx="34" cy="66" r="1.5" fill="currentColor" />
                          <circle cx="66" cy="66" r="1.2" fill="currentColor" />
                          <circle cx="74" cy="66" r="1.5" fill="currentColor" />
                          <circle cx="82" cy="66" r="1.2" fill="currentColor" />
                          <circle cx="90" cy="66" r="1.5" fill="currentColor" />

                          <circle cx="34" cy="74" r="1.5" fill="currentColor" />
                          <circle cx="42" cy="74" r="1.2" fill="currentColor" />
                          <circle cx="50" cy="74" r="1.5" fill="currentColor" />
                          <circle cx="58" cy="74" r="1.2" fill="currentColor" />
                          <circle cx="66" cy="74" r="1.5" fill="currentColor" />

                          <circle cx="34" cy="82" r="1.2" fill="currentColor" />
                          <circle cx="42" cy="82" r="1.5" fill="currentColor" />
                          <circle cx="50" cy="82" r="1.2" fill="currentColor" />
                          <circle cx="58" cy="82" r="1.5" fill="currentColor" />
                          <circle cx="66" cy="82" r="1.2" fill="currentColor" />

                          <circle cx="34" cy="90" r="1.5" fill="currentColor" />
                          <circle cx="44" cy="90" r="1.2" fill="currentColor" />
                          <circle cx="52" cy="90" r="1.5" fill="currentColor" />
                          <circle cx="60" cy="90" r="1.2" fill="currentColor" />

                          {/* Central White Rounded Box */}
                          <rect x="31" y="31" width="38" height="38" rx="11" fill="white" />
                          
                          {/* Central Instagram Glyph */}
                          <rect x="37" y="37" width="26" height="26" rx="7" fill="none" stroke="#C13584" strokeWidth="2.5" />
                          <circle cx="50" cy="50" r="6" fill="none" stroke="#C13584" strokeWidth="2.5" />
                          <circle cx="58" cy="42" r="1.5" fill="#C13584" />
                        </svg>
                      </div>
                      
                      <div className="text-center mt-1 select-none">
                        <span className="text-[9px] font-black tracking-[0.25em] text-slate-800 font-mono block">
                          HEART.PHARM
                        </span>
                      </div>
                    </motion.a>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl space-y-6">
                  {bannerSlides[currentSlide].badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      {bannerSlides[currentSlide].badge}
                    </span>
                  )}
                  
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white whitespace-pre-line">
                    {bannerSlides[currentSlide].title}
                  </h1>
                  
                  <p className="text-base md:text-lg text-emerald-100/85 leading-relaxed font-light">
                    {bannerSlides[currentSlide].subtitle}
                  </p>
                  
                  <div className="pt-4">
                    <button
                      id={`hero-btn-location-${currentSlide}`}
                      onClick={() => setActiveTab('location')}
                      className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer group"
                    >
                      {curr.btnLocation}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 right-8 md:right-20 flex items-center gap-3 z-25">
          <button
            id="slider-prev-btn"
            onClick={handlePrevSlide}
            className="p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/5 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs font-mono text-white/70 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5 flex items-center gap-2">
            <span className="font-bold text-white">{currentSlide + 1}</span> / {bannerSlides.length}
            <button
              id="slider-pause-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              className="ml-1.5 p-0.5 rounded-md hover:bg-white/25 text-white/90 hover:text-white transition-all cursor-pointer flex items-center justify-center"
              aria-label={isPaused ? "Play slide" : "Pause slide"}
              title={isPaused ? "재생" : "일시정지"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>
          <button
            id="slider-next-btn"
            onClick={handleNextSlide}
            className="p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/5 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 3. Real-Time Stats Showcase */}
      <section id="stats-showcase" className="p-8 rounded-3xl bg-slate-50 border border-slate-100/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">{curr.statsTitle}</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">{curr.statsDesc}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">
            {curr.statsTime}
          </span>
        </div>
      </section>


      {/* 4. Specialized Product Categories Section */}
      <section id="specialized-categories" className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {language === 'ko' ? '약국 취급 품목' : language === 'en' ? 'PHARMACY SPECIALTIES' : '药店主营品类'}
          </span>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            {curr.categoriesSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="grid grid-cols-5 gap-3 md:gap-4 min-w-[760px] md:min-w-0">
            {curr.categoriesList.map((category: any, idx: number) => {
              const icons = [
                <Sparkles className="w-6 h-6 text-emerald-600" key="0" />,
                <Droplet className="w-6 h-6 text-sky-600" key="1" />,
                <Shield className="w-6 h-6 text-amber-600" key="2" />,
                <Heart className="w-6 h-6 text-rose-600" key="3" />,
                <Activity className="w-6 h-6 text-teal-600" key="4" />
              ];
              const bgClasses = [
                'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/75',
                'bg-sky-50/40 border-sky-100 hover:bg-sky-50/75',
                'bg-amber-50/40 border-amber-100 hover:bg-amber-50/75',
                'bg-rose-50/40 border-rose-100 hover:bg-rose-50/75',
                'bg-teal-50/40 border-teal-100 hover:bg-teal-50/75'
              ];
              const iconBgClasses = [
                'bg-emerald-100/70',
                'bg-sky-100/70',
                'bg-amber-100/70',
                'bg-rose-100/70',
                'bg-teal-100/70'
              ];

              return (
                <motion.div
                  key={idx}
                  id={`category-card-${idx}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all shadow-sm ${bgClasses[idx % bgClasses.length]}`}
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClasses[idx % iconBgClasses.length]}`}>
                      {icons[idx % icons.length]}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 tracking-tight leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {category.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100/40">
                    {category.tags.map((tag: string, tagIdx: number) => (
                      <span
                        key={tagIdx}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white text-slate-600 border border-slate-100 shadow-[0_1px_1px_rgba(0,0,0,0.02)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Announcements / Notices Section */}
      <section id="announcements-panel">
        <div className="w-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
              {curr.noticeTitle}
            </h3>
            
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {curr.adminActive}
                  </span>
                  <button
                    onClick={handleOpenAddNotice}
                    className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-all flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer"
                    title={curr.addNotice}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{curr.addNotice}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all flex items-center gap-1 text-xs font-medium cursor-pointer"
                    title={curr.logout}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title={curr.adminLogin}
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{curr.adminLogin}</span>
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {notices.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400 font-light">
                No announcements registered.
              </div>
            ) : (
              notices.map((notice) => (
                <div 
                  key={notice.id} 
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group hover:bg-slate-50/50 px-3 -mx-3 rounded-xl transition-all"
                >
                  <div className="flex-1 flex items-start gap-2.5">
                    <span className="text-slate-700 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-relaxed text-sm">
                      {getNoticeTitle(notice)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                    <span className="text-slate-400 text-xs font-mono">{notice.date}</span>
                    
                    {isAdmin && (
                      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleOpenEditNotice(notice, e)}
                          className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer"
                          title={curr.editNotice}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteNotice(notice.id, e)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Admin Passcode Authentication Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 pt-2">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Key className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">{curr.adminLogin}</h4>
                  <p className="text-xs text-slate-400 font-light">
                    {language === 'ko' ? '마음약국 관리자 전용 권한 확인 구역입니다.' : language === 'en' ? 'Access restricted to Heart Pharm administrators' : '仅限心药店管理员访问核验区'}
                  </p>
                </div>

                <form onSubmit={handleVerifyPasscode} className="space-y-4">
                  <div className="space-y-1.5">
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setLoginError(false);
                      }}
                      placeholder={curr.adminPasscodePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-center text-base"
                      autoFocus
                    />
                    {loginError && (
                      <p className="text-xs text-rose-500 font-medium text-center">
                        {curr.adminPasscodeIncorrect}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLoginModal(false)}
                      className="flex-1 py-3 text-sm font-semibold rounded-xl text-slate-500 hover:bg-slate-50 transition-all border border-slate-200 cursor-pointer"
                    >
                      {curr.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/15 transition-all cursor-pointer"
                    >
                      {curr.verify}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notice Create/Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-lg p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-5">
                <h4 className="text-lg font-bold text-slate-800">
                  {editingNotice ? curr.editNotice : curr.addNotice}
                </h4>

                <form onSubmit={handleSaveNotice} className="space-y-4">
                  {/* Korean Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 block">
                      {curr.noticeTitleKo} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inputTitleKo}
                      onChange={(e) => setInputTitleKo(e.target.value)}
                      placeholder="예시: [공지] 여름휴가 기간 단축 영업 안내"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                  </div>

                  {/* English Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 block">
                      {curr.noticeTitleEn}
                    </label>
                    <input
                      type="text"
                      value={inputTitleEn}
                      onChange={(e) => setInputTitleEn(e.target.value)}
                      placeholder="e.g., [Notice] Adjusted Summer Hours"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                  </div>

                  {/* Chinese Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 block">
                      {curr.noticeTitleZh}
                    </label>
                    <input
                      type="text"
                      value={inputTitleZh}
                      onChange={(e) => setInputTitleZh(e.target.value)}
                      placeholder="例如: [公告] 夏季放假期间营业时间调整"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 block">
                      {curr.noticeDate}
                    </label>
                    <input
                      type="text"
                      required
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      placeholder="YYYY.MM.DD"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 py-2.5 text-sm font-semibold rounded-xl text-slate-500 hover:bg-slate-50 transition-all border border-slate-200 cursor-pointer"
                    >
                      {curr.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/15 transition-all cursor-pointer"
                    >
                      {curr.save}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
