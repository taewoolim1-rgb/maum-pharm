/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Navigation,
  Bus,
  Check,
  CalendarDays,
  ExternalLink,
  ChevronRight,
  Globe,
  Instagram
} from 'lucide-react';

import { Language } from '../types';

interface LocationTabProps {
  isPharmacyOpen: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function LocationTab({ isPharmacyOpen, language, setLanguage }: LocationTabProps) {
  const [minutesUntilOpen, setMinutesUntilOpen] = useState<number>(0);
  const [minutesUntilClose, setMinutesUntilClose] = useState<number>(0);

  // Calculate opening/closing counts dynamically
  // 평일: 08:30 ~ 22:00 | 주말·공휴일: 15:00 ~ 22:00
  useEffect(() => {
    const checkTimer = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Saturday
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const totalMinutes = currentHour * 60 + currentMinute;

      const isWeekend = (day === 0 || day === 6);
      const openMinutes = isWeekend ? 15 * 60 : 8.5 * 60; // 15:00 vs 08:30
      const closeMinutes = 22 * 60; // 22:00

      if (totalMinutes < openMinutes) {
        setMinutesUntilOpen(openMinutes - totalMinutes);
        setMinutesUntilClose(0);
      } else if (totalMinutes < closeMinutes) {
        setMinutesUntilClose(closeMinutes - totalMinutes);
        setMinutesUntilOpen(0);
      } else {
        // Past closing time: count down to tomorrow's opening
        const tomorrowIsWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 6;
        const tomorrowOpenMinutes = tomorrowIsWeekend ? 15 * 60 : 8.5 * 60;
        setMinutesUntilOpen((24 * 60 - totalMinutes) + tomorrowOpenMinutes);
        setMinutesUntilClose(0);
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    ko: {
      badge: 'DIRECTIONS & MAP',
      title: '약국 찾아오시는 길 및 이용 안내',
      subtitle: '제주시 도령로(연동)에 위치하여 제주공항 및 도심 어느 곳에서도 가장 쉽고 편리하게 찾아오실 수 있습니다.',
      timetableTitle: '365일 연중무휴 시간표',
      timetableSubtitle: '공휴일, 명절 연휴 야간 처방 정상업무',
      busTitle: '대중교통 (버스 이용 시)',
      carTitle: '자가용 이용 및 주차 불가 안내',
      mapTitle: '도령로(연동) 중심가 로컬 약도 (가상 지도)',
      phoneLabel: '전화 및 조제 상담 문의',
      instagramLabel: '인스타그램',
      addressLabel: '도로명 주소',
      addressValue: '제주시 도령로 73, 103, 110호',
      destination: '목적지',
      hours: '운영 시간',
      lateNightLabel: '야간 정상조제',
      weekendLabel: '주말 특별근무',
      threeSixtyFiveLabel: '365일 안심근무',
      statusOpen: '마감까지 약 {h}시간 {m}분',
      statusOpenM: '마감까지 약 {m}분',
      statusClose: '오픈까지 약 {h}시간 {m}분',
      statusCloseM: '오픈까지 약 {m}분',
      statusWaiting: '영업 대기 중',
      mon: '월요일',
      tue: '화요일',
      wed: '수요일',
      thu: '목요일',
      fri: '금요일',
      sat: '토요일',
      sunHolidays: '일요일/공휴일',
    },
    en: {
      badge: 'DIRECTIONS & MAP',
      title: 'Directions & Pharmacy Visitor Guide',
      subtitle: 'Located on Doryeong-ro (Yeondong), Jeju-si, you can easily reach us from Jeju Airport or anywhere in downtown.',
      timetableTitle: '365 Days Business Hours',
      timetableSubtitle: 'Open on weekends, public holidays, and national holidays',
      busTitle: 'Public Transit (By Bus)',
      carTitle: 'Driving & Parking (NO PARKING)',
      mapTitle: 'Doryeong-ro (Yeondong) Local Map (Interactive)',
      phoneLabel: 'Inquiries & Consultations',
      instagramLabel: 'Instagram',
      addressLabel: 'Street Address',
      addressValue: 'Rooms 103 & 110, 73 Doryeong-ro, Jeju-si',
      destination: 'Destination',
      hours: 'Business Hours',
      lateNightLabel: 'Night Pharmacy',
      weekendLabel: 'Weekend Shift',
      threeSixtyFiveLabel: '365 Days Open',
      statusOpen: 'Approx. {h}h {m}m to close',
      statusOpenM: 'Approx. {m}m to close',
      statusClose: 'Approx. {h}h {m}m to open',
      statusCloseM: 'Approx. {m}m to open',
      statusWaiting: 'Waiting for opening',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sunHolidays: 'Sun / Holidays',
    },
    zh: {
      badge: 'DIRECTIONS & MAP',
      title: '药店路线及就诊指南',
      subtitle: '位于济州市道令路（莲洞），从济州机场或市区任何地方均可轻松、便利地到达。',
      timetableTitle: '365天全年无休时间表',
      timetableSubtitle: '公休日、节日连休及夜间正常处方配药',
      busTitle: '公共交通 (乘坐公交车时)',
      carTitle: '自驾及禁止停车指南',
      mapTitle: '道令路 (莲洞) 街区局部指南图 (互动地图)',
      phoneLabel: '电话与调配咨询',
      instagramLabel: 'Instagram',
      addressLabel: '道路名地址',
      addressValue: '济州市道令路 73号 103, 110室',
      destination: '目的地',
      hours: '营业时间',
      lateNightLabel: '夜间正常调配',
      weekendLabel: '周末特别服务',
      threeSixtyFiveLabel: '365天安心服务',
      statusOpen: '距离下班还有约 {h}小时 {m}分钟',
      statusOpenM: '距离下班还有约 {m}分钟',
      statusClose: '距离开门还有约 {h}小时 {m}分钟',
      statusCloseM: '距离开门还有约 {m}分钟',
      statusWaiting: '营业准备中',
      mon: '周一',
      tue: '周二',
      wed: '周三',
      thu: '周四',
      fri: '周五',
      sat: '周六',
      sunHolidays: '周日/公休日',
    }
  };

  const businessHours = [
    { day: t[language].mon, hours: '08:30 ~ 22:00', label: t[language].lateNightLabel },
    { day: t[language].tue, hours: '08:30 ~ 22:00', label: t[language].lateNightLabel },
    { day: t[language].wed, hours: '08:30 ~ 22:00', label: t[language].lateNightLabel },
    { day: t[language].thu, hours: '08:30 ~ 22:00', label: t[language].lateNightLabel },
    { day: t[language].fri, hours: '08:30 ~ 22:00', label: t[language].lateNightLabel },
    { day: t[language].sat, hours: '15:00 ~ 22:00', label: t[language].weekendLabel },
    { day: t[language].sunHolidays, hours: '15:00 ~ 22:00', label: t[language].threeSixtyFiveLabel }
  ];

  const travelGuides = {
    ko: [
      {
        type: 'bus',
        icon: <Bus className="w-5.5 h-5.5 text-sky-600" />,
        title: t.ko.busTitle,
        lines: [
          '제주국제공항에서 일반 간선버스 315번, 325번, 332번, 343번, 365번, 465번, 466번 탑승 ➡️ "제주한라병원" 정류장 하차 후 연동 펠리체 빌딩(도령로 73) 방면으로 도보 1.5분 소요 (공항에서 약 10~15분 소요)',
          '제주국제공항에서 급행 버스 151번, 152번, 181번, 182번 탑승 ➡️ "제주한라병원" 정류장 하차 후 도로를 따라 서쪽으로 약 120m 이동하시면 도령로 대로변 펠리체 빌딩 1층 103, 110호에서 쉽게 찾으실 수 있습니다.'
        ]
      },
      {
        type: 'car',
        icon: <Car className="w-5.5 h-5.5 text-rose-600" />,
        title: t.ko.carTitle,
        lines: [
          '⚠️ [주차 불가] 연동 펠리체 빌딩 및 마음약국 부지 내에는 전용 차량 주차 공간이 지원되지 않습니다.',
          '약국 앞 도령로 대로변 및 주변 이면도로는 고정식 불법 주정차 단속 구역입니다. 자가용 이용은 불가하오니 필히 대중교통을 이용해 주시기 바랍니다.',
          '자가용 소지 시, 인근 노상 공영 주차장 또는 한라병원 공영 주차장 등을 직접 유료로 이용하셔야 합니다.'
        ]
      }
    ],
    en: [
      {
        type: 'bus',
        icon: <Bus className="w-5.5 h-5.5 text-sky-600" />,
        title: t.en.busTitle,
        lines: [
          'From Jeju Int\'l Airport, take Bus 315, 325, 332, 343, 365, 465, or 466 ➡️ Get off at "Jeju Halla Hospital" stop, then walk 1.5 min to Yeondong Felice Building (Doryeong-ro 73). (Takes approx. 10-15 min from the airport).',
          'From Jeju Int\'l Airport, take Express Bus 151, 152, 181, or 182 ➡️ Get off at "Jeju Halla Hospital" stop, then walk 120m west along Doryeong-ro. Located on 1F Room 103 & 110.'
        ]
      },
      {
        type: 'car',
        icon: <Car className="w-5.5 h-5.5 text-rose-600" />,
        title: t.en.carTitle,
        lines: [
          '⚠️ [NO PARKING AVAILABLE] There is no parking space for private vehicles in Yeondong Felice Building or Maum Pharmacy.',
          'The main street of Doryeong-ro and surrounding streets are strict, continuous camera-enforced parking fine zones. Visitors are strongly advised to use public transit.',
          'If you absolutely must drive, you must independently find and pay for nearby public street parking or paid parking at Jeju Halla Hospital.'
        ]
      }
    ],
    zh: [
      {
        type: 'bus',
        icon: <Bus className="w-5.5 h-5.5 text-sky-600" />,
        title: t.zh.busTitle,
        lines: [
          '从济州国际机场乘坐普通干线公交 315、325、332、343、365、465、466路 ➡️ 在“济州汉拿医院”站下车，朝莲洞 Felice 大厦（道令路73号）步行1.5分钟。（从机场出发需10~15分钟）。',
          '从济州国际机场乘坐快速/急行公交 151、152、181、182路 ➡️ 在”济州汉拿医院”站下车，沿着道令路往西走120米，即可在 Felice 大厦一楼 103、110号找到心药店。'
        ]
      },
      {
        type: 'car',
        icon: <Car className="w-5.5 h-5.5 text-rose-600" />,
        title: t.zh.carTitle,
        lines: [
          '⚠️ [不可停车] 莲洞 Felice 大厦及心药店（Maum Pharmacy）内不提供专属车辆停车位。',
          '药店前的道令路主干道及周边道路为固定的违法停放车辆监控取证罚款区。严禁自驾停车，请务必乘坐公共交通。',
          '如您开车前来，需自行在附近寻找路边公共收费车位或使用汉拿医院内部的收费停车场。'
        ]
      }
    ]
  };

  const mapPinsTranslation = {
    ko: {
      maum: {
        name: '마음약국 (연동 펠리체 1층)',
        desc: '도령로 73 연동 펠리체 1층 103, 110호. 365일 야간 연중무휴 안심 처방 조제처.',
        distance: '목적지'
      },
      hallahos: {
        name: '제주한라병원',
        desc: '도령로 65. 도내 최고 수준의 대형 종합 의료 기관 (마음약국 동쪽 120m 위치)',
        distance: '도보 1.5분'
      },
      oliveyoung: {
        name: '올리브영 (마음약국 동일 건물)',
        desc: '도령로 73. 마음약국과 같은 건물(연동 펠리체) 1층에 위치한 헬스&뷰티 스토어.',
        distance: '도보 30초'
      },
      manhattan: {
        name: '맨하탄 호텔',
        desc: '도령로 76. 마음약국(연동 펠리체) 도로 바로 맞은편 북쪽에 위치한 호텔',
        distance: '도보 1분 (맞은편)'
      },
      lotte: {
        name: '롯데면세점 제주점',
        desc: '도령로 83. 메종 글래드 제주 인근에 위치한 면세점 쇼핑 특구 (마음약국 서쪽 80m)',
        distance: '도보 1분'
      }
    },
    en: {
      maum: {
        name: 'Maum Pharmacy (Yeondong Felice 1F)',
        desc: 'Rooms 103 & 110, 73 Doryeong-ro, Yeondong, Jeju-si. 365-day late-night prescription pharmacy.',
        distance: 'Destination'
      },
      hallahos: {
        name: 'Jeju Halla Hospital',
        desc: '65 Doryeong-ro. Leading multi-specialty general hospital in Jeju (120m east of Maum Pharmacy).',
        distance: '1.5 min walk'
      },
      oliveyoung: {
        name: 'Olive Young (Same Building as Maum Pharmacy)',
        desc: '73 Doryeong-ro. Health & beauty drugstore on 1F of the same Yeondong Felice Building as Maum Pharmacy.',
        distance: '30 sec walk'
      },
      manhattan: {
        name: 'Manhattan Hotel',
        desc: '76 Doryeong-ro. Hotel located directly opposite north of Maum Pharmacy.',
        distance: '1 min walk'
      },
      lotte: {
        name: 'Lotte Duty Free Jeju',
        desc: '83 Doryeong-ro. Prime duty free shopping complex located 80m west of Maum Pharmacy.',
        distance: '1 min walk'
      }
    },
    zh: {
      maum: {
        name: '心药店 (莲洞 Felice 一楼)',
        desc: '济州市道令路 73号 莲洞 Felice 103, 110室。365天夜间全年无休安全处方调配药店。',
        distance: '目的地'
      },
      hallahos: {
        name: '济州汉拿医院',
        desc: '道令路65号。济州省内最高水平的大型综合医疗机构（位于心药店东侧120米处）。',
        distance: '步行 1.5分钟'
      },
      oliveyoung: {
        name: '欧利芙洋 (与心药店同栋建筑)',
        desc: '道令路73号。与心药店同在莲洞 Felice 大厦一楼的美妆与健康便利零售店。',
        distance: '步行 30秒'
      },
      manhattan: {
        name: '曼哈顿酒店',
        desc: '道令路76号。位于心药店正对面北侧的优质高档大酒店。',
        distance: '步行 1分钟'
      },
      lotte: {
        name: '乐天免税店 济州店',
        desc: '道令路83号。紧邻济州梅森格莱德酒店（Maison Glad）的优质免税购物商城（心药店西侧80米）。',
        distance: '步行 1分钟'
      }
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Language Selector row & Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <span className="text-emerald-600 font-bold text-xs tracking-wider uppercase">{t[language].badge}</span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {t[language].title}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-light max-w-2xl">
            {t[language].subtitle}
          </p>
        </div>

        {/* Beautiful Glassmorphic Language Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 self-start sm:self-auto">
          <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
          {(['ko', 'en', 'zh'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === lang
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
              }`}
            >
              {lang === 'ko' ? '한국어' : lang === 'en' ? 'English' : '中文'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Custom SVG Map Container (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {t[language].mapTitle}
              </span>
            </div>

            {/* Location map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="/images/heart-pharmacy-map.jpg"
                alt="Heart Pharmacy location map"
                className="w-full h-auto block"
              />
            </div>

            {/* Nearby Landmarks */}
            <div className="space-y-2.5">
              {(['hallahos', 'oliveyoung', 'manhattan', 'lotte'] as const).map((key) => {
                const landmark = mapPinsTranslation[language][key];
                return (
                  <div key={key} className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-3 shadow-sm">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-800">{landmark.name}</h4>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded font-semibold">
                          {landmark.distance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{landmark.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Contact Widget */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t[language].phoneLabel}</p>
                <p className="text-sm font-extrabold text-slate-800">064-900-4057</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t[language].addressLabel}</p>
                <p className="text-xs font-extrabold text-slate-800">{t[language].addressValue}</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/heart.pharm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t[language].instagramLabel}</p>
                <p className="text-sm font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors">@heart.pharm</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Working Hours Calendar & Realtime clock widget (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 flex justify-between items-start gap-2">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-5.5 h-5.5 text-emerald-600" />
                  {t[language].timetableTitle}
                </h3>
                <p className="text-[10px] text-slate-400 font-light">{t[language].timetableSubtitle}</p>
              </div>

              {/* Dynamic hours counter badge */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                isPharmacyOpen ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPharmacyOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
                {isPharmacyOpen 
                  ? (Math.floor(minutesUntilClose / 60) > 0 
                      ? t[language].statusOpen.replace('{h}', Math.floor(minutesUntilClose / 60).toString()).replace('{m}', (minutesUntilClose % 60).toString())
                      : t[language].statusOpenM.replace('{m}', (minutesUntilClose % 60).toString()))
                  : (minutesUntilOpen > 0 
                      ? (Math.floor(minutesUntilOpen / 60) > 0
                          ? t[language].statusClose.replace('{h}', Math.floor(minutesUntilOpen / 60).toString()).replace('{m}', (minutesUntilOpen % 60).toString())
                          : t[language].statusCloseM.replace('{m}', (minutesUntilOpen % 60).toString()))
                      : t[language].statusWaiting)
                }
              </span>
            </div>

            {/* Weekly Timetable */}
            <div className="space-y-2.5 text-xs">
              {businessHours.map((bh, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className={`font-bold ${bh.day.includes('일요일') || bh.day.includes('Sun') || bh.day.includes('周日') ? 'text-rose-600' : 'text-slate-600'}`}>
                    {bh.day}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-800">{bh.hours}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                      bh.label === t.ko.threeSixtyFiveLabel || bh.label === t.en.threeSixtyFiveLabel || bh.label === t.zh.threeSixtyFiveLabel
                        ? 'bg-rose-50 text-rose-700' 
                        : bh.label === t.ko.weekendLabel || bh.label === t.en.weekendLabel || bh.label === t.zh.weekendLabel
                          ? 'bg-amber-50 text-amber-700' 
                          : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {bh.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transit guides */}
          <div className="space-y-4">
            {travelGuides[language].map((guide, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase flex items-center gap-2">
                  {guide.type === 'bus' ? <Bus className="w-5.5 h-5.5 text-sky-600" /> : <Car className="w-5.5 h-5.5 text-rose-600" />}
                  {guide.title}
                </h4>
                <ul className="space-y-2.5">
                  {guide.lines.map((line, lidx) => (
                    <li key={lidx} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed font-light">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${guide.type === 'bus' ? 'bg-sky-500' : 'bg-rose-500'}`} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
