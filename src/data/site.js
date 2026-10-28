import { contact, contactDetails, socials } from './contact';
export { contact, socials };

/**
 * ============================================================================
 *  HOME PAGE CONTENT
 * ----------------------------------------------------------------------------
 *  Home-page copy, links and data live here. Project detail content and
 *  contact details live in the adjacent data files.
 *
 *  Image paths point at files under `public/`.
 * ============================================================================
 */

export const profile = {
  firstName: 'Aman',
  lastName: 'Yadav',
  name: 'Aman Yadav',
  initials: 'AY',
  role: 'Full Stack Developer',
  shortRole: 'Full Stack Developer',
  greeting: "Hello, I'm",
  tagline: 'I build practical web and mobile applications.',
  intro:
    'Based in Mumbai, Maharashtra, I work with React.js, Next.js, React Native, TypeScript, JavaScript, PHP, and MySQL.',
  location: contactDetails.location,
  email: contactDetails.email,
  phone: contactDetails.phone,
  availability: 'Available for freelance & full-time roles',
  availabilityShort: 'Available for work',
  responseTime: 'Usually replies within 24 hours',
  resumeUrl: '/Aman-Yadav-Resume.pdf',
  photo: '/assets/images/about-portrait.png',
  heroImage: '/assets/images/hero-aman-yadav.png',
};

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const heroStats = [
  { id: 'projects', value: 3, suffix: '', label: 'Featured Projects', icon: 'box' },
  { id: 'years', value: 1.5, suffix: '+', label: 'Years Experience', icon: 'calendar' },
  { id: 'graduation', value: 2024, suffix: '', label: 'BSc IT Graduate', icon: 'graduation' },
  { id: 'cgpa', value: 8.5, decimals: 2, suffix: '', label: 'CGPA', icon: 'trophy' },
];

/**
 * Floating tech badges orbiting the hero illustration.
 * Positions ring the artwork's perimeter and deliberately avoid the top-right
 * and bottom-left corners, where the two floating status chips sit.
 */
export const heroBadges = [
  { id: 'react-native', label: 'React Native', icon: 'react', top: '4%', left: '0%', delay: 0 },
  { id: 'typescript', label: 'TypeScript', icon: 'typescript', top: '16%', left: '74%', delay: 0.35 },
  { id: 'firebase', label: 'Firebase', icon: 'firebase', top: '30%', left: '-4%', delay: 0.5 },
  { id: 'expo', label: 'Expo', icon: 'expo', top: '40%', left: '82%', delay: 0.7 },
  { id: 'javascript', label: 'JavaScript', icon: 'javascript', top: '56%', left: '-6%', delay: 0.85 },
  { id: 'node', label: 'Node.js', icon: 'node', top: '64%', left: '80%', delay: 0.9 },
  { id: 'github', label: 'GitHub', icon: 'github', top: '84%', left: '64%', delay: 1.1 },
  { id: 'mapbox', label: 'Mapbox', icon: 'mapbox', top: '90%', left: '34%', delay: 1.25 },
];

/* ---------------------------------------------------------------- ABOUT --- */

export const about = {
  eyebrow: 'About Me',
  title: 'Turning ideas into products people actually enjoy using',
  paragraphs: [
    "I'm a Full Stack Developer with 1.5+ years of experience building web and mobile apps. Since September 2025, I have worked as a Software Developer at ENATS Technology LLP. I hold a BSc IT degree from the University of Mumbai with a CGPA of 8.50. My core stack includes React.js, Next.js, React Native, TypeScript, JavaScript, PHP, and MySQL, which I use in my web and mobile development work.",
  ],
  experienceBadge: { value: '1.5+', label: 'Years of Experience' },
  quickFacts: [
    { id: 'name', label: 'Name', value: 'Aman Yadav', icon: 'user' },
    { id: 'email', label: 'Email', value: contactDetails.email, icon: 'mail' },
    { id: 'location', label: 'Location', value: contactDetails.location, icon: 'pin' },
    { id: 'experience', label: 'Experience', value: '1.5+ Years', icon: 'clock' },
  ],
  strengths: [
    {
      id: 'problem-solver',
      title: 'Problem Solver',
      description: 'I break complex requirements into clean, testable pieces and ship pragmatic solutions.',
      icon: 'puzzle',
    },
    {
      id: 'detail-oriented',
      title: 'Detail Oriented',
      description: 'Pixel-accurate interfaces, consistent spacing, and animations tuned to the millisecond.',
      icon: 'target',
    },
    {
      id: 'always-learning',
      title: 'Always Learning',
      description: 'New tooling, new patterns, new platform APIs — I stay close to where the ecosystem is going.',
      icon: 'sparkles',
    },
  ],
  services: [
    {
      id: 'mobile',
      title: 'Mobile App Development',
      description: 'Cross-platform iOS and Android apps built with React Native and Expo.',
      icon: 'phone',
      accent: 'purple',
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'REST APIs, authentication, realtime data and dashboards with Node.js and Firebase.',
      icon: 'server',
      accent: 'blue',
    },
    {
      id: 'design',
      title: 'UI / UX Design',
      description: 'Beautiful, intuitive interfaces backed by a consistent, scalable design system.',
      icon: 'palette',
      accent: 'cyan',
    },
    {
      id: 'performance',
      title: 'Performance & Quality',
      description: 'Profiling, bundle improvements, efficient lists and release monitoring.',
      icon: 'gauge',
      accent: 'purple',
    },
  ],
};

/* --------------------------------------------------------------- SKILLS --- */

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks & Libraries' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud-tools', label: 'Cloud & Tools' },
  { id: 'core-concepts', label: 'Core Concepts' },
];

export const skills = [
  { id: 'javascript', name: 'JavaScript (ES6+)', level: 80, category: 'languages', icon: 'javascript', color: '#F7DF1E' },
  { id: 'typescript', name: 'TypeScript', level: 85, category: 'languages', icon: 'typescript', color: '#3178C6' },
  { id: 'php', name: 'PHP', level: 70, category: 'languages', icon: 'php', color: '#777BB4' },
  { id: 'sql', name: 'SQL', level: 80, category: 'languages', icon: 'database', color: '#00758F' },
  { id: 'html5', name: 'HTML5', level: 70, category: 'languages', icon: 'html5', color: '#E34F26' },
  { id: 'css3', name: 'CSS3', level: 90, category: 'languages', icon: 'css', color: '#1572B6' },
  { id: 'react', name: 'React.js', level: 95, category: 'frameworks', icon: 'react', color: '#61DAFB' },
  { id: 'nextjs', name: 'Next.js', level: 70, category: 'frameworks', icon: 'nextjs', color: '#000000' },
  { id: 'react-native-expo', name: 'React Native (Expo)', level: 60, category: 'frameworks', icon: 'react', color: '#7C8CF8' },
  { id: 'bootstrap', name: 'Bootstrap', level: 60, category: 'frameworks', icon: 'bootstrap', color: '#7952B3' },
  { id: 'tailwind-css', name: 'Tailwind CSS', level: 50, category: 'frameworks', icon: 'tailwind', color: '#06B6D4' },
  { id: 'zustand', name: 'Zustand', level: 40, category: 'frameworks', icon: 'layers', color: '#443E38' },
  { id: 'mysql', name: 'MySQL', level: 72, category: 'databases', icon: 'mysql', color: '#00758F' },
  { id: 'mongodb', name: 'MongoDB', level: 50, category: 'databases', icon: 'mongodb', color: '#47A248' },
  { id: 'firebase', name: 'Firebase', level: 80, category: 'databases', icon: 'firebase', color: '#FFA000' },
  { id: 'aws-ec2-s3', name: 'AWS (EC2, S3)', level: 90, category: 'cloud-tools', icon: 'cloud', color: '#FF9900' },
  { id: 'apache', name: 'Apache', level: 90, category: 'cloud-tools', icon: 'apache', color: '#D22128' },
  { id: 'git', name: 'Git', level: 85, category: 'cloud-tools', icon: 'git', color: '#F05032' },
  { id: 'github', name: 'GitHub', level: 85, category: 'cloud-tools', icon: 'github', color: '#181717' },
  { id: 'vscode', name: 'VS Code', level: 80, category: 'cloud-tools', icon: 'monitor', color: '#007ACC' },
  { id: 'postman', name: 'Postman', level: 50, category: 'cloud-tools', icon: 'postman', color: '#FF6C37' },
  { id: 'figma', name: 'Figma', level: 80, category: 'cloud-tools', icon: 'figma', color: '#F24E1E' },
  { id: 'docker', name: 'Docker', level: 70, category: 'cloud-tools', icon: 'docker', color: '#2496ED' },
  { id: 'rest-api-design', name: 'REST API Design', level: 88, category: 'core-concepts', icon: 'api', color: '#3B82F6' },
  { id: 'mvc-architecture', name: 'MVC Architecture', level: 80, category: 'core-concepts', icon: 'layers', color: '#8B5CF6' },
  { id: 'jwt-authentication', name: 'JWT Authentication', level: 90, category: 'core-concepts', icon: 'key', color: '#D4A017' },
  { id: 'crud', name: 'CRUD', level: 80, category: 'core-concepts', icon: 'database', color: '#00758F' },
  { id: 'code-review', name: 'Code Review', level: 80, category: 'core-concepts', icon: 'review', color: '#14B8A6' },
];

export const skillHighlights = [
  { id: 'mobile', value: 'React Native', label: 'Mobile App Development' },
  { id: 'frontend', value: 'React & Next.js', label: 'Frontend Development' },
  { id: 'backend', value: 'PHP & MySQL', label: 'Backend Systems' },
  { id: 'api', value: 'REST APIs', label: 'Full Stack Development' },
];

/* ----------------------------------------------------------- EXPERIENCE --- */

export const experience = [
  {
    id: 'enats-technology',
    period: 'Sep 2025 - Present',
    role: 'Software Developer',
    company: 'ENATS Technology LLP',
    type: 'Mumbai',
    description: 'Web and mobile product development for sports event management and participant tracking.',
    projects: [
      {
        id: 'livio-live',
        title: 'Livio Live - Live Race Tracking & Results',
        links: [
          { label: 'Website', href: 'https://liviolive.com/' },
          { label: 'App Store', href: 'https://apps.apple.com/in/app/livio-live/id6778751874' },
          { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=eu.passionforsports.livio' },
        ],
        achievements: [
          'Developed the Livio Live website using Next.js and built React Native (TypeScript) screens for the mobile app, delivering sports event management and participant tracking on Mapbox maps.',
          'Built PHP/MySQL REST APIs powering live GPS tracking, checkpoint timing, rankings, athlete search, and follower/following features.',
          'Optimized MySQL queries through indexing to improve API performance and reduce page load times; eliminated duplicate API requests and enhanced pagination.',
        ],
        technologies: ['Next.js', 'React Native', 'TypeScript', 'Mapbox', 'PHP', 'MySQL', 'Expo', 'AWS S3'],
      },
      {
        id: 'djobzy',
        title: 'Djobzy - Global Job Portal & Gig Marketplace App',
        links: [],
        achievements: [
          'Led end-to-end mobile frontend development, translating Figma wireframes into responsive cross-platform UI using React Native (Expo).',
          'Integrated Laravel REST APIs and managed app state with Zustand to build dynamic, data-driven screens.',
        ],
        technologies: ['React Native', 'JavaScript', 'Laravel', 'MySQL', 'Zustand', 'Sanctum'],
      },
      {
        id: 'larssie',
        title: 'Larssie - Passion For Sport',
        links: [{ label: 'Website', href: 'https://www.passionforsports.eu/' }],
        achievements: [
          'Contributed to the development of a sports platform by building new modules and features.',
          'Resolved production bugs and improved the overall user experience.',
        ],
        technologies: ['PHP', 'MySQL'],
      },
    ],
    current: true,
  },
  {
    id: 'sdac-infotech',
    period: '2024',
    role: 'Java Developer Intern',
    company: 'SDAC Infotech',
    type: 'Internship',
    description: 'Java Developer internship at SDAC Infotech.',
    current: false,
  },
];

export const education = [
  {
    id: 'bsc-it',
    period: 'Jun 2021 - May 2024',
    title: 'Bachelor of Science in Information Technology',
    org: 'SB Vartak College of Arts, Commerce & Science, University of Mumbai',
    description: 'Mumbai, India · CGPA 8.50',
  },
  {
    id: 'hsc',
    period: 'Jun 2019 - May 2021',
    title: 'Higher Secondary Certificate (12th Standard)',
    org: 'Sailee International College',
    description: 'Mumbai, India · 71%',
  },
];

/* ------------------------------------------------------------- PROJECTS --- */

export const projectFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'web', label: 'Web Apps' },
  { id: 'fullstack', label: 'Full Stack' },
];

export const projects = [
  {
    id: 'livio-live',
    title: 'Livio Live - Live Race Tracking & Results',
    categories: ['mobile', 'web', 'fullstack'],
    featured: true,
    summary:
      'Sports live-tracking platform with real-time GPS tracking on Mapbox, checkpoint timing, rankings, athlete search, and follower/following.',
    description:
      'Sports live-tracking platform with real-time GPS tracking on Mapbox, checkpoint timing, rankings, athlete search, and follower/following.',
    image: '/images/projects/livio-live.png',
    accent: 'purple',
    technologies: ['React Native', 'TypeScript', 'Next.js', 'PHP', 'MySQL', 'Mapbox', 'Expo', 'AWS S3'],
    links: [
      { label: 'Website', href: 'https://liviolive.com/' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/livio-live/id6778751874' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=eu.passionforsports.livio' },
    ],
  },
  {
    id: 'djobzy',
    title: 'Djobzy - Global Job Portal & Gig Marketplace App',
    categories: ['mobile'],
    featured: true,
    summary:
      'Cross-platform job and gig marketplace app built from Figma designs, with Laravel REST APIs and Zustand state management.',
    description:
      'Cross-platform job and gig marketplace app built from Figma designs, with Laravel REST APIs and Zustand state management.',
    image: '/images/projects/djobzy.png',
    accent: 'blue',
    technologies: ['React Native (Expo)', 'JavaScript', 'Laravel', 'MySQL', 'Zustand', 'Sanctum'],
    links: [],
  },
  {
    id: 'larssie',
    title: 'Larssie - Passion For Sport',
    categories: ['web'],
    featured: true,
    summary: 'Sports platform where I built new modules and features and fixed production bugs.',
    description: 'Sports platform where I built new modules and features and fixed production bugs.',
    image: '/images/projects/larssie.png',
    accent: 'cyan',
    technologies: ['PHP', 'MySQL'],
    links: [{ label: 'Website', href: 'https://www.passionforsports.eu/' }],
  },
];

export const projectsCta = {
  label: 'View All Projects',
  href: 'https://github.com/Aman9653?tab=repositories',
};

/* --------------------------------------------------------- TESTIMONIALS --- */

export const testimonials = [
  {
    id: 't1',
    quote:
      'Aman worked on our Livio Live app and the live tracking feels smooth and reliable. He understood what our users needed and delivered clean, working features on time.',
    name: 'Aron Ferguson',
    role: 'Team Member',
    company: 'Livio Live',
    avatar: 'https://i.pravatar.cc/200?img=12',
    linkedin: '',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'Great to work with. Aman is quick to pick up new requirements, explains his work clearly, and the Livio Live app is more stable and easier to use because of his effort.',
    name: 'Eric Forgis',
    role: 'Team Member',
    company: 'Livio Live',
    avatar: 'https://i.pravatar.cc/200?img=15',
    linkedin: '',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'Aman paid attention to the small details in the Livio Live app. The screens look clean, the flows feel natural, and he always took feedback well and fixed things fast.',
    name: 'Sophia',
    role: 'Team Member',
    company: 'Livio Live',
    avatar: 'https://i.pravatar.cc/200?img=47',
    linkedin: '',
    rating: 5,
  },
  {
    id: 't4',
    quote:
      'Aman helped build parts of the Djobzy job platform and his code was clean and easy to understand. He is dependable, asks the right questions, and finishes what he starts.',
    name: 'Swayam Parmar',
    role: 'Team Member',
    company: 'Djobzy',
    avatar: 'https://i.pravatar.cc/200?img=33',
    linkedin: '',
    rating: 5,
  },
  {
    id: 't5',
    quote:
      'Working with Aman on Djobzy was a smooth experience. He is hardworking, supportive to the team, and always ready to learn and improve the product.',
    name: 'Abhishek',
    role: 'Team Member',
    company: 'Djobzy',
    avatar: 'https://i.pravatar.cc/200?img=53',
    linkedin: '',
    rating: 5,
  },
];

/* -------------------------------------------------------------- CONTACT --- */

/* --------------------------------------------------------------- FOOTER --- */

export const footer = {
  description:
    'Full Stack Developer building web and mobile applications. Available for freelance work and full-time opportunities.',
  columns: [
    {
      id: 'navigate',
      title: 'Navigate',
      links: navLinks.slice(0, 4),
    },
    {
      id: 'more',
      title: 'More',
      links: navLinks.slice(4),
    },
  ],
  legal: [],
  builtWith: 'Built with React, Tailwind CSS & Framer Motion',
};

const site = {
  profile,
  socials,
  navLinks,
  heroStats,
  heroBadges,
  about,
  skills,
  skillCategories,
  skillHighlights,
  experience,
  education,
  projects,
  projectFilters,
  projectsCta,
  testimonials,
  contact,
  footer,
};

export default site;
