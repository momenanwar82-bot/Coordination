import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Award, 
  DollarSign, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  Info,
  ShieldCheck,
  Percent,
  Bookmark
} from 'lucide-react';

interface UniversityOption {
  id: string;
  name: string;
  type: 'ahlia' | 'private' | 'technological' | 'foreign';
  location: string;
  description: string;
  faculties: {
    name: string;
    fees: number; // in EGP
    minPct: number;
    hasScholarships: boolean;
  }[];
}

const UNIVERSITIES_DATABASE: UniversityOption[] = [
  {
    id: 'galala',
    name: 'جامعة الجلالة الأهلية (Galala University)',
    type: 'ahlia',
    location: 'هضبة الجلالة، السويس',
    description: 'واحدة من أحدث الجامعات الأهلية الدولية بمصر، تضم برامج دراسية مزدوجة مع جامعات أجنبية كبرى ومصروفات مدعومة نسبياً.',
    faculties: [
      { name: 'الطب البشري', fees: 120000, minPct: 75, hasScholarships: true },
      { name: 'طب الأسنان', fees: 107000, minPct: 73, hasScholarships: true },
      { name: 'العلاج الطبيعي', fees: 69000, minPct: 71, hasScholarships: false },
      { name: 'الصيدلة الإكلينيكية', fees: 85000, minPct: 70, hasScholarships: true },
      { name: 'هندسة الحاسب والذكاء الاصطناعي', fees: 69000, minPct: 65, hasScholarships: true },
      { name: 'إدارة الأعمال الدولية', fees: 46000, minPct: 55, hasScholarships: false }
    ]
  },
  {
    id: 'king_salman',
    name: 'جامعة الملك سلمان الدولية (KSUI)',
    type: 'ahlia',
    location: 'شرم الشيخ، الطور، راس سدر',
    description: 'جامعة أهلية متميزة في جنوب سيناء تقدم برامج متقدمة في الذكاء الاصطناعي، السياحة، العمارة، والعلوم الزراعية الحديثة.',
    faculties: [
      { name: 'الطب البشري', fees: 115000, minPct: 75, hasScholarships: true },
      { name: 'طب الأسنان', fees: 105000, minPct: 73, hasScholarships: true },
      { name: 'الصيدلة', fees: 85000, minPct: 70, hasScholarships: true },
      { name: 'علوم وهندسة الحاسب', fees: 69000, minPct: 65, hasScholarships: true },
      { name: 'الألسن واللغات التطبيقية', fees: 43000, minPct: 55, hasScholarships: false }
    ]
  },
  {
    id: 'alamein',
    name: 'جامعة العلمين الدولية (AIU)',
    type: 'ahlia',
    location: 'مدينة العلمين الجديدة',
    description: 'تعتمد أحدث نظم الذكاء التعليمي وتوفر منح تفوق دراسي كبرى لأوائل المحافظات والثانوية العامة.',
    faculties: [
      { name: 'الطب البشري', fees: 130000, minPct: 75, hasScholarships: true },
      { name: 'طب الأسنان', fees: 110000, minPct: 73, hasScholarships: true },
      { name: 'الصيدلة', fees: 95000, minPct: 70, hasScholarships: true },
      { name: 'الهندسة (تخصصات هندسية متقدمة)', fees: 75000, minPct: 66, hasScholarships: true },
      { name: 'الفنون التصميمية', fees: 55000, minPct: 55, hasScholarships: false }
    ]
  },
  {
    id: 'must',
    name: 'جامعة مصر للعلوم والتكنولوجيا (MUST)',
    type: 'private',
    location: '6 أكتوبر، الجيزة',
    description: 'من عراقة الجامعات الخاصة في مصر، مع مستشفى جامعي ضخم وشراكات أكاديمية عالمية.',
    faculties: [
      { name: 'الطب البشري', fees: 155000, minPct: 80, hasScholarships: true },
      { name: 'طب الأسنان', fees: 145000, minPct: 78, hasScholarships: true },
      { name: 'العلاج الطبيعي', fees: 95000, minPct: 74, hasScholarships: false },
      { name: 'الصيدلة', fees: 90000, minPct: 72, hasScholarships: true },
      { name: 'الهندسة والتكنولوجيا', fees: 70000, minPct: 68, hasScholarships: false }
    ]
  },
  {
    id: 'msa',
    name: 'جامعة أكتوبر للعلوم الحديثة والآداب (MSA)',
    type: 'private',
    location: '6 أكتوبر، الجيزة',
    description: 'تمنح شهادة مزدوجة بريطانية ومصرية معتمدة تتيح للخريجين فرص عمل فورية دولياً ومحلياً.',
    faculties: [
      { name: 'الطب البشري', fees: 170000, minPct: 80, hasScholarships: false },
      { name: 'طب الأسنان', fees: 154000, minPct: 78, hasScholarships: true },
      { name: 'الصيدلة والتصنيع الدوائي', fees: 98000, minPct: 72, hasScholarships: true },
      { name: 'علوم الحاسب', fees: 70000, minPct: 68, hasScholarships: false },
      { name: 'اللغات والترجمة', fees: 45000, minPct: 55, hasScholarships: false }
    ]
  },
  {
    id: 'new_cairo_tech',
    name: 'جامعة القاهرة الجديدة التكنولوجية',
    type: 'technological',
    location: 'التجمع الخامس، القاهرة',
    description: 'تستهدف خريجي الدبلومات الفنية (صناعي) والثانوية العامة ببرامج تكنولوجية تطبيقية مرتبطة بسوق العمل المباشر.',
    faculties: [
      { name: 'تكنولوجيا الأوتوترونكس والسيارات', fees: 35000, minPct: 60, hasScholarships: true },
      { name: 'تكنولوجيا الطاقة الجديدة والمتجددة', fees: 35000, minPct: 60, hasScholarships: true },
      { name: 'تكنولوجيا المعلومات (IT)', fees: 38000, minPct: 65, hasScholarships: true },
      { name: 'تكنولوجيا الميكاترونكس', fees: 35000, minPct: 60, hasScholarships: true }
    ]
  }
];

export default function ScholarshipsComparator() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(200000);
  const [onlyScholarships, setOnlyScholarships] = useState<boolean>(false);

  const filteredUniversities = UNIVERSITIES_DATABASE.map(univ => {
    const filteredFaculties = univ.faculties.filter(fac => {
      const matchBudget = fac.fees <= maxBudget;
      const matchScholarship = !onlyScholarships || fac.hasScholarships;
      return matchBudget && matchScholarship;
    });
    return {
      ...univ,
      filteredFaculties
    };
  }).filter(univ => {
    const matchType = selectedType === 'all' || univ.type === selectedType;
    const matchSearch = univ.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        univ.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        univ.filteredFaculties.length > 0;
    return matchType && matchSearch && univ.filteredFaculties.length > 0;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8" dir="rtl">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
          <span>مقارنة المصروفات والمنح الدراسية المعتمدة</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          دليل الجامعات الأهلية والخاصة والتكنولوجية والمنح المتاحة
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          قارن بين مصروفات الكليات في الجامعات الأهلية والخاصة والتكنولوجية، وابحث عن المنح الجزئية والكاملة المتاحة للطلاب المتفوقين.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">ابحث باسم الجامعة أو الكلية:</label>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="مثال: الجلالة، طب، حاسبات..."
              className="w-full bg-white border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* University Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">نوع الجامعة:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">كافة الأنواع (أهلية وخاصة وتكنولوجية)</option>
            <option value="ahlia">الجامعات الأهلية (مدعومة)</option>
            <option value="private">الجامعات الخاصة</option>
            <option value="technological">الجامعات التكنولوجية (للدبلومات والعام)</option>
          </select>
        </div>

        {/* Max Budget Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-slate-700">الحد الأقصى للمصروفات:</label>
            <span className="font-mono text-xs font-bold text-emerald-700">{maxBudget.toLocaleString()} ج.م</span>
          </div>
          <input
            type="range"
            min="30000"
            max="200000"
            step="10000"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Scholarships Toggle */}
        <div className="flex flex-col justify-end h-full pt-1">
          <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={onlyScholarships}
              onChange={(e) => setOnlyScholarships(e.target.checked)}
              className="accent-emerald-600 w-4 h-4 rounded cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>الكليات التي توفر منحاً دراسية فقط</span>
            </span>
          </label>
        </div>
      </div>

      {/* Universities & Faculties Grid */}
      <div className="space-y-6">
        {filteredUniversities.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">لا توجد نتائج تطابق شروط البحث أو الميزانية المحددة</h4>
            <p className="text-xs text-slate-500 mt-1">جرب زيادة الحد الأقصى للمصروفات أو إعادة تعيين فلاتر أخرى.</p>
          </div>
        ) : (
          filteredUniversities.map((univ) => (
            <motion.div
              key={univ.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-300 transition"
            >
              {/* University Header */}
              <div className="bg-slate-900 text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      univ.type === 'ahlia' ? 'bg-indigo-600 text-white' :
                      univ.type === 'private' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {univ.type === 'ahlia' ? 'جامعة أهلية' : univ.type === 'private' ? 'جامعة خاصة' : 'جامعة تكنولوجية'}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{univ.location}</span>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">{univ.name}</h3>
                  <p className="text-xs text-slate-300 max-w-2xl">{univ.description}</p>
                </div>
              </div>

              {/* Faculties Cards */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
                {univ.filteredFaculties.map((fac, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between space-y-3 shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-black text-slate-900 text-xs sm:text-sm">{fac.name}</h4>
                        {fac.hasScholarships && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>يوجد منح</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>الحد الأدنى للقبول:</span>
                        <span className="font-mono font-bold text-slate-800">{fac.minPct}%</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">المصروفات السنوية:</span>
                      <span className="font-mono font-black text-sm text-emerald-700">{fac.fees.toLocaleString()} ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
