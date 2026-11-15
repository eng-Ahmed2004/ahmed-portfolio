import type { Project } from "@/types";

/**
 * All portfolio projects.
 *
 * To add a project, append an object to this array — the Projects section,
 * the filter, and the details dialog pick it up automatically.
 *   - Only add `links.github` / `links.live` for real, public URLs.
 *   - Put screenshots in /public/images/projects/<slug>/ and list them in
 *     `screenshots`; without screenshots a generated cover is used.
 *   - The first project with `featured: true` gets the large showcase.
 */
export const projects: readonly Project[] = [
  {
    slug: "tilqaa",
    featured: true,
    category: "mobile",
    title: { en: "Tilqaa – تلقاء", ar: "تلقاء – Tilqaa" },
    context: { en: "Taqat Foundation · 2026", ar: "مؤسسة طاقات · 2026" },
    description: {
      en: "A smart digital platform designed to connect job seekers with organizations and opportunities. The platform aims to simplify the job discovery and application process through an intuitive user experience and intelligent features.",
      ar: "منصة رقمية ذكية تهدف إلى ربط الباحثين عن عمل بالمؤسسات والفرص المتاحة. تسعى المنصة إلى تبسيط رحلة اكتشاف الوظائف والتقديم عليها عبر تجربة استخدام سلسة وميزات ذكية.",
    },
    role: [
      { en: "Mobile Application Development", ar: "تطوير تطبيق الهاتف" },
      { en: "UI Implementation", ar: "تنفيذ واجهات المستخدم" },
      { en: "Flutter Development", ar: "التطوير باستخدام Flutter" },
      { en: "State Management", ar: "إدارة الحالة" },
      { en: "API Integration Architecture", ar: "هيكلة التكامل مع الـ API" },
      { en: "Exploring AI-powered features", ar: "استكشاف ميزات مدعومة بالذكاء الاصطناعي" },
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "REST APIs",
      "SQLite",
      "Git",
      "GitHub",
      "Figma",
      "AI Development Tools",
    ],
    links: {},
    cover: { icon: "briefcase", pattern: "rings", hue: -18 },
    // Captured from the Tilqaa app design in Figma. The first three are
    // shown in the featured showcase; all of them appear in the details dialog.
    screenshots: [
      {
        src: "/images/projects/tilqaa/organization-dashboard.webp",
        width: 780,
        height: 1695,
        alt: {
          en: "Tilqaa organization dashboard with active opportunities, new applications, and quick actions",
          ar: "لوحة المؤسسة في تلقاء تعرض الفرص النشطة والطلبات الجديدة والوصول السريع",
        },
      },
      {
        src: "/images/projects/tilqaa/opportunities.webp",
        width: 780,
        height: 1696,
        alt: {
          en: "Tilqaa opportunities screen listing an organization's published roles",
          ar: "شاشة الفرص في تلقاء تعرض الوظائف المنشورة للمؤسسة",
        },
      },
      {
        src: "/images/projects/tilqaa/application-status.webp",
        width: 780,
        height: 1696,
        alt: {
          en: "Tilqaa application details screen showing the progress of a job application",
          ar: "شاشة تفاصيل الطلب في تلقاء تعرض مراحل تقدّم طلب التوظيف",
        },
      },
      {
        src: "/images/projects/tilqaa/applicant-profile.webp",
        width: 780,
        height: 1696,
        alt: {
          en: "Tilqaa applicant profile screen with skills, CV, and application answers",
          ar: "شاشة ملف المتقدّم في تلقاء تعرض المهارات والسيرة الذاتية وإجابات التقديم",
        },
      },
      {
        src: "/images/projects/tilqaa/opportunity-applications.webp",
        width: 780,
        height: 1696,
        alt: {
          en: "Tilqaa screen listing the applicants for an opportunity",
          ar: "شاشة طلبات الفرصة في تلقاء تعرض قائمة المتقدّمين",
        },
      },
      {
        src: "/images/projects/tilqaa/notifications.webp",
        width: 780,
        height: 1696,
        alt: {
          en: "Tilqaa notifications screen with application updates and interview reminders",
          ar: "شاشة الإشعارات في تلقاء تعرض تحديثات الطلبات وتذكيرات المقابلات",
        },
      },
    ],
  },
  {
    slug: "gdg-on-campus",
    category: "community",
    title: {
      en: "GDG on Campus – Al-Aqsa University",
      ar: "GDG on Campus – جامعة الأقصى",
    },
    context: { en: "Community · 2026 – Present", ar: "مجتمع تقني · 2026 – الآن" },
    description: {
      en: "Contributing to the technical community at Al-Aqsa University through technical activities, collaborative initiatives, and practical learning experiences.",
      ar: "أساهم في المجتمع التقني بجامعة الأقصى عبر الأنشطة التقنية والمبادرات التعاونية وتجارب التعلّم العملي.",
    },
    role: [
      { en: "Technical Team Member", ar: "عضو الفريق التقني" },
      { en: "Technical Session Presenter", ar: "مقدّم جلسة تقنية" },
    ],
    highlightsKind: "activities",
    highlights: [
      { en: "Technical team participation", ar: "المشاركة في الفريق التقني" },
      { en: "Git & GitHub workshop", ar: "ورشة Git و GitHub" },
      { en: "Student technical engagement", ar: "تفاعل تقني مع الطلبة" },
      { en: "Collaborative technology initiatives", ar: "مبادرات تقنية تعاونية" },
    ],
    technologies: ["Git", "GitHub", "Community", "Workshops"],
    links: {},
    cover: { icon: "users", pattern: "nodes", hue: 8 },
  },
  {
    slug: "exploring-ai",
    category: "ai-data",
    title: {
      en: "Exploring AI in Software Development",
      ar: "استكشاف الذكاء الاصطناعي في تطوير البرمجيات",
    },
    context: { en: "Ongoing explorations", ar: "استكشافات مستمرة" },
    badge: { en: "Technical explorations", ar: "تجارب تقنية" },
    description: {
      en: "Exploring modern AI tools, frameworks, and development workflows to improve productivity and build intelligent software solutions. This is a collection of technical experiments and explorations rather than a finished product.",
      ar: "أستكشف أدوات الذكاء الاصطناعي الحديثة وأطر العمل وسير التطوير لرفع الإنتاجية وبناء حلول برمجية ذكية. هذه مجموعة من التجارب والاستكشافات التقنية وليست منتجاً مكتملاً.",
    },
    role: [
      { en: "Exploring AI integrations", ar: "استكشاف تكاملات الذكاء الاصطناعي" },
      { en: "Experimenting with development workflows", ar: "تجربة أساليب وسير عمل التطوير" },
      {
        en: "Applying AI tools to practical software projects",
        ar: "تطبيق أدوات الذكاء الاصطناعي على مشاريع برمجية عملية",
      },
    ],
    technologies: ["Python", "LangChain", "Claude API", "Anthropic Tools", "Generative AI"],
    links: {},
    cover: { icon: "sparkles", pattern: "waves", hue: -28 },
  },
  {
    slug: "clinic-appointment-system",
    category: "mobile",
    title: {
      en: "Clinic Appointment Management System",
      ar: "نظام إدارة مواعيد العيادات",
    },
    context: { en: "Flutter · .NET", ar: "Flutter · .NET" },
    description: {
      en: "A cross-platform clinic application built with Flutter and integrated with a .NET backend through REST APIs, covering patient management, appointment scheduling, and a dedicated receptionist interface for daily front-desk work.",
      ar: "تطبيق عيادات متعدد المنصات مبني بـ Flutter ومتكامل مع خادم ‎.NET عبر REST APIs، يغطي إدارة المرضى وجدولة المواعيد وواجهة مخصصة لموظف الاستقبال لتسهيل العمل اليومي.",
    },
    role: [
      { en: "Application design and development", ar: "تصميم التطبيق وتطويره" },
      { en: "REST API integration with the .NET backend", ar: "التكامل مع خادم ‎.NET عبر REST API" },
      { en: "Clean architecture and state management", ar: "المعمارية النظيفة وإدارة الحالة" },
    ],
    highlightsKind: "features",
    highlights: [
      { en: "Patient management and appointment scheduling", ar: "إدارة المرضى وجدولة المواعيد" },
      { en: "Secure authentication and login", ar: "مصادقة وتسجيل دخول آمن" },
      { en: "Daily and weekly reports", ar: "تقارير يومية وأسبوعية" },
      { en: "Full Arabic and English localization", ar: "دعم كامل للعربية والإنجليزية" },
      { en: "Backup and restore over a local SQLite database", ar: "نسخ احتياطي واستعادة عبر قاعدة SQLite محلية" },
    ],
    technologies: ["Flutter", "Dart", ".NET", "REST API", "SQLite", "Git"],
    links: {},
    privateRepo: true,
    cover: { icon: "stethoscope", pattern: "grid", hue: -6 },
  },
  {
    slug: "student-management-app",
    category: "mobile",
    title: { en: "Student Management App", ar: "تطبيق إدارة الطلبة" },
    context: {
      en: "Mobile Application Development course",
      ar: "مساق تطوير تطبيقات الهاتف",
    },
    description: {
      en: "A Flutter app for managing student records, with full CRUD on a local SQLite database, search by name, and a login session and theme preference that persist between launches. Built as the final project for a Mobile Application Development course.",
      ar: "تطبيق Flutter لإدارة سجلات الطلبة، يتضمن عمليات CRUD كاملة على قاعدة SQLite محلية، والبحث بالاسم، وجلسة دخول وتفضيل للمظهر يُحفظان بين مرات التشغيل. أنجزته كمشروع نهائي لمساق تطوير تطبيقات الهاتف.",
    },
    role: [
      { en: "Application development", ar: "تطوير التطبيق" },
      { en: "Local database design with SQLite", ar: "تصميم قاعدة البيانات المحلية بـ SQLite" },
      { en: "UI with light and dark themes", ar: "واجهات بمظهرين فاتح وداكن" },
    ],
    highlightsKind: "features",
    highlights: [
      { en: "Add, view, edit, and delete student records", ar: "إضافة وعرض وتعديل وحذف سجلات الطلبة" },
      { en: "Search students by name", ar: "البحث عن الطلبة بالاسم" },
      { en: "Login session that persists between launches", ar: "جلسة دخول تبقى محفوظة بين مرات التشغيل" },
      { en: "Dark mode remembered across restarts", ar: "وضع داكن يُحفظ بعد إعادة التشغيل" },
    ],
    technologies: ["Flutter", "Dart", "SQLite", "sqflite", "SharedPreferences"],
    links: { github: "https://github.com/eng-Ahmed2004/student-management-app" },
    cover: { icon: "graduationCap", pattern: "dots", hue: 6 },
  },
  {
    slug: "phone-compare-pro",
    category: "web",
    title: { en: "Phone Compare Pro", ar: "Phone Compare Pro" },
    context: { en: "HTML · CSS · JavaScript", ar: "HTML · CSS · JavaScript" },
    description: {
      en: "A responsive phone comparison website built with plain HTML, CSS, and JavaScript — no frameworks and no build step. Filter and sort devices, then compare two phones side by side.",
      ar: "موقع متجاوب لمقارنة الهواتف مبني بـ HTML و CSS و JavaScript فقط، بلا أطر عمل ولا خطوة بناء. يمكن تصفية الأجهزة وترتيبها ثم مقارنة هاتفين جنباً إلى جنب.",
    },
    role: [
      { en: "Front-end design and development", ar: "تصميم وتطوير الواجهة الأمامية" },
      { en: "Filtering, comparison, and favourites logic", ar: "منطق التصفية والمقارنة والمفضلة" },
    ],
    highlightsKind: "features",
    highlights: [
      { en: "Filter by brand and price range", ar: "التصفية حسب العلامة التجارية ونطاق السعر" },
      { en: "Sort by price, battery capacity, or rating", ar: "الترتيب حسب السعر أو سعة البطارية أو التقييم" },
      { en: "Side-by-side comparison of two phones", ar: "مقارنة هاتفين جنباً إلى جنب" },
      { en: "Favourites saved in the browser", ar: "مفضلة تُحفظ في المتصفح" },
      { en: "Dark mode and a responsive layout", ar: "وضع داكن وتصميم متجاوب" },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "localStorage"],
    links: {
      github: "https://github.com/eng-Ahmed2004/phone-compare-pro",
      live: "https://eng-ahmed2004.github.io/phone-compare-pro/",
    },
    cover: { icon: "layers", pattern: "grid", hue: -34 },
  },
  {
    slug: "customer-personality-analysis",
    category: "ai-data",
    title: { en: "Customer Personality Analysis", ar: "تحليل شخصية العملاء" },
    context: { en: "Machine learning · Python", ar: "تعلّم الآلة · Python" },
    description: {
      en: "Supervised and unsupervised machine learning on a marketing dataset of 2,240 customers: spending regression, campaign-response classification, and K-Means customer segmentation with scikit-learn.",
      ar: "تعلّم آلة موجَّه وغير موجَّه على مجموعة بيانات تسويقية تضم 2,240 عميلاً: انحدار للتنبؤ بالإنفاق، وتصنيف للاستجابة للحملات، وتقسيم العملاء بخوارزمية K-Means باستخدام scikit-learn.",
    },
    role: [
      { en: "Data preprocessing and feature engineering", ar: "معالجة البيانات وهندسة الخصائص" },
      { en: "Model training and evaluation", ar: "تدريب النماذج وتقييمها" },
    ],
    highlightsKind: "focus",
    highlights: [
      { en: "Preprocessing, encoding, and feature engineering", ar: "المعالجة المسبقة والترميز وهندسة الخصائص" },
      { en: "Regression: Linear, Ridge, and Decision Tree", ar: "الانحدار: Linear و Ridge و Decision Tree" },
      {
        en: "Classification: Logistic Regression, KNN, and Random Forest",
        ar: "التصنيف: Logistic Regression و KNN و Random Forest",
      },
      {
        en: "K-Means clustering with the elbow method and PCA visualisation",
        ar: "تجميع K-Means مع طريقة الكوع وتمثيل PCA",
      },
    ],
    technologies: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    links: { github: "https://github.com/eng-Ahmed2004/customer-personality-analysis" },
    cover: { icon: "brain", pattern: "nodes", hue: -16 },
  },
  {
    slug: "house-prices-preprocessing",
    category: "ai-data",
    title: { en: "House Prices Preprocessing", ar: "معالجة بيانات أسعار المنازل" },
    context: { en: "Data preparation · Python", ar: "تجهيز البيانات · Python" },
    description: {
      en: "A data preparation pipeline for the Kaggle House Prices dataset that takes the raw training and test files and produces clean, fully numeric tables ready for modeling.",
      ar: "مسار لتجهيز بيانات مسابقة House Prices على Kaggle، يحوّل ملفات التدريب والاختبار الخام إلى جداول نظيفة ورقمية بالكامل جاهزة لبناء النماذج.",
    },
    role: [
      { en: "Data cleaning and exploratory analysis", ar: "تنظيف البيانات والتحليل الاستكشافي" },
      { en: "Feature engineering and encoding", ar: "هندسة الخصائص والترميز" },
    ],
    highlightsKind: "focus",
    highlights: [
      { en: "Memory optimisation through column type conversion", ar: "تحسين استهلاك الذاكرة بتحويل أنواع الأعمدة" },
      { en: "Missing-value handling and outlier removal", ar: "معالجة القيم المفقودة وإزالة القيم الشاذة" },
      { en: "Exploratory analysis with Matplotlib and Seaborn", ar: "تحليل استكشافي باستخدام Matplotlib و Seaborn" },
      {
        en: "Train and test sets aligned on the same features",
        ar: "توحيد خصائص مجموعتي التدريب والاختبار",
      },
    ],
    technologies: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    links: { github: "https://github.com/eng-Ahmed2004/house-prices-preprocessing" },
    cover: { icon: "barChart", pattern: "waves", hue: -22 },
  },
];

export const featuredProject = projects.find((project) => project.featured);
export const otherProjects = projects.filter((project) => project !== featuredProject);
