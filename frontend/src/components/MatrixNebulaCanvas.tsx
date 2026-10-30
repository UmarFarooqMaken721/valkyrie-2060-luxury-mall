import React, { useEffect, useRef } from 'react';

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const MatrixNebulaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle, slow-floating gold & champagne dust motes (Harrods / luxury atelier lighting)
    const motesCount = Math.min(Math.floor((width * height) / 45000), 28);
    const motes: Mote[] = [];

    for (let i = 0; i < motesCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12 - 0.05,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.25 + 0.05
      });
    }

    let gradientAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep obsidian base with very slow, gentle champagne ambient illumination
      gradientAngle += 0.001;
      const lightX = width * 0.5 + Math.cos(gradientAngle) * (width * 0.25);
      const lightY = height * 0.2 + Math.sin(gradientAngle) * (height * 0.1);

      const radGrad = ctx.createRadialGradient(lightX, lightY, 50, lightX, lightY, width * 0.75);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.035)');
      radGrad.addColorStop(0.5, 'rgba(197, 168, 128, 0.015)');
      radGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Refined golden dust motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.x < 0) m.x = width;
        else if (m.x > width) m.x = 0;
        if (m.y < 0) m.y = height;
        else if (m.y > height) m.y = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${m.opacity})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
