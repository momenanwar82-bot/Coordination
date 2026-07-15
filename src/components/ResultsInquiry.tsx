import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  Newspaper, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  AlertCircle, 
  HelpCircle,
  TrendingUp,
  Award,
  BookOpen,
  RefreshCw,
  Flame,
  Radio,
  Eye,
  Clock,
  X
} from 'lucide-react';
import { LATEST_NEWS, PREDICTED_COLLEGES } from '../data';

// Additional Technical Institute Cutoffs Data for Technical Diplomas & General
const INSTITUTES_AND_COLLEGES_DATABASE = [
  ...PREDICTED_COLLEGES,
  {
    id: 'tech_eng_mataria',
    name: 'المعهد العالي للهندسة والتكنولوجيا بالمطرية',
    category: 'engineering',
    type: 'private',
    minPercentage: 75.0,
    location: 'القاهرة',
    description: 'يقبل طلاب الثانوية العامة (علمي رياضة) ودبلوم المدارس الصناعية نظام 3 و5 سنوات.'
  },
  {
    id: 'tech_kom_oshem',
    name: 'كلية التكنولوجيا والتعليم - جامعة بني سويف',
    category: 'applied',
    type: 'public',
    minPercentage: 78.5,
    location: 'بني سويف',
    description: 'تعتوجه رئيسي لخريجي الدبلومات الفنية الصناعية وثانوية الصنايع.'
  },
  {
    id: 'tech_helwan',
    name: 'كلية التكنولوجيا والتعليم - جامعة حلوان',
    category: 'applied',
    type: 'public',
    minPercentage: 80.0,
    location: 'الاميرية، القاهرة',
    description: 'من أهم الكليات التكنولوجية التي تقبل طلاب الدبلومات الفنية الصناعية والثانوية العامة.'
  },
  {
    id: 'higher_coeff_6_october',
    name: 'المعهد العالي للعلوم الإدارية والتجارية ب6 أكتوبر',
    category: 'humanities',
    type: 'private',
    minPercentage: 62.0,
    location: 'السادس من أكتوبر',
    description: 'يقبل خريجي الدبلومات التجارية (3 و5 سنوات) والثانوية العامة والأزهرية.'
  },
  {
    id: 'higher_computers_academy',
    name: 'معهد العباسية للعلوم التجارية والحاسبات الآلية',
    category: 'scientific',
    type: 'private',
    minPercentage: 65.5,
    location: 'الظاهر، القاهرة',
    description: 'شعبة نظم اطلاعات إدارية وعلوم حاسب، يقبل دبلومات تجارية وصناعية وثانوية.'
  },
  {
    id: 'higher_hotels_alex',
    name: 'المعهد العالي للسياحة والفنادق بالإسكندرية',
    category: 'humanities',
    type: 'private',
    minPercentage: 60.0,
    location: 'الإسكندرية',
    description: 'يقبل خريجي الفندقي، التجاري، والثانوية العامة بشعبتيها.'
  }
];

interface LiveNewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  time: string;
  urgent: boolean;
  views: string;
}

interface ResultsInquiryProps {
  onNavigate?: (tab: 'home' | 'results' | 'tools' | 'guides') => void;
}

export default function TansikNewsHub({ onNavigate }: ResultsInquiryProps) {
  const [studentScorePct, setStudentScorePct] = useState<number>(75);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Live News State
  const [liveNews, setLiveNews] = useState<LiveNewsItem[]>([]);
  const [breakingFlash, setBreakingFlash] = useState<string>('عاجل الآن: متابعة لحظية لنتائج الدبلومات الفنية ومؤشرات تنسيق الكليات والمعاهد 2026.');
  const [newsLoading, setNewsLoading] = useState<boolean>(true);
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('all');
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<LiveNewsItem | null>(null);

  const fetchLiveNews = async () => {
    setNewsLoading(true);
    try {
      const response = await fetch('/api/live-education-news');
      const data = await response.json();
      if (data && data.newsList) {
        setLiveNews(data.newsList);
        if (data.breakingNews) {
          setBreakingFlash(data.breakingNews);
        }
      }
    } catch (err) {
      console.error("Failed to fetch live news:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  // Filter institutes based on score and search
  const filteredInstitutes = INSTITUTES_AND_COLLEGES_DATABASE.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'all' || item.category === selectedTrack;
    return matchesQuery && matchesTrack;
  });

  const filteredNews = liveNews.filter(n => newsCategoryFilter === 'all' || n.category === newsCategoryFilter);

  return (
    <div className="space-y-8" dir="rtl">
      
      {/* Live Breaking News Ticker Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-indigo-950 rounded-2xl p-4 text-white shadow-lg flex items-center justify-between gap-4 overflow-hidden border border-rose-500/30">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-rose-600 px-3 py-1 rounded-full text-xs font-black animate-pulse shadow-sm">
            <Radio className="w-3.5 h-3.5" />
            <span>بث مباشر عاجل</span>
          </div>
          <span className="text-xs text-rose-200 hidden sm:inline font-mono">9 يوليو 2026</span>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <motion.div
            key={breakingFlash}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs sm:text-sm font-bold text-white truncate"
          >
            🔥 {breakingFlash}
          </motion.div>
        </div>

        <button
          onClick={fetchLiveNews}
          title="تحديث الأخبار فوراً"
          className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-4 h-4 text-white ${newsLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Official Announcement Banner for Technical Diplomas Today */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/40 px-3 py-1 rounded-full text-xs font-bold text-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
            <span>بيان رسمي عاجل • نتيجة الدبلومات الفنية 2026</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-snug">
            اعتماد نتيجة الدبلومات الفنية (صناعي، تجاري، زراعي، فندقي) رسمياً اليوم
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
            تم اعتماد نتيجة الدبلومات الفنية بحضور قيادات وزارة التربية والتعليم والتعليم الفني. حرصاً على الأمان التام للطلاب وتجنب الروابط الوهمية، تم تخصيص هذا المركز حصرياً لـ <strong>أخبار التنسيق الحصرية، ومؤشرات القبول، وإيه المعاهد والكليات اللي هتقبل من مجموعك</strong> بدقة فائقة.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://tansik.digital.gov.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-indigo-950 font-black text-xs sm:text-sm rounded-xl hover:bg-indigo-50 transition shadow-md flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-indigo-600" />
              <span>رابط بوابة التنسيق الحكومية الرسمية</span>
            </a>

            {onNavigate && (
              <button
                id="results-to-tools-btn"
                onClick={() => onNavigate('tools')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>حساب النسبة وتوقع الكليات المتاحة</span>
              </button>
            )}
            
            <div className="text-xs text-indigo-200 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>موقع معتمد لتوقعات ومؤشرات القبول</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Exclusive News Feed Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-rose-600 animate-bounce" />
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                أحدث الأخبار العاجلة والحصرية للتعليم والتنسيق
              </h3>
              <p className="text-xs text-slate-500">تحديثات فورية ولحظية من مصادر التعليم العالي والتربية والتعليم</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'diploma', label: 'دبلومات فنية' },
              { id: 'tansik', label: 'تنسيق الجامعات' },
              { id: 'thanawya', label: 'ثانوية عامة' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setNewsCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  newsCategoryFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {newsLoading && liveNews.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-bold">جاري جلب أحدث الأخبار العاجلة والحصرية...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4 hover:shadow-md transition relative group overflow-hidden"
              >
                {item.urgent && (
                  <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-black px-3 py-0.5 rounded-bl-lg">
                    عاجل
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded">
                      {item.category === 'diploma' ? 'دبلومات فنية' : item.category === 'tansik' ? 'تنسيق جامعي' : 'تعليم عام'}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.time}</span>
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.views || '8.4 ألف مشاهدة'}</span>
                  </span>
                  
                  <button
                    onClick={() => setSelectedNewsArticle(item)}
                    className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition text-xs"
                  >
                    <span>قراءة الخبر</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Institute Cutoff Calculator ("إيه المعاهد والكليات اللي هتقبل من كذا") */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h3 className="text-lg sm:text-xl font-black text-slate-950 flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            <span>دليل المعاهد والكليات المتاحة حسب مجموعك</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            أدخل نسبتك المئوية أو مجموعك لتعرف فوراً الكليات والمعاهد الحكومية والأهلية والخاصة التي تناسبك.
          </p>
        </div>

        {/* Inputs Bar */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-8">
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-bold text-slate-700">نسبتك المئوية التقديرية (%):</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="50"
                max="100"
                step="0.5"
                value={studentScorePct}
                onChange={(e) => setStudentScorePct(parseFloat(e.target.value) || 50)}
                className="w-24 bg-white border border-slate-300 rounded-lg px-3 py-2 text-center text-lg font-black text-indigo-600 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <div className="flex-1">
                <input
                  type="range"
                  min="50"
                  max="98"
                  step="0.5"
                  value={studentScorePct}
                  onChange={(e) => setStudentScorePct(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 font-bold">
                  <span>50%</span>
                  <span>75%</span>
                  <span>98%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">تصفية حسب التخصص:</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="all">كل التخصصات والمعاهد</option>
                <option value="medical">طب وعلوم صحية</option>
                <option value="engineering">هندسة وتكنولوجيا</option>
                <option value="scientific">علوم وحاسبات</option>
                <option value="humanities">تجارية وإنسانيات</option>
                <option value="applied">تعليم صناعي وتطبيقي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">بحث بالاسم أو المدينة:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: هندسة، المطرية، حلوان..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pr-3 pl-10 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInstitutes.map((col) => {
            const isQualified = studentScorePct >= col.minPercentage;
            const diff = +(studentScorePct - col.minPercentage).toFixed(1);

            return (
              <motion.div
                key={col.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between gap-4 hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                      {col.type === 'public' ? 'حكومي' : col.type === 'ahlia' ? 'أهلي' : 'خاص / معهد عالي'}
                    </span>

                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                      isQualified 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : diff >= -3 
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {isQualified ? '✓ مؤهل للقبول' : diff >= -3 ? '≈ فرصة قريبة للمرحلة الثانية' : '× الحد الأدنى أعلى من مجموعك'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{col.name}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{col.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">{col.location || 'مختلف المحافظات'}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[10px]">الحد الأدنى:</span>
                    <span className="font-black text-indigo-600 font-mono">{col.minPercentage}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredInstitutes.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">لا توجد معاهد أو كليات مطابقة للبحث</h4>
            <p className="text-xs text-slate-400 mt-1">جرب تعديل نسبة المجموع أو كلمات البحث للعثور على خيارات أخرى.</p>
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedNewsArticle && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative space-y-6"
            >
              <button
                onClick={() => setSelectedNewsArticle(null)}
                className="absolute top-4 left-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md">
                    {selectedNewsArticle.category === 'diploma' ? 'دبلومات فنية' : selectedNewsArticle.category === 'tansik' ? 'تنسيق جامعي' : 'تعليم عام'}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedNewsArticle.time}</span>
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{selectedNewsArticle.views}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-slate-950 leading-relaxed">
                  {selectedNewsArticle.title}
                </h2>
              </div>

              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                <strong>الملخص: </strong> {selectedNewsArticle.excerpt}
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-loose border-t border-slate-100 pt-5">
                <p>
                  {selectedNewsArticle.content || selectedNewsArticle.excerpt}
                </p>
                <p>
                  وتهيب وزارة التعليم العالي والتربية والتعليم بأبنائنا الطلاب وأولياء الأمور عدم الانسياق وراء الشائعات أو الصفحات الوهمية، والاعتماد حصرياً على البوابة الرسمية للتنسيق وموقع الوزارة للاستعلام عن كافة المستجدات والقرارات الرسمية المعتمدة لعام 2026.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedNewsArticle(null)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
                >
                  إغلاق الخبر
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

