/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Stethoscope,
  Globe,
  Instagram
} from 'lucide-react';

import { TabId, Language } from './types';
import HomeTab from './components/HomeTab';
import LocationTab from './components/LocationTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPharmacyOpen, setIsPharmacyOpen] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('ko');

  // Compute real-time pharmacy open/closed state
  // 평일: 08:30 ~ 22:00 | 주말·공휴일: 15:00 ~ 22:00
  useEffect(() => {
    const checkPharmacyStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const totalMinutes = hour * 60 + minute;

      const isWeekend = (day === 0 || day === 6);
      const openTime = isWeekend ? (15 * 60) : (8.5 * 60); // 15:00 or 08:30
      const closeTime = 22 * 60; // 22:00

      setIsPharmacyOpen(totalMinutes >= openTime && totalMinutes < closeTime);
    };

    checkPharmacyStatus();
    // Check every minute
    const interval = setInterval(checkPharmacyStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    ko: {
      announcement: "제주마음약국(마음약국)은 평일 08:30~22:00, 주말·공휴일 15:00~22:00까지 환자분들을 위해 열려 있습니다.",
      announcementBadge: "365 연중무휴",
      headerOpen: "현재 영업 중",
      headerClosed: "현재 영업 마감",
      menuHome: "홈",
      menuAbout: "약국 소개",
      menuLocation: "오시는 길",
      footerDesc: "제주마음약국은 처방전 조제 및 고품격 복약 지도를 핵심 원칙으로 삼으며, 이웃들의 지친 심신과 생리 컨디션을 어루만집니다.",
      footerRegTitle: "약국 개설 등록 정보",
      footerNameLabel: "약국명",
      footerNameValue: "마음약국",
      footerPharmacistLabel: "대표약사",
      footerPharmacistValue: "임성우",
      footerZipLabel: "우편번호",
      footerAddrLabel: "소재지",
      footerAddrValue: "제주특별자치도 제주시 도령로 73, 103, 110호 (연동, 연동 펠리체)",
      footerTelLabel: "대표전화",
      footerFaxLabel: "팩스",
      footerCopyright: "© 2026 제주마음약국. All Rights Reserved. 본 사이트의 모든 디자인 및 콘텐츠는 무단 복제를 금지합니다.",
      footerTerms: "이용약관",
      footerPrivacy: "개인정보처리방침",
    },
    en: {
      announcement: "Heart Pharm is open MON~FRI 08:30~22:00, SAT/SUN 15:00~22:00 for our patients.",
      announcementBadge: "365 DAYS OPEN",
      headerOpen: "Open Now",
      headerClosed: "Closed Now",
      menuHome: "Home",
      menuAbout: "About Us",
      menuLocation: "Directions",
      footerDesc: "Heart Pharm prioritizes professional prescription dispensing and premium medication guidance to care for our community's body and mind.",
      footerRegTitle: "Pharmacy Registration Info",
      footerNameLabel: "Name",
      footerNameValue: "Heart Pharm",
      footerPharmacistLabel: "Chief Pharmacist",
      footerPharmacistValue: "Sung-woo Lim",
      footerZipLabel: "ZIP",
      footerAddrLabel: "Address",
      footerAddrValue: "Rooms 103 & 110, 73 Doryeong-ro, Jeju-si, Jeju-do",
      footerTelLabel: "Tel",
      footerFaxLabel: "Fax",
      footerCopyright: "© 2026 Heart Pharm. All Rights Reserved. Unauthorized duplication of all designs and contents is prohibited.",
      footerTerms: "Terms of Use",
      footerPrivacy: "Privacy Policy",
    },
    zh: {
      announcement: "心药店营业时间：周一至周五 08:30~22:00，周六周日 15:00~22:00，竭诚为您服务。",
      announcementBadge: "365天全年无休",
      headerOpen: "正在营业中",
      headerClosed: "已暂停营业",
      menuHome: "首页",
      menuAbout: "药店介绍",
      menuLocation: "交通路线",
      footerDesc: "济州心药店以专业的处方调配和优质的用药指导为核心原则，悉心关怀社区邻里的身心健康。",
      footerRegTitle: "药店注册信息",
      footerNameLabel: "药店名",
      footerNameValue: "心药店",
      footerPharmacistLabel: "代表药师",
      footerPharmacistValue: "林成宇",
      footerZipLabel: "邮编",
      footerAddrLabel: "地址",
      footerAddrValue: "济州特别自治道济州市道令路 73号 103, 110室 (莲洞, Felice大厦)",
      footerTelLabel: "代表电话",
      footerFaxLabel: "传真",
      footerCopyright: "© 2026 济州心药店。版权所有。严禁未经授权复制本网站的所有设计及内容。",
      footerTerms: "使用条款",
      footerPrivacy: "个人信息处理方针",
    }
  };

  const curr = t[language] || t.ko;

  const menuItems = [
    { id: 'home', label: curr.menuHome },
    { id: 'location', label: curr.menuLocation }
  ];

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* 2. Sticky Glassmorphism Header */}
      <header id="main-header" className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          
          {/* Logo (Custom design heart shape + leaf representation) */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                {/* Custom organic leaf-heart cross path */}
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 group-hover:text-emerald-800 transition-colors">
                {language === 'ko' ? '제주마음약국' : language === 'en' ? 'Heart Pharm' : '济州心药店'}
              </h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Heart Pharm</p>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabChange(item.id as TabId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                    isActive 
                      ? 'text-emerald-700 bg-emerald-50' 
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabMarker"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions Area: Language Selector + Open Status + Call button */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {/* Global Language Selector (Desktop) */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/45">
              <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
              {(['ko', 'en', 'zh'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ko' ? 'KO' : lang === 'en' ? 'EN' : 'ZH'}
                </button>
              ))}
            </div>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold shrink-0 ${
              isPharmacyOpen ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isPharmacyOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
              {isPharmacyOpen ? curr.headerOpen : curr.headerClosed}
            </span>

            <button
              id="header-call-btn"
              onClick={() => handleTabChange('location')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              064-900-4057
            </button>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </header>

      {/* 3. Mobile Responsive Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden z-30"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Navigation lists */}
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleTabChange(item.id as TabId)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      activeTab === item.id 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>

              {/* Language Selector (Mobile Inside Drawer) */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> Language / 언어 / 语言
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['ko', 'en', 'zh'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setMobileMenuOpen(false);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                        language === lang
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200/50 hover:bg-slate-100'
                      }`}
                    >
                      {lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : '中文'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Contacts */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> {isPharmacyOpen ? curr.headerOpen : curr.headerClosed}
                </span>
                <span className="font-extrabold text-slate-800 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> 064-900-4057
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Active Main Content Stage (with safe horizontal boundaries) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-10 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <HomeTab setActiveTab={handleTabChange} isPharmacyOpen={isPharmacyOpen} language={language} />
            )}
            {activeTab === 'location' && (
              <LocationTab isPharmacyOpen={isPharmacyOpen} language={language} setLanguage={setLanguage} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Highly Professional Trust Footer */}
      <footer id="main-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Heart className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-tight">
                  {language === 'ko' ? '제주마음약국' : language === 'en' ? 'Heart Pharm' : '济州心药店'}
                </h3>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Heart Pharm</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light max-w-md">
              {curr.footerDesc}
            </p>
            <a
              href="https://www.instagram.com/heart.pharm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              @heart.pharm
            </a>
          </div>

          {/* Legal / Licensing Information */}
          <div className="md:col-span-7 space-y-2.5 text-[11px] text-slate-500 leading-normal">
            <h4 className="text-slate-400 font-bold text-xs pb-1 border-b border-slate-800">{curr.footerRegTitle}</h4>
            <p className="font-light">
              <strong>{curr.footerNameLabel}:</strong> {curr.footerNameValue} | <strong>{curr.footerPharmacistLabel}:</strong> {curr.footerPharmacistValue} | <strong>{curr.footerZipLabel}:</strong> 63127<br />
              <strong>{curr.footerAddrLabel}:</strong> {curr.footerAddrValue}<br />
              <strong>{curr.footerTelLabel}:</strong> 064-900-4057 | <strong>{curr.footerFaxLabel}:</strong> 064-900-4056
            </p>
          </div>
        </div>

        {/* copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 pt-6 border-t border-slate-800 text-[10px] text-slate-600 flex flex-col md:flex-row justify-between gap-4 font-light">
          <p>{curr.footerCopyright}</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">{curr.footerTerms}</span>
            <span className="hover:text-slate-400 cursor-pointer font-bold text-slate-500">{curr.footerPrivacy}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
