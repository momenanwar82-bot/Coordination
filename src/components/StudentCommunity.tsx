import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, HelpCircle, ThumbsUp, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { db, auth, ensureAuthenticated, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, increment, serverTimestamp, deleteDoc } from 'firebase/firestore';

interface QuestionItem {
  id: string;
  author: string;
  track: string;
  score: string;
  question: string;
  answer?: string;
  date: string;
  likes: number;
  userId?: string;
}

const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: '1',
    author: 'محمود أحمد',
    track: 'علمي رياضة',
    score: '84.5%',
    question: 'مجموعي 84.5% هل أقدر أدخل هندسة المطرية أو تكنولوجيا وبناء بني سويف؟ إيهما أفضل لمستقبل سوق العمل؟',
    answer: 'مرحباً بك يا محمود! مجموعك ممتاز ومؤهل بقوة لكلية التكنولوجيا والتعليم بجامعة بني سويف أو حلوان، وكذلك المعاهد الهندسية المعتمدة. تخصصات التكنولوجيا تطبيقية وعملية جداً ومطلوبة في سوق العمل.',
    date: 'منذ ساعتين',
    likes: 24,
    userId: 'system'
  },
  {
    id: '2',
    author: 'سارة محمد',
    track: 'دبلوم تجاري 3 سنوات',
    score: '91.2%',
    question: 'جبت 91.2% دبلوم تجاري، هل ممكن أدخل تجارة إنجليزي أو كليات تكنولوجية؟',
    answer: 'أهلاً بكِ سارة! مبروك التفوق. بمجموعك 91.2% لكي أولوية كبيرة في تنسيق المعاهد العليا الخاصة والتجارية، ويمكنك الالتحاق ببعض برامج التجارة وتكنولوجيا الإدارة حسب التوزيع الجغرافي.',
    date: 'منذ 4 ساعات',
    likes: 19,
    userId: 'system'
  },
  {
    id: '3',
    author: 'أحمد إبراهيم',
    track: 'علمي علوم',
    score: '78.0%',
    question: 'هل فيه أمل تنزل كليات تمريض أو حاسبات خاصة بمجموع 78% في المرحلة الثانية؟',
    answer: 'المعاهد العالية للحاسبات والمعلومات والتمريض الخاص والأهلي تقبل بمجرمات مقاربة جداً لهذا المجموع خصوصاً في المرحلتين الثانية والثالثة.',
    date: 'منذ يوم',
    likes: 31,
    userId: 'system'
  }
];

export default function StudentCommunity() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [studentTrack, setStudentTrack] = useState('علمي علوم');
  const [studentScore, setStudentScore] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Authenticate user anonymously on mount
    ensureAuthenticated().then(() => {
      setCurrentUserId(auth.currentUser?.uid || null);
    });

    const q = query(collection(db, 'community_questions'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: QuestionItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        let formattedDate = 'الآن';
        if (data.createdAt) {
          try {
            formattedDate = new Date(data.createdAt.seconds * 1000).toLocaleString('ar-EG', {
              hour: '2-digit',
              minute: '2-digit',
              day: 'numeric',
              month: 'short'
            });
          } catch (e) {
            formattedDate = 'الآن';
          }
        }
        list.push({
          id: doc.id,
          author: data.author,
          track: data.track,
          score: data.score,
          question: data.question,
          answer: data.answer,
          date: formattedDate,
          likes: data.likes || 0,
          userId: data.userId
        });
      });

      if (list.length === 0) {
        setQuestions(INITIAL_QUESTIONS);
      } else {
        setQuestions(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'community_questions');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmitting(true);
    await ensureAuthenticated();

    const docId = doc(collection(db, 'community_questions')).id;
    const docPath = `community_questions/${docId}`;

    try {
      await setDoc(doc(db, 'community_questions', docId), {
        author: authorName.trim() || 'طالب / ولي أمر',
        userId: auth.currentUser?.uid || 'anonymous',
        track: studentTrack,
        score: studentScore ? `${studentScore}%` : 'غير محدد',
        question: questionText.trim(),
        answer: 'تم استلام سؤالك بنجاح! سيقوم مستشار التنسيق والذكاء الاصطناعي بالرد عليك فوراً خلال دقائق.',
        createdAt: serverTimestamp(),
        likes: 0
      });
      setQuestionText('');
      setAuthorName('');
      setStudentScore('');
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, docPath);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (item: QuestionItem) => {
    const docPath = `community_questions/${item.id}`;
    try {
      await updateDoc(doc(db, 'community_questions', item.id), {
        likes: increment(1)
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, docPath);
    }
  };

  const handleDelete = async (itemId: string) => {
    const docPath = `community_questions/${itemId}`;
    try {
      await deleteDoc(doc(db, 'community_questions', itemId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8" dir="rtl">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ركن استفسارات وتوجيهات التنسيق المباشر</span>
          </div>
          <h3 className="text-xl font-black text-slate-950">
            اسأل خبراء التنسيق واستشارات مجموعك
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            اطرح سؤالك حول ترتيب الرغبات، الحد الأدنى للكليات، أو المعاهد المتاحة واحصل على إجابة فورية.
          </p>
        </div>

        <div className="bg-indigo-900 text-white px-4 py-3 rounded-xl text-center shadow-sm">
          <div className="text-xs text-indigo-200">أكثر من 45 ألف زائر اليوم</div>
          <div className="text-sm font-black text-emerald-400">● الإجابة فورية ومجانية</div>
        </div>
      </div>

      {/* Ask Question Form */}
      <form onSubmit={handleSubmitQuestion} className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>أضف استفسارك الجديد</span>
        </h4>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>تم إرسال استفسارك بنجاح وإضافته إلى قائمة الاستفسارات العامة!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">اسمك الكريم:</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="مثال: محمد علي"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">الشعبة أو التخصص:</label>
            <select
              value={studentTrack}
              onChange={(e) => setStudentTrack(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="علمي علوم">علمي علوم</option>
              <option value="علمي رياضة">علمي رياضة</option>
              <option value="أدبي">أدبي</option>
              <option value="دبلومات فنية">دبلومات فنية (صناعي/تجاري)</option>
              <option value="ثانوية أزهرية">ثانوية أزهرية</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">المجموع أو النسبة (%):</label>
            <input
              type="text"
              value={studentScore}
              onChange={(e) => setStudentScore(e.target.value)}
              placeholder="مثال: 85.5"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">نص الاستفسار أو الكليات التي تحتار بينها:</label>
          <textarea
            rows={2}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="اكتب سؤالك هنا بوضوح (مثال: مجموعي 81% علمي رياضة ومقيم في الجيزة، ما هي أفضل المعاهد والكليات المتاحة لي؟)..."
            className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs font-bold text-slate-900 focus:outline-none"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'جاري الإرسال...' : 'إرسال الاستفسار للخبراء'}</span>
          </button>
        </div>
      </form>

      {/* Questions List */}
      <div className="space-y-4">
        <h4 className="font-extrabold text-slate-900 text-sm">أحدث استفسارات الطلاب وأجوبة الخبراء</h4>

        {questions.map((item) => (
          <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center text-xs">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{item.author}</h5>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{item.track}</span>
                    <span className="font-mono font-bold text-indigo-600">المجموع: {item.score}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              ❓ {item.question}
            </div>

            {item.answer && (
              <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-lg text-xs sm:text-sm text-indigo-950 leading-relaxed">
                <div className="flex items-center gap-1 font-bold text-indigo-700 mb-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>رد مستشار التنسيق الأكاديمي:</span>
                </div>
                {item.answer}
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button 
                onClick={() => handleLike(item)}
                className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 font-bold transition cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>مفيد ({item.likes})</span>
              </button>

              <div className="flex items-center gap-3">
                {item.userId === currentUserId && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-700 font-bold transition cursor-pointer"
                    title="حذف الاستفسار"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                )}
                <span className="text-[10px] text-emerald-600 font-bold">تمت الإجابة رسمياً</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
