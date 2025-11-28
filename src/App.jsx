import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
};

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "" : "light";
    
    const handleScroll = () => {
      const sections = ['home', 'projects', 'experience', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  // Add at the top of App.jsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 1000);
  return () => clearTimeout(timer);
}, []);

// Add this before main return
if (isLoading) {
  return (
    <div className="loading-screen">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="loading-logo"
      >
        SA
      </motion.div>
    </div>
  );
}

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <div className="nav-inner">
          <motion.div 
            className="nav-brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="nav-avatar">SA</div>
            <div>
              <div className="nav-name">SURYA A</div>
              <div className="nav-role">React Developer</div>
            </div>
          </motion.div>

          <nav className="nav-links">
            {['home', 'projects', 'experience', 'skills', 'education', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className={activeSection === item ? 'active' : ''}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <motion.div 
            className="nav-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="theme-toggle" onClick={toggleTheme}>
              <span className="theme-icon">
                {theme === "dark" ? "☾" : "☀"}
              </span>
              {theme === "dark" ? "Dark" : "Light"}
            </button>
            <a href="#contact" className="btn btn-primary">Hire Me</a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="section-hero">
        <motion.div 
          className="hero-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content">
            <motion.span 
              className="hero-badge"
              variants={itemVariants}
            >
              Open to React / Frontend roles
            </motion.span>
            
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              I'm <span className="text-gradient">Surya</span>,<br />
              React Developer
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              I build clean, fast, and modern web applications with React, JavaScript, 
              and Firebase. Focused on creating responsive, user-friendly interfaces 
              with seamless backend integration.
            </motion.p>

            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </motion.div>

            <motion.div 
              className="hero-tech"
              variants={containerVariants}
            >
              {['React.js', 'JavaScript', 'Firebase', 'Spring Boot'].map((tech, index) => (
                <motion.span 
                  key={tech} 
                  className="tech-tag"
                  variants={skillItemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="hero-sidebar"
            variants={containerVariants}
          >
            <motion.div 
              className="location-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <span>📍 Based in Tirupur, India</span>
            </motion.div>
            <motion.div 
              className="availability-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <p>Available for freelance projects and full-time React roles</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <SectionWrapper id="projects" title="Projects" subtitle="Selected work built with modern technologies">
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              title: "Smart File Sharing System",
              stack: "React · Spring Boot · Firebase",
              year: "2025",
              points: [
                "Built secure file-sharing with upload, preview & instant sharing",
                "Integrated Spring Boot APIs & Firebase Storage for scalability",
                "Implemented QR-based access & animated dashboard"
              ],
              highlight: "Smart, fast file sharing for modern users"
            },
            {
              title: "Quotes Upload Web App", 
              stack: "React · Firebase Firestore",
              year: "2023",
              points: [
                "Created quotes app with like/comment features",
                "Used Firestore for real-time updates & secure storage",
                "Added author-only permissions & clean UI"
              ],
              highlight: "Simple content publishing with live updates"
            }
          ].map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience" title="Experience" subtitle="Professional journey in React development">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="experience-card">
            <div className="card-header">
              <div>
                <h3>React Developer</h3>
                <p>Sprout Knowledge Solutions · Coimbatore</p>
              </div>
              <span className="card-badge">Feb 2023 – Jun 2024</span>
            </div>
            <motion.ul variants={containerVariants}>
              <motion.li variants={itemVariants}>
                Developed production-ready React apps with reusable components
              </motion.li>
              <motion.li variants={itemVariants}>
                Integrated Firebase services for secure, real-time features
              </motion.li>
              <motion.li variants={itemVariants}>
                Improved UI/UX with responsive design & performance tuning
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Skills Section */}
      <SectionWrapper id="skills" title="Skills" subtitle="Technologies I work with regularly">
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {Object.entries({
            "Languages": ["JavaScript", "HTML", "CSS", "Java"],
            "Frameworks": ["React.js"],
            "Databases": ["Firebase", "MySQL"], 
            "Tools": ["Git", "GitHub", "VS Code"],
            "Other": ["REST APIs", "Firebase Deployment", "Responsive UI"]
          }).map(([category, skills]) => (
            <SkillCategory key={category} category={category} skills={skills} />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper id="education" title="Education" subtitle="Academic background">
        <motion.div 
          className="education-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              degree: "Master of Computer Application",
              institution: "Bharathiar University, Coimbatore",
              period: "2024 – Present"
            },
            {
              degree: "Bachelor of Information Technology", 
              institution: "Gobi Arts & Science College, Erode",
              period: "2019 – 2022"
            }
          ].map((edu, index) => (
            <EducationCard key={edu.degree} education={edu} index={index} />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" title="Contact" subtitle="Let's discuss opportunities">
        <motion.div 
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="contact-info"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <p>I'm open to React roles, internships, and freelance work. Reach out if my skills match your needs.</p>
            <p className="response-time">I respond within 24–48 hours</p>
          </motion.div>
          <motion.div 
            className="contact-links"
            variants={containerVariants}
          >
            <motion.a 
              href="mailto:suryapubliconnect@gmail.com"
              variants={itemVariants}
              whileHover={{ x: 5, color: "var(--accent)" }}
            >📧 suryapubliconnect@gmail.com</motion.a>
            <motion.a 
              href="tel:+916382318556"
              variants={itemVariants}
              whileHover={{ x: 5, color: "var(--accent)" }}
            >📱 +91 63823 18556</motion.a>
            <motion.a 
              href="https://github.com/Suryatup" 
              target="_blank" 
              rel="noreferrer"
              variants={itemVariants}
              whileHover={{ x: 5, color: "var(--accent)" }}
            >💻 github.com/Suryatup</motion.a>
            <motion.a 
              href="https://linkedin.com/in/surya-aruchsamy-357b28235" 
              target="_blank" 
              rel="noreferrer"
              variants={itemVariants}
              whileHover={{ x: 5, color: "var(--accent)" }}
            >👔 LinkedIn Profile</motion.a>
          </motion.div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

// Reusable Components
const SectionWrapper = ({ id, title, subtitle, children }) => (
  <section id={id} className="section">
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
    {children}
  </section>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card"
    variants={cardVariants}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="card-header">
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {project.stack}
        </motion.p>
      </div>
      <motion.span 
        className="card-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {project.year}
      </motion.span>
    </div>
    <motion.ul variants={containerVariants}>
      {project.points.map((point, i) => (
        <motion.li 
          key={i}
          variants={itemVariants}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {point}
        </motion.li>
      ))}
    </motion.ul>
    <motion.p 
      className="project-highlight"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {project.highlight}
    </motion.p>
  </motion.div>
);

const SkillCategory = ({ category, skills }) => (
  <motion.div 
    className="skill-category"
    variants={cardVariants}
    whileHover={{ 
      y: -5, 
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
  >
    <motion.h4
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {category}
    </motion.h4>
    <motion.div 
      className="skills-list"
      variants={containerVariants}
    >
      {skills.map((skill, index) => (
        <motion.span 
          key={skill} 
          className="skill-tag"
          variants={skillItemVariants}
          custom={index}
          whileHover={{ 
            scale: 1.1, 
            y: -2,
            backgroundColor: "rgba(59, 130, 246, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>
  </motion.div>
);

const EducationCard = ({ education, index }) => (
  <motion.div
    className="education-card"
    variants={cardVariants}
    whileHover={{ 
      y: -5, 
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
  >
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {education.degree}
    </motion.h3>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {education.institution}
    </motion.p>
    <motion.span 
      className="education-period"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {education.period}
    </motion.span>
  </motion.div>

  
);

export default App;