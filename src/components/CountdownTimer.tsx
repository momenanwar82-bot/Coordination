import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

interface ExamCountdown {
  id: string;
  name: string;
  targetDate: Date;
  statusText: string;
  isReleased: boolean;
  releasedText: string;
}

const examTimers: ExamCountdown[] = [
  {
    id: 'thanawya',
    name: 'الثانوية العامة (الصف الثالث الثانوي)',
    targetDate: new Date('2026-07-28T12:00:00'),
    statusText: 'جاري الانتهاء من تصحيح العينات العشوائية ورصد الدرجات.',
    isReleased: false,
    releasedText: ''
  },
  {
    id: 'diploma',
    name: 'الدبلومات الفنية (صناعي، تجاري، زراعي، فندقي)',
    targetDate: new Date('2026-07-15T11:00:00'),
    statusText: 'اعتمدت وزارة التربية والتعليم نتيجة الدبلومات الفنية بنسبة نجاح مشرفة.',
    isReleased: true,
    releasedText: 'ظهرت الآن رسمياً! تم اعتماد وإعلان نتائج الدبلومات الفنية لكافة التخصصات (الصناعية، التجارية، الزراعية، والفندقية). ابدأ فوراً بترتيب رغباتك الذكية.'
  },
  {
    id: 'azhar',
    name: 'الثانوية الأزهرية (شعبة علمي وأدبي)',
    targetDate: new Date('2026-07-22T10:00:00'),
    statusText: 'جاري البدء في رصد درجات المواد الشرعية والعربية.',
    isReleased: false,
    releasedText: ''
  }
];

export default function CountdownTimer() {
  const [activeExamId, setActiveExamId] = useState<string>('thanawya');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  const activeExam = examTimers.find(exam => exam.id === activeExamId) || examTimers[0];
  const targetTime = activeExam.targetDate.getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetTime - +new Date();
      let calculatedTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isOver: true
      };

      if (difference > 0) {
        calculatedTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isOver: false
        };
      }
      setTimeLeft(calculatedTime);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div id="countdown-timer-section" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>العداد التنازلي لإعلان النتائج</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">اختر المرحلة الدراسية لمتابعة الوقت المتبقي لظهور النتيجة رسمياً</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {examTimers.map((exam) => (
            <button
              key={exam.id}
              id={`exam-tab-${exam.id}`}
              onClick={() => setActiveExamId(exam.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeExamId === exam.id
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {exam.id === 'thanawya' ? 'الثانوية العامة' :
               exam.id === 'diploma' ? 'الدبلومات الفنية' : 'الأزهر الشريف'}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeExamId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {activeExam.isReleased ? (
            <div className="col-span-12 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent rounded-xl border border-emerald-200/80 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-right">
                <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>النتيجة ظهرت رسمياً! 🥳</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-1">
                  <span className="text-emerald-600 font-extrabold text-xl">✓</span>
                  <span>{activeExam.name}</span>
                </h3>
                <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-2xl">
                  {activeExam.releasedText}
                </p>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                  <AlertCircle className="w-4 h-4 text-emerald-600" />
                  <span>{activeExam.statusText}</span>
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                <a
                  href="https://tansik.digital.gov.eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-lg transition-all duration-300 text-center shadow-xs flex items-center justify-center gap-2"
                >
                  <span>رابط بوابة التنسيق المعتمدة</span>
                  <span className="text-xs">↗</span>
                </a>
                <div className="text-[10px] text-center text-slate-400 font-medium">الاستعلام الرسمي برقم الجلوس</div>
              </div>
            </div>
          ) : (
            <>
              {/* Main Countdown Cards */}
              <div className="lg:col-span-8 grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: 'أيام', value: timeLeft.days, color: 'from-indigo-600 to-blue-600' },
                  { label: 'ساعات', value: timeLeft.hours, color: 'from-indigo-600 to-blue-600' },
                  { label: 'دقائق', value: timeLeft.minutes, color: 'from-indigo-600 to-blue-600' },
                  { label: 'ثواني', value: timeLeft.seconds, color: 'from-amber-500 to-orange-500' }
                ].map((unit, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-lg p-3 sm:p-5 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group shadow-xs"
                  >
                    <div className="text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-slate-900 tabular-nums">
                      {padZero(unit.value)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-slate-500 mt-2">{unit.label}</div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${unit.color} opacity-80`} />
                  </div>
                ))}
              </div>

              {/* Details / Status Card */}
              <div className="lg:col-span-4 bg-indigo-50/50 rounded-lg border border-indigo-100 p-5">
                <h3 className="font-bold text-indigo-900 text-sm sm:text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>{activeExam.name}</span>
                </h3>
                
                <div className="mt-3 text-xs sm:text-sm text-indigo-950 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-900 shrink-0">تاريخ الإعلان المتوقع:</span>
                    <span className="text-indigo-700 font-bold">
                      {activeExam.targetDate.toLocaleDateString('ar-EG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} (الساعة {activeExam.targetDate.getHours()}:00)
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-indigo-100/60 flex items-start gap-2 text-indigo-800 text-xs leading-relaxed">
                    <AlertCircle className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{activeExam.statusText}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
