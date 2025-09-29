import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const QuantumBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Gerar 20 partículas em posições aleatórias
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // 1-3px
      duration: Math.random() * 3 + 2, // 2-5s
      delay: Math.random() * 2, // 0-2s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Partículas em movimento aleatório */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Átomos maiores e em mais posições */}
      {/* Átomo 1 - Superior Esquerdo */}
      <div className="absolute top-[10%] left-[15%]">
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-40">
          <circle cx="40" cy="40" r="5" fill="#60a5fa" />
          <ellipse cx="40" cy="40" rx="30" ry="15" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <ellipse cx="40" cy="40" rx="15" ry="30" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="70" cy="40" r="3" fill="#60a5fa" />
          <circle cx="10" cy="40" r="3" fill="#60a5fa" />
        </svg>
      </div>

      {/* Átomo 2 - Superior Direito */}
      <div className="absolute top-[15%] right-[10%]">
        <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-35">
          <circle cx="30" cy="30" r="4" fill="#a78bfa" />
          <ellipse cx="30" cy="30" rx="22" ry="11" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          <ellipse cx="30" cy="30" rx="11" ry="22" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="52" cy="30" r="2" fill="#a78bfa" />
          <circle cx="8" cy="30" r="2" fill="#a78bfa" />
        </svg>
      </div>

      {/* Átomo 3 - Meio */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-25">
          <circle cx="35" cy="35" r="4" fill="#22d3ee" />
          <ellipse cx="35" cy="35" rx="26" ry="13" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          <ellipse cx="35" cy="35" rx="13" ry="26" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          <circle cx="61" cy="35" r="3" fill="#22d3ee" />
          <circle cx="9" cy="35" r="3" fill="#22d3ee" />
        </svg>
      </div>

      {/* Átomo 4 - Inferior Esquerdo */}
      <div className="absolute bottom-[20%] left-[20%]">
        <svg width="65" height="65" viewBox="0 0 65 65" className="opacity-35">
          <circle cx="32" cy="32" r="4" fill="#818cf8" />
          <ellipse cx="32" cy="32" rx="24" ry="12" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <ellipse cx="32" cy="32" rx="12" ry="24" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="56" cy="32" r="2.5" fill="#818cf8" />
          <circle cx="8" cy="32" r="2.5" fill="#818cf8" />
        </svg>
      </div>

      {/* Átomo 5 - Inferior Direito */}
      <div className="absolute bottom-[15%] right-[15%]">
        <svg width="75" height="75" viewBox="0 0 75 75" className="opacity-30">
          <circle cx="37" cy="37" r="5" fill="#c084fc" />
          <ellipse cx="37" cy="37" rx="28" ry="14" fill="none" stroke="#c084fc" strokeWidth="2" />
          <ellipse cx="37" cy="37" rx="14" ry="28" fill="none" stroke="#c084fc" strokeWidth="2" />
          <circle cx="65" cy="37" r="3" fill="#c084fc" />
          <circle cx="9" cy="37" r="3" fill="#c084fc" />
        </svg>
      </div>

      {/* Átomo 6 - Meio Esquerdo */}
      <div className="absolute top-[40%] left-[5%]">
        <svg width="55" height="55" viewBox="0 0 55 55" className="opacity-30">
          <circle cx="27" cy="27" r="3" fill="#60a5fa" />
          <ellipse cx="27" cy="27" rx="20" ry="10" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          <ellipse cx="27" cy="27" rx="10" ry="20" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Trilhas de circuito - mais e maiores */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        {/* Circuito 1 - Superior */}
        <path d="M 50,50 L 150,50 L 150,150 L 250,150" stroke="#3b82f6" strokeWidth="3" fill="none" />
        <circle cx="150" cy="50" r="6" fill="#3b82f6" />
        <circle cx="150" cy="150" r="6" fill="#3b82f6" />
        <rect x="145" y="145" width="10" height="10" fill="#3b82f6" />
        
        {/* Circuito 2 - Meio */}
        <path d="M 300,100 L 400,100 L 400,250 L 500,250 L 500,350" stroke="#8b5cf6" strokeWidth="3" fill="none" />
        <circle cx="400" cy="100" r="6" fill="#8b5cf6" />
        <circle cx="400" cy="250" r="6" fill="#8b5cf6" />
        <circle cx="500" cy="250" r="6" fill="#8b5cf6" />
        <rect x="395" y="95" width="10" height="10" fill="#8b5cf6" />
        
        {/* Circuito 3 - Inferior */}
        <path d="M 100,400 L 200,400 L 200,500 L 350,500" stroke="#06b6d4" strokeWidth="3" fill="none" />
        <circle cx="200" cy="400" r="6" fill="#06b6d4" />
        <circle cx="200" cy="500" r="6" fill="#06b6d4" />
        <rect x="195" y="495" width="10" height="10" fill="#06b6d4" />
        
        {/* Circuito 4 - Direita */}
        <path d="M 700,150 L 600,150 L 600,300 L 500,300" stroke="#3b82f6" strokeWidth="3" fill="none" />
        <circle cx="600" cy="150" r="6" fill="#3b82f6" />
        <circle cx="600" cy="300" r="6" fill="#3b82f6" />
        
        {/* Circuito 5 - Diagonal */}
        <path d="M 250,300 L 350,300 L 400,400" stroke="#a78bfa" strokeWidth="3" fill="none" />
        <circle cx="350" cy="300" r="6" fill="#a78bfa" />
        <rect x="345" y="295" width="10" height="10" fill="#a78bfa" />
      </svg>
    </div>
  );
};

export default QuantumBackground;