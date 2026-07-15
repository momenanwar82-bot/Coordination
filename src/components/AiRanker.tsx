import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Upload, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Building2, 
  MapPin, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Copy, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  X,
  Scale,
  Compass,
  HelpCircle,
  Send,
  MessageSquare,
  Award
} from 'lucide-react';

interface AiRankerProps {
  initialPercentage?: number;
}

interface RankedPreference {
  rank: number;
  name: string;
  category: string;
  type: string;
  minPercentage: number;
  location: string;
  safetyLevel: 'safe' | 'expected' | 'ambitious';
  advice: string;
}

interface AiResponseData {
  studentSummary: string;
  recommendedTrack: string;
  preferences: RankedPreference[];
}

export default function AiRanker({ initialPercentage = 0 }: AiRankerProps) {
  const [activeMainMode, setActiveMainMode] = useState<'ranker' | 'lawyer' | 'transfer'>('ranker');

  const [score, setScore] = useState<number>(initialPercentage > 0 ? initialPercentage : 80);
  const [track, setTrack] = useState<string>('علمي علوم');
  const [governorate, setGovernorate] = useState<string>('القاهرة');
  const [notes, setNotes] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('جاري تحليل البيانات...');
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<AiResponseData | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);

  // Tansik Lawyer State
  const [lawyerQuestion, setLawyerQuestion] = useState<string>('');
  const [lawyerLoading, setLawyerLoading] = useState<boolean>(false);
  const [lawyerAnswer, setLawyerAnswer] = useState<string | null>(null);

  // Transfer Simulator State
  const [currentCollege, setCurrentCollege] = useState<string>('كلية التجارة جامعة القاهرة');
  const [targetCollege, setTargetCollege] = useState<string>('كلية التجارة جامعة عين شمس');
  const [transferResult, setTransferResult] = useState<{ eligible: boolean; type: string; details: string } | null>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    setMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRunAiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const steps = [
      'جاري الاتصال بنموذج ذكاء جوجل الاصطناعي...',
      'قراءة وتفسير نسب الحدود الدنيا للجامعات المصرية...',
      'مطابقة مجموع الطالب مع كليات ومعاهد العام الحالي...',
      'تصنيف وترتيب أفضل 20 رغبة بدقة واحترافية...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1200);

    try {
      const response = await fetch('/api/ai-ranker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          track,
          governorate,
          notes,
          imageBase64,
          mimeType,
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok) {
        throw new Error(data.error || 'فشل الاتصال بخدمة التحليل الذكي.');
      }

      setResultData(data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'حدث خطأ غير متوقع. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskLawyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lawyerQuestion.trim()) return;

    setLawyerLoading(true);
    setLawyerAnswer(null);

    try {
      const res = await fetch('/api/tansik-lawyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: lawyerQuestion, track, score })
      });
      const data = await res.json();
      setLawyerAnswer(data.answer);
    } catch (err) {
      setLawyerAnswer('عذراً، حدث خطأ في الاتصال بمستشار التنسيق القانوني. يجدر بك مراجعة مكتب التنسيق.');
    } finally {
      setLawyerLoading(false);
    }
  };

  const handleCheckTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate smart geographic transfer check
    const isMunazer = currentCollege.includes(targetCollege.split(' ')[1] || 'جامعة');
    setTransferResult({
      eligible: true,
      type: isMunazer ? 'تحويل مناظر (داخل النطاق الجغرافي ب)' : 'تحويل غير مناظر (بشرط استيفاء الحد الأدنى للكلية المراد التحويل إليها)',
      details: `بناءً على قواعد تقليل الاغتراب لعام 2026، يحق لك التقدم بطلب التحويل عبر موقع التنسيق الإلكتروني مرة واحدة فقط خلال الفترة المحددة بعد إعلان نتيجة المرحلة. نسبة القبول بحد أقصى 10% من أعداد المقبولين.`
    });
  };

  const handleCopyPreferences = () => {
    if (!resultData) return;
    const text = resultData.preferences
      .map(p => `${p.rank}. ${p.name} (${p.location}) - الحد الأدنى: ${p.minPercentage}% - التصنيف: ${p.safetyLevel}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredPreferences = resultData?.preferences.filter(p => {
    if (filterLevel === 'all') return true;
    return p.safetyLevel === filterLevel;
  }) || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8" dir="rtl">
      
      {/* Mode Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>قسم حاسبة ومحامي التنسيق الذكي 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            المرشد القانوني ومحاكي تنسيق الكليات والمعاهد
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {[
            { id: 'ranker', label: '🤖 محاكي وترتيب الرغبات', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'lawyer', label: '⚖️ محامي ومستشار التنسيق', icon: <Scale className="w-4 h-4" /> },
            { id: 'transfer', label: '🗺️ حاسبة تقليل الاغتراب', icon: <Compass className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMainMode(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeMainMode === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: AI PREFERENCES RANKER */}
      {activeMainMode === 'ranker' && (
        <div>
          <div className="max-w-2xl mb-8">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              أدخل مجموعك أو ارفع صورة شهادة الدرجات / بطاقة التنسيق السابقة، ليقوم الذكاء الاصطناعي بترتيب أولوياتك بدقة وفق قواعد التنسيق المصرية وتوزيعك الجغرافي.
            </p>
          </div>

          <form onSubmit={handleRunAiAnalysis} className="space-y-6 bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">النسبة المئوية أو المجموع (%):</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="50"
                    max="100"
                    step="0.1"
                    value={score}
                    onChange={(e) => setScore(parseFloat(e.target.value) || 50)}
                    className="w-24 bg-white border border-slate-300 rounded-lg px-3 py-2 text-center text-lg font-black text-indigo-600 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    required
                  />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="50"
                      max="98"
                      step="0.5"
                      value={score}
                      onChange={(e) => setScore(parseFloat(e.target.value))}
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

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">الشعبة الدراسية:</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="علمي علوم">علمي علوم (ثانوية عامة)</option>
                  <option value="علمي رياضة">علمي رياضة (ثانوية عامة)</option>
                  <option value="أدبي">أدبي (ثانوية عامة)</option>
                  <option value="دبلوم صناعي">دبلوم صناعي (3 أو 5 سنوات)</option>
                  <option value="دبلوم تجاري">دبلوم تجاري (3 أو 5 سنوات)</option>
                  <option value="دبلوم فندقي وزراعي">دبلوم فندقي / زراعي</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">المحافظة (للتوزيع الجغرافي):</label>
                <input
                  type="text"
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  placeholder="مثال: القاهرة، الجيزة، الإسكندرية..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

            </div>

            <div className="border-t border-slate-200 pt-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                إرفاق صورة شهادة الدرجات أو بطاقة التنسيق (اختياري للتحليل البصري بالذكاء الاصطناعي):
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto flex-1 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-4 bg-white text-center cursor-pointer transition flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-600">
                    {imageName ? `تم اختيار: ${imageName}` : 'اختر صورة الشهادة أو اسحبها هنا...'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                {imageBase64 && (
                  <button
                    type="button"
                    onClick={() => { setImageBase64(null); setImageName(null); }}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>إزالة الصورة</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">رغبات أو تخصصات مفضلة (توجيهات للذكاء الاصطناعي):</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: أميل إلى كليات الحاسبات والمعاهد الهندسية وقريب من محل سكنى..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-sm rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{loadingStep}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span>ابدأ توليد وترتيب أفضل 20 رغبة الآن</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resultData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 border-t border-slate-200 pt-8"
            >
              <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="bg-indigo-500/40 text-indigo-100 px-3 py-1 rounded-full text-xs font-bold">
                      تحليل الذكاء الاصطناعي لـ {track} بمجموع {score}%
                    </span>
                    
                    <button
                      onClick={handleCopyPreferences}
                      className="px-3 py-1.5 bg-white text-indigo-950 font-bold text-xs rounded-lg hover:bg-indigo-50 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-indigo-600" />}
                      <span>{copied ? 'تم النسخ بنجاح' : 'نسخ جدول الرغبات'}</span>
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-black leading-snug">
                    التوصية الرسمية: {resultData.recommendedTrack}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                    {resultData.studentSummary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span>إجمالي الرغبات المقترحة: <strong className="text-indigo-600 font-mono text-sm">{resultData.preferences.length} رغبة مرتبة</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'الكل (20)' },
                    { id: 'safe', label: '🛡️ آمنة ومضمونة' },
                    { id: 'expected', label: '🎯 متوقعة ومناسبة' },
                    { id: 'ambitious', label: '⭐ طموحة (مرحلة أولى)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setFilterLevel(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        filterLevel === tab.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPreferences.map((pref) => {
                  const isSafe = pref.safetyLevel === 'safe';
                  const isExpected = pref.safetyLevel === 'expected';

                  return (
                    <motion.div
                      key={pref.rank}
                      layout
                      className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4 hover:shadow-md transition relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600" style={{
                        backgroundColor: isSafe ? '#10b981' : isExpected ? '#6366f1' : '#f59e0b'
                      }} />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 bg-slate-900 text-white font-black text-xs rounded-lg flex items-center justify-center font-mono">
                              {pref.rank}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-bold">
                              {pref.type === 'public' ? 'حكومي' : pref.type === 'ahlia' ? 'جامعة أهلية' : 'معهد عالي / خاص'}
                            </span>
                          </div>

                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                            isSafe 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : isExpected 
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {isSafe ? '🛡️ آمنة ومضمونة' : isExpected ? '🎯 متوقعة ومناسبة' : '⭐ رغبة طموحة'}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-slate-950 text-sm sm:text-base leading-snug">
                          {pref.name}
                        </h4>

                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          {pref.advice}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-bold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{pref.location}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 text-[10px]">الحد الأدنى التقريبي:</span>
                          <span className="font-black text-indigo-600 font-mono text-sm">{pref.minPercentage}%</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filteredPreferences.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-xs text-slate-500 font-bold">لا توجد رغبات مطابقة للتصنيف المحدد.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* MODE 2: TANSIK LAWYER & RULES ADVISOR */}
      {activeMainMode === 'lawyer' && (
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-300">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black">محامي ومستشار التنسيق وقواعد التعليم العالي</h3>
                <p className="text-xs text-indigo-200">اسأل في أي قاعدة قانونية أو إدارية تخص التنسيق، تقليل الاغتراب، التظلمات، أو توزيع الرغبات.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAskLawyer} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اكتب سؤالك القانوني أو الإداري لمستشار التنسيق:</label>
              <textarea
                rows={3}
                value={lawyerQuestion}
                onChange={(e) => setLawyerQuestion(e.target.value)}
                placeholder="مثال: هل يمكنني التحويل لكلية هندسة في محافظة أخرى إذا لم تكن في نطاقي الجغرافي (أ)؟ وما هي الشروط؟"
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none"
                required
              />
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500">أو اختر سؤالاً شائعاً للإجابة الفورية:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "ما هي شروط وقواعد تقليل الاغتراب المناظر وغير المناظر؟",
                  "كيف يتم حساب مجموع التنسيق لطلاب الدبلومات الفنية؟",
                  "ما هي عقوبة أو طريقة تعديل الرغبات بعد تأكيدها؟",
                  "كيف أتقدم بتظلم رسمي لمراجعة درجات الثانوية العامة؟"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLawyerQuestion(q)}
                    className="bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={lawyerLoading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                {lawyerLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري صياغة الاستشارة القانونية...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>احصل على الرأي القانوني المعتمد</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {lawyerAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-6 text-slate-900 space-y-3"
            >
              <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
                <Sparkles className="w-4 h-4" />
                <span>رأي مستشار التنسيق وقواعد المجلس الأعلى للجامعات:</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium text-slate-800 whitespace-pre-line">
                {lawyerAnswer}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* MODE 3: GEOGRAPHICAL TRANSFER SIMULATOR */}
      {activeMainMode === 'transfer' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
            <h3 className="text-base sm:text-lg font-black mb-1">حاسبة ومحاكي تقليل الاغتراب (مناظر وغير مناظر)</h3>
            <p className="text-xs text-blue-200">تحقق فوراً من مطابقة شروط المجلس الأعلى للجامعات لطلب التحويل بعد إعلان نتيجة التنسيق.</p>
          </div>

          <form onSubmit={handleCheckTransfer} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الكلية الحالية المرشح لها:</label>
                <input
                  type="text"
                  value={currentCollege}
                  onChange={(e) => setCurrentCollege(e.target.value)}
                  placeholder="مثال: كلية التجارة جامعة اسيوط"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الكلية المراد التحويل إليها:</label>
                <input
                  type="text"
                  value={targetCollege}
                  onChange={(e) => setTargetCollege(e.target.value)}
                  placeholder="مثال: كلية التجارة جامعة القاهرة"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>فحص إمكانية تقليل الاغتراب</span>
              </button>
            </div>
          </form>

          {transferResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-950 space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>نتيجة فحص تقليل الاغتراب: {transferResult.type}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-emerald-900 font-medium">
                {transferResult.details}
              </p>
            </motion.div>
          )}
        </div>
      )}

    </div>
  );
}
