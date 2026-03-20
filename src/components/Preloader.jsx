import { motion } from 'framer-motion';
import './Preloader.css';

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="preloader-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="preloader-logo"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: [0, -15, 0],
            opacity: 1 
          }}
          transition={{ 
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 1 }
          }}
        >
          <img src="https://ik.imagekit.io/Lourdu/Sprouts/logo.jpeg?updatedAt=1773849138906" alt="Sprouts Logo" />
        </motion.div>

        <div className="preloader-text-inner">
          <motion.h2 
            className="brand-name"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Sprouts
          </motion.h2>
          <motion.span 
            className="brand-tagline"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Edutech and IT services
          </motion.span>
        </div>

        <motion.div
          className="preloader-bar-wrap"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "clamp(240px, 35vw, 450px)", opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div
            className="preloader-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }}
          />
        </motion.div>

        <motion.div 
          className="loading-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Loading
          <div className="dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
