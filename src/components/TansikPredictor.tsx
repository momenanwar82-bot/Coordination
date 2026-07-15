import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Filter, CheckCircle2, AlertCircle, XCircle, ChevronRight, HelpCircle, GraduationCap } from 'lucide-react';
import { PREDICTED_COLLEGES, UNIVERSITY_FEES } from '../data';
import { UniversityCollege } from '../types';

interface TansikPredictorProps {
  initialPercentage: number;
  onClearInitialPercentage: () => void;
  onNavigate?: (tab: 'home' | 'results' | 'tools' | 'guides') => void;
}

export default function TansikPredictor({ initialPercentage, onClearInitialPercentage, onNavigate }: TansikPredictorProps) {
  const [percentageInput, setPercentageInput] = useState<string>(
    initialPercentage > 0 ? initialPercentage.toString() : '85'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentPercentage = parseFloat(percentageInput) || 0;

  // Sync state if initialPercentage changed from parent
  React.useEffect(() => {
    if (initialPercentage > 0) {
      setPercentageInput(initialPercentage.toString());
    }
  }, [initialPercentage]);

  const handlePercentageChange = (val: string) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      const num = parseFloat(val);
      if (num > 100) return;
      setPercentageInput(val);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentageInput(e.target.value);
  };

  const filteredColleges = PREDICTED_COLLEGES.filter((col) => {
    const matchesCategory = selectedCategory === 'all' || col.category === selectedCategory;
    const matchesType = selectedType === 'all' || col.type === selectedType;
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          col.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  // Check eligibility status
  const getEligibility = (colPercentage: number, studentPercentage: number) => {
    if (studentPercentage >= colPercentage) {
      return {
        label: 'مؤهل للقبول',
        style: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        badgeColor: 'bg-indigo-500',
        icon: <CheckCircle2 className="w-4 h-4 text-indigo-600" />
      };
    } else if (colPercentage - studentPercentage <= 1.5) {
      return {
        label: 'فرصة محتملة',
        style: 'bg-amber-50 text-amber-700 border-amber-200',
        badgeColor: 'bg-amber-500',
        icon: <Sparkles className="w-4 h-4 text-amber-500" />
      };
    } else {
      return {
        label: 'أقل من التقدير',
        style: 'bg-slate-50 text-slate-500 border-slate-200',
        badgeColor: 'bg-slate-400',
        icon: <XCircle className="w-4 h-4 text-slate-400" />
      };
    }
  };

  return (
    <div id="tansik-predictor-section" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl font-black text-slate-950 flex items-center justify-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span>توقعات ومؤشرات التنسيق الجامعي</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          اكتشف الكليات التي يمكنك الالتحاق بها بناءً على مجموعك التقديري وقواعد التنسيق التاريخية.
        </p>
      </div>

      {initialPercentage > 0 && (
        <div className="bg-indigo-50 border border-indigo-150 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-indigo-950">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 animate-pulse" />
            <span>تم استيراد النسبة المئوية المحسوبة بنجاح: <span className="font-extrabold text-indigo-700">{initialPercentage}%</span></span>
          </div>
          <button
            id="clear-initial-pct-btn"
            onClick={onClearInitialPercentage}
            className="text-xs text-slate-400 hover:text-slate-600 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>إعادة تعيين</span>
          </button>
        </div>
      )}

      {/* Inputs Header Dashboard */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-6">
        {/* Percentage Input Form */}
        <div className="md:col-span-5 space-y-2.5">
          <label htmlFor="percentage-box-input" className="block text-xs font-bold text-slate-700">أدخل النسبة المئوية الخاصة بك (%):</label>
          <div className="flex items-center gap-3">
            <input
              id="percentage-box-input"
              type="text"
              value={percentageInput}
              onChange={(e) => handlePercentageChange(e.target.value)}
              className="w-20 bg-white border border-slate-250 rounded px-2.5 py-2 text-center text-base font-black text-indigo-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
            />
            <div className="flex-1">
              <input
                id="percentage-slider-input"
                type="range"
                min="50"
                max="100"
                step="0.1"
                value={currentPercentage || 50}
                onChange={handleSliderChange}
                className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1 font-mono">
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Query */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="colleges-category-select" className="block text-xs font-bold text-slate-700 mb-1.5">نوع التخصص:</label>
            <select
              id="colleges-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-250 rounded px-3 py-2 text-xs font-bold text-slate-755 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none"
            >
              <option value="all">كل التخصصات</option>
              <option value="medical">الكليات الطبية والصيدلة</option>
              <option value="engineering">كليات الهندسة والحاسبات</option>
              <option value="scientific">كليات العلوم والرياضيات</option>
              <option value="humanities">الألسن والسياسة والإنسانيات</option>
            </select>
          </div>

          <div>
            <label htmlFor="colleges-search-input" className="block text-xs font-bold text-slate-700 mb-1.5">بحث باسم الكلية:</label>
            <div className="relative">
              <input
                id="colleges-search-input"
                type="text"
                placeholder="مثال: هندسة"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-250 rounded pr-4 pl-10 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* College Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredColleges.map((col) => {
            const elig = getEligibility(col.minPercentage, currentPercentage);
            return (
              <motion.div
                key={col.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-xl p-4.5 border border-slate-200 flex flex-col justify-between gap-3.5 hover:shadow-xs transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded font-bold">
                      {col.category === 'medical' ? 'طب وصيدلة' : col.category === 'engineering' ? 'هندسة وحاسبات' : col.category === 'scientific' ? 'علوم أساسية' : 'إنسانيات وألسن'}
                    </span>
                    
                    <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold border ${elig.style}`}>
                      {elig.icon}
                      <span>{elig.label}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{col.name}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{col.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1 text-xs">
                  <span className="text-slate-400 font-bold">{col.location || 'الحرم الجامعي الرئيسي'}</span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-450 text-[10px] font-medium">الحد الأدنى التقريبي:</span>
                    <span className="font-extrabold text-slate-800 text-sm">{col.minPercentage}%</span>
                  </div>
                </div>

                {/* Private/Ahlia Alternative suggestion if below threshold */}
                {elig.label === 'أقل من التقدير' && (
                  <div className="mt-2.5 p-3 bg-slate-50 rounded border border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed space-y-2">
                    <div className="flex items-start gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>
                        مجموعك أقل من القبول الحكومي، لكن يمكنك التقديم في <strong>الجامعات الأهلية والخاصة</strong> التي تقبل بحد أدنى أقل.
                      </span>
                    </div>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('guides')}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3 rounded text-[10px] transition cursor-pointer text-center"
                      >
                        عرض مصروفات الجامعات الأهلية والخاصة الآن
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredColleges.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-10 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <XCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700 text-xs sm:text-sm">لم نعثر على كليات مطابقة للبحث</h3>
            <p className="text-xs text-slate-400 mt-1">جرب استخدام فلاتر تصفية أخرى أو تعديل كلمة البحث.</p>
          </div>
        )}
      </div>
    </div>
  );
}
