import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Award, DollarSign, ListOrdered, ChevronDown, Check, HelpCircle, Building2, BookOpen, ExternalLink, MessageSquare } from 'lucide-react';
import { GRIEVANCE_STEPS, UNIVERSITY_FEES, TANSIK_STEPS } from '../data';
import StudentCommunity from './StudentCommunity';

interface GuidesProps {
  onNavigate?: (tab: 'home' | 'results' | 'tools' | 'guides') => void;
}

export default function Guides({ onNavigate }: GuidesProps) {
  const [activeSubSection, setActiveSubSection] = useState<'grievance' | 'tansik' | 'fees' | 'community'>('tansik');
  
  // Grievance FAQ toggler state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // University Fees filter state
  const [searchUniv, setSearchUniv] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredUniversities = UNIVERSITY_FEES.filter((univ) => {
    const matchesSearch = univ.university.toLowerCase().includes(searchUniv.toLowerCase()) ||
                          univ.faculties.some(f => f.name.toLowerCase().includes(searchUniv.toLowerCase()));
    const matchesType = filterType === 'all' || univ.type === filterType;
    return matchesSearch && matchesType;
  });

  const faqs = [
    {
      q: 'هل يمكنني استرداد قيمة التظلم في حال حصولي على درجات إضافية؟',
      a: 'نعم، في حال ثبت حق الطالب في أي درجات إضافية وتم تعديل النتيجة العامة، يسترد الطالب فوراً مبلغ الـ 200 جنيه التي سددها عن تلك المادة بشكل رسمي من خلال حوالة بريدية أو رصيد بنكي.'
    },
    {
      q: 'ما هي الأماكن التي أذهب إليها للاطلاع على ورقة إجابتي؟',
      a: 'يتم تحديد المقار واللجان الفرعية للاطلاع إلكترونياً عند تقديم الطلب، وعادة ما تكون في المديريات التعليمية المركزية بكل محافظة لتسهيل الوصول على أولياء الأمور والطلبة.'
    },
    {
      q: 'هل يُسمح لمدرس المادة بالحضور معي أثناء الاطلاع على البابل شيت؟',
      a: 'يُمنع منعاً باتاً اصطحاب أي معلم للمادة، ويقتصر الحضور فقط على الطالب ومعه ولي أمره (الأب أو الأم) بموجب إبراز بطاقة الرقم القومي ورقم الجلوس وصور منهما.'
    }
  ];

  return (
    <div id="guides-section" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6">
      {/* Sub tabs inside guides */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 bg-slate-50 p-1 rounded-lg border border-slate-200 max-w-3xl mx-auto">
        {[
          { id: 'tansik', label: 'خطوات التقديم الإلكتروني', icon: <ListOrdered className="w-4 h-4 text-indigo-600" /> },
          { id: 'grievance', label: 'شرح وإجراءات التظلمات', icon: <FileText className="w-4 h-4 text-indigo-600" /> },
          { id: 'fees', label: 'مصروفات الجامعات الأهلية والخاصة', icon: <DollarSign className="w-4 h-4 text-indigo-600" /> },
          { id: 'community', label: 'ركن الاستفسارات والمجتمع', icon: <MessageSquare className="w-4 h-4 text-indigo-600" /> }
        ].map((item) => (
          <button
            key={item.id}
            id={`guides-subtab-${item.id}`}
            onClick={() => setActiveSubSection(item.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeSubSection === item.id
                ? 'bg-white text-indigo-650 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* SECTION 1: TANSIK STEPS */}
        {activeSubSection === 'tansik' && (
          <motion.div
            key="tansik"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-slate-950">خطوات تسجيل الرغبات والتقديم في الكليات والمعاهد</h3>
              <p className="text-xs text-slate-500 mt-1">تتبع المسار الصحيح الموصى به رسمياً لتسجيل اختياراتك (75 رغبة) عبر بوابة التنسيق دون أخطاء</p>
            </div>

            {/* Vertical timeline */}
            <div className="relative border-r-2 border-slate-150 mr-4 md:mr-8 space-y-6 py-2">
              {TANSIK_STEPS.map((step, index) => (
                <div key={step.id} className="relative pr-8 md:pr-10">
                  {/* Number bubble */}
                  <div className="absolute top-0 -right-[13px] bg-indigo-900 border-4 border-slate-100 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black font-mono">
                    {index + 1}
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded p-4 hover:border-slate-300 transition">
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Official Tansik Portal link card */}
            <div className="mt-6 bg-indigo-50 rounded-xl p-4.5 border border-indigo-150 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-indigo-600 animate-pulse" />
                  <span>بوابة التنسيق الإلكتروني الرسمية</span>
                </h4>
                <p className="text-xs text-indigo-700">موقع وزارة التعليم العالي والبحث العلمي وبوابة الحكومة المصرية لتسجيل الرغبات.</p>
              </div>
              <a
                href="https://tansik.digital.gov.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition duration-300 shadow-sm shrink-0"
              >
                زيارة موقع التنسيق
              </a>
            </div>

            {onNavigate && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700">هل عرفت خطوات التنسيق وتريد حساب مجموعك ومعرفة توقعات القبول؟</span>
                <button
                  id="guide-to-tools-btn"
                  onClick={() => onNavigate('tools')}
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs rounded transition shadow-xs cursor-pointer shrink-0"
                >
                  انتقل إلى حاسبة ومحاكي التنسيق
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* SECTION 2: GRIEVANCES STEPS */}
        {activeSubSection === 'grievance' && (
          <motion.div
            key="grievance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-slate-950">دليل وإجراءات التظلم من نتائج الامتحانات</h3>
              <p className="text-xs text-slate-500 mt-1">إذا كنت تشعر بوجود رصد خاطئ أو عدم احتساب أي إجابات، فإليك خطوات تقديم التظلم بالتفصيل</p>
            </div>

            {/* Horizontal or compact box layout for grievance */}
            <div className="space-y-3.5 mb-6">
              {GRIEVANCE_STEPS.map((item) => (
                <div key={item.step} className="bg-white border border-slate-200 rounded p-4 hover:shadow-xs transition duration-300 flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-700 rounded w-8 h-8 flex items-center justify-center font-black font-mono shrink-0 text-xs border border-indigo-100">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs about grievances */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-3.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>الأسئلة الأكثر شيوعاً حول التظلمات</span>
              </h4>

              <div className="space-y-2.5">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-200 rounded overflow-hidden">
                    <button
                      id={`faq-btn-${index}`}
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full bg-slate-50/80 hover:bg-slate-50 text-right p-3.5 font-bold text-xs text-indigo-955 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 bg-white border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION 3: UNIVERSITY FEES */}
        {activeSubSection === 'fees' && (
          <motion.div
            key="fees"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-slate-950">مصروفات الجامعات الأهلية والخاصة المعتمدة</h3>
              <p className="text-xs text-slate-500 mt-1">دليل شامل ورسمي لرسوم الالتحاق السنوية بأبرز الكليات والتخصصات المتاحة للطلاب لعام 2026</p>
            </div>

            {/* University list filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="w-full sm:flex-1">
                <input
                  id="fees-univ-search"
                  type="text"
                  placeholder="ابحث عن جامعة أو تخصص متاح..."
                  value={searchUniv}
                  onChange={(e) => setSearchUniv(e.target.value)}
                  className="w-full bg-white border border-slate-250 rounded px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  id="fees-univ-type-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-white border border-slate-250 rounded px-3 py-1.5 text-xs font-bold text-slate-755 focus:outline-none"
                >
                  <option value="all">كل الأنواع</option>
                  <option value="ahlia">الجامعات الأهلية</option>
                  <option value="private">الجامعات الخاصة</option>
                  <option value="foreign">أفرع جامعات أجنبية</option>
                </select>
              </div>
            </div>

            {/* Universities Cards Container */}
            <div className="space-y-4">
              {filteredUniversities.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-3 mb-3 gap-2">
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <Building2 className="w-4.5 h-4.5 text-indigo-600" />
                      <span>{item.university}</span>
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold border max-w-fit ${
                      item.type === 'ahlia' ? 'bg-indigo-50 text-indigo-700 border-indigo-150' :
                      item.type === 'private' ? 'bg-blue-50 text-blue-700 border-blue-150' :
                      'bg-amber-50 text-amber-700 border-amber-150'
                    }`}>
                      {item.type === 'ahlia' ? 'جامعة أهلية حكومية' : item.type === 'private' ? 'جامعة خاصة' : 'أفرع جامعة أجنبية'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {item.faculties.map((f, fIdx) => (
                      <div key={fIdx} className="bg-slate-50/80 p-2.5 rounded border border-slate-150 hover:border-slate-205 transition flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-800 text-xs">{f.name}</span>
                        <span className="text-[10px] font-black text-indigo-650 font-mono whitespace-nowrap">{f.fees}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredUniversities.length === 0 && (
                <div className="text-center py-10 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-600 text-xs">لم نعثر على جامعات مطابقة للبحث</h4>
                  <p className="text-xs text-slate-400 mt-1">تأكد من كتابة الاسم بالشكل الصحيح أو تغيير الفلاتر المحددة.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SECTION 4: COMMUNITY & Q&A */}
        {activeSubSection === 'community' && (
          <motion.div
            key="community"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StudentCommunity />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
