'use client';

import { useEffect, useRef } from 'react';

const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Match viewport
    const resize = () => {
      canvas.width = window.innerWidth / 2;   // half-res for perf
      canvas.height = window.innerHeight / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    let lastFrame = 0;
    const fps = 8; // film-like flicker rate
    const interval = 1000 / fps;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - lastFrame < interval) return;
      lastFrame = time;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      // Fine grain — every pixel gets a random luminance
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12; // very low alpha for subtlety
      }

      ctx.putImageData(imageData, 0, 0);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default FilmGrain;
