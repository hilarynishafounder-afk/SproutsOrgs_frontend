import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export default function MagneticButton({ children, className, onClick, to, style }) {
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile: render plain link/button — no spring physics overhead
  if (mobile) {
    if (to) {
      return (
        <Link to={to} className={className} style={{ display: 'inline-block', textDecoration: 'none', ...style }}>
          {children}
        </Link>
      );
    }
    return (
      <button onClick={onClick} className={className} style={style}>
        {children}
      </button>
    );
  }

  return (
    <MagneticButtonDesktop className={className} onClick={onClick} to={to} style={style}>
      {children}
    </MagneticButtonDesktop>
  );
}

function MagneticButtonDesktop({ children, className, onClick, to, style }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const onMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - (left + width / 2)) * 0.35);
    mouseY.set((e.clientY - (top + height / 2)) * 0.35);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (to) {
    return (
      <Link to={to} style={{ display: 'inline-block', textDecoration: 'none', ...style }}>
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className={className}
          style={{ x, y }}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
      style={{ ...style, x, y }}
    >
      {children}
    </motion.button>
  );
}
