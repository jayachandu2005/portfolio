import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Download, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Search,
  Terminal,
  Cpu,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  ArrowUpRight,
  GitCommit,
  GitPullRequest,
  GitBranch,
  Star,
  Zap
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

interface GithubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// --- Data ---
const SKILLS_DATA = [
  { subject: 'Python', A: 95, fullMark: 100 },
  { subject: 'SQL', A: 90, fullMark: 100 },
  { subject: 'C++', A: 80, fullMark: 100 },
  { subject: 'DSA', A: 85, fullMark: 100 },
  { subject: 'UI/UX', A: 88, fullMark: 100 },
  { subject: 'ML', A: 92, fullMark: 100 },
  { subject: 'Power BI', A: 85, fullMark: 100 },
];

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Loan Eligibility Prediction",
    description: "Classification model using Scikit-learn to predict loan approvals with feature engineering on credit history and income.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    github: "https://github.com/jayachandu2005",
    featured: true
  },
  {
    title: "Sustainable Fashion Brand Analysis",
    description: "EDA and K-Means clustering to segment fashion brands based on sustainability metrics and environmental impact.",
    tech: ["Python", "Pandas", "NumPy", "K-Means"],
    github: "https://github.com/jayachandu2005",
    featured: true
  },
  {
    title: "Car Price Prediction",
    description: "Regression modeling to predict vehicle pricing based on feature importance visualization and historical data.",
    tech: ["Python", "Regression", "Seaborn", "EDA"],
    github: "https://github.com/jayachandu2005",
    featured: true
  }
];

// --- Components ---

const TypingAnimation = () => {
  const roles = ["Data Science Enthusiast", "Machine Learning Developer", "UI/UX Designer"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt((Math.random() * 150).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-primary font-mono font-bold">
      {roles[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const StatCounter = ({ end, label, icon: Icon }: { end: number; label: string; icon: any }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 glass rounded-2xl">
      <Icon className="w-8 h-8 text-primary mb-2" />
      <span className="text-4xl font-black text-gradient">{count}+</span>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
};

const DetailedSkillCard = ({ name, level, info, iconUrl }: { name: string; level: number; info: string; iconUrl: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="glass p-4 rounded-2xl flex gap-4 items-center group hover:border-primary/50 transition-all mb-4"
    >
      <div className="w-16 h-16 shrink-0 bg-slate-100 dark:bg-white/10 rounded-xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform">
        <img src={iconUrl} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-lg">{name}</h4>
          <span className="text-xs font-bold text-primary">{level}%</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">{info}</p>
        <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>
    </motion.div>
  );
};


interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
            <Terminal className="w-6 h-6 text-primary" />
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded-md uppercase tracking-tighter">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-12 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-black mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"
      />
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [githubRepos, setGithubRepos] = useState<Project[]>([]);
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const [topLanguages, setTopLanguages] = useState<{name: string, count: number}[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<{subject: string, A: number} | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch('https://api.github.com/users/jayachandu2005/repos?sort=updated&per_page=10'),
          fetch('https://api.github.com/users/jayachandu2005')
        ]);
        const reposData = await reposRes.json();
        const userData = await userRes.json();

        if (Array.isArray(reposData)) {
          const languages: {[key: string]: number} = {};
          reposData.forEach(repo => {
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });
          const sortedLangs = Object.entries(languages)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          setTopLanguages(sortedLangs);

          const featuredTitles = FEATURED_PROJECTS.map(p => p.title.toLowerCase());
          const unwantedTitles = ["cachematrix.r", "air pollution project"];

          const mappedRepos = reposData
            .filter(repo => !repo.fork && repo.name !== 'jayachandu2005')
            .map(repo => ({
              title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
              description: repo.description || "A project exploring modern technology and software engineering principles.",
              tech: [repo.language || "Open Source"],
              github: repo.html_url,
              demo: repo.homepage
            }))
            .filter(project => {
              const title = project.title.toLowerCase();
              // Check if it's already in featured projects (fuzzy match)
              const isFeatured = featuredTitles.some(ft => title.includes(ft) || ft.includes(title));
              const isUnwanted = unwantedTitles.some(u => title.includes(u));
              return !isFeatured && !isUnwanted;
            });
          setGithubRepos(mappedRepos);
        }
        setGithubStats(userData);
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      }
    };
    fetchGithub();
  }, []);

  const allProjects = [...FEATURED_PROJECTS, ...githubRepos];
  const filteredProjects = allProjects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-black tracking-tighter"
            >
              GJC<span className="text-primary">.</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-semibold hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/80 transition-all shadow-lg shadow-primary/20"
              >
                Hire Me
              </a>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <a 
                href="#contact"
                className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold"
              >
                Hire Me
              </a>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-slate-200 dark:border-slate-800"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-4 text-base font-bold hover:bg-primary/10 rounded-xl transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 px-3">
                  <a 
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-4 bg-primary text-white text-center rounded-xl font-bold shadow-lg shadow-primary/20"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Welcome to my portfolio
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6">
              I'm Golla Jaya <span className="text-gradient">Chandu</span>
            </h1>
            <div className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400 mb-10 h-12">
              <TypingAnimation />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                View Projects <ArrowUpRight className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-4 glass rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                Hire Me <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Golla_Jaya_Chandu_CV.txt"
                download="Golla_Jaya_Chandu_CV.txt"
                className="px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                CV <Download className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden glass p-2">
                <img 
                  src={`https://picsum.photos/seed/jayachandu/800/800`} 
                  alt="Golla Jaya Chandu" 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <Code2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Specialization</p>
                    <p className="font-bold">Computer Science Eng.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <SectionHeading title="About Me" />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-8"
              >
                I am a Computer Science Engineering student passionate about Machine Learning, Data Analysis, and UI/UX design. I enjoy building predictive models, analyzing complex datasets, and designing user-friendly digital experiences. Through projects like Loan Eligibility Prediction, Car Price Prediction, and MindMitra, I have developed strong problem-solving and analytical skills and aim to create technology that makes a real-world impact.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Problem Solver</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">ML Enthusiast</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">UI/UX Designer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Data Analyst</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="My Skills" 
            subtitle="A combination of technical expertise and creative design capabilities."
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" /> Languages & Core
                </h3>
                <div className="space-y-4">
                  <DetailedSkillCard 
                    name="Python" 
                    level={95} 
                    info="Expertise in automation, data analysis with Pandas/NumPy, and ML model development."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  />
                  <DetailedSkillCard 
                    name="SQL" 
                    level={90} 
                    info="Advanced query optimization, database design, and data extraction for analytical insights."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                  />
                  <DetailedSkillCard 
                    name="C++" 
                    level={80} 
                    info="Strong foundation in object-oriented programming and high-performance algorithm implementation."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                  />
                  <DetailedSkillCard 
                    name="DSA" 
                    level={85} 
                    info="Proficient in complex data structures and algorithmic problem-solving for optimized solutions."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-secondary" /> Tools & Platforms
                </h3>
                <div className="space-y-4">
                  <DetailedSkillCard 
                    name="Power BI" 
                    level={85} 
                    info="Creating interactive dashboards and data visualizations for business intelligence."
                    iconUrl="https://upload.wikimedia.org/wikipedia/commons/c/c9/Power_bi_logo_black.svg"
                  />
                  <DetailedSkillCard 
                    name="Tableau" 
                    level={80} 
                    info="Advanced data storytelling and visual analytics for complex datasets."
                    iconUrl="https://www.vectorlogo.zone/logos/tableau/tableau-icon.svg"
                  />
                  <DetailedSkillCard 
                    name="Figma" 
                    level={88} 
                    info="Designing high-fidelity user interfaces and interactive prototypes for web and mobile."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                  />
                  <DetailedSkillCard 
                    name="Docker" 
                    level={75} 
                    info="Containerizing applications for consistent development and deployment environments."
                    iconUrl="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-accent" /> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Decision-making", "Teamwork", "Adaptability", "Project Management"].map(skill => (
                    <span key={skill} className="px-4 py-2 glass rounded-xl text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[400px] md:h-[500px] glass rounded-3xl p-6 relative group">
              <h3 className="text-center font-bold mb-4 text-slate-500 uppercase tracking-widest text-xs">Skill Radar Visualization</h3>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-center">
                <AnimatePresence mode="wait">
                  {selectedSkill && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="bg-primary/90 text-white px-4 py-2 rounded-full shadow-xl backdrop-blur-sm"
                    >
                      <p className="text-xs font-bold uppercase tracking-tighter">{selectedSkill.subject}</p>
                      <p className="text-2xl font-black">{selectedSkill.A}%</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={SKILLS_DATA}
                  onClick={(data: any) => {
                    if (data && data.activePayload && data.activePayload[0]) {
                      setSelectedSkill(data.activePayload[0].payload);
                    }
                  }}
                >
                  <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderRadius: '12px', 
                      border: 'none', 
                      color: '#fff',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ color: '#3b82f6' }}
                    cursor={false}
                  />
                  <Radar
                    name="Skill"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    animationDuration={1500}
                    animationBegin={200}
                    activeDot={{ r: 8, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-center text-slate-400 mt-2 italic">Click on a point to see the exact percentage</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter end={15} label="Total Projects" icon={Code2} />
            <StatCounter end={5} label="Certifications" icon={Award} />
            <StatCounter end={githubStats?.public_repos || 20} label="Repositories" icon={Github} />
            <StatCounter end={10} label="Skills Learned" icon={Cpu} />
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Projects" 
            subtitle="Explore my technical projects ranging from Machine Learning to UI/UX Design."
          />

          <div className="mb-12 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search projects by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl outline-none focus:ring-2 ring-primary/50 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- UI/UX Showcase --- */}
      <section id="uiux" className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Case Study</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8">MindMitra</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
                A Mental Health Support App designed to help students manage stress and well-being through a user-centered digital experience.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                    <BarChart3 className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Mood Tracking</h4>
                    <p className="text-slate-500 dark:text-slate-400">Interactive interface for students to log and visualize their emotional journey.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <BrainCircuit className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">AI Chatbot Support</h4>
                    <p className="text-slate-500 dark:text-slate-400">24/7 empathetic support system for immediate student assistance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <Layout className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">12-Screen Workflow</h4>
                    <p className="text-slate-500 dark:text-slate-400">Complete Figma prototype covering onboarding, journaling, and peer interaction.</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://www.figma.com/proto/tUHAlQyXXVtc1rRmuV5IPC/MindMitra?node-id=1-260&starting-point-node-id=1%3A260&t=Jm44zJvWHy3Qfukr-1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-secondary text-white rounded-2xl font-bold inline-flex items-center gap-2 hover:bg-secondary/80 transition-colors"
              >
                View Figma Prototype <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            <motion.div 
              initial={{ rotate: 5, x: 50 }}
              whileInView={{ rotate: 0, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass p-4 rounded-[3rem] border-slate-200 dark:border-slate-700">
                <img 
                  src="https://picsum.photos/seed/mindmitra/600/1200" 
                  alt="MindMitra UI" 
                  className="rounded-[2.5rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -left-10 p-6 glass rounded-3xl hidden md:block border-slate-200 dark:border-slate-700">
                <p className="text-3xl font-black text-secondary">98%</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">User Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Education & Timeline --- */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Education" />
              <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {[
                  {
                    title: "B.Tech – Computer Science Engineering",
                    org: "Lovely Professional University",
                    date: "2023 – Present",
                    desc: "Focusing on Data Science, ML, and Software Engineering. Current CGPA: 6.13"
                  },
                  {
                    title: "Intermediate – PCM",
                    org: "Sri Chaitanya Techno School",
                    date: "2021 – 2023",
                    desc: "Completed with 65% in Physics, Chemistry, and Mathematics."
                  },
                  {
                    title: "Matriculation",
                    org: "Sri Chaitanya Techno School",
                    date: "2020 – 2021",
                    desc: "Completed with a perfect 99% score."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="pl-12 relative"
                  >
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white z-10">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-primary font-semibold text-sm">{item.org}</p>
                    <p className="text-xs text-slate-500 mb-2">{item.date}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <SectionHeading title="Achievements" />
                <div className="space-y-4">
                  <div className="p-6 glass rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      <Award className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-bold">3★ HackerRank</h4>
                      <p className="text-sm text-slate-500">SQL & Python Proficiency</p>
                    </div>
                  </div>
                  <div className="p-6 glass rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">InnovateX Hackathon</h4>
                      <p className="text-sm text-slate-500">24-hour Intensive Participant</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading title="Certifications" />
                <div className="space-y-4">
                  <div className="p-6 glass rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">Bits and Bytes of Networking</h4>
                        <p className="text-sm text-slate-500">Coursera | Google</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="p-6 glass rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Layout className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-bold">Public Speaking with Canva</h4>
                        <p className="text-sm text-slate-500">Coursera</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GitHub Section --- */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="GitHub Activity" subtitle="Real-time statistics from my open-source contributions." />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Main Stats */}
            <div className="md:col-span-2 glass rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-primary/30 transition-all">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Github className="w-8 h-8 text-primary" />
                  </div>
                  <a 
                    href="https://github.com/jayachandu2005" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 glass rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="text-3xl font-black mb-2">jayachandu2005</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Passionate about data science and open source.</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 glass rounded-2xl">
                  <p className="text-2xl font-black text-primary">{githubStats?.public_repos || 0}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Repos</p>
                </div>
                <div className="text-center p-4 glass rounded-2xl">
                  <p className="text-2xl font-black text-secondary">{githubStats?.followers || 0}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Followers</p>
                </div>
                <div className="text-center p-4 glass rounded-2xl">
                  <p className="text-2xl font-black text-accent">{githubStats?.following || 0}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Following</p>
                </div>
              </div>
            </div>

            {/* Contribution Activity - Area Chart (Mock) */}
            <div className="md:col-span-2 glass rounded-[2.5rem] p-8 flex flex-col group hover:border-secondary/30 transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" /> Activity Trend
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 30 Days</span>
              </div>
              <div className="flex-1 h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { day: 1, commits: 2 }, { day: 5, commits: 5 }, { day: 10, commits: 3 },
                    { day: 15, commits: 8 }, { day: 20, commits: 4 }, { day: 25, commits: 10 },
                    { day: 30, commits: 6 }
                  ]}>
                    <defs>
                      <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="commits" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorCommits)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 glass rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent pointer-events-none" />
                <img 
                  src={`https://ghchart.rshah.org/jayachandu2005`} 
                  alt="GitHub Contributions" 
                  className="w-full opacity-80 group-hover:opacity-100 transition-opacity dark:invert scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Language Distribution - Pie Chart */}
            <div className="md:col-span-2 glass rounded-[2.5rem] p-8 group hover:border-accent/30 transition-all">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-accent" /> Language Mix
              </h3>
              <div className="h-[200px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topLanguages}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {topLanguages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 ml-4">
                  {topLanguages.map((lang, idx) => (
                    <div key={lang.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][idx % 5] }} />
                      <span className="text-xs font-bold text-slate-500">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Mock / Stats */}
            <div className="md:col-span-2 glass rounded-[2.5rem] p-8 grid grid-cols-2 gap-4">
              <div className="p-6 glass rounded-3xl flex flex-col justify-center items-center text-center hover:bg-primary/5 transition-colors">
                <GitCommit className="w-8 h-8 text-primary mb-3" />
                <p className="text-xl font-black">250+</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Commits</p>
              </div>
              <div className="p-6 glass rounded-3xl flex flex-col justify-center items-center text-center hover:bg-secondary/5 transition-colors">
                <GitPullRequest className="w-8 h-8 text-secondary mb-3" />
                <p className="text-xl font-black">12</p>
                <p className="text-xs font-bold text-slate-500 uppercase">PRs</p>
              </div>
              <div className="p-6 glass rounded-3xl flex flex-col justify-center items-center text-center hover:bg-accent/5 transition-colors">
                <Star className="w-8 h-8 text-accent mb-3" />
                <p className="text-xl font-black">45</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Stars</p>
              </div>
              <div className="p-6 glass rounded-3xl flex flex-col justify-center items-center text-center hover:bg-primary/5 transition-colors">
                <GitBranch className="w-8 h-8 text-primary mb-3" />
                <p className="text-xl font-black">8</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Forks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Let's Connect" 
            subtitle="Have a project in mind or just want to say hi? Feel free to reach out!"
          />

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 glass rounded-3xl">
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Email</p>
                      <a href="mailto:jayachandugolla2005@gmail.com" className="font-bold hover:text-primary transition-colors">jayachandugolla2005@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Linkedin className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">LinkedIn</p>
                      <a href="https://linkedin.com/in/jayachandugolla" target="_blank" rel="noreferrer" className="font-bold hover:text-primary transition-colors">jayachandugolla</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/10 dark:bg-slate-100/10 flex items-center justify-center shrink-0">
                      <Github className="text-slate-900 dark:text-slate-100" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">GitHub</p>
                      <a href="https://github.com/jayachandu2005" target="_blank" rel="noreferrer" className="font-bold hover:text-primary transition-colors">jayachandu2005</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form className="glass p-8 md:p-12 rounded-3xl space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 glass rounded-2xl outline-none focus:ring-2 ring-primary/50" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 glass rounded-2xl outline-none focus:ring-2 ring-primary/50" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase">Subject</label>
                  <input type="text" className="w-full px-6 py-4 glass rounded-2xl outline-none focus:ring-2 ring-primary/50" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase">Message</label>
                  <textarea rows={5} className="w-full px-6 py-4 glass rounded-2xl outline-none focus:ring-2 ring-primary/50 resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black tracking-tighter mb-8">
            GJC<span className="text-primary">.</span>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/jayachandu2005" target="_blank" rel="noreferrer" className="p-3 glass rounded-xl hover:text-primary transition-colors"><Github /></a>
            <a href="https://linkedin.com/in/jayachandugolla" target="_blank" rel="noreferrer" className="p-3 glass rounded-xl hover:text-primary transition-colors"><Linkedin /></a>
            <a href="mailto:jayachandugolla2005@gmail.com" className="p-3 glass rounded-xl hover:text-primary transition-colors"><Mail /></a>
          </div>
          <p className="text-slate-500 text-sm mb-4">Designed & Built with ❤️ by Golla Jaya Chandu</p>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">© 2025 All Rights Reserved</p>
          
          <motion.button 
            whileHover={{ y: -5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 p-4 glass rounded-full inline-block"
          >
            <ArrowUpRight className="w-6 h-6 -rotate-45" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
