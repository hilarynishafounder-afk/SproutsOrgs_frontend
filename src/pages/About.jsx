import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye } from 'react-icons/fi';
import { FaChartLine, FaBrain, FaLaptopCode, FaUsers, FaRocket } from 'react-icons/fa';
import api from '../utils/api';
import TiltCard from '../components/TiltCard';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: (typeof i === 'number' ? i : 0) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const whyChoose = [
  { image: 'https://images.unsplash.com/photo-1507679799987-c7377ec486b8?q=80&w=300&h=300&fit=crop', title: 'From Learning to Earning', desc: 'We help students turn AI skills into real income opportunities.' },
  { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&h=300&fit=crop', title: 'Real Industry Exposure', desc: 'Work on practical AI projects used by businesses.' },
  { image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=300&h=300&fit=crop', title: 'Future-Ready Skills', desc: 'Training in cutting-edge AI, automation, and data technologies.' },
  { image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=300&h=300&fit=crop', title: 'Innovation-Driven Approach', desc: 'Encouraging students to build products and startups.' },
  { image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&h=300&fit=crop', title: 'Strong AI Ecosystem', desc: 'Connecting students, colleges, and businesses through one platform.' },
];

export default function About() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await api.get('/company');
      setCompany(res.data);
    } catch (err) {
      console.error('Error fetching company data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="about-page">
        <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loader">Loading About Us...</div>
        </section>
      </div>
    );
  }

  const { about, vision, mission } = company || {};
  const splitTitle = "Empowering Students with AI & Innovation".split(" ");

  return (
    <div className="about-page">
      <section className="page-hero section-alt">
        <div className="container">
          <motion.span className="badge badge-blue" variants={fadeUp} initial="hidden" animate="visible" custom={0}>About Us</motion.span>

          <motion.h1 className="section-title" variants={staggerContainer} initial="hidden" animate="visible">
            {splitTitle.map((word, i) => (
              <motion.span key={i} variants={wordReveal} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {(word === "AI" || word === "&" || word === "Innovation") ? <span className="gradient-text">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p className="section-subtitle" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            An MSME-registered EdTech and IT services initiative focused on emerging technologies
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-full-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.3' }} className="gradient-text">
                Hi, I’m Hilary Nisha, Founder of Sprouts Orgs. <br />
                <span style={{ fontSize: '1.2rem', color: 'var(--text-dark)', opacity: 0.9 }}>Founder of Sprouts Orgs</span>
              </h2>
              {about ? about.split('\n').map((p, i) => <p key={i}>{p}</p>) : (
                <>
                  <p>Sprouts Orgs is an MSME-registered EdTech and IT services company specializing in emerging technologies like Artificial Intelligence, Data Science, Machine Learning, Deep Learning, and Core Python. We focus on building a Learn–Build–Earn ecosystem through training, internships, and real-time projects.</p>
                </>
              )}
            </motion.div>

            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="image-wrapper glass">
                <img
                  src="https://ik.imagekit.io/Lourdu/Sprouts/about"
                  alt="Hilary Nisha - Founder of Sprouts Orgs"
                />
                <div className="image-accent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="vision-mission-grid">
            <TiltCard>
              <motion.div className="vm-card card" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="vm-icon"><FiEye size={28} /></div>
                <h3>Our Vision</h3>
                <p>{vision || 'To build the largest AI workforce community in Tamil Nadu by empowering students with practical AI skills, real-world experience, and opportunities to innovate.'}</p>
              </motion.div>
            </TiltCard>
            <TiltCard>
              <motion.div className="vm-card card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="vm-icon"><FiTarget size={28} /></div>
                <h3>Our Mission</h3>
                <p>{mission || 'To bridge the gap between academic learning and industry needs by providing affordable AI education, hands-on projects, and freelance incubation programs.'}</p>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title">Why Choose <span className="gradient-text">Sprouts</span></h2>
            <p className="section-subtitle">What sets us apart in AI education and IT services</p>
          </motion.div>
          <div className="grid-3">
            {whyChoose.map((item, i) => (
              <TiltCard key={item.title}>
                <motion.div
                  className="card why-card-about"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <div className="card-image-wrapper">
                    <img className="card-image" src={item.image} alt={item.title} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&h=300&fit=crop'; }} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
