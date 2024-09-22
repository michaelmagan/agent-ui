import React from 'react';

const colors = [
  '#F94144', '#F3722C', '#F8961E', '#F9844A', '#F9C74F',
  '#90BE6D', '#43AA8B', '#4D908E', '#577590', '#277DA1'
];

const Loader = ({ size = 24, className = '' }) => {
  const strokeWidth = size / 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <svg 
      className={`animate-spin ${className}`}
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
    >
      {colors.map((color, index) => {
        const angle = (index / colors.length) * Math.PI * 2;
        const x1 = center + radius * Math.cos(angle);
        const y1 = center + radius * Math.sin(angle);
        const x2 = center + radius * Math.cos(angle + 0.3);
        const y2 = center + radius * Math.sin(angle + 0.3);

        return (
          <line
            key={color}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default Loader;
