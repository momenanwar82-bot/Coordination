import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Award, 
  Calculator, 
  BookOpen, 
  Newspaper, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  X, 
  Bell, 
  Sparkles, 
  HelpCircle,
  GraduationCap,
  Bot
} from 'lucide-react';

import { LATEST_NEWS, GOVERNORATES_STATUS } from './data';
import CountdownTimer from './components/CountdownTimer';
import ResultsInquiry from './components/ResultsInquiry';
import Calculators from './components/Calculators';
import TansikPredictor from './components/TansikPredictor';
import AiRanker from './components/AiRanker';
import Guides from './components/Guides';
import PreferencesBuilder from './components/PreferencesBuilder';
import ScholarshipsComparator from './components/ScholarshipsComparator';
import DiplomaAdvisor from './components/DiplomaAdvisor';
import { validateFirestoreConnection } from './lib/firebase';

type MainTab = 'home' | 'results' | 'tools' | 'guides' | 'preferences' | 'scholarships' | 'diplomas';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('home');
  const [parentPercentage, setParentPercentage] = useState<number>(0);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  useEffect(() => {
    validateFirestoreConnection();
  }, []);

  const activeNews = LATEST_NEWS.find(item => item.id === selectedNewsId);

  // When a score is calculated, save it and redirect directly to predictor view
  const handleScoreCalculated = (pct: number) => {
    setParentPercentage(pct);
    setActiveMainTab('tools');
  };

  const handleClearParentPercentage = () => {
    setParentPercentage(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white text-slate-800" dir="rtl">
      
      {/* Dynamic News Ticker Header */}
      <div className="bg-indigo-950 text-indigo-100 py-2 px-4 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <span className="bg-indigo-600 text-white font-black px-2 py-0.5 rounded text-[10px] animate-pulse whitespace-nowrap shrink-0">
              تحديث عاجل
            </span>
            <div className="relative overflow-hidden w-full h-4">
              <span className="absolute animate-[marquee_20s_linear_infinite] whitespace-nowrap">
                البدء في تصحيح العينات العشوائية لمادة الفيزياء والنتائج الأولية تشير لنسبة نجاح ممتازة تتجاوز 92.4%... تم اعتماد نتيجة الدبلومات الفنية بنسبة نجاح 79.8% وإتاحة تسجيل الرغبات... ترقبوا انطلاق مؤتمر وزير التعليم العالي لإعلان تنسيق المرحلة الأولى قريباً...
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0 text-indigo-300 font-mono text-[11px]">
            <span>التاريخ الحالي:</span>
            <span>2026-07-05</span>
          </div>
        </div>
      </div>

      {/* Main Beautiful Navigation Header */}
      <header className="bg-indigo-900 text-white shadow-md sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-900 font-bold text-xl shadow-sm">
              ت
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                تنسيـقـي <span className="text-indigo-300 text-xs font-normal mr-1">دليل القبول بالجامعات والمعاهد 2026</span>
              </h1>
              <p className="text-[10px] text-indigo-200/90 font-medium mt-0.5">البوابة الرسمية لأخبار التنسيق، مؤشرات القبول، والمعاهد المتاحة حسب المجموع</p>
            </div>
          </div>

          {/* Tab Pill Navigation Controls */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none pt-2 md:pt-0">
            {[
              { id: 'home', label: 'الرئيسية والمؤشرات', icon: <Home className="w-4 h-4" /> },
              { id: 'results', label: 'أخبار التنسيق والدبلومات', icon: <Newspaper className="w-4 h-4" /> },
              { id: 'tools', label: 'حاسبة ومحاكي التنسيق', icon: <Calculator className="w-4 h-4" /> },
              { id: 'preferences', label: 'مرتب الرغبات الذكي (60 رغبة)', icon: <Award className="w-4 h-4" /> },
              { id: 'scholarships', label: 'مقارنة المصروفات والمنح', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'diplomas', label: 'مستشار التنسيق الشامل (ذكاء اصطناعي)', icon: <Bot className="w-4 h-4" /> },
              { id: 'guides', label: 'دليل المعاهد والمصروفات', icon: <BookOpen className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`main-nav-${tab.id}`}
                onClick={() => setActiveMainTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 cursor-pointer ${
                  activeMainTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-850'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PAGE */}
          {activeMainTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Giant Callout Welcome Grid */}
              <div className="bg-gradient-to-l from-indigo-800 to-blue-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
                <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none select-none" />
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none select-none" />

                <div className="relative max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded border border-white/20 px-3 py-1 text-xs font-bold text-indigo-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تحديث مستمر على مدار الساعة</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black leading-tight sm:leading-snug">
                    احصل على نتيجتك، خطط لمجموعك، واكتشف كليتك المفضلة الآن!
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-xl">
                    تابع مواعيد رصد درجات الشهادات الكبرى بالثانوية العامة والدبلومات الفنية والأزهر الشريف، واحسب مجموعك بدقة مع التنسيق المتوقع والرسوم والأدلة مجاناً.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      id="hero-results-btn"
                      onClick={() => setActiveMainTab('results')}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded transition duration-300 shadow-md cursor-pointer"
                    >
                      استعلم عن النتيجة الآن
                    </button>
                    <button
                      id="hero-calc-btn"
                      onClick={() => setActiveMainTab('tools')}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded transition duration-300 border border-white/10 cursor-pointer"
                    >
                      احسب مجموعك وتنسيقك
                    </button>
                  </div>
                </div>
              </div>

              {/* Countdown Clock Module */}
              <CountdownTimer />

              {/* Grid: Latest News & Calendar Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* News Segment (آخر الأخبار) */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-indigo-600" />
                      <span className="border-r-4 border-indigo-500 pr-2 font-black text-slate-900">آخر الأخبار والمؤشرات الرسمية</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {LATEST_NEWS.map((item) => (
                      <div 
                        key={item.id}
                        id={`news-card-${item.id}`}
                        onClick={() => setSelectedNewsId(item.id)}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-indigo-200 hover:shadow-sm transition duration-300 cursor-pointer flex flex-col justify-between"
                      >
                        {item.imageUrl && (
                          <div className="h-44 overflow-hidden relative">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <span className="absolute top-3 right-3 bg-indigo-900/95 text-white font-bold text-[10px] px-2.5 py-1 rounded backdrop-blur-xs">
                              {item.category === 'thanawya' ? 'ثانوية عامة' : item.category === 'diploma' ? 'دبلومات فنية' : item.category === 'azhar' ? 'أزهر شريف' : 'عام'}
                            </span>
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[10px] text-slate-400 font-bold font-mono">{item.date}</span>
                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">{item.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4 hover:text-indigo-800">
                            <span>اقرأ التفاصيل</span>
                            <ChevronLeft className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcement Dates Segment (مواعيد إعلان النتائج) */}
                <div className="lg:col-span-4 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span className="border-r-4 border-indigo-500 pr-2 font-black text-slate-900">مواعيد إعلان النتائج التقديرية</span>
                    </h3>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
                    {[
                      { exam: 'تسجيل رغبات دبلوم الصنايع والتجارة', date: 'مفتوح الآن', status: 'available', bg: 'bg-emerald-100 text-emerald-700 font-bold' },
                      { exam: 'تنسيق المعاهد التكنولوجية العليا', date: 'مفتوح الآن', status: 'available', bg: 'bg-emerald-100 text-emerald-700 font-bold' },
                      { exam: 'الدبلومات الفنية الرسمية', date: 'اعتماد النتيجة', status: 'available', bg: 'bg-emerald-100 text-emerald-700 font-bold' },
                      { exam: 'الثانوية الأزهرية الشريفة', date: '22 يوليو 2026', status: 'soon', bg: 'bg-slate-100 text-slate-600' },
                      { exam: 'الثانوية العامة المصرية', date: '28 يوليو 2026', status: 'soon', bg: 'bg-indigo-100 text-indigo-800 font-bold' }
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 text-xs sm:text-sm hover:bg-slate-50/45 transition">
                        <span className="font-bold text-slate-700">{row.exam}</span>
                        <span className={`px-2.5 py-1 rounded text-[10px] ${row.bg}`}>
                          {row.date}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Help Card */}
                  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 space-y-3">
                    <h4 className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span>هل تحتاج مساعدة؟</span>
                    </h4>
                    <p className="text-[11px] text-indigo-800 leading-relaxed">
                      انتقل لصفحة "دليل التنسيق والتقديم" لقراءة خطوات التقديم على التظلمات أو شرح تسجيل الرغبات خطوة بخطوة.
                    </p>
                    <button
                      id="home-goto-guides-btn"
                      onClick={() => setActiveMainTab('guides')}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition duration-300 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>انتقل إلى صفحة دليل التنسيق الآن</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: RESULTS INQUIRY PAGES */}
          {activeMainTab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsInquiry />
            </motion.div>
          )}

          {/* TAB 3: CALCULATORS AND TANSIK PREDICTORS */}
          {activeMainTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <Calculators onScoreCalculated={handleScoreCalculated} />
              
              <AiRanker initialPercentage={parentPercentage} />

              <TansikPredictor 
                initialPercentage={parentPercentage} 
                onClearInitialPercentage={handleClearParentPercentage} 
              />
            </motion.div>
          )}

          {/* TAB 4: PREFERENCES BUILDER */}
          {activeMainTab === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PreferencesBuilder initialPercentage={parentPercentage} />
            </motion.div>
          )}

          {/* TAB 5: SCHOLARSHIPS & FEES COMPARATOR */}
          {activeMainTab === 'scholarships' && (
            <motion.div
              key="scholarships"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ScholarshipsComparator />
            </motion.div>
          )}

          {/* TAB 6: DIPLOMAS AI ADVISOR */}
          {activeMainTab === 'diplomas' && (
            <motion.div
              key="diplomas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <DiplomaAdvisor />
            </motion.div>
          )}

          {/* TAB 7: POST RESULT GUIDES AND FAQS */}
          {activeMainTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Guides />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* News Full View Overlay Modal */}
      <AnimatePresence>
        {activeNews && (
          <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <span className="text-xs bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-md">
                  تفاصيل الخبر
                </span>
                <button 
                  id="close-news-modal"
                  onClick={() => setSelectedNewsId(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-4">
                {activeNews.imageUrl && (
                  <div className="h-56 overflow-hidden rounded-xl">
                    <img 
                      src={activeNews.imageUrl} 
                      alt={activeNews.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="text-[11px] font-bold text-slate-400 font-mono">{activeNews.date}</div>
                
                <h3 className="font-black text-slate-800 text-base sm:text-lg leading-snug">
                  {activeNews.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  {activeNews.excerpt}
                </p>

                <div className="text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                  {activeNews.content}
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border-t border-indigo-100 text-center">
                <button 
                  id="news-modal-ok-btn"
                  onClick={() => setSelectedNewsId(null)}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded transition cursor-pointer"
                >
                  إغلاق نافذة الخبر
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Portal Footer Stamp */}
      <footer className="bg-indigo-950 text-indigo-200 border-t border-indigo-900 mt-12 py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-1.5 font-bold text-indigo-300">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>بوابة نتيجتي التعليمية لعام 2026 - جمهورية مصر العربية</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed text-indigo-300/80">
            جميع المؤشرات والبيانات المعروضة مستخرجة من مصادر إحصائية وتاريخية معتمدة للشهادات العامة في مصر وتقدم كأدوات استرشادية لمساعدة أبنائنا الطلاب وأولياء الأمور.
          </p>
          <div className="pt-4 border-t border-indigo-900 text-[10px] text-indigo-400/50">
            برمجة وتطوير البوابة التعليمية الموحدة © {new Date().getFullYear()} جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

    </div>
  );
}
