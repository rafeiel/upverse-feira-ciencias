import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48', 
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Logo baseado no design do PDF */}
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full animate-float quantum-pulse"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo externo */}
        <circle 
          cx="200" 
          cy="200" 
          r="190" 
          fill="none" 
          stroke="#1e40af" 
          strokeWidth="8"
          className="opacity-80"
        />
        
        {/* Listras vermelhas horizontais */}
        <g>
          <rect x="50" y="140" width="300" height="15" fill="#dc2626" rx="7" />
          <rect x="50" y="170" width="300" height="15" fill="#dc2626" rx="7" />
          <rect x="50" y="200" width="300" height="15" fill="#dc2626" rx="7" />
          <rect x="50" y="230" width="300" height="15" fill="#dc2626" rx="7" />
          <rect x="50" y="260" width="300" height="15" fill="#dc2626" rx="7" />
        </g>
        
        {/* Diamond central azul */}
        <g transform="translate(200,200)">
          <path 
            d="M 0,-60 L 60,0 L 0,60 L -60,0 Z" 
            fill="url(#blueGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Highlight no diamond */}
          <path 
            d="M 0,-60 L 60,0 L 0,20 L -40,-20 Z" 
            fill="url(#lightBlueGradient)"
            opacity="0.7"
          />
        </g>
        
        {/* Container para texto "Upverse" */}
        <rect 
          x="80" 
          y="160" 
          width="240" 
          height="80" 
          fill="#1e40af" 
          rx="40"
          className="drop-shadow-lg"
        />
        
        {/* Texto "Upverse" */}
        <text 
          x="200" 
          y="190" 
          textAnchor="middle" 
          className="fill-white font-bold text-2xl"
          style={{ fontSize: '32px' }}
        >
          Upverse
        </text>
        
        {/* Subtítulo */}
        <text 
          x="200" 
          y="215" 
          textAnchor="middle" 
          className="fill-white/80 text-sm"
          style={{ fontSize: '12px' }}
        >
          Do quântico ao artificial
        </text>
        
        {/* Pontos decorativos */}
        <circle cx="120" cy="120" r="4" fill="#dc2626" />
        <circle cx="280" cy="120" r="4" fill="#dc2626" />
        
        {/* Gradientes */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          
          <linearGradient id="lightBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;