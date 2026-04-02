'use client';

import { useEffect, useRef } from 'react';

const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Small tile that repeats — keeps performance tight
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;       // R
      data[i + 1] = v;   // G
      data[i + 2] = v;   // B
      data[i + 3] = 18;  // A — subtle grain
    }

    ctx.putImageData(imageData, 0, 0);

    // Convert to repeating background on a full-screen div
    const dataUrl = canvas.toDataURL('image/png');
    const overlay = canvas.parentElement;
    if (overlay) {
      overlay.style.backgroundImage = `url(${dataUrl})`;
      overlay.style.backgroundRepeat = 'repeat';
    }

    // Hide the canvas itself
    canvas.style.display = 'none';
  }, []);

  return (
    <div className="noise-overlay" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FilmGrain;
