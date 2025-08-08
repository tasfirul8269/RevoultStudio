'use client';

import { useEffect, useRef, useState } from 'react';

type LiquidProgressProps = {
  progress: number; // 0 to 100
  size?: number;
  color?: string;
  className?: string;
};

export function LiquidProgress({
  progress,
  size = 200,
  color = '#4f46e5',
  className = '',
}: LiquidProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [waves, setWaves] = useState([0, 0, 0, 0]);
  
  // Animate the liquid effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = size / 2;
    const radius = size * 0.4;
    let time = 0;
    
    const draw = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background circle
      ctx.beginPath();
      ctx.arc(centerX, centerX, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.fill();
      
      // Calculate wave heights based on time
      const waveHeights = waves.map((wave, i) => 
        Math.sin(time * 0.005 + i * 1.5) * 5
      );
      
      // Draw liquid
      ctx.beginPath();
      const progressHeight = size - (progress / 100) * size * 0.8 - size * 0.1;
      
      // Create wave effect
      ctx.moveTo(0, progressHeight + waveHeights[0]);
      for (let x = 0; x <= size; x += 10) {
        const t = (x / size) * Math.PI * 2;
        const waveIndex = Math.floor(x / (size / 4)) % 4;
        const waveY = waveHeights[waveIndex] * Math.sin(t * 2 + time * 0.01);
        const y = progressHeight + waveY;
        ctx.lineTo(x, y);
      }
      
      // Complete the shape
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.closePath();
      
      // Add gradient to liquid
      const gradient = ctx.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, `${color}cc`);
      gradient.addColorStop(1, `${color}99`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw percentage text
      ctx.font = `bold ${size * 0.15}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.fillText(`${Math.round(progress)}%`, centerX, centerX);
      
      time++;
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    // Initialize random wave offsets
    setWaves(Array(4).fill(0).map(() => Math.random() * Math.PI * 2));
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress, size, color, waves]);
  
  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block mx-auto"
      />
    </div>
  );
}

type UploadProgressProps = {
  progress: number;
  fileName?: string;
  fileSize?: string;
  className?: string;
};

export function UploadProgress({
  progress,
  fileName,
  fileSize,
  className = '',
}: UploadProgressProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <LiquidProgress progress={progress} className="mb-4" />
      
      {fileName && (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-300">
            {fileName}
            {fileSize && <span className="text-gray-400 ml-2">({fileSize})</span>}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        <div 
          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
