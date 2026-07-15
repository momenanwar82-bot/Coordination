import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Eye, EyeOff, Check, AlertTriangle, HelpCircle, X, Sparkles, ShieldCheck } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey, hasGeminiApiKey } from '../lib/gemini';

export default function ApiKeyManager() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    const key = getGeminiApiKey() || '';
    setApiKey(key);
    setIsConfigured(hasGeminiApiKey());

    // Listen for a global event to open the API key manager
    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-api-key-manager', handleOpenEvent);
    return () => {
      window.removeEventListener('open-api-key-manager', handleOpenEvent);
    };
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKey);
    const isValid = hasGeminiApiKey();
    setIsConfigured(isValid);
    setIsSaved(true);
    
    // Dispatch a storage/key update event to let other components know
    window.dispatchEvent(new Event('gemini-key-updated'));

    setTimeout(() => {
      setIsSaved(false);
      if (isValid) {
        setIsOpen(false);
      }
    }, 2000);
  };

  const handleClear = () => {
    setApiKey('');
    setGeminiApiKey('');
    setIsConfigured(false);
    window.dispatchEvent(new Event('gemini-key-updated'));
  };

  return (
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all duration-300 shadow-sm border cursor-pointer ${
          isConfigured
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 animate-pulse'
        }`}
      >
        <Key className={`w-3.5 h-3.5 ${!isConfigured ? 'animate-bounce' : ''}`} />
        <span>{isConfigured ? 'مفتاح الذكاء الاصطناعي نشط' : 'اضبط مفتاح الذكاء الاصطناعي'}</span>
        <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
      </button>

      {/* Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div 
              className="fixed inset-0 bg-transparent z-40" 
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-3 w-80 md:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 text-right"
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-1.5 text-slate-100 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>إعدادات مفتاح Gemini API للذكاء الاصطناعي</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                بما أن هذا الموقع يعمل كصفحة ساكنة (Static App) لتجنب استهلاك خوادمنا، يرجى تزويد مفتاح API الخاص بك لتشغيل مستشار ومحاكي التنسيق الذكي. يتم تخزين المفتاح بشكل آمن بالكامل داخل متصفحك (LocalStorage) ولا يُرسل لأي خادم خارجي سوى خادم Google مباشرةً.
              </p>

              <form onSubmit={handleSave} className="space-y-3">
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-3 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-600 text-left"
                    dir="ltr"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute left-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1">
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline flex items-center gap-0.5"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>احصل على مفتاح مجاني من Google</span>
                    </a>
                  </div>
                  
                  <div className="flex gap-2">
                    {apiKey && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition cursor-pointer border border-red-500/20"
                      >
                        حذف المفتاح
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 shadow-md"
                    >
                      {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{isSaved ? 'تم الحفظ!' : 'حفظ المفتاح'}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Secure Info Alert */}
              <div className="mt-3 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-emerald-400 leading-normal">
                  بياناتك محمية ومحفوظة محلياً 100%. يمكنك مراجعة الكود البرمجي المفتوح للموقع على جيت هاب للتأكد من أمان تعاملات الـ API.
                </p>
              </div>

              {!isConfigured && (
                <div className="mt-2 p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-400 leading-normal">
                    تحذير: لن تعمل ميزات المستشار الذكي أو الترتيب الآلي للرغبات بدون إدخال هذا المفتاح.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
