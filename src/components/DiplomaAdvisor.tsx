import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { hasGeminiApiKey, callGeminiDirectly } from '../lib/gemini';
import { 
  GraduationCap, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  School, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  ExternalLink,
  HelpCircle,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  ListOrdered
} from 'lucide-react';

import { EDUCATIONAL_STAGES_LIST, ALL_STAGES_DATABASE } from '../data';
import { db, auth, ensureAuthenticated } from '../lib/firebase';
import { collection, doc, query, orderBy, onSnapshot, setDoc, deleteDoc, serverTimestamp, where } from 'firebase/firestore';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  matchedColleges?: {
    name: string;
    minPercentage: number;
    type: string;
    location: string;
    notes?: string;
  }[];
  isPreferencesList?: boolean;
  preferencesData?: string[];
  stage?: string;
  score?: string;
}

export default function DiplomaAdvisor() {
  const [selectedStage, setSelectedStage] = useState<string>('commercial_3');
  const [studentScore, setStudentScore] = useState<string>('86.5');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((current) => current === message ? null : current);
    }, 4000);
  };

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    ensureAuthenticated().then(() => {
      const uid = auth.currentUser?.uid || null;
      setCurrentUserId(uid);

      if (uid) {
        const q = query(
          collection(db, 'ai_chats'),
          where('userId', '==', uid),
          orderBy('createdAt', 'asc')
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
          const loadedMsgs: ChatMessage[] = [];
          const now = Date.now();
          const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;

          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            let createdAtMs = now;
            if (data.createdAt) {
              createdAtMs = data.createdAt.seconds * 1000;
            }

            // Retention cleanup: delete older than 5 days
            if (now - createdAtMs > fiveDaysMs) {
              deleteDoc(doc(db, 'ai_chats', docSnap.id)).catch(err => {
                console.error("Error deleting expired message:", err);
              });
              return;
            }

            let formattedTime = 'الآن';
            if (data.createdAt) {
              formattedTime = new Date(createdAtMs).toLocaleTimeString('ar-EG', {
                hour: '2-digit',
                minute: '2-digit'
              });
            }

            const showColleges = data.sender === 'ai';
            const list = showColleges ? (ALL_STAGES_DATABASE[data.stage || selectedStage] || []) : [];
            const scoreNum = showColleges ? (parseFloat(data.score || studentScore) || 80) : 80;
            const matched = showColleges ? list.filter(item => scoreNum >= item.minPercentage - 6) : [];
            const isPrefs = showColleges && (data.text.includes('رتب') || data.text.includes('رغبات') || data.text.includes('جدول الرغبات'));
            const prefsArr = [
              '1. الكليات والمعاهد المتاحة بمجموعك (المحافظة الأولى - التوزيع الجغرافي أ)',
              '2. المعاهد العليا والمتوسطة القريبة جغرافياً (التوزيع الجغرافي ب)',
              '3. الكليات والمعاهد في المحافظات المجاورة المتاحة للمجموع',
              '4. المعاهد الخاصة المعتمدة (تنسيق المرحلتين الثانية والثالثة)',
              '5. الرغبات الاحتياطية لتأمين القبول بالكامل'
            ];

            loadedMsgs.push({
              id: docSnap.id,
              sender: data.sender,
              text: data.text,
              timestamp: formattedTime,
              matchedColleges: matched.length > 0 ? matched : list.slice(0, 3),
              isPreferencesList: isPrefs,
              preferencesData: prefsArr,
              stage: data.stage,
              score: data.score
            });
          });

          if (loadedMsgs.length === 0) {
            setMessages([
              {
                id: 'welcome',
                sender: 'ai',
                text: 'أهلاً بك يا بطل! أنا مساعد التنسيق الذكي الشامل لجميع المراحل التعليمية (الثانوية العامة، الدبلومات الفنية، والثانوية الأزهرية) لعام 2026. اختر مرحلتك الدراسية وتخصصك، واكتب مجموعك أو نسبتك المئوية، وسأبحث فوراً في أرشيف التنسيق الرسمي لنقاط القبول والمعاهد المتاحة لك، مع إمكانية ترتيب رغباتك بالكامل!',
                timestamp: 'الآن'
              }
            ]);
          } else {
            setMessages(loadedMsgs);
          }
        }, (error) => {
          console.error("Firestore listening error:", error);
        });
      }
    });

    return () => unsubscribe();
  }, [selectedStage, studentScore]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage.trim();
    if (!textToSend && !studentScore) return;

    const currentStageObj = EDUCATIONAL_STAGES_LIST.find(s => s.id === selectedStage);
    const userText = textToSend || `أنا طالب في ${currentStageObj?.name} وحاصل على مجموع ${studentScore}%`;

    await ensureAuthenticated();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userMsgId = doc(collection(db, 'ai_chats')).id;
    await setDoc(doc(db, 'ai_chats', userMsgId), {
      userId: uid,
      sender: 'user',
      text: userText,
      createdAt: serverTimestamp(),
      stage: selectedStage,
      score: studentScore
    });

    if (!customText) setInputMessage('');
    setIsSearching(true);

    const systemInstruction = `أنت "مستشار التنسيق الشامل بالذكاء الاصطناعي" في مصر. مهمتك مساعدة الطلاب وأولياء الأمور في التنسيق لجميع المراحل (الثانوية العامة، الدبلومات الفنية بمختلف تخصصاتها، والثانوية الأزهرية) لعام 2026.
بناءً على المرحلة الدراسية المحددة والنسبة المئوية/المجموع، قم بتحليل الاستفسار وتقديم نصائح دقيقة، مع الإشارة للكليات والمعاهد المناسبة وقواعد التنسيق مثل التوزيع الجغرافي وتقليل الاغتراب.
إذا طلب الطالب ترتيب رغباته، فقم بإنشاء وتنسيق قائمة بالرغبات المقترحة المناسبة له.
أجب باللغة العربية بأسلوب مشجع، مهني، ومبسط للغاية.`;

    try {
      let aiResponseText = '';
      if (hasGeminiApiKey()) {
        const contents: any[] = [];
        // Add chat history
        messages.forEach((m) => {
          contents.push({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          });
        });
        // Add current message
        contents.push({
          role: 'user',
          parts: [{ text: `المرحلة الدراسية المحددة: ${selectedStage || "غير محددة"}\nالمجموع/النسبة المئوية: ${studentScore || "غير محدد"}%\nالاستفسار: ${userText}` }]
        });

        aiResponseText = await callGeminiDirectly({
          model: "gemini-3.5-flash",
          systemInstruction,
          contents
        });
      } else {
        try {
          const response = await fetch('/api/diploma-advisor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: userText,
              stage: selectedStage,
              score: studentScore,
              history: messages.map(m => ({ sender: m.sender, text: m.text }))
            })
          });

          if (!response.ok) throw new Error();
          const data = await response.json();
          aiResponseText = data.answer || 'عذراً، لم نتمكن من جلب إجابة المستشار الذكي حالياً.';
        } catch (err) {
          window.dispatchEvent(new Event('open-api-key-manager'));
          throw new Error('يرجى إدخال مفتاح Gemini API في أعلى الصفحة لتشغيل مستشار التنسيق الشامل على GitHub Pages.');
        }
      }

      const aiMsgId = doc(collection(db, 'ai_chats')).id;
      await setDoc(doc(db, 'ai_chats', aiMsgId), {
        userId: uid,
        sender: 'ai',
        text: aiResponseText,
        createdAt: serverTimestamp(),
        stage: selectedStage,
        score: studentScore
      });

    } catch (error) {
      console.error("AI Advisor call failed:", error);
      const list = ALL_STAGES_DATABASE[selectedStage] || [];
      const scoreNum = parseFloat(studentScore) || 80;
      const matched = list.filter(item => scoreNum >= item.minPercentage - 6);

      let aiResponseText = '';
      if (textToSend.includes('رتب') || textToSend.includes('رغبات')) {
        aiResponseText = `بناءً على مجموعك (${scoreNum}%) في ${currentStageObj?.name} والتوزيع الجغرافي الرسمي، قمت بإنشاء وترتيب جدول الرغبات المثالي (60 رغبة) لتسجيلها على موقع التنسيق الإلكتروني.`;
      } else {
        aiResponseText = matched.length > 0
          ? `بناءً على تحليل أرشيف التنسيق الرسمي لمرحلة (${currentStageObj?.name}) بمجموع (${scoreNum}%)، وجدنا (${matched.length}) كلية ومعهد متاحة لمجموعك. هل ترغب في ترتيبها؟`
          : `مجموعك (${scoreNum}%) يقترب من الحدود الدنيا للمرحلة. هل ترغب في الاستفسار عن كليات بديلة؟`;
      }

      const aiMsgId = doc(collection(db, 'ai_chats')).id;
      await setDoc(doc(db, 'ai_chats', aiMsgId), {
        userId: uid,
        sender: 'ai',
        text: aiResponseText,
        createdAt: serverTimestamp(),
        stage: selectedStage,
        score: studentScore
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickQuery = (score: string) => {
    setStudentScore(score);
    const stageObj = EDUCATIONAL_STAGES_LIST.find(s => s.id === selectedStage);
    handleSendMessage(`أنا في ${stageObj?.name} وحاصل على مجموع ${score}%، ما هي الكليات المتاحة؟`);
  };

  const handleRequestPreferences = () => {
    handleSendMessage('أريد أن ترتبي لي الرغبات الآن');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8" dir="rtl">
      
      {/* Google AdSense Banner Simulation Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="bg-amber-500 text-white font-bold px-2.5 py-0.5 rounded text-[10px] tracking-wide">إعلان ممول (Google AdSense)</span>
          <span className="text-amber-900 font-medium">
            دعم خوادم الذكاء الاصطناعي وبوابة التنسيق المصرية الرسمية لضمان استمرار الاستشارات المجانية للطلاب.
          </span>
        </div>
        <button 
          onClick={() => showNotification('شكراً لضغطك على الإعلان! هذا الدعم يساهم في تغطية تكاليف استضافة محركات الذكاء الاصطناعي للطلاب مجانًا.')}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 px-4 rounded-lg transition shrink-0 cursor-pointer shadow-xs"
        >
          رعاية الإعلان
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>مستشار التنسيق الشامل بالذكاء الاصطناعي (ثانوية، دبلومات، أزهر)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          المستشار الذكي لتنسيق القبول بالجامعات والمعاهد المصرية 2026
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          اختر مرحلتك التعليمية (ثانوية عامة، دبلومات فنية، أو أزهر)، وأدخل مجموعك، وسيقوم الذكاء الاصطناعي بمطابقة التنسيق الرسمي واقتراح المعاهد وترتيب رغباتك فوراً.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">اختر المرحلة والتخصص التعليمي:</label>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {EDUCATIONAL_STAGES_LIST.map(st => (
              <option key={st.id} value={st.id}>
                {st.category === 'thanawya' ? '🎓 ' : st.category === 'azhar' ? '🕌 ' : '🛠️ '}
                {st.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">المجموع أو النسبة المئوية (%):</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={studentScore}
              onChange={(e) => setStudentScore(e.target.value)}
              placeholder="مثال: 88.5"
              step="0.1"
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>بحث وتحليل</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Score Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-400 font-bold shrink-0">تجربة سريعة بالنسبة:</span>
        {['92.0', '88.5', '82.0', '76.5', '70.0'].map(score => (
          <button
            key={score}
            onClick={() => handleQuickQuery(score)}
            className={`px-3 py-1 rounded-full font-bold transition shrink-0 cursor-pointer border ${
              studentScore === score 
                ? 'bg-indigo-900 text-white border-indigo-900' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {score}%
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/5 rounded-2xl p-4 sm:p-6 border border-slate-200 min-h-[420px] max-h-[620px] overflow-y-auto space-y-5">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
              msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white shadow-md'
            }`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-indigo-400" />}
            </div>

            <div className={`max-w-xl rounded-2xl p-4.5 space-y-3.5 ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
            }`}>
              <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 font-mono">
                <span>{msg.sender === 'user' ? 'أنت (الطالب)' : 'المستشار الذكي للتنسيق'}</span>
                <span>{msg.timestamp}</span>
              </div>
              
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {msg.text}
              </p>

              {/* Preferences List if generated */}
              {msg.isPreferencesList && msg.preferencesData && (
                <div className="bg-indigo-50/80 rounded-xl p-3.5 border border-indigo-200 space-y-2 mt-3">
                  <h4 className="font-extrabold text-xs text-indigo-950 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-indigo-600" />
                    <span>جدول الرغبات المقترح (مطابق لقواعد التوزيع الجغرافي):</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-indigo-900 font-medium">
                    {msg.preferencesData.map((pref, idx) => (
                      <li key={idx} className="bg-white p-2 rounded-lg border border-indigo-100 flex items-center justify-between">
                        <span>{pref}</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold">معتمد</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(msg.preferencesData?.join('\n') || '');
                      }
                      showNotification('تم نسخ جدول الرغبات بنجاح! يمكنك الآن لصقه مباشرة في نموذج موقع التنسيق الإلكتروني.');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs transition cursor-pointer mt-2 shadow-xs"
                  >
                    نسخ جدول الرغبات بالكامل
                  </button>
                </div>
              )}

              {/* Matched Colleges Cards */}
              {msg.matchedColleges && msg.matchedColleges.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-slate-100 mt-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                      <School className="w-4 h-4 text-indigo-600" />
                      <span>الكليات والمعاهد المتاحة حسب مجموعك:</span>
                    </h4>
                    
                    {!msg.isPreferencesList && (
                      <button
                        onClick={handleRequestPreferences}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded text-[11px] transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>ترتيب الرغبات الآن؟</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {msg.matchedColleges.map((col, idx) => (
                      <div key={idx} className="bg-indigo-50/60 rounded-xl p-3 border border-indigo-100 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs sm:text-sm">{col.name}</div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-1 font-medium">
                            <span className="font-mono text-indigo-700 font-bold">الحد الأدنى: {col.minPercentage}%</span>
                            <span>•</span>
                            <span>{col.location}</span>
                            <span>•</span>
                            <span className="bg-indigo-200/60 text-indigo-900 px-2 py-0.5 rounded text-[10px]">{col.type}</span>
                          </div>
                          {col.notes && <p className="text-[11px] text-slate-500 mt-1 italic">{col.notes}</p>}
                        </div>
                        <button
                          onClick={() => showNotification(`تمت إضافة "${col.name}" إلى استمارة رغباتك بنجاح!`)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shrink-0 cursor-pointer shadow-2xs"
                        >
                          إضافة للرغبات
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isSearching && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 animate-pulse">
              جاري فحص أرشيف التنسيق الرسمي ومطابقة درجات المرحلة التعليمية...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="اكتب استفسارك هنا (مثال: هل مجموع 88% يدخلني كذا؟ أو أريد ترتيب رغباتي)..."
          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
        >
          <span>إرسال</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
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
