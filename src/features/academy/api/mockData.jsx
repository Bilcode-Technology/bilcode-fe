import BadgeFirstStep from '../components/common/BadgeFirstStep';
import BadgeFiveTopics from '../components/common/BadgeFiveTopics';
import BadgeCourseComplete from '../components/common/BadgeCourseComplete';
import { Book, Map, Users, Award, Calendar, MessageCircle, Video, FileText, Code, Trophy, Star, Zap, Target, Clock, Globe } from 'lucide-react';

// --- EXPANDED MOCK DATABASE ---

export const INSTRUCTORS = [
  { 
    id: 1, 
    name: 'John Doe', 
    title: 'Pengembang Frontend', 
    subtitle: 'Spesialisasi dalam React dan Next.js', 
    image: '/member1.jpeg', 
    portfolio: '#', 
    social: { twitter: '#', linkedin: '#', github: '#' },
    bio: 'John adalah seorang frontend developer dengan 8+ tahun pengalaman membangun aplikasi web modern. Ia telah bekerja di berbagai startup dan perusahaan teknologi besar.',
    expertise: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    coursesCount: 3,
    studentsCount: 5847,
    rating: 4.9,
    yearsExperience: 8,
    languages: ['Indonesia', 'English'],
    location: 'Jakarta, Indonesia'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    title: 'Pengembang Backend', 
    subtitle: 'Ahli dalam Node.js dan Express', 
    image: '/member2.jpeg', 
    portfolio: '#', 
    social: { twitter: '#', linkedin: '#', github: '#' },
    bio: 'Jane adalah backend engineer yang passionate tentang arsitektur sistem dan database optimization. Pengalaman 10+ tahun di industri teknologi.',
    expertise: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
    coursesCount: 2,
    studentsCount: 4200,
    rating: 4.8,
    yearsExperience: 10,
    languages: ['Indonesia', 'English'],
    location: 'Bandung, Indonesia'
  },
  { 
    id: 3, 
    name: 'Peter Jones', 
    title: 'Perancang UI/UX', 
    subtitle: 'Suka membuat antarmuka yang indah dan intuitif', 
    image: '/member1.jpeg', 
    portfolio: '#', 
    social: { twitter: '#', linkedin: '#', dribbble: '#' },
    bio: 'Peter adalah UI/UX designer dengan passion untuk menciptakan pengalaman digital yang meaningful. Berpengalaman 6+ tahun di berbagai agensi kreatif.',
    expertise: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'User Research', 'Prototyping'],
    coursesCount: 2,
    studentsCount: 3100,
    rating: 4.9,
    yearsExperience: 6,
    languages: ['Indonesia', 'English'],
    location: 'Yogyakarta, Indonesia'
  },
  { 
    id: 4, 
    name: 'Rizky Eka Haryadi', 
    title: 'Pengembang Mobile', 
    subtitle: 'Membangun aplikasi luar biasa dengan Flutter', 
    image: '/member2.jpeg', 
    portfolio: 'https://ekaportfolio.vercel.app/', 
    social: { twitter: '#', linkedin: '#', github: '#' },
    bio: 'Rizky adalah mobile developer yang fokus pada pengembangan cross-platform apps. Telah mengembangkan 20+ aplikasi mobile untuk berbagai klien.',
    expertise: ['Flutter', 'Dart', 'Firebase', 'React Native', 'Kotlin', 'Swift'],
    coursesCount: 3,
    studentsCount: 2800,
    rating: 4.7,
    yearsExperience: 5,
    languages: ['Indonesia', 'English'],
    location: 'Surabaya, Indonesia'
  },
  {
    id: 5,
    name: 'Sarah Wilson',
    title: 'Data Scientist & AI Engineer',
    subtitle: 'Mengubah data menjadi insight yang berharga',
    image: '/member1.jpeg',
    portfolio: '#',
    social: { twitter: '#', linkedin: '#', github: '#' },
    bio: 'Sarah adalah data scientist dengan 7+ tahun pengalaman dalam machine learning dan AI. Ahli dalam Python, statistical analysis, dan deep learning.',
    expertise: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'Scikit-learn'],
    coursesCount: 4,
    studentsCount: 3500,
    rating: 4.8,
    yearsExperience: 7,
    languages: ['Indonesia', 'English'],
    location: 'Bali, Indonesia'
  },
  {
    id: 6,
    name: 'Ahmad Rahman',
    title: 'DevOps Engineer',
    subtitle: 'Automation dan Cloud Infrastructure Specialist',
    image: '/member2.jpeg',
    portfolio: '#',
    social: { twitter: '#', linkedin: '#', github: '#' },
    bio: 'Ahmad adalah DevOps engineer yang memiliki keahlian dalam automation, containerization, dan cloud technologies. Berpengalaman 9+ tahun.',
    expertise: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'Jenkins'],
    coursesCount: 3,
    studentsCount: 2100,
    rating: 4.9,
    yearsExperience: 9,
    languages: ['Indonesia', 'English'],
    location: 'Jakarta, Indonesia'
  }
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Budi Santoso', points: 12500, avatar: 'https://i.pravatar.cc/150?u=budi', level: 'Expert', badges: ['FIRST_STEP', 'FIVE_TOPICS', 'COURSE_COMPLETE'], streak: 45, coursesCompleted: 8 },
  { rank: 2, name: 'Ani Wijaya', points: 11800, avatar: 'https://i.pravatar.cc/150?u=ani', level: 'Advanced', badges: ['FIRST_STEP', 'FIVE_TOPICS'], streak: 32, coursesCompleted: 6 },
  { rank: 3, name: 'Rizky', points: 11500, avatar: 'https://i.pravatar.cc/150?u=rizky', level: 'Advanced', badges: ['FIRST_STEP', 'COURSE_COMPLETE'], streak: 28, coursesCompleted: 7 },
  { rank: 4, name: 'Citra Lestari', points: 10900, avatar: 'https://i.pravatar.cc/150?u=citra', level: 'Intermediate', badges: ['FIRST_STEP', 'FIVE_TOPICS'], streak: 21, coursesCompleted: 5 },
  { rank: 5, name: 'Dewi Anggraini', points: 10200, avatar: 'https://i.pravatar.cc/150?u=dewi', level: 'Intermediate', badges: ['FIRST_STEP'], streak: 18, coursesCompleted: 4 },
  { rank: 6, name: 'Eka Putra', points: 9800, avatar: 'https://i.pravatar.cc/150?u=eka', level: 'Intermediate', badges: ['FIRST_STEP', 'FIVE_TOPICS'], streak: 15, coursesCompleted: 4 },
  { rank: 7, name: 'Fajar Nugroho', points: 9500, avatar: 'https://i.pravatar.cc/150?u=fajar', level: 'Intermediate', badges: ['FIRST_STEP'], streak: 12, coursesCompleted: 3 },
  { rank: 8, name: 'Gita Permata', points: 9200, avatar: 'https://i.pravatar.cc/150?u=gita', level: 'Beginner', badges: ['FIRST_STEP'], streak: 9, coursesCompleted: 3 },
  { rank: 9, name: 'Hadi Prasetyo', points: 8800, avatar: 'https://i.pravatar.cc/150?u=hadi', level: 'Beginner', badges: ['FIRST_STEP'], streak: 7, coursesCompleted: 2 },
  { rank: 10, name: 'Indah Sari', points: 8500, avatar: 'https://i.pravatar.cc/150?u=indah', level: 'Beginner', badges: [], streak: 5, coursesCompleted: 2 },
];

export const COURSES = [
  {
    id: 1,
    title: 'Frontend Development with React & Next.js',
    description: 'Master frontend development with React and Next.js to build modern, fast, and interactive web applications.',
    level: 'Pemula',
    category: 'Programming',
    tags: ['React', 'Next.js', 'JavaScript', 'Frontend'],
    href: '/academy/course/frontend-react',
    slug: 'frontend-react',
    image: '/portfolio/Macbook Pro - Govita.jpg',
    author: 'John Doe',
    authorId: 1,
    price: 89,
    originalPrice: 129,
    score: 4.9,
    reviews: [
      { id: 1, name: 'Ahmad', rating: 5, comment: 'Kursus yang luar biasa! Penjelasannya sangat mudah diikuti.', date: '2025-08-20' },
      { id: 2, name: 'Budi', rating: 4, comment: 'Materi lengkap, tapi akan lebih baik jika ada lebih banyak studi kasus.', date: '2025-08-18' },
      { id: 3, name: 'Citra', rating: 5, comment: 'Sangat membantu untuk pemula seperti saya. Terima kasih!', date: '2025-08-15' },
    ],
    students: 2847,
    duration: "12 jam",
    releaseDate: "2025-08-15",
    lastUpdated: "2025-09-01",
    specialOffer: true,
    language: 'Bahasa Indonesia',
    prerequisites: ['HTML dasar', 'CSS dasar', 'JavaScript dasar'],
    learningOutcomes: [
      'Memahami konsep dasar React dan komponen',
      'Menguasai state management dengan hooks',
      'Membangun aplikasi dengan Next.js',
      'Mengoptimalkan performa aplikasi React'
    ],
    difficulty: 1,
    certificationIncluded: true,
    curriculum: [
      {
        section: 'Introduction',
        topics: [
          { title: 'Welcome to the course!', type: 'video', duration: '5:30', completed: false },
          { title: 'Setting up your environment', type: 'video', duration: '12:15', completed: false },
        ],
      },
      {
        section: 'React Fundamentals',
        topics: [
          { title: 'Components and Props', type: 'video', duration: '25:00', completed: false },
          { title: 'State and Lifecycle', type: 'video', duration: '30:10', completed: false },
          { 
            title: 'React Fundamentals Quiz', 
            type: 'quiz',
            completed: false,
            quizData: {
              title: 'React Fundamentals Quiz',
              questions: [
                { 
                  question: 'What is JSX?', 
                  choices: ['A JavaScript syntax extension', 'A templating language', 'A CSS preprocessor', 'A database query language'], 
                  correctAnswer: 0,
                  explanation: 'JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.'
                },
                { 
                  question: 'How do you pass data to a component from its parent?', 
                  choices: ['state', 'props', 'context', 'redux'], 
                  correctAnswer: 1,
                  explanation: 'Data is passed from a parent component to a child component via "props" (short for properties).'
                },
              ],
            }
          },
        ],
      },
      {
        section: 'Advanced React',
        topics: [
          { title: 'Context API', type: 'video', duration: '20:00', completed: false },
          { title: 'Custom Hooks', type: 'video', duration: '18:30', completed: false },
          { title: 'Performance Optimization', type: 'video', duration: '25:45', completed: false },
        ],
      },
    ],
  },
  { 
    id: 2, 
    title: 'Backend Development with Express', 
    slug: 'backend-express', 
    description: 'Learn to build robust and scalable APIs and backend services using Node.js and Express.', 
    level: 'Menengah', 
    category: 'Programming',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    href: '/academy/course/backend-express', 
    image: '/portfolio/Macbook Pro - Carbon Trade.jpg', 
    author: 'Jane Smith', 
    authorId: 2,
    price: 99, 
    originalPrice: 149, 
    score: 5, 
    reviews: [
      { id: 1, name: 'Citra', rating: 5, comment: 'Sangat direkomendasikan! Instruktur menjelaskan konsep-konsep sulit dengan cara yang sederhana.', date: '2025-09-02' }
    ], 
    students: 3421, 
    duration: "15 jam", 
    releaseDate: "2025-09-01", 
    lastUpdated: "2025-09-03",
    specialOffer: true, 
    language: 'Bahasa Indonesia',
    prerequisites: ['JavaScript menengah', 'Pemahaman dasar HTTP'],
    learningOutcomes: [
      'Membangun REST API dengan Express',
      'Mengelola database dengan MongoDB',
      'Implementasi authentication & authorization',
      'Deploy aplikasi ke cloud platform'
    ],
    difficulty: 2,
    certificationIncluded: true,
    curriculum: [
      {
        section: 'Introduction to Node.js & Express',
        topics: [
          { title: 'Node.js Overview', type: 'video', duration: '15:00', completed: false },
          { title: 'Setting up Express Server', type: 'video', duration: '20:00', completed: false },
          { title: 'Routing Basics', type: 'video', duration: '25:00', completed: false },
        ],
      },
      {
        section: 'API Development',
        topics: [
          { title: 'Building a RESTful API', type: 'video', duration: '45:00', completed: false },
          { title: 'Handling POST, PUT, DELETE requests', type: 'video', duration: '40:00', completed: false },
          { title: 'Middleware Explained', type: 'video', duration: '30:00', completed: false },
        ],
      },
      {
        section: 'Database Integration',
        topics: [
          { title: 'Connecting to MongoDB with Mongoose', type: 'video', duration: '35:00', completed: false },
          { title: 'CRUD Operations', type: 'video', duration: '50:00', completed: false },
          { title: 'Database Schema Design', type: 'article', duration: '15:00', completed: false },
        ],
      },
    ] 
  },
  { 
    id: 3, 
    title: 'Fullstack Development with Next.js & Express', 
    slug: 'fullstack-nextjs', 
    description: 'Become a fullstack developer by combining the power of Next.js for the frontend and Express for the backend.', 
    level: 'Lanjutan', 
    category: 'Programming',
    tags: ['Next.js', 'Express', 'Fullstack', 'React'],
    href: '/academy/course/fullstack-nextjs', 
    image: '/portfolio/Macbook Pro - Kandidatpro.jpg', 
    author: 'John Doe', 
    authorId: 1,
    price: 99, 
    originalPrice: 149, 
    score: 5, 
    reviews: [], 
    students: 2150, 
    duration: "18 jam", 
    releaseDate: "2025-07-20", 
    lastUpdated: "2025-08-15",
    specialOffer: true, 
    language: 'Bahasa Indonesia',
    prerequisites: ['React fundamentals', 'Node.js basics', 'Database basics'],
    learningOutcomes: [
      'Membangun aplikasi fullstack modern',
      'Integrasi frontend dan backend',
      'State management untuk aplikasi besar',
      'Testing dan deployment strategies'
    ],
    difficulty: 3,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Fullstack Architecture',
            topics: [
                { title: 'Monorepo vs. Polyrepo', type: 'video', duration: '18:00', completed: false },
                { title: 'Connecting Next.js with Express API', type: 'video', duration: '30:00', completed: false },
            ],
        },
        {
            section: 'Advanced State Management',
            topics: [
                { title: 'React Query for Server State', type: 'video', duration: '40:00', completed: false },
                { title: 'Zustand for Global Client State', type: 'video', duration: '35:00', completed: false },
            ],
        },
        {
            section: 'Deployment',
            topics: [
                { title: 'Deploying Next.js to Vercel', type: 'video', duration: '25:00', completed: false },
                { title: 'Deploying Express API to Heroku', type: 'video', duration: '30:00', completed: false },
            ],
        },
    ] 
  },
  { 
    id: 4, 
    title: 'Mobile App Development with Flutter', 
    slug: 'mobile-flutter', 
    description: 'Build beautiful, natively compiled applications for mobile from a single codebase using Flutter, Kotlin, and Java.', 
    level: 'Menengah', 
    category: 'Mobile',
    tags: ['Flutter', 'Dart', 'Mobile', 'Cross-platform'],
    href: '/academy/course/mobile-flutter', 
    image: '/portfolio/Macbook Pro - PLN.jpg', 
    author: 'Rizky Eka Haryadi', 
    authorId: 4,
    price: 79, 
    originalPrice: 119, 
    score: 4.8, 
    reviews: [
      { id: 1, name: 'Dewi', rating: 5, comment: 'Penjelasan yang sangat baik tentang Flutter.', date: '2025-08-10' }, 
      { id: 2, name: 'Eka', rating: 4, comment: 'Bagus untuk pemula, tapi butuh lebih banyak contoh lanjutan.', date: '2025-08-08' }
    ], 
    students: 1589, 
    duration: "10 jam", 
    releaseDate: "2025-08-05", 
    lastUpdated: "2025-08-20",
    specialOffer: false, 
    language: 'Bahasa Indonesia',
    prerequisites: ['Programming basics', 'OOP concepts'],
    learningOutcomes: [
      'Membangun aplikasi mobile cross-platform',
      'Menguasai bahasa pemrograman Dart',
      'State management di Flutter',
      'Publishing ke App Store & Play Store'
    ],
    difficulty: 2,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Dart Fundamentals',
            topics: [
                { title: 'Introduction to Dart', type: 'video', duration: '20:00', completed: false },
                { title: 'Variables, Types, and Functions', type: 'video', duration: '30:00', completed: false },
                { title: 'Control Flow and Collections', type: 'video', duration: '25:00', completed: false },
            ],
        },
        {
            section: 'Flutter Widgets',
            topics: [
                { title: 'Stateless vs. Stateful Widgets', type: 'video', duration: '35:00', completed: false },
                { title: 'Layouts: Row, Column, Stack', type: 'video', duration: '45:00', completed: false },
                { title: 'Building a UI with Flutter', type: 'video', duration: '1:00:00', completed: false },
            ],
        },
        {
            section: 'State Management & Navigation',
            topics: [
                { title: 'Provider for State Management', type: 'video', duration: '40:00', completed: false },
                { title: 'Navigator 2.0 for Routing', type: 'video', duration: '50:00', completed: false },
            ],
        },
    ] 
  },
  { 
    id: 5, 
    title: 'Learn UI Design with Figma from Scratch', 
    slug: 'ui-design-figma', 
    description: 'Design intuitive and user-friendly interfaces that provide a great user experience.', 
    level: 'Pemula', 
    category: 'Design',
    tags: ['Figma', 'UI Design', 'UX', 'Prototyping'],
    href: '/academy/course/ui-design-figma', 
    image: '/portfolio/Macbook Pro - Kuliatul.jpg', 
    author: 'Peter Jones', 
    authorId: 3,
    price: 69, 
    originalPrice: 99, 
    score: 4.8, 
    reviews: [], 
    students: 1923, 
    duration: "8 jam", 
    releaseDate: "2025-09-05", 
    lastUpdated: "2025-09-06",
    specialOffer: true, 
    language: 'Bahasa Indonesia',
    prerequisites: ['Basic computer skills', 'Creative mindset'],
    learningOutcomes: [
      'Menguasai tools Figma untuk design',
      'Membuat wireframe dan prototype',
      'Prinsip-prinsip design yang baik',
      'Collaboration dengan developer'
    ],
    difficulty: 1,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Figma Basics',
            topics: [
                { title: 'Introduction to Figma Interface', type: 'video', duration: '15:00', completed: false },
                { title: 'Frames, Shapes, and Text', type: 'video', duration: '30:00', completed: false },
                { title: 'Using Auto Layout', type: 'video', duration: '40:00', completed: false },
            ],
        },
        {
            section: 'Design Principles',
            topics: [
                { title: 'Typography and Color Theory', type: 'video', duration: '35:00', completed: false },
                { title: 'Grid Systems and Spacing', type: 'video', duration: '30:00', completed: false },
            ],
        },
        {
            section: 'Prototyping & Collaboration',
            topics: [
                { title: 'Creating Interactive Prototypes', type: 'video', duration: '45:00', completed: false },
                { title: 'Developer Handoff', type: 'video', duration: '20:00', completed: false },
            ],
        },
    ] 
  },
  {
    id: 6,
    title: 'Data Science dengan Python',
    slug: 'data-science-python',
    description: 'Pelajari data science dari nol menggunakan Python, pandas, dan machine learning libraries.',
    level: 'Menengah',
    category: 'Data Science',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas'],
    href: '/academy/course/data-science-python',
    image: '/portfolio/Macbook Pro - Qurbanku.jpg',
    author: 'Sarah Wilson',
    authorId: 5,
    price: 129,
    originalPrice: 199,
    score: 4.9,
    reviews: [
      { id: 1, name: 'Fajar', rating: 5, comment: 'Kursus terbaik untuk belajar data science!', date: '2025-09-01' },
    ],
    students: 1245,
    duration: "20 jam",
    releaseDate: "2025-08-20",
    lastUpdated: "2025-09-02",
    specialOffer: true,
    language: 'Bahasa Indonesia',
    prerequisites: ['Python basics', 'Statistics basics', 'Mathematics'],
    learningOutcomes: [
      'Analisis data dengan pandas dan numpy',
      'Visualisasi data dengan matplotlib',
      'Machine learning fundamentals',
      'Build predictive models'
    ],
    difficulty: 2,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Python for Data Science',
            topics: [
                { title: 'NumPy for Numerical Data', type: 'video', duration: '45:00', completed: false },
                { title: 'Pandas for Data Manipulation', type: 'video', duration: '1:00:00', completed: false },
            ],
        },
        {
            section: 'Data Visualization',
            topics: [
                { title: 'Matplotlib for Basic Plotting', type: 'video', duration: '40:00', completed: false },
                { title: 'Seaborn for Statistical Plots', type: 'video', duration: '35:00', completed: false },
            ],
        },
        {
            section: 'Machine Learning with Scikit-learn',
            topics: [
                { title: 'Introduction to Scikit-learn', type: 'video', duration: '30:00', completed: false },
                { title: 'Building a Predictive Model', type: 'video', duration: '1:15:00', completed: false },
            ],
        },
    ]
  },
  {
    id: 7,
    title: 'DevOps Fundamentals dengan Docker & Kubernetes',
    slug: 'devops-docker-kubernetes',
    description: 'Kuasai containerization dan orchestration untuk deployment aplikasi modern.',
    level: 'Lanjutan',
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
    href: '/academy/course/devops-docker-kubernetes',
    image: '/portfolio/Macbook Pro - Govita.jpg',
    author: 'Ahmad Rahman',
    authorId: 6,
    price: 149,
    originalPrice: 199,
    score: 4.7,
    reviews: [],
    students: 890,
    duration: "16 jam",
    releaseDate: "2025-08-25",
    lastUpdated: "2025-09-03",
    specialOffer: true,
    language: 'Bahasa Indonesia',
    prerequisites: ['Linux basics', 'Command line', 'Web development basics'],
    learningOutcomes: [
      'Containerize applications dengan Docker',
      'Orchestration dengan Kubernetes',
      'CI/CD pipeline setup',
      'Monitoring dan logging'
    ],
    difficulty: 3,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Introduction to Docker',
            topics: [
                { title: 'What is Containerization?', type: 'video', duration: '20:00', completed: false },
                { title: 'Creating Dockerfiles', type: 'video', duration: '40:00', completed: false },
                { title: 'Managing Containers with Docker Compose', type: 'video', duration: '45:00', completed: false },
            ],
        },
        {
            section: 'Kubernetes Core Concepts',
            topics: [
                { title: 'Introduction to Kubernetes', type: 'video', duration: '30:00', completed: false },
                { title: 'Pods, Services, and Deployments', type: 'video', duration: '1:00:00', completed: false },
            ],
        },
        {
            section: 'CI/CD Pipeline',
            topics: [
                { title: 'Setting up a Jenkins Pipeline', type: 'video', duration: '50:00', completed: false },
                { title: 'Automating Deployment to Kubernetes', type: 'video', duration: '1:10:00', completed: false },
            ],
        },
    ]
  },
  {
    id: 8,
    title: 'Machine Learning untuk Pemula',
    slug: 'machine-learning-pemula',
    description: 'Mulai journey Anda dalam machine learning dengan pendekatan yang mudah dipahami.',
    level: 'Pemula',
    category: 'Data Science',
    tags: ['Machine Learning', 'AI', 'Python', 'Scikit-learn'],
    href: '/academy/course/machine-learning-pemula',
    image: '/portfolio/Macbook Pro - Carbon Trade.jpg',
    author: 'Sarah Wilson',
    authorId: 5,
    price: 99,
    originalPrice: 149,
    score: 4.8,
    reviews: [
      { id: 1, name: 'Gita', rating: 5, comment: 'Sangat mudah diikuti untuk pemula!', date: '2025-09-04' },
    ],
    students: 1678,
    duration: "14 jam",
    releaseDate: "2025-09-01",
    lastUpdated: "2025-09-04",
    specialOffer: false,
    language: 'Bahasa Indonesia',
    prerequisites: ['Python basics', 'Basic mathematics'],
    learningOutcomes: [
      'Memahami konsep machine learning',
      'Supervised vs unsupervised learning',
      'Model evaluation dan validation',
      'Build your first ML model'
    ],
    difficulty: 1,
    certificationIncluded: true,
    curriculum: [
        {
            section: 'Core Concepts',
            topics: [
                { title: 'What is Machine Learning?', type: 'video', duration: '15:00', completed: false },
                { title: 'Supervised vs. Unsupervised Learning', type: 'video', duration: '25:00', completed: false },
            ],
        },
        {
            section: 'Supervised Learning',
            topics: [
                { title: 'Linear Regression', type: 'video', duration: '40:00', completed: false },
                { title: 'Classification with Logistic Regression', type: 'video', duration: '45:00', completed: false },
            ],
        },
        {
            section: 'Model Evaluation',
            topics: [
                { title: 'Training and Test Sets', type: 'video', duration: '30:00', completed: false },
                { title: 'Understanding Confusion Matrix', type: 'video', duration: '35:00', completed: false },
            ],
        },
    ]
  }
];

export const LEARNING_PATHS = [
  { 
    id: 'frontend-developer', 
    title: 'Jalur Frontend Developer', 
    description: 'Kuasai seni membangun antarmuka web yang modern, interaktif, dan responsif dari awal hingga mahir.',
    icon: <Code />,
    difficulty: 'Pemula - Lanjutan',
    duration: '3-6 bulan',
    students: 4521,
    rating: 4.8,
    courses: [1, 5, 3],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'UI/UX Design'],
    careerOutcomes: ['Frontend Developer', 'React Developer', 'UI Developer'],
    averageSalary: 'Rp 8-15 juta/bulan'
  },
  { 
    id: 'backend-developer', 
    title: 'Jalur Backend Developer', 
    description: 'Belajar membangun server, API, dan database yang kuat dan skalabel untuk menjadi tulang punggung aplikasi web.',
    icon: <Globe />,
    difficulty: 'Menengah - Lanjutan',
    duration: '4-7 bulan',
    students: 3200,
    rating: 4.7,
    courses: [2, 3, 7],
    skills: ['Node.js', 'Express', 'Database', 'API Design', 'DevOps'],
    careerOutcomes: ['Backend Developer', 'API Developer', 'DevOps Engineer'],
    averageSalary: 'Rp 10-18 juta/bulan'
  },
  { 
    id: 'mobile-developer', 
    title: 'Jalur Mobile App Developer', 
    description: 'Selami dunia pengembangan aplikasi mobile dan buat aplikasi lintas platform yang indah dengan Flutter.',
    icon: <Users />,
    difficulty: 'Menengah',
    duration: '3-5 bulan',
    students: 2100,
    rating: 4.6,
    courses: [4],
    skills: ['Flutter', 'Dart', 'Mobile UI', 'State Management', 'App Store'],
    careerOutcomes: ['Mobile Developer', 'Flutter Developer', 'App Developer'],
    averageSalary: 'Rp 9-16 juta/bulan'
  },
  {
    id: 'data-scientist',
    title: 'Jalur Data Scientist',
    description: 'Transformasikan data menjadi insight yang berharga dengan machine learning dan statistical analysis.',
    icon: <Trophy />,
    difficulty: 'Menengah - Lanjutan',
    duration: '6-9 bulan',
    students: 1800,
    rating: 4.9,
    courses: [6, 8],
    skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL'],
    careerOutcomes: ['Data Scientist', 'ML Engineer', 'Data Analyst'],
    averageSalary: 'Rp 12-25 juta/bulan'
  },
  {
    id: 'fullstack-developer',
    title: 'Jalur Fullstack Developer',
    description: 'Menjadi developer serba bisa yang dapat menangani frontend, backend, dan deployment aplikasi.',
    icon: <Zap />,
    difficulty: 'Menengah - Lanjutan',
    duration: '6-12 bulan',
    students: 3800,
    rating: 4.8,
    courses: [1, 2, 3, 7],
    skills: ['Frontend', 'Backend', 'Database', 'DevOps', 'System Design'],
    careerOutcomes: ['Fullstack Developer', 'Tech Lead', 'Software Engineer'],
    averageSalary: 'Rp 12-22 juta/bulan'
  }
];

export const BLOG_POSTS = [
    { 
      id: "1", 
      slug: "5-tips-memulai-karir-web-dev", 
      title: "5 Tips Memulai Karir di Dunia Web Development", 
      summary: "Dunia web development menawarkan jenjang karir yang menjanjikan. Berikut adalah 5 tips untuk memulai karir Anda di bidang ini.", 
      author: "Jane Smith", 
      authorId: 2,
      date: "2025-09-10", 
      readTime: "5 menit",
      views: 1250,
      likes: 89,
      tags: ["career", "web development", "tips"], 
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d1469c98?q=80&w=800&auto=format&fit=crop", 
      content: `<p>Konten lengkap...</p>`,
      featured: true
    },
    { 
      id: "2", 
      slug: "react-vs-vue-untuk-pemula", 
      title: "React vs Vue: Mana yang Sebaiknya Dipilih Pemula?", 
      summary: "React dan Vue adalah dua framework JavaScript paling populer. Mari kita bandingkan keduanya untuk pemula.", 
      author: "John Doe", 
      authorId: 1,
      date: "2025-09-05", 
      readTime: "8 menit",
      views: 980,
      likes: 67,
      tags: ["react", "vue", "web development", "comparison"], 
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop", 
      content: `<p>Konten lengkap...</p>`,
      featured: false
    },
    { 
      id: "3", 
      slug: "pentingnya-ui-ux", 
      title: "Pentingnya UI/UX dalam Pengembangan Aplikasi", 
      summary: "Desain User Interface (UI) dan User Experience (UX) adalah dua komponen krusial dalam pengembangan aplikasi modern.", 
      author: "Peter Jones", 
      authorId: 3,
      date: "2025-09-15", 
      readTime: "6 menit",
      views: 1450,
      likes: 112,
      tags: ["ui/ux", "design", "development", "user experience"], 
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop", 
      content: `<p>Konten lengkap...</p>`,
      featured: true
    },
    {
      id: "4",
      slug: "tren-teknologi-2025",
      title: "Tren Teknologi yang Wajib Diketahui di 2025",
      summary: "Tahun 2025 membawa berbagai tren teknologi baru yang akan mengubah landscape industri IT.",
      author: "Sarah Wilson",
      authorId: 5,
      date: "2025-09-12",
      readTime: "7 menit",
      views: 2100,
      likes: 156,
      tags: ["technology", "trends", "2025", "ai", "web3"],
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop",
      content: `<p>Konten lengkap...</p>`,
      featured: true
    },
    {
      id: "5",
      slug: "best-practices-docker-deployment",
      title: "Best Practices untuk Docker dalam Production",
      summary: "Panduan lengkap untuk mengoptimalkan container Docker di lingkungan production.",
      author: "Ahmad Rahman",
      authorId: 6,
      date: "2025-09-08",
      readTime: "10 menit",
      views: 850,
      likes: 73,
      tags: ["docker", "devops", "deployment", "best practices"],
      imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335a?q=80&w=800&auto=format&fit=crop",
      content: `<p>Konten lengkap...</p>`,
      featured: false
    },
    {
      id: "6",
      slug: "machine-learning-untuk-bisnis",
      title: "Bagaimana Machine Learning Mengubah Dunia Bisnis",
      summary: "Eksplorasi berbagai cara machine learning dapat meningkatkan efisiensi dan profitabilitas bisnis.",
      author: "Sarah Wilson",
      authorId: 5,
      date: "2025-09-06",
      readTime: "9 menit",
      views: 1300,
      likes: 94,
      tags: ["machine learning", "business", "ai", "automation"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      content: `<p>Konten lengkap...</p>`,
      featured: false
    },
    {
      id: "7",
      slug: "flutter-vs-react-native-2025",
      title: "Flutter vs React Native: Perbandingan Lengkap 2025",
      summary: "Analisis mendalam tentang kedua framework mobile development terpopuler saat ini.",
      author: "Rizky Eka Haryadi",
      authorId: 4,
      date: "2025-09-03",
      readTime: "12 menit",
      views: 1680,
      likes: 128,
      tags: ["flutter", "react native", "mobile development", "comparison"],
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      content: `<p>Konten lengkap...</p>`,
      featured: true
    }
];

export const QNA_DATA = [
    { 
      id: 1, 
      author: 'Budi Santoso', 
      avatar: 'https://i.pravatar.cc/150?u=budi', 
      question: 'Bagaimana cara terbaik untuk menangani state management di aplikasi React yang besar?', 
      timestamp: '2 hari yang lalu',
      tags: ['React', 'State Management'],
      votes: 15,
      views: 234,
      answers: [ 
        { 
          id: 1, 
          author: 'Rizky (Instruktur)', 
          avatar: 'https://i.pravatar.cc/150?u=instruktur', 
          answer: 'Pertanyaan bagus, Budi! Redux masih sangat relevan untuk aplikasi besar, tapi sekarang ada alternatif modern seperti Zustand dan Valtio yang lebih ringan. Untuk aplikasi React yang kompleks, saya rekomendasikan: 1) Gunakan Context API untuk global state yang sederhana, 2) Redux Toolkit untuk state yang kompleks dengan banyak action, 3) React Query untuk server state management. Yang penting adalah memilih tool yang sesuai dengan kompleksitas aplikasi Anda.', 
          timestamp: '1 hari yang lalu', 
          isInstructor: true,
          votes: 23,
          isAccepted: true
        },
        {
          id: 2,
          author: 'Ani Wijaya',
          avatar: 'https://i.pravatar.cc/150?u=ani',
          answer: 'Saya setuju dengan Rizky. Saya pribadi lebih suka menggunakan Zustand karena lebih simple dan boilerplate-nya sedikit.',
          timestamp: '12 jam yang lalu',
          isInstructor: false,
          votes: 8,
          isAccepted: false
        }
      ] 
    },
    { 
      id: 2, 
      author: 'Ani Wijaya', 
      avatar: 'https://i.pravatar.cc/150?u=ani', 
      question: 'Apakah kita harus selalu menggunakan `useEffect` untuk data fetching?', 
      timestamp: '5 hari yang lalu',
      tags: ['React', 'Hooks', 'Data Fetching'],
      votes: 12,
      views: 189,
      answers: [ 
        { 
          id: 1, 
          author: 'John (Instruktur)', 
          avatar: 'https://i.pravatar.cc/150?u=john', 
          answer: 'Betul sekali, Ani. Menggunakan `useEffect` untuk fetching data bisa jadi cukup rumit, terutama untuk handling loading states, error states, dan cleanup. Saya merekomendasikan menggunakan libraries seperti React Query atau SWR yang sudah menangani semua itu. Dengan React Query, kode jadi lebih bersih dan kita dapat fitur caching, background refetch, dan optimistic updates secara gratis.', 
          timestamp: '4 hari yang lalu', 
          isInstructor: true,
          votes: 18,
          isAccepted: true
        } 
      ] 
    },
    {
      id: 3,
      author: 'Citra Lestari',
      avatar: 'https://i.pravatar.cc/150?u=citra',
      question: 'Bagaimana cara deploy aplikasi Next.js ke production dengan optimal?',
      timestamp: '1 hari yang lalu',
      tags: ['Next.js', 'Deployment', 'Production'],
      votes: 8,
      views: 156,
      answers: [
        {
          id: 1,
          author: 'Ahmad (Instruktur)',
          avatar: 'https://i.pravatar.cc/150?u=ahmad',
          answer: 'Untuk deployment Next.js yang optimal, ada beberapa platform yang bisa dipilih: 1) Vercel (paling mudah, native support untuk Next.js), 2) Netlify (bagus untuk static sites), 3) AWS/Digital Ocean (lebih kontrol). Pastikan untuk mengoptimasi: image optimization, bundle analyzer untuk melihat ukuran bundle, dan gunakan ISR (Incremental Static Regeneration) untuk content yang sering berubah.',
          timestamp: '8 jam yang lalu',
          isInstructor: true,
          votes: 12,
          isAccepted: true
        }
      ]
    },
    {
      id: 4,
      author: 'Dewi Anggraini',
      avatar: 'https://i.pravatar.cc/150?u=dewi',
      question: 'Apakah Flutter cocok untuk aplikasi enterprise yang kompleks?',
      timestamp: '3 hari yang lalu',
      tags: ['Flutter', 'Enterprise', 'Mobile Development'],
      votes: 10,
      views: 203,
      answers: [
        {
          id: 1,
          author: 'Rizky (Instruktur)',
          avatar: 'https://i.pravatar.cc/150?u=rizky',
          answer: 'Absolutely! Flutter sangat cocok untuk enterprise apps. Google sendiri menggunakan Flutter untuk aplikasi internal mereka. Keuntungannya: 1) Single codebase untuk iOS & Android, 2) Performance mendekati native, 3) Rich ecosystem dengan package yang lengkap, 4) Hot reload untuk development yang cepat. Banyak perusahaan besar seperti Alibaba, BMW, dan Toyota sudah menggunakan Flutter untuk aplikasi production mereka.',
          timestamp: '2 hari yang lalu',
          isInstructor: true,
          votes: 15,
          isAccepted: true
        }
      ]
    }
];

export const BADGES = {
  FIRST_STEP: { 
    id: 'FIRST_STEP', 
    name: 'Langkah Pertama', 
    description: 'Selesaikan topik pertamamu.', 
    Icon: ({ className }) => <BadgeFirstStep className={className} />,
    points: 100,
    rarity: 'common'
  },
  FIVE_TOPICS: { 
    id: 'FIVE_TOPICS', 
    name: 'Pemanasan', 
    description: 'Selesaikan 5 topik.', 
    Icon: ({ className }) => <BadgeFiveTopics className={className} />,
    points: 250,
    rarity: 'common'
  },
  COURSE_COMPLETE: { 
    id: 'COURSE_COMPLETE', 
    name: 'Penamat Kursus', 
    description: 'Selesaikan seluruh topik dalam sebuah kursus.', 
    Icon: ({ className }) => <BadgeCourseComplete className={className} />,
    points: 500,
    rarity: 'uncommon'
  },
  STREAK_7: {
    id: 'STREAK_7',
    name: 'Konsisten Seminggu',
    description: 'Belajar selama 7 hari berturut-turut.',
    Icon: ({ className }) => <Calendar className={className} />,
    points: 300,
    rarity: 'uncommon'
  },
  STREAK_30: {
    id: 'STREAK_30',
    name: 'Dedikasi Sebulan',
    description: 'Belajar selama 30 hari berturut-turut.',
    Icon: ({ className }) => <Trophy className={className} />,
    points: 1000,
    rarity: 'rare'
  },
  QUIZ_MASTER: {
    id: 'QUIZ_MASTER',
    name: 'Master Kuis',
    description: 'Dapatkan skor sempurna di 10 kuis.',
    Icon: ({ className }) => <Target className={className} />,
    points: 400,
    rarity: 'uncommon'
  },
  SPEED_LEARNER: {
    id: 'SPEED_LEARNER',
    name: 'Pembelajar Cepat',
    description: 'Selesaikan kursus dalam waktu kurang dari waktu estimasi.',
    Icon: ({ className }) => <Zap className={className} />,
    points: 350,
    rarity: 'uncommon'
  },
  COMMUNITY_HELPER: {
    id: 'COMMUNITY_HELPER',
    name: 'Penolong Komunitas',
    description: 'Jawab 5 pertanyaan di forum diskusi.',
    Icon: ({ className }) => <Users className={className} />,
    points: 200,
    rarity: 'common'
  },
  PERFECT_STUDENT: {
    id: 'PERFECT_STUDENT',
    name: 'Siswa Teladan',
    description: 'Selesaikan semua assignment dengan nilai A.',
    Icon: ({ className }) => <Star className={className} />,
    points: 750,
    rarity: 'rare'
  },
  MARATHON_LEARNER: {
    id: 'MARATHON_LEARNER',
    name: 'Marathon Belajar',
    description: 'Belajar selama lebih dari 4 jam dalam sehari.',
    Icon: ({ className }) => <Clock className={className} />,
    points: 300,
    rarity: 'uncommon'
  }
};

export const CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', count: 8 },
  { id: 'programming', name: 'Programming', count: 3, icon: <Code /> },
  { id: 'design', name: 'Design', count: 1, icon: <FileText /> },
  { id: 'mobile', name: 'Mobile Development', count: 1, icon: <Users /> },
  { id: 'data-science', name: 'Data Science', count: 2, icon: <Trophy /> },
  { id: 'devops', name: 'DevOps', count: 1, icon: <Globe /> },
];

export const SKILLS = [
  // Programming Skills
  { id: 'javascript', name: 'JavaScript', category: 'programming', level: 'beginner' },
  { id: 'react', name: 'React', category: 'programming', level: 'intermediate' },
  { id: 'nextjs', name: 'Next.js', category: 'programming', level: 'intermediate' },
  { id: 'nodejs', name: 'Node.js', category: 'programming', level: 'intermediate' },
  { id: 'express', name: 'Express.js', category: 'programming', level: 'intermediate' },
  { id: 'typescript', name: 'TypeScript', category: 'programming', level: 'advanced' },
  
  // Mobile Skills
  { id: 'flutter', name: 'Flutter', category: 'mobile', level: 'intermediate' },
  { id: 'dart', name: 'Dart', category: 'mobile', level: 'intermediate' },
  { id: 'react-native', name: 'React Native', category: 'mobile', level: 'intermediate' },
  
  // Design Skills
  { id: 'figma', name: 'Figma', category: 'design', level: 'beginner' },
  { id: 'ui-design', name: 'UI Design', category: 'design', level: 'beginner' },
  { id: 'ux-design', name: 'UX Design', category: 'design', level: 'intermediate' },
  
  // Data Science Skills
  { id: 'python', name: 'Python', category: 'data-science', level: 'beginner' },
  { id: 'pandas', name: 'Pandas', category: 'data-science', level: 'intermediate' },
  { id: 'machine-learning', name: 'Machine Learning', category: 'data-science', level: 'advanced' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'data-science', level: 'advanced' },
  
  // DevOps Skills
  { id: 'docker', name: 'Docker', category: 'devops', level: 'intermediate' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', level: 'advanced' },
  { id: 'aws', name: 'AWS', category: 'devops', level: 'intermediate' },
  { id: 'cicd', name: 'CI/CD', category: 'devops', level: 'intermediate' },
];

export const EVENTS = [
  {
    id: 1,
    title: 'Webinar: Future of Web Development',
    description: 'Diskusi tentang tren dan teknologi terbaru dalam web development.',
    date: '2025-09-20',
    time: '19:00 WIB',
    duration: '90 menit',
    type: 'webinar',
    speaker: 'John Doe',
    speakerId: 1,
    participants: 450,
    maxParticipants: 500,
    isLive: false,
    registrationFee: 0,
    tags: ['Web Development', 'Technology Trends'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Workshop: Build Your First React App',
    description: 'Hands-on workshop untuk membuat aplikasi React dari nol hingga deployment.',
    date: '2025-09-25',
    time: '14:00 WIB',
    duration: '3 jam',
    type: 'workshop',
    speaker: 'Jane Smith',
    speakerId: 2,
    participants: 89,
    maxParticipants: 100,
    isLive: false,
    registrationFee: 50000,
    tags: ['React', 'Hands-on', 'Workshop'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Live Coding: Flutter Mobile App',
    description: 'Sesi live coding membangun aplikasi mobile dengan Flutter.',
    date: '2025-09-15',
    time: '20:00 WIB',
    duration: '2 jam',
    type: 'live-coding',
    speaker: 'Rizky Eka Haryadi',
    speakerId: 4,
    participants: 234,
    maxParticipants: 300,
    isLive: true,
    registrationFee: 0,
    tags: ['Flutter', 'Mobile', 'Live Coding'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
  }
];

export const NOTIFICATIONS = [
  {
    id: 1,
    type: 'course_update',
    title: 'Kursus Baru Tersedia!',
    message: 'Kursus "Machine Learning untuk Pemula" telah diluncurkan.',
    timestamp: '2025-09-04 10:30',
    isRead: false,
    actionUrl: '/academy/course/machine-learning-pemula'
  },
  {
    id: 2,
    type: 'badge_earned',
    title: 'Badge Baru Diperoleh!',
    message: 'Selamat! Anda telah mendapatkan badge "Langkah Pertama".',
    timestamp: '2025-09-03 15:45',
    isRead: true,
    actionUrl: '/dashboard/badges'
  },
  {
    id: 3,
    type: 'event_reminder',
    title: 'Event Reminder',
    message: 'Webinar "Future of Web Development" akan dimulai dalam 1 jam.',
    timestamp: '2025-09-04 18:00',
    isRead: false,
    actionUrl: '/academy/events/1'
  },
  {
    id: 4,
    type: 'assignment_due',
    title: 'Assignment Deadline',
    message: 'Assignment "React Fundamentals Quiz" akan berakhir dalam 2 hari.',
    timestamp: '2025-09-02 09:00',
    isRead: true,
    actionUrl: '/dashboard/assignments'
  }
];

export const PROGRESS_DATA = {
  userId: 1,
  totalCourses: 8,
  completedCourses: 2,
  inProgressCourses: 3,
  totalHoursLearned: 45,
  currentStreak: 12,
  longestStreak: 28,
  badgesEarned: 6,
  totalBadges: 10,
  skillsLearned: 15,
  level: 'Intermediate',
  points: 2450,
  rank: 156,
  certificates: [
    {
      id: 1,
      courseId: 1,
      courseName: 'Frontend Development with React & Next.js',
      issueDate: '2025-08-30',
      certificateUrl: '/certificates/react-frontend.pdf',
      instructor: 'John Doe'
    },
    {
      id: 2,
      courseId: 5,
      courseName: 'Learn UI Design with Figma from Scratch',
      issueDate: '2025-09-01',
      certificateUrl: '/certificates/figma-ui-design.pdf',
      instructor: 'Peter Jones'
    }
  ]
};

export const ACADEMY_NAV_ITEMS = [
    { 
      label: "Kursus", 
      type: "mega-menu", 
      megaMenuContent: { 
        layout: "industries-layout", 
        leftColumnCards: [ 
          { 
            icon: <Book />, 
            title: "Semua Kursus", 
            description: "Jelajahi katalog lengkap dari berbagai tingkat keahlian.", 
            bgColor: "bg-blue-500", 
            href: "/academy", 
            fullWidth: true, 
          }, 
          { 
            icon: <Map />, 
            title: "Jalur Belajar", 
            description: "Ikuti peta jalan terstruktur untuk mencapai tujuan karir Anda.", 
            bgColor: "bg-green-500", 
            href: "/academy/paths", 
          },
          {
            icon: <Trophy />,
            title: "Sertifikasi",
            description: "Dapatkan sertifikat resmi untuk memvalidasi keahlian Anda.",
            bgColor: "bg-purple-500",
            href: "/academy/certifications",
          }
        ], 
        categories: [ 
          { label: "Programming", href: "/academy?category=programming" }, 
          { label: "Design", href: "/academy?category=design" },
          { label: "Data Science", href: "/academy?category=data-science" },
          { label: "Mobile Development", href: "/academy?category=mobile" },
          { label: "DevOps", href: "/academy?category=devops" },
        ], 
        whatsNew: { 
          title: "Baru di Akademi", 
          items: ["Kursus Machine Learning", "Jalur Belajar Data Science", "Workshop Flutter"], 
          buttonText: "Lihat Semua Kursus", 
          buttonHref: "/academy", 
        }, 
      }, 
    },
    { label: "Instruktur", href: "/academy/instructors", type: "link" },
    { label: "Blog", href: "/academy/blog", type: "link" },
    { label: "Events", href: "/academy/events", type: "link" },
    { label: "Komunitas", href: "/academy/community", type: "link" },
    { label: "Papan Peringkat", href: "/academy/leaderboard", type: "link" },
    { label: "Harga", href: "/academy/pricing", type: "link" },
];

export const ACADEMY_USER_NAV_ITEMS = [
    { label: "Dasbor", href: "/dashboard", icon: <Book /> },
    { label: "Kursus Saya", href: "/dashboard/my-courses", icon: <Video /> },
    { label: "Progress", href: "/dashboard/progress", icon: <Trophy /> },
    { label: "Sertifikat Saya", href: "/dashboard/my-certificates", icon: <Award /> },
    { label: "Badges", href: "/dashboard/badges", icon: <Star /> },
    { label: "Profil Saya", href: "/profile/me", icon: <Users /> },
    { label: "Pengaturan", href: "/dashboard/settings", icon: <FileText /> },
    { label: "Keluar", href: "#", action: "logout", icon: <Globe /> },
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    period: 'selamanya',
    description: 'Cocok untuk yang baru memulai',
    features: [
      'Akses ke 3 kursus gratis',
      'Materi pembelajaran dasar',
      'Forum komunitas',
      'Progress tracking',
    ],
    limitations: [
      'Tidak termasuk sertifikat',
      'Tidak ada akses ke workshop premium',
      'Dukungan terbatas'
    ],
    popular: false,
    buttonText: 'Mulai Gratis',
    buttonVariant: 'outline'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99000,
    period: 'per bulan',
    description: 'Untuk pembelajaran yang serius',
    features: [
      'Akses ke semua kursus',
      'Sertifikat resmi',
      'Workshop bulanan',
      'Priority support',
      'Download materi',
      'Progress analytics'
    ],
    limitations: [
      'Tidak termasuk mentoring 1-on-1'
    ],
    popular: true,
    buttonText: 'Pilih Basic',
    buttonVariant: 'default'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 199000,
    period: 'per bulan',
    description: 'Untuk profesional dan tim',
    features: [
      'Semua fitur Basic',
      'Mentoring 1-on-1 (2 sesi/bulan)',
      'Akses early access kursus baru',
      'Custom learning path',
      'Career guidance',
      'LinkedIn verification badge',
      'Team collaboration tools'
    ],
    limitations: [],
    popular: false,
    buttonText: 'Pilih Pro',
    buttonVariant: 'default'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'custom',
    description: 'Solusi untuk perusahaan',
    features: [
      'Semua fitur Pro',
      'Unlimited team members',
      'Custom corporate training',
      'Dedicated account manager',
      'Advanced analytics & reporting',
      'SSO integration',
      'Custom branding',
      'On-premise deployment option'
    ],
    limitations: [],
    popular: false,
    buttonText: 'Hubungi Sales',
    buttonVariant: 'outline'
  }
];
