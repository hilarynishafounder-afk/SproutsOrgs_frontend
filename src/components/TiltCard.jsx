import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// On mobile: no mouse exists, so skip all spring physics entirely
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export default function TiltCard({ children, className, style }) {
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile: plain div — no framer-motion overhead
  if (mobile) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return <TiltCardDesktop className={className} style={style}>{children}</TiltCardDesktop>;
}

function TiltCardDesktop({ children, className, style }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}
