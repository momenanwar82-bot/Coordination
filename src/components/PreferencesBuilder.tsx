import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Building2,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { PREDICTED_COLLEGES } from '../data';
import { UniversityCollege } from '../types';

interface PreferencesBuilderProps {
  initialPercentage?: number;
}

interface PreferenceItem {
  id: string;
  collegeName: string;
  category: string;
  minPercentage: number;
  location: string;
  type: string;
}

export default function PreferencesBuilder({ initialPercentage = 85 }: PreferencesBuilderProps) {
  const [studentScore, setStudentScore] = useState<number>(initialPercentage > 0 ? initialPercentage : 85);
  const [governorate, setGovernorate] = useState<string>('القاهرة الكبرى');
  const [preferences, setPreferences] = useState<PreferenceItem[]>([
    { id: '1', collegeName: 'كلية الطب البشري - جامعة القاهرة', category: 'medical', minPercentage: 91.3, location: 'المنيل، القاهرة', type: 'public' },
    { id: '2', collegeName: 'كلية طب الفم والأسنان - جامعة عين شمس', category: 'medical', minPercentage: 90.8, location: 'العباسية، القاهرة', type: 'public' },
    { id: '3', collegeName: 'كلية الصيدلة - جامعة القاهرة', category: 'medical', minPercentage: 89.8, location: 'القصر العيني، القاهرة', type: 'public' },
    { id: '4', collegeName: 'كلية الهندسة - جامعة القاهرة', category: 'engineering', minPercentage: 85.1, location: 'الجيزة', type: 'public' },
    { id: '5', collegeName: 'كلية الحاسبات والمعلومات - جامعة عين شمس', category: 'engineering', minPercentage: 81.5, location: 'العباسية، القاهرة', type: 'public' }
  ]);

  const [selectedCollegeToAdd, setSelectedCollegeToAdd] = useState<string>(PREDICTED_COLLEGES[0]?.id || '');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((current) => current === message ? null : current);
    }, 4000);
  };

  // Add preference
  const handleAddPreference = () => {
    if (preferences.length >= 60) {
      showNotification('لقد وصلت الحد الأقصى للرغبات (60 رغبة)');
      return;
    }
    const found = PREDICTED_COLLEGES.find(c => c.id === selectedCollegeToAdd);
    if (found) {
      // Check if already in preferences
      if (preferences.some(p => p.collegeName === found.name)) {
        showNotification('هذه الكلية مضافة مسبقاً في رغباتك');
        return;
      }
      setPreferences([
        ...preferences,
        {
          id: Date.now().toString(),
          collegeName: found.name,
          category: found.category,
          minPercentage: found.minPercentage,
          location: found.location || 'جغرافي عام',
          type: found.type
        }
      ]);
      showNotification(`تمت إضافة "${found.name}" لرغباتك بنجاح!`);
    }
  };

  // Move preference up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newPrefs = [...preferences];
    const temp = newPrefs[index];
    newPrefs[index] = newPrefs[index - 1];
    newPrefs[index - 1] = temp;
    setPreferences(newPrefs);
  };

  // Move preference down
  const handleMoveDown = (index: number) => {
    if (index === preferences.length - 1) return;
    const newPrefs = [...preferences];
    const temp = newPrefs[index];
    newPrefs[index] = newPrefs[index + 1];
    newPrefs[index + 1] = temp;
    setPreferences(newPrefs);
  };

  // Remove preference
  const handleRemove = (id: string) => {
    setPreferences(preferences.filter(p => p.id !== id));
  };

  // Print form
  const handlePrintForm = () => {
    window.print();
  };

  // AI Optimizer Rules Analysis
  const warnings: { type: 'danger' | 'warning' | 'info'; text: string }[] = [];

  // Check 1: Score vs Top choices
  preferences.forEach((pref, index) => {
    if (pref.minPercentage > studentScore + 2) {
      warnings.push({
        type: 'danger',
        text: `الرغبة رقم (${index + 1}): "${pref.collegeName}" تحتاج حد أدنى (${pref.minPercentage}%) بينما مجموعك (${studentScore}%)، الفارق كبير وقد لا تتم الموافقة عليها في المراحل الأولى.`
      });
    }
  });

  // Check 2: Geographic Distribution (A)
  if (preferences.length > 0 && !preferences[0].location.includes('القاهرة') && !preferences[0].location.includes('الجيزة')) {
    warnings.push({
      type: 'warning',
      text: 'تنبيه التوزيع الجغرافي: يفضل أن تكون رغبتك الأولى من كليات النطاق الجغرافي (أ) الأقرب لمحافظتك قبل الانتقال للنطاق (ب).'
    });
  }

  if (preferences.length < 20) {
    warnings.push({
      type: 'info',
      text: `عدد رغباتك الحالي (${preferences.length}) رغبة. ينصح مكتب التنسيق باستيفاء كافة الرغبات المتاحة (60 رغبة) لتوزيع الفرص بدقة.`
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>محاكي ومرتب الرغبات الإلكتروني الذكي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            لوحة ترتيب وتنظيم الـ 60 رغبة الرسمية
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            رتب رغباتك حسب الأولوية والتوزيع الجغرافي، واحصِ التنبيهات الذكية لتجنب أخطاء موقع التنسيق الرسمي.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrintForm}
            className="bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة وتصدير الاستمارة (PDF)</span>
          </button>
        </div>
      </div>

      {/* Student Score & Governorate Config Panel */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">مجموعك الكلي أو النسبة المئوية:</label>
          <input
            type="number"
            value={studentScore}
            onChange={(e) => setStudentScore(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="مثال: 88.5"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">محافظة الإقامة (التوزيع الجغرافي):</label>
          <select
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="القاهرة الكبرى">القاهرة الكبرى (القاهرة، الجيزة، القليوبية)</option>
            <option value="الإسكندرية">الإسكندرية ومطروح وبحيرة</option>
            <option value="الدلتا">محافظات الدلتا (الغربية، المنوفية، الدقهلية)</option>
            <option value="الصعيد">محافظات الصعيد (أسيوط، سوهاج، قنا، أسوان)</option>
            <option value="قناة السويس">محافظات القناة (بورسعيد، الإسماعيلية، السويس)</option>
          </select>
        </div>

        <div className="bg-indigo-100/60 p-3.5 rounded-lg border border-indigo-200 text-xs text-indigo-900 flex flex-col justify-center">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>حالة الرغبات الحالية:</span>
          </div>
          <div className="mt-1 font-mono font-bold text-sm text-indigo-950">
            {preferences.length} / 60 رغبة مضافة
          </div>
        </div>
      </div>

      {/* Add Preference Widget */}
      <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-indigo-900 mb-1">اختر كلية لإضافتها لرغباتك:</label>
          <select
            value={selectedCollegeToAdd}
            onChange={(e) => setSelectedCollegeToAdd(e.target.value)}
            className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {PREDICTED_COLLEGES.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name} (حد أدنى: {col.minPercentage}%)
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddPreference}
          className="mt-5 sm:mt-0 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة إلى الرغبة التالية</span>
        </button>
      </div>

      {/* Smart Warnings & Optimizer Box */}
      {warnings.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>ملاحظات وتنبيهات الذكاء الاصطناعي لرغباتك:</span>
          </h4>
          <div className="space-y-2">
            {warnings.map((w, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg text-xs flex items-start gap-2.5 border ${
                  w.type === 'danger' 
                    ? 'bg-rose-50 text-rose-900 border-rose-200' 
                    : w.type === 'warning'
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-blue-50 text-blue-900 border-blue-200'
                }`}
              >
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences List (Drag / Reorder) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
          <span>قائمة الرغبات المرتبة (ترتيب تصاعدي من 1 إلى 60):</span>
          <span className="text-xs text-slate-400 font-mono">استخدم الأسهم لإعادة ترتيب الرغبات</span>
        </h3>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {preferences.map((pref, index) => (
            <motion.div
              key={pref.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-4 hover:border-indigo-300 transition shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{pref.collegeName}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 font-medium">
                    <span className="flex items-center gap-1 font-mono text-indigo-700">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>الحد الأدنى: {pref.minPercentage}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pref.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition cursor-pointer"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === preferences.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition cursor-pointer"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemove(pref.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                  title="حذف الرغبة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-indigo-900 text-white font-extrabold text-xs sm:text-sm p-4 rounded-xl shadow-2xl border border-indigo-500 z-50 flex items-center justify-between gap-3"
            dir="rtl"
          >
            <span>{notification}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-indigo-300 hover:text-white transition font-black text-xs shrink-0 cursor-pointer"
            >
              إغلاق
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
