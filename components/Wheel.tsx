
import React from 'react';
import { CandyOption } from '../types';
import { CANDY_OPTIONS, WHEEL_SIZE } from '../constants';

interface WheelProps {
  rotation: number;
  onSpin: () => void;
  isSpinning: boolean;
}

const Wheel: React.FC<WheelProps> = ({ rotation, onSpin, isSpinning }) => {
  const radius = WHEEL_SIZE / 2;
  const segmentAngle = 360 / CANDY_OPTIONS.length;

  return (
    <div className="relative flex flex-col items-center w-full max-w-[95vw] sm:max-w-none">
      {/* Magic Wand Pointer */}
      <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 z-50 wand-pointer pointer-events-none">
        <svg width="50" height="100" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 110L25 20L35 20L30 110Z" fill="#433422" stroke="#2D2418" strokeWidth="2"/>
          <circle cx="30" cy="15" r="8" fill="#FFF9C4">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="15" r="15" fill="url(#glow-wand)" opacity="0.6"/>
          <defs>
            <radialGradient id="glow-wand" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div 
        className="wheel-container relative shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-full border-[8px] sm:border-[12px] border-[#2D2418] bg-[#1a130c] overflow-hidden aspect-square w-full sm:w-[500px] h-auto sm:h-[500px]"
      >
        <svg 
          viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          className="w-full h-full transition-transform ease-out duration-[5000ms]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <g transform={`translate(${radius}, ${radius})`}>
            {CANDY_OPTIONS.map((option, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;
              
              const x1 = Math.cos((startAngle - 90) * Math.PI / 180) * radius;
              const y1 = Math.sin((startAngle - 90) * Math.PI / 180) * radius;
              const x2 = Math.cos((endAngle - 90) * Math.PI / 180) * radius;
              const y2 = Math.sin((endAngle - 90) * Math.PI / 180) * radius;
              
              const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
              
              return (
                <g key={option.id}>
                  <path 
                    d={pathData} 
                    fill={option.hex} 
                    stroke="#2D2418" 
                    strokeWidth="1" 
                  />
                  <text
                    x={Math.cos((startAngle + segmentAngle / 2 - 90) * Math.PI / 180) * (radius * 0.75)}
                    y={Math.sin((startAngle + segmentAngle / 2 - 90) * Math.PI / 180) * (radius * 0.75)}
                    fill={option.textColor}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="text-[10px] sm:text-[8px] font-bold uppercase pointer-events-none select-none"
                    style={{ fontFamily: 'Cinzel, serif' }}
                    transform={`rotate(${startAngle + segmentAngle / 2}, ${Math.cos((startAngle + segmentAngle / 2 - 90) * Math.PI / 180) * (radius * 0.75)}, ${Math.sin((startAngle + segmentAngle / 2 - 90) * Math.PI / 180) * (radius * 0.75)})`}
                  >
                    •
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Center Crystal Button */}
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[#433422] bg-[#f2e8c9] shadow-[0_0_30px_rgba(242,232,201,0.5)] flex items-center justify-center group transition-all duration-300 z-30 ${isSpinning ? 'cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-90'}`}
        >
          <div className="text-[#433422] font-black text-center leading-none">
            <span className="text-[8px] sm:text-[10px] block mb-1 opacity-70 uppercase tracking-tighter">Invocação</span>
            <span className="text-sm sm:text-xl tracking-widest">{isSpinning ? '...' : 'GIRAR'}</span>
          </div>
        </button>
      </div>
      
      {/* Decorative inner glow overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.2)_100%)] sm:block hidden" />
    </div>
  );
};

export default Wheel;
