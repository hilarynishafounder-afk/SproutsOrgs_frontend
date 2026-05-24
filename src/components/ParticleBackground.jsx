import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const isMobile = () => window.innerWidth < 768;

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobile) return; // skip heavy init on mobile
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [mobile]);

  // Don't render particles on mobile at all
  if (mobile || !init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 45, // was 120 — huge CPU saving
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#2563EB" },
          links: {
            color: "#2563EB",
            distance: 130,
            enable: true,
            opacity: 0.08,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 0.6, // was 1
            straight: false,
          },
          number: {
            density: { enable: true, area: 900 },
            value: 35, // was 60
          },
          opacity: { value: 0.15 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: false, // was true — saves memory on retina screens
      }}
    />
  );
};

export default ParticleBackground;
