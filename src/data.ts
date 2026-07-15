import { NewsItem, GovernorateStatus, UniversityCollege, Subject, GrievanceStep, UniversityFeesItem } from './types';

export const LATEST_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'وزير التربية والتعليم يعتمد نسبة نجاح العينات العشوائية في الثانوية العامة',
    date: 'منذ ساعتين',
    excerpt: 'أعلن وزير التربية والتعليم والتعليم الفني عن تجاوز نسبة النجاح في مادة الفيزياء لـ 92% ومادة التاريخ لـ 90%، مؤكداً أن مؤشرات التصحيح ممتازة وتراعي مصلحة الطلاب.',
    content: 'أكدت مصادر مسؤولة بوزارة التربية والتعليم والتعليم الفني، أن عمليات تصحيح أوراق إجابات امتحانات الثانوية العامة تسير بدقة متناهية ودون أي عقبات. وقد اعتمد الوزير نسب النجاح الأولية للعديد من المواد الدراسية، حيث جاءت نسب النجاح في اللغة العربية بنسبة 93%، والفيزياء بنسبة 92.4%، بينما سجلت مادة الكيمياء نسبة 91.2%. ومن المتوقع إعلان النتيجة رسميًا بعد انتهاء المراجعة النهائية ورصد الدرجات.',
    category: 'thanawya',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'مساعد الذكاء الاصطناعي يطرح الدليل الكامل لترتيب رغبات الدبلومات الفنية والثانوية العامة',
    date: 'منذ 5 ساعات',
    excerpt: 'تحديث جديد لنظام المستشار الذكي لمساعدة طلاب الدبلومات الفنية (تجاري وصناعي وزراعي) والثانوية العامة في ترتيب الـ 60 رغبة وتجنب أخطاء التوزيع الجغرافي.',
    content: 'أطلقت بوابة تنسيقي المحدثة دليلاً تفاعلياً مدعوماً بالذكاء الاصطناعي لترتيب الرغبات للقبول بالجامعات التكنولوجية والمعاهد العليا. يهدف النظام إلى تمكين طلاب الدبلومات الفنية بكافة تخصصاتها والثانوية العامة والأزهرية من كتابة رغباتهم بناءً على الموقع الجغرافي وقيم الرسوم والمصروفات الدراسية، مما يضمن تقليل اغتراب الطلاب بنسبة 100%.',
    category: 'diploma',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    title: 'قطاع المعاهد الأزهرية: بدء أعمال تصحيح امتحانات الثانوية الأزهرية بالجمهورية',
    date: 'أمس',
    excerpt: 'انطلقت مراكز تصحيح الشهادة الثانوية الأزهرية للقسمين العلمي والأدبي في كافة المحافظات وسط إجراءات تنظيمية مشددة لضمان حقوق الطلاب.',
    content: 'تفقد رئيس قطاع المعاهد الأزهرية مراكز التصحيح لمتابعة سير العمل وحث المصححين على الدقة والسرعة وتوفير الهدوء اللازم. وبيّن أن عمليات تصحيح المواد الشرعية والعربية جارية، وسوف تتبعها المواد الثقافية، على أن يتم إعلان النتيجة في منتصف شهر يوليو الجاري بمؤتمر صحفي بمشيخة الأزهر.',
    category: 'azhar',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '4',
    title: 'توقعات التنسيق للجامعات الحكومية لعام 2026 والحدود الدنيا المتوقعة',
    date: 'قبل يومين',
    excerpt: 'تحليلات خبراء التعليم تشير إلى استقرار الحدود الدنيا للقبول بكليات القمة مقارنة بالعام الماضي نظراً لتقارب شرائح الدرجات ونظام الامتحانات المتوازن.',
    content: 'أوضح خبراء التنسيق أن المؤشرات الأولية تشير إلى أن الحد الأدنى لكليات الطب البشري قد يتراوح بين 91.2% إلى 91.8%، وطب الأسنان بين 90.5% إلى 91%، بينما من المتوقع أن تقف كليات العلاج الطبيعي والصيدلة عند حاجز 89.5% إلى 90%. أما كليات الهندسة، فتشير التوقعات إلى إمكانية القبول من 85% كحد أدنى للمرحلة الأولى.',
    category: 'general',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'
  }
];

export const GOVERNORATES_STATUS: GovernorateStatus[] = [
  { id: 'cairo', name: 'القاهرة', status: 'available', percentage: 84.7, announcementDate: 'معتمدة رسميًا' },
  { id: 'giza', name: 'الجيزة', status: 'available', percentage: 82.5, announcementDate: 'معتمدة رسميًا' },
  { id: 'alexandria', name: 'الإسكندرية', status: 'available', percentage: 81.2, announcementDate: 'معتمدة رسميًا' },
  { id: 'qalyubia', name: 'القليوبية', status: 'soon', announcementDate: 'اليوم مساءً' },
  { id: 'sharqia', name: 'الشرقية', status: 'soon', announcementDate: 'غداً صباحاً' },
  { id: 'dakahlia', name: 'الدقهلية', status: 'soon', announcementDate: 'خلال 48 ساعة' },
  { id: 'beheira', name: 'البحيرة', status: 'soon', announcementDate: 'قريباً جداً' },
  { id: 'gharbia', name: 'الغربية', status: 'available', percentage: 79.8, announcementDate: 'معتمدة رسميًا' },
  { id: 'monufia', name: 'المنوفية', status: 'soon', announcementDate: 'الأسبوع الحالي' },
  { id: 'fayoum', name: 'الفيوم', status: 'soon', announcementDate: 'قريباً جداً' },
  { id: 'minya', name: 'المنيا', status: 'soon', announcementDate: 'قريباً جداً' },
  { id: 'assiut', name: 'أسيوط', status: 'soon', announcementDate: 'خلال أيام' },
  { id: 'sohag', name: 'سوهاج', status: 'soon', announcementDate: 'قريباً جداً' },
  { id: 'qena', name: 'قنا', status: 'soon', announcementDate: 'قريباً جداً' },
  { id: 'luxor', name: 'الأقصر', status: 'available', percentage: 77.2, announcementDate: 'معتمدة رسميًا' },
  { id: 'aswan', name: 'أسوان', status: 'available', percentage: 78.5, announcementDate: 'معتمدة رسميًا' },
  { id: 'ismailia', name: 'الإسماعيلية', status: 'soon', announcementDate: 'خلال ساعات' },
  { id: 'suez', name: 'السويس', status: 'available', percentage: 83.1, announcementDate: 'معتمدة رسميًا' },
  { id: 'portsaid', name: 'بورسعيد', status: 'available', percentage: 85.3, announcementDate: 'معتمدة رسميًا' },
  { id: 'damietta', name: 'دمياط', status: 'soon', announcementDate: 'قريباً جداً' }
];

export const PREDICTED_COLLEGES: UniversityCollege[] = [
  {
    id: 'med_cairo',
    name: 'كلية الطب البشري - جامعة القاهرة',
    category: 'medical',
    type: 'public',
    minPercentage: 91.3,
    location: 'المنيل، القاهرة',
    description: 'أقدم وأعرق كليات الطب في الشرق الأوسط (القصر العيني). تتطلب مجموعاً مرتفعاً جداً.'
  },
  {
    id: 'med_dent_giza',
    name: 'كلية طب الفم والأسنان - جامعة عين شمس',
    category: 'medical',
    type: 'public',
    minPercentage: 90.8,
    location: 'العباسية، القاهرة',
    description: 'واحدة من كليات الصدارة في تخصص طب الأسنان بمستشفيات تعليمية متطورة.'
  },
  {
    id: 'pharm_cairo',
    name: 'كلية الصيدلة - جامعة القاهرة',
    category: 'medical',
    type: 'public',
    minPercentage: 89.8,
    location: 'القصر العيني، القاهرة',
    description: 'صرح متميز لدراسة علوم الصيدلة السريرية وصناعة الدواء وبحوث السموم.'
  },
  {
    id: 'physio_cairo',
    name: 'كلية العلاج الطبيعي - جامعة القاهرة',
    category: 'medical',
    type: 'public',
    minPercentage: 89.2,
    location: 'الجيزة',
    description: 'تخصص متميز ومطلوب بشدة في سوق العمل المحلي والإقليمي.'
  },
  {
    id: 'eng_cairo',
    name: 'كلية الهندسة - جامعة القاهرة',
    category: 'engineering',
    type: 'public',
    minPercentage: 85.1,
    location: 'الجيزة',
    description: 'منارة العلوم الهندسية في مصر، تدرس تخصصات مدني، عمارة، حاسبات، ميكانيكا واتصالات.'
  },
  {
    id: 'eng_alex',
    name: 'كلية الهندسة - جامعة الإسكندرية',
    category: 'engineering',
    type: 'public',
    minPercentage: 84.5,
    location: 'الشاطبي، الإسكندرية',
    description: 'من أعرق كليات الهندسة، وتتميز ببرامج الساعات المعتمدة المتنوعة.'
  },
  {
    id: 'cs_ عين_شمس',
    name: 'كلية الحاسبات والمعلومات - جامعة عين شمس',
    category: 'engineering',
    type: 'public',
    minPercentage: 81.5,
    location: 'العباسية، القاهرة',
    description: 'دراسة علوم الحاسب، الذكاء الاصطناعي، الأمن السيبراني وهندسة البرمجيات.'
  },
  {
    id: 'alsun_ain_shams',
    name: 'كلية الألسن - جامعة عين شمس',
    category: 'humanities',
    type: 'public',
    minPercentage: 79.5,
    location: 'العباسية، القاهرة',
    description: 'الكلية الرائدة لتعلم اللغات العالمية (الإنجليزية، الفرنسية، الألمانية، الإيطالية، الصينية وغيرها) والترجمة.'
  },
  {
    id: 'econ_cairo',
    name: 'كلية الاقتصاد والعلوم السياسية - جامعة القاهرة',
    category: 'humanities',
    type: 'public',
    minPercentage: 82.2,
    location: 'الجيزة',
    description: 'كلية النخبة لدراسة العلوم السياسية، الاقتصاد، والإحصاء.'
  },
  {
    id: 'science_cairo',
    name: 'كلية العلوم - جامعة القاهرة',
    category: 'scientific',
    type: 'public',
    minPercentage: 74.0,
    location: 'الجيزة',
    description: 'دراسة الكيمياء، الفيزياء، الرياضيات، الفلك وعلوم الجيولوجيا الحيوية.'
  },
  {
    id: 'comm_cairo',
    name: 'كلية التجارة - جامعة القاهرة',
    category: 'humanities',
    type: 'public',
    minPercentage: 68.5,
    location: 'الجيزة',
    description: 'دراسة إدارة الأعمال، المحاسبة، والعلوم المالية وتأمين المنشآت.'
  },
  {
    id: 'arts_cairo',
    name: 'كلية الآداب - جامعة القاهرة',
    category: 'humanities',
    type: 'public',
    minPercentage: 65.0,
    location: 'الجيزة',
    description: 'تضم أقسام اللغات والآداب، الجغرافيا، التاريخ، والاجتماع والوثائق.'
  }
];

export const UNIVERSITY_FEES: UniversityFeesItem[] = [
  {
    university: 'جامعة الجلالة الأهلية (Galala University)',
    type: 'ahlia',
    faculties: [
      { name: 'الطب البشري', fees: '120,000 ج.م سنويًا' },
      { name: 'طب الأسنان', fees: '107,000 ج.م سنويًا' },
      { name: 'العلاج الطبيعي', fees: '90,000 ج.م سنويًا' },
      { name: 'الصيدلة', fees: '85,000 ج.م سنويًا' },
      { name: 'الهندسة', fees: '69,000 ج.م سنويًا' },
      { name: 'علوم الحاسب والذكاء الاصطناعي', fees: '69,000 ج.م سنويًا' },
      { name: 'التمريض', fees: '31,000 ج.م سنويًا' }
    ]
  },
  {
    university: 'جامعة الملك سلمان الدولية (King Salman International)',
    type: 'ahlia',
    faculties: [
      { name: 'الطب البشري', fees: '115,000 ج.م سنويًا' },
      { name: 'طب الأسنان', fees: '106,000 ج.م سنويًا' },
      { name: 'الصيدلة', fees: '85,000 ج.م سنويًا' },
      { name: 'الهندسة والترميم', fees: '69,000 ج.م سنويًا' },
      { name: 'علوم الحاسب', fees: '69,000 ج.م سنويًا' },
      { name: 'السياحة والضيافة', fees: '40,000 ج.م سنويًا' }
    ]
  },
  {
    university: 'جامعة مصر للعلوم والتكنولوجيا (MUST)',
    type: 'private',
    faculties: [
      { name: 'الطب البشري', fees: '155,000 ج.م سنويًا' },
      { name: 'طب الأسنان', fees: '145,000 ج.م سنويًا' },
      { name: 'العلاج الطبيعي', fees: '95,000 ج.م سنويًا' },
      { name: 'الصيدلة', fees: '90,000 ج.م سنويًا' },
      { name: 'الهندسة', fees: '70,000 ج.م سنويًا' },
      { name: 'تكنولوجيا المعلومات (IT)', fees: '75,000 ج.م سنويًا' },
      { name: 'الإعلام والاتصال', fees: '55,000 ج.م سنويًا' }
    ]
  },
  {
    university: 'جامعة أكتوبر للعلوم الحديثة والآداب (MSA)',
    type: 'private',
    faculties: [
      { name: 'الطب البشري (بالتعاون مع بريطانيا)', fees: '170,000 ج.م سنويًا' },
      { name: 'طب الأسنان', fees: '154,000 ج.م سنويًا' },
      { name: 'الصيدلة والتصنيع الدوائي', fees: '98,000 ج.م سنويًا' },
      { name: 'الهندسة', fees: '65,000 ج.م سنويًا' },
      { name: 'علوم الحاسب', fees: '70,000 ج.م سنويًا' },
      { name: 'اللغات والترجمة', fees: '45,000 ج.م سنويًا' }
    ]
  },
  {
    university: 'الجامعة المصرية اليابانية للعلوم والتكنولوجيا (E-JUST)',
    type: 'foreign',
    faculties: [
      { name: 'الهندسة (بكالوريوس)', fees: '80,000 ج.م سنويًا' },
      { name: 'الحاسبات وتكنولوجيا المعلومات', fees: '75,000 ج.م سنويًا' },
      { name: 'إدارة الأعمال الدولية والعلوم الإنسانية', fees: '62,000 ج.م سنويًا' }
    ]
  }
];

export const GRIEVANCE_STEPS: GrievanceStep[] = [
  {
    step: 1,
    title: 'تسديد الرسوم المقررة',
    description: 'يتم سداد مبلغ 200 جنيه مصري عن كل مادة يرغب الطالب في التظلم منها. يتم الدفع عبر منافذ فوري، أو الهيئة القومية للبريد المصري، أو حساب صندوق دعم وتمويل المشروعات التعليمية.'
  },
  {
    step: 2,
    title: 'تقديم الطلب إلكترونياً',
    description: 'بعد تسديد الرسوم بـ 24 ساعة، يدخل الطالب على الموقع الإلكتروني الرسمي للتظلمات الخاص بوزارة التربية والتعليم، ويسجل المواد التي يريد التظلم فيها وتحديد موعد ومقر لجنة الاطلاع.'
  },
  {
    step: 3,
    title: 'الذهاب إلى مقر لجنة الاطلاع',
    description: 'يتوجب على الطالب الحضور بمفرده أو مع ولي أمره فقط (يمنع اصطحاب مدرس المادة). يجب إحضار بطاقة الرقم القومي وصورة منها، ورقم الجلوس وصورة منه، وإيصال سداد الرسوم.'
  },
  {
    step: 4,
    title: 'مراجعة ورقة الإجابة (البابل شيت)',
    description: 'يُسلّم الطالب صورة ضوئية من ورقة إجابته (بابل شيت أو المقالي) ومقترح الإجابة النموذجية. يقوم الطالب بمطابقة إجاباته وكتابة ملاحظاته في النموذج المخصص والتوقيع عليه بنفسه.'
  },
  {
    step: 5,
    title: 'إعلان النتيجة والرد الرسمي',
    description: 'في حال ثبوت حق الطالب في أي درجات إضافية، يتم تعديل مجموعه فوراً وإبلاغ مكتب التنسيق بالدرجات الجديدة، ويسترد الطالب مبلغ الـ 200 جنيه التي قام بدفعها للمادة المستحقة.'
  }
];

export const TANSIK_STEPS = [
  {
    id: 'step1',
    title: 'الحصول على الرقم السري وطباعة الشهادة الورقية',
    content: 'يجب على الطالب استلام شهادة النجاح الورقية من مدرسته، حيث تحتوي على "الرقم السري" المكتوب أسفل الشهادة، وهو الرقم السري المخصص للدخول على موقع التنسيق وكتابة الرغبات.'
  },
  {
    id: 'step2',
    title: 'الدخول على بوابة الحكومة الإلكترونية (موقع التنسيق)',
    content: 'يتم التوجه لموقع التنسيق الإلكتروني الرسمي (tansik.digital.gov.eg) والضغط على "تنسيق الثانوية العامة"، ثم إدخال رقم الجلوس والرقم السري ورمز التحقق المرئي بدقة.'
  },
  {
    id: 'step3',
    title: 'ترتيب واختيار 75 رغبة كاملة',
    content: 'يتعين على الطالب ملء 75 رغبة كاملة بالترتيب الصحيح. ينصح بمراعاة قواعد التوزيع الجغرافي (أ، ب، ج) بحسب المحافظة التابع لها الطالب، حتى لا تظهر رسالة خطأ تمنع حفظ الرغبات.'
  },
  {
    id: 'step4',
    title: 'حفظ وتعديل الرغبات وطباعة التقرير',
    content: 'يمكن للطالب تعديل رغباته طوال فترة عمل المرحلة (عادة 5 أيام). بعد الانتهاء من الإدخال النهائي، يجب الضغط على "حفظ" وطباعة إيصال الرغبات الذي يحتوي على الرقم المرجعي للعملية.'
  },
  {
    id: 'step5',
    title: 'إعلان نتيجة التنسيق والتوجه للكلية',
    content: 'بعد انتهاء المرحلة بأيام قليلة، يتم إعلان نتيجة الترشيح على نفس الموقع. يطبع الطالب "بطاقة الترشيح" ويتوجه بها ومعه الأوراق الرسمية (شهادة الميلاد، شهادة النجاح، صور شخصية، نموذج 2-6 جند للذكور) إلى الكلية المقبول بها.'
  }
];

export const THANAWYA_SUBJECTS_MAP = {
  science_bio: [
    { id: 'arabic', name: 'اللغة العربية', maxScore: 80, minScore: 40 },
    { id: 'eng', name: 'اللغة الأجنبية الأولى', maxScore: 50, minScore: 25 },
    { id: 'sec_lang', name: 'اللغة الأجنبية الثانية', maxScore: 40, minScore: 20 },
    { id: 'physics', name: 'الفيزياء', maxScore: 60, minScore: 30 },
    { id: 'chemistry', name: 'الكيمياء', maxScore: 60, minScore: 30 },
    { id: 'biology', name: 'الأحياء', maxScore: 60, minScore: 30 },
    { id: 'geology', name: 'الجيولوجيا والعلوم البيئية', maxScore: 60, minScore: 30 }
  ],
  science_math: [
    { id: 'arabic', name: 'اللغة العربية', maxScore: 80, minScore: 40 },
    { id: 'eng', name: 'اللغة الأجنبية الأولى', maxScore: 50, minScore: 25 },
    { id: 'sec_lang', name: 'اللغة الأجنبية الثانية', maxScore: 40, minScore: 20 },
    { id: 'physics', name: 'الفيزياء', maxScore: 60, minScore: 30 },
    { id: 'chemistry', name: 'الكيمياء', maxScore: 60, minScore: 30 },
    { id: 'pure_math', name: 'الرياضيات البحتة (جبر وهندسة فراغية وتفاضل وتكامل)', maxScore: 60, minScore: 30 },
    { id: 'applied_math', name: 'الرياضيات التطبيقية (استاتيكا وديناميكا)', maxScore: 60, minScore: 30 }
  ],
  literary: [
    { id: 'arabic', name: 'اللغة العربية', maxScore: 80, minScore: 40 },
    { id: 'eng', name: 'اللغة الأجنبية الأولى', maxScore: 50, minScore: 25 },
    { id: 'sec_lang', name: 'اللغة الأجنبية الثانية', maxScore: 40, minScore: 20 },
    { id: 'history', name: 'التاريخ', maxScore: 60, minScore: 30 },
    { id: 'geography', name: 'الجغرافيا', maxScore: 60, minScore: 30 },
    { id: 'philosophy', name: 'الفلسفة والمنطق', maxScore: 60, minScore: 30 },
    { id: 'psychology', name: 'علم النفس والاجتماع', maxScore: 60, minScore: 30 }
  ]
};

export const EDUCATIONAL_STAGES_LIST = [
  { id: 'thanawya_science', name: 'الثانوية العامة (علمي علوم)', category: 'thanawya' },
  { id: 'thanawya_math', name: 'الثانوية العامة (علمي رياضة)', category: 'thanawya' },
  { id: 'thanawya_literary', name: 'الثانوية العامة (القسم الأدبي)', category: 'thanawya' },
  { id: 'azhar_science', name: 'الثانوية الأزهرية (القسم العلمي)', category: 'azhar' },
  { id: 'azhar_literary', name: 'الثانوية الأزهرية (القسم الأدبي)', category: 'azhar' },
  { id: 'commercial_3', name: 'دبلوم التجارة (نظام 3 سنوات)', category: 'diploma' },
  { id: 'commercial_5', name: 'دبلوم التجارة (نظام 5 سنوات / متقدمة)', category: 'diploma' },
  { id: 'industrial_3', name: 'دبلوم الصناعة (نظام 3 سنوات)', category: 'diploma' },
  { id: 'industrial_5', name: 'دبلوم الصناعة (نظام 5 سنوات / مبارك كول)', category: 'diploma' },
  { id: 'agricultural', name: 'دبلوم الزراعة (نظام 3 و 5 سنوات)', category: 'diploma' },
  { id: 'tourism', name: 'دبلوم السياحة والفنادق', category: 'diploma' },
  { id: 'technological', name: 'المعاهد الفنية والتكنولوجية العليا', category: 'diploma' }
];

export const ALL_STAGES_DATABASE: Record<string, { name: string; minPercentage: number; type: string; location: string; notes: string }[]> = {
  thanawya_science: [
    { name: 'كلية الطب البشري - جامعة القاهرة (قصر العيني)', minPercentage: 91.3, type: 'حكومي', location: 'القاهرة', notes: 'الكلية العريقة الأولى للطب البشري' },
    { name: 'كلية طب الفم والأسنان - جامعة عين شمس', minPercentage: 90.8, type: 'حكومي', location: 'القاهرة', notes: 'مستشفيات تعليمية متطورة' },
    { name: 'كلية الصيدلة - جامعة القاهرة', minPercentage: 89.8, type: 'حكومي', location: 'الجيزة', notes: 'صيدلة إكلينيكية ودوائية' },
    { name: 'كلية العلاج الطبيعي - جامعة القاهرة', minPercentage: 89.2, type: 'حكومي', location: 'الجيزة', notes: 'تخصص مطلوب في سوق العمل' },
    { name: 'كلية الطب البيطري - جامعة القاهرة', minPercentage: 86.0, type: 'حكومي', location: 'الجيزة', notes: 'علوم ورعاية الحيوان' },
    { name: 'كلية التمريض - جامعة عين شمس', minPercentage: 84.5, type: 'حكومي', location: 'القاهرة', notes: 'مستقبل مهني واسع' },
    { name: 'كلية العلوم - جامعة القاهرة', minPercentage: 74.0, type: 'حكومي', location: 'الجيزة', notes: 'أقسام الكيمياء والبيولوجي' }
  ],
  thanawya_math: [
    { name: 'كلية الهندسة - جامعة القاهرة', minPercentage: 85.1, type: 'حكومي', location: 'الجيزة', notes: 'مدني، عمارة، حاسبات، اتصالات' },
    { name: 'كلية الهندسة - جامعة الإسكندرية', minPercentage: 84.5, type: 'حكومي', location: 'الإسكندرية', notes: 'برامج هندسية متميزة' },
    { name: 'كلية الحاسبات والمعلومات - جامعة عين شمس', minPercentage: 81.5, type: 'حكومي', location: 'القاهرة', notes: 'الذكاء الاصطناعي وعلوم الحاسب' },
    { name: 'كلية التخطيط العمراني - جامعة القاهرة', minPercentage: 79.0, type: 'حكومي', location: 'الجيزة', notes: 'تخطيط مدن وهندسة بيئية' },
    { name: 'كلية الفنون الجميلة (عمارة) - جامعة حلوان', minPercentage: 77.5, type: 'حكومي', location: 'الزمالك، القاهرة', notes: 'يشترط اختبارات القدرات' },
    { name: 'كلية تكنولوجيا الصناعة والطاقة - الجامعة التكنولوجية', minPercentage: 75.0, type: 'حكومي تكنولوجي', location: 'القاهرة الجديدة', notes: 'تخصصات تطبيقية حديثة' }
  ],
  thanawya_literary: [
    { name: 'كلية الاقتصاد والعلوم السياسية - جامعة القاهرة', minPercentage: 82.2, type: 'حكومي', location: 'الجيزة', notes: 'كلية النخبة والسياسة والدبلوماسية' },
    { name: 'كلية الألسن - جامعة عين شمس', minPercentage: 79.5, type: 'حكومي', location: 'القاهرة', notes: 'أقسام اللغات العالمية والترجمة' },
    { name: 'كلية الإعلام - جامعة القاهرة', minPercentage: 78.0, type: 'حكومي', location: 'الجيزة', notes: 'صحافة، إذاعة، وتلفزيون' },
    { name: 'كلية الآثار - جامعة القاهرة', minPercentage: 75.5, type: 'حكومي', location: 'الجيزة', notes: 'إرشاد أثري وترميم' },
    { name: 'كلية التجارة - جامعة القاهرة', minPercentage: 68.5, type: 'حكومي', location: 'الجيزة', notes: 'محاسبة وإدارة أعمال' },
    { name: 'كلية الآداب - جامعة القاهرة', minPercentage: 65.0, type: 'حكومي', location: 'الجيزة', notes: 'تاريخ، جغرافيا، لغات' }
  ],
  azhar_science: [
    { name: 'كلية الطب البشري بنين - جامعة الأزهر بالقاهرة', minPercentage: 93.5, type: 'أزهر حكومي', location: 'المرة، القاهرة', notes: 'طب الأزهر العريق' },
    { name: 'كلية الطب البشري بنين - دمياط', minPercentage: 91.7, type: 'أزهر حكومي', location: 'دمياط الجديدة', notes: 'مستشفى جامعة الأزهر بدمياط' },
    { name: 'كلية طب الأسنان بنين - القاهرة', minPercentage: 90.5, type: 'أزهر حكومي', location: 'القاهرة', notes: 'تخصص متميز' },
    { name: 'كلية الصيدلة بنين - القاهرة', minPercentage: 89.0, type: 'أزهر حكومي', location: 'القاهرة', notes: 'علوم صيدلانية متقدمة' },
    { name: 'كلية الهندسة بنين - القاهرة', minPercentage: 85.0, type: 'أزهر حكومي', location: 'مدينة نصر، القاهرة', notes: 'هندسة مدني وعمارة وميكانيكا' }
  ],
  azhar_literary: [
    { name: 'كلية اللغات والترجمة بنين - جامعة الأزهر', minPercentage: 78.0, type: 'أزهر حكومي', location: 'القاهرة', notes: 'أقسام اللغات الأجنبية الفورية' },
    { name: 'كلية الإعلام بنين - جامعة الأزهر', minPercentage: 76.5, type: 'أزهر حكومي', location: 'القاهرة', notes: 'صحافة وإعلام إسلامي' },
    { name: 'كلية الشريعة والقانون - جامعة الأزهر', minPercentage: 72.0, type: 'أزهر حكومي', location: 'القاهرة', notes: 'دراسات فقهية وقانونية مقارنة' },
    { name: 'كلية التجارة بنين - جامعة الأزهر', minPercentage: 67.0, type: 'أزهر حكومي', location: 'القاهرة', notes: 'إدارة أعمال وتجارة إسلامية' }
  ],
  commercial_3: [
    { name: 'كلية التكنولوجيا والتنمية - جامعة الزقازيق (شعبة تجارية)', minPercentage: 88.5, type: 'حكومي', location: 'الزقازيق', notes: 'متاح للشعبة التجارية مجموع مرتفع' },
    { name: 'المعهد العالي للعلوم الإدارية بالمنصورة', minPercentage: 75.0, type: 'خاص / معهد عالي', location: 'المنصورة', notes: 'يقبل دبلوم تجارة 3 سنوات بشروط' },
    { name: 'المعهد العالي للإدارة وعلوم الحاسب بدمياط', minPercentage: 72.5, type: 'خاص / معهد عالي', location: 'دمياط', notes: 'شعبة نظم معلومات إدارية' },
    { name: 'معهد عالي سياحة وفنادق الهرم', minPercentage: 70.0, type: 'خاص', location: 'الجيزة', notes: 'يقبل دبلوم تجارة وسياحة' }
  ],
  commercial_5: [
    { name: 'كلية التجارة (انتظام مباشر بشروط)', minPercentage: 85.0, type: 'حكومي', location: 'جامعات متعددة', notes: 'تخطي الفرقة الأولى أو الانتظام' },
    { name: 'كلية التكنولوجيا والتنمية (شعبة مالية وإدارية)', minPercentage: 82.0, type: 'حكومي', location: 'الزقازيق', notes: 'ممتاز لخريجي دبلوم 5 سنوات' }
  ],
  industrial_3: [
    { name: 'كلية التعليم الصناعي (جامعة بني سويف / حلوان)', minPercentage: 84.0, type: 'حكومي', location: 'بني سويف، القاهرة', notes: 'تخريج مهندسي التكنولوجيا التطبيقية' },
    { name: 'الجامعات التكنولوجية (تكنولوجيا الطاقة والصناعة)', minPercentage: 80.0, type: 'حكومي تكنولوجي', location: 'القاهرة الجديدة، قويسنا', notes: 'تنسيق خاص للدبلومات الصناعية' },
    { name: 'المعهد العالي للهندسة والتكنولوجيا الحديثة', minPercentage: 76.0, type: 'خاص', location: 'المرج، القاهرة', notes: 'يقبل دبلوم صناعي ثلاث سنوات' }
  ],
  industrial_5: [
    { name: 'كلية الهندسة (عبر مسابقة القبول المركزية)', minPercentage: 90.0, type: 'حكومي', location: 'جامعات القاهرة والجيزة', notes: 'يشترط اجتياز مسابقة القبول' },
    { name: 'كلية التعليم الصناعي (تخصصات هندسية)', minPercentage: 82.0, type: 'حكومي', location: 'حلوان', notes: 'مباشر بدون مسابقة لبعض الأقسام' }
  ],
  agricultural: [
    { name: 'كلية الزراعة (شعبة عامة / برامج مميزة)', minPercentage: 75.0, type: 'حكومي', location: 'القاهرة، الإسكندرية', notes: 'يقبل دبلوم الزراعة 3 سنوات' },
    { name: 'المعهد العالي للتعاون الزراعي بشبرا الخيمة', minPercentage: 68.0, type: 'حكومي / خاص', location: 'شبرا الخيمة', notes: 'معهد معتمد' }
  ],
  tourism: [
    { name: 'كلية السياحة والفنادق', minPercentage: 74.0, type: 'حكومي', location: 'الإسكندرية، الأقصر', notes: 'إرشاد سياحي وإدارة فنادق' },
    { name: 'المعهد العالي للسياحة والفنادق بالغردقة', minPercentage: 65.0, type: 'خاص', location: 'الغردقة', notes: 'فرص عمل واسعة' }
  ],
  technological: [
    { name: 'جامعة القاهرة الجديدة التكنولوجية', minPercentage: 78.0, type: 'حكومي', location: 'التجمع الخامس', notes: 'تكنولوجيا الطاقة والمعلومات' },
    { name: 'جامعة الدقهلية التكنولوجية', minPercentage: 76.0, type: 'حكومي', location: 'برج البرلس', notes: 'تكنولوجيا صناعية وتطبيقية' }
  ]
};
