import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const isMobile = () => window.innerWidth < 768;

export default function GlobalBackground() {
  const [init, setInit] = useState(false);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobile) return; // skip particle init on mobile
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [mobile]);

  const options = useMemo(
    () => ({
      fpsLimit: 45, // was 60 — more CPU friendly on laptops
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 120,
            links: { opacity: 0.2 },
          },
        },
      },
      particles: {
        color: { value: "#3B82F6" },
        links: {
          color: "#3B82F6",
          distance: 130,
          enable: true,
          opacity: 0.07,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 0.5, // was 0.8
          straight: false,
        },
        number: {
          density: { enable: true, area: 1000 },
          value: 25, // was 40 — half the particles
        },
        opacity: { value: 0.08 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: false, // was true — avoid 2x particle density on retina
    }),
    [],
  );

  // No particles at all on mobile — saves significant battery and CPU
  if (mobile) return null;
  if (!init) return null;

  return (
    <Particles
      id="global-tsparticles"
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
