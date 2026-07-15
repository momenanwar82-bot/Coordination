import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, Percent, Sparkles, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { THANAWYA_SUBJECTS_MAP } from '../data';

interface CalculatorsProps {
  onScoreCalculated: (percentage: number) => void;
  onNavigate?: (tab: 'home' | 'results' | 'tools' | 'guides') => void;
}

export default function Calculators({ onScoreCalculated, onNavigate }: CalculatorsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'detailed' | 'quick'>('detailed');

  // Detailed Calculator State
  const [selectedBranch, setSelectedBranch] = useState<'science_bio' | 'science_math' | 'literary'>('science_bio');
  const [subjectScores, setSubjectScores] = useState<Record<string, string>>({});
  const [detailedSummary, setDetailedSummary] = useState({
    total: 0,
    max: 410,
    percentage: 0,
    failures: 0
  });

  // Quick Calculator State
  const [quickStudentScore, setQuickStudentScore] = useState<string>('');
  const [quickMaxScore, setQuickMaxScore] = useState<string>('410'); // Defaults to Thanawya 410
  const [quickResult, setQuickResult] = useState<{ percentage: number; grade: string } | null>(null);

  // Initialize detailed calculator scores when branch changes
  useEffect(() => {
    const subjects = THANAWYA_SUBJECTS_MAP[selectedBranch];
    const initialScores: Record<string, string> = {};
    subjects.forEach((sub) => {
      initialScores[sub.id] = '';
    });
    setSubjectScores(initialScores);
    setDetailedSummary({ total: 0, max: 410, percentage: 0, failures: 0 });
  }, [selectedBranch]);

  // Recalculate detailed totals as user inputs scores
  useEffect(() => {
    const subjects = THANAWYA_SUBJECTS_MAP[selectedBranch];
    let currentTotal = 0;
    let failuresCount = 0;

    subjects.forEach((sub) => {
      const val = parseFloat(subjectScores[sub.id]) || 0;
      currentTotal += val;
      if (subjectScores[sub.id] !== '' && val < sub.minScore) {
        failuresCount++;
      }
    });

    const percentage = parseFloat(((currentTotal / 410) * 100).toFixed(2));
    setDetailedSummary({
      total: currentTotal,
      max: 410,
      percentage: isNaN(percentage) ? 0 : percentage,
      failures: failuresCount
    });
  }, [subjectScores, selectedBranch]);

  const handleScoreChange = (subId: string, val: string, maxScore: number) => {
    // Only allow numeric input
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;

    const numVal = parseFloat(val);
    if (numVal > maxScore) {
      // Don't update if it exceeds max score
      return;
    }

    setSubjectScores((prev) => ({
      ...prev,
      [subId]: val
    }));
  };

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const obtained = parseFloat(quickStudentScore);
    const total = parseFloat(quickMaxScore);

    if (isNaN(obtained) || isNaN(total) || total <= 0) return;

    const pct = parseFloat(((obtained / total) * 100).toFixed(2));
    
    // Determine Egyptian general grading
    let grade = 'مقبول';
    if (pct >= 85) grade = 'ممتاز (أ)';
    else if (pct >= 75) grade = 'جيد جداً (ب)';
    else if (pct >= 65) grade = 'جيد (ج)';
    else if (pct >= 50) grade = 'مقبول (د)';
    else grade = 'ضعيف / راسب (و)';

    setQuickResult({
      percentage: pct,
      grade
    });
  };

  const handleApplyToTansik = () => {
    if (detailedSummary.percentage > 0) {
      onScoreCalculated(detailedSummary.percentage);
    }
  };

  const handleApplyQuickToTansik = () => {
    if (quickResult && quickResult.percentage > 0) {
      onScoreCalculated(quickResult.percentage);
    }
  };

  return (
    <div id="calculators-section" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6">
      {/* Sub-tab chooser */}
      <div className="flex justify-center border-b border-slate-200 pb-4 mb-6">
        <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <button
            id="subtab-detailed"
            onClick={() => setActiveSubTab('detailed')}
            className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              activeSubTab === 'detailed'
                ? 'bg-white text-indigo-650 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>حاسبة مجموع الثانوية العامة</span>
          </button>
          <button
            id="subtab-quick"
            onClick={() => setActiveSubTab('quick')}
            className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              activeSubTab === 'quick'
                ? 'bg-white text-indigo-650 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Percent className="w-4 h-4 text-indigo-600" />
            <span>حاسبة النسبة المئوية السريعة</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'detailed' ? (
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg font-black text-slate-950">حاسبة درجات الثانوية العامة المتقدمة</h3>
            <p className="text-xs text-slate-500 mt-1">احسب مجموعك الفعلي والنسبة المئوية مع حساب المواد التخصصية للفرع العلمي أو الأدبي</p>
          </div>

          {onNavigate && (
            <div className="mb-6 bg-indigo-50 border border-indigo-150 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="font-bold text-indigo-900">تريد معرفة مصروفات الكليات الأهلية أو خطوات تسجيل الرغبات والتظلمات؟</span>
              <button
                id="calc-to-guides-btn"
                onClick={() => onNavigate('guides')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3.5 rounded transition shadow-xs cursor-pointer shrink-0"
              >
                انتقل إلى صفحة دليل التنسيق والمصروفات
              </button>
            </div>
          )}

          {/* Branch Select */}
          <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto mb-6 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {[
              { id: 'science_bio', name: 'علمي علوم' },
              { id: 'science_math', name: 'علمي رياضة' },
              { id: 'literary', name: 'أدبي' }
            ].map((b) => (
              <button
                key={b.id}
                id={`branch-btn-${b.id}`}
                onClick={() => setSelectedBranch(b.id as any)}
                className={`py-1.5 px-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  selectedBranch === b.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-7 space-y-2.5">
              {THANAWYA_SUBJECTS_MAP[selectedBranch].map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 hover:border-slate-300 transition gap-4"
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800">{sub.name}</div>
                    <div className="text-[10px] text-slate-450 mt-0.5 font-medium">
                      العظمى: {sub.maxScore} درجة / الصغرى: {sub.minScore} درجة
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id={`score-input-${sub.id}`}
                      type="text"
                      placeholder="0"
                      value={subjectScores[sub.id] || ''}
                      onChange={(e) => handleScoreChange(sub.id, e.target.value, sub.maxScore)}
                      className="w-16 bg-white border border-slate-250 rounded px-2 py-1 text-center font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                    />
                    <span className="text-[10px] text-slate-400 font-bold font-mono">/ {sub.maxScore}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Visual Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-indigo-950 border border-slate-900 rounded-xl p-5 text-white shadow-md lg:sticky lg:top-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                <h4 className="font-bold text-slate-300 text-xs">مجموع درجاتك التقديري</h4>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80 font-bold">
                  {selectedBranch === 'science_bio' ? 'علمي علوم' : selectedBranch === 'science_math' ? 'علمي رياضة' : 'أدبي'}
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">الدرجات الفعلية الحاصل عليها</div>
                    <div className="text-2xl sm:text-3xl font-black mt-1 font-mono">
                      {detailedSummary.total} <span className="text-xs font-normal text-slate-400">/ 410</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">النسبة المئوية</div>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-300 mt-1 font-mono">
                      {detailedSummary.percentage}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (detailedSummary.total / 410) * 100)}%` }}
                  />
                </div>

                {/* Alert regarding failure subjects if any */}
                {detailedSummary.failures > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3 flex gap-2 text-xs text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-semibold">
                      تنبيه: لقد حصلت على درجة أقل من النهاية الصغرى في عدد ({detailedSummary.failures}) من المواد. قد يتطلب هذا مراجعة أو تظلم.
                    </span>
                  </div>
                )}

                {/* Apply buttons */}
                {detailedSummary.total > 0 && (
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <button
                      id="apply-to-tansik-btn"
                      onClick={handleApplyToTansik}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-xs shadow-md transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>عرض الكليات المتاحة لهذا المجموع</span>
                    </button>
                    <p className="text-[9px] text-slate-400 text-center">اضغط على الزر لنقل النسبة التقديرية مباشرة إلى صفحة "توقعات التنسيق"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg font-black text-slate-950">حاسبة النسبة المئوية السريعة</h3>
            <p className="text-xs text-slate-500 mt-1">ادخل مجموع الدرجات والكل لتكتشف النسبة المئوية فورياً مع التقدير العام المقابل</p>
          </div>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleQuickCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 p-5 rounded-xl mb-6">
              <div>
                <label htmlFor="obtained-score" className="block text-xs font-bold text-slate-700 mb-1.5">المجموع الحاصل عليه الطالب:</label>
                <input
                  id="obtained-score"
                  type="text"
                  required
                  placeholder="مثال: 250"
                  value={quickStudentScore}
                  onChange={(e) => {
                    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
                      setQuickStudentScore(e.target.value);
                    }
                  }}
                  className="w-full bg-white border border-slate-250 rounded px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label htmlFor="total-score-limit" className="block text-xs font-bold text-slate-700 mb-1.5">المجموع الكلي للمواد:</label>
                <input
                  id="total-score-limit"
                  type="text"
                  required
                  placeholder="مثال: 410 للثانوية العامة أو الأزهر"
                  value={quickMaxScore}
                  onChange={(e) => {
                    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
                      setQuickMaxScore(e.target.value);
                    }
                  }}
                  className="w-full bg-white border border-slate-250 rounded px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                />
              </div>

              <button
                id="quick-calculate-btn"
                type="submit"
                className="sm:col-span-2 w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-2 px-4 rounded text-xs shadow-xs transition duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="w-4 h-4 text-indigo-400" />
                <span>احسب النسبة المئوية التقديرية</span>
              </button>
            </form>

            {/* Quick Result Screen */}
            {quickResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50/50 border border-indigo-150 rounded-xl p-5 text-center shadow-xs"
              >
                <div className="inline-flex items-center justify-center bg-white border border-slate-200 rounded p-4 shadow-xs mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 font-medium">النسبة المئوية المقابلة هي:</div>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-650 mt-1 font-mono tracking-tight">
                      {quickResult.percentage}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-indigo-905 text-xs font-bold max-w-sm mx-auto">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    <span>التقدير العام المتوقع: <span className="font-black text-slate-800">{quickResult.grade}</span></span>
                  </div>
                </div>

                {quickResult.percentage > 0 && (
                  <button
                    id="apply-quick-to-tansik-btn"
                    onClick={handleApplyQuickToTansik}
                    className="mt-5 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>تطبيق هذه النسبة في توقعات التنسيق</span>
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
