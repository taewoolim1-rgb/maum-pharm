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
  Key
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
    titleKo: '[예방 안내] 제주 관광객 여름철 모기 및 풀벌레 물림 안심 상비약 세트 출시',
    titleEn: '[Prevention] Safe Emergency Medical Kit for Jeju Tourists: Mosquito & Insect Bites',
    titleZh: '[预防指南] 济州游客夏日防蚊虫叮咬安心常备药套组上市',
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
      statsTime: '평일 08:30~22:00 / 주말·공휴일 15:00~22:00',
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
      slides: [
        {
          id: 1,
          badge: '마음약국의 약속',
          title: '몸의 건강을 넘어\n마음의 평안까지 처방합니다',
          subtitle: '제주의 맑은 자연 속에서, 한 분 한 분께 정성 어린 따뜻한 복약 상담을 약속드립니다.',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 2,
          badge: '365일 야간 조제',
          title: '365일 연중무휴\n매일 밤 10시까지 불을 밝힙니다',
          subtitle: '늦은 밤 갑작스러운 통증이나 비상 상황에도 마음약국은 늘 같은 자리에서 환자분을 기다립니다.',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        }
      ]
    },
    en: {
      btnLocation: 'Directions to Pharmacy',
      statsTitle: '365 Days Open Care',
      statsDesc: 'Always open with consistent sincerity for patients on holidays, national breaks, and late nights.',
      statsTime: 'Weekdays 08:30-22:00 / Weekends & Holidays 15:00-22:00',
      noticeTitle: 'Maum News & Announcements',
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
      slides: [
        {
          id: 1,
          badge: 'Our Promise',
          title: 'Prescribing Peace of Mind\nBeyond Physical Health',
          subtitle: 'In the pure nature of Jeju, we promise warm and sincere medication counseling for each and every visitor.',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 2,
          badge: '365 Days Late-Night Pharmacy',
          title: 'Open 365 Days\nWe Stay Lit Until 10 PM Every Night',
          subtitle: 'Even during sudden pain or emergencies late at night, Maum Pharmacy is always here waiting for you.',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        }
      ]
    },
    zh: {
      btnLocation: '药店交通路线',
      statsTitle: '365天全年无休安心营业',
      statsDesc: '在公休日、节日连休和夜间，始终以如一的诚挚关怀为您敞开大门。',
      statsTime: '工作日 08:30~22:00 / 周末及公休日 15:00~22:00',
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
      slides: [
        {
          id: 1,
          badge: '心药店的承诺',
          title: '超越身体健康\n处方直至心灵的平静',
          subtitle: '在济州清净的自然中，我们承诺为每一位患者提供真诚、温馨的用药咨询。',
          bgGradient: 'from-emerald-950 via-teal-900 to-emerald-900',
          textColor: 'text-white'
        },
        {
          id: 2,
          badge: '365天夜间配药',
          title: '365天全年无休\n每晚营业至10点亮灯守护',
          subtitle: '在深夜突发疼痛 or 紧急情况下，心药店始终在同一个地方守护着您。',
          bgGradient: 'from-sky-950 via-indigo-950 to-teal-950',
          textColor: 'text-white'
        }
      ]
    }
  };

  const curr = t[language] || t.ko;
  const bannerSlides = curr.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

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
            {/* Background Aesthetic Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10 translate-x-12 -translate-y-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full filter blur-3xl opacity-5 -translate-x-12 translate-y-12 pointer-events-none" />

            <div className="max-w-3xl space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                {bannerSlides[currentSlide].badge}
              </span>
              
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
          <div className="text-xs font-mono text-white/70 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
            <span className="font-bold text-white">{currentSlide + 1}</span> / {bannerSlides.length}
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
                    Access restricted to Maum Pharmacy administrators
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
