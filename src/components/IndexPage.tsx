import { useEffect, useState } from 'react';
import { UserSession } from '../types';
import QRScanner from './QRScanner';
import QuantumBackground from './QuantumBackground';

interface PuzzlePiece {
  id: number;
  turma: string;
  grupo: string;
  collected: boolean;
}

const IndexPage = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [collectedCount, setCollectedCount] = useState(0);

  // Definir todas as 24 peças do quebra-cabeça
  const allPieces: PuzzlePiece[] = [
    // 6º ano - 4 grupos
    { id: 1, turma: '6º', grupo: '1', collected: false },
    { id: 2, turma: '6º', grupo: '2', collected: false },
    { id: 3, turma: '6º', grupo: '3', collected: false },
    { id: 4, turma: '6º', grupo: '4', collected: false },
    // 7º ano - 3 grupos
    { id: 5, turma: '7º', grupo: '1', collected: false },
    { id: 6, turma: '7º', grupo: '2', collected: false },
    { id: 7, turma: '7º', grupo: '3', collected: false },
    // 8º ano - 3 grupos
    { id: 8, turma: '8º', grupo: '1', collected: false },
    { id: 9, turma: '8º', grupo: '2', collected: false },
    { id: 10, turma: '8º', grupo: '3', collected: false },
    // 9º ano - 3 grupos
    { id: 11, turma: '9º', grupo: '1', collected: false },
    { id: 12, turma: '9º', grupo: '2', collected: false },
    { id: 13, turma: '9º', grupo: '3', collected: false },
    // 1ª série - 6 grupos
    { id: 14, turma: '1ª', grupo: '1', collected: false },
    { id: 15, turma: '1ª', grupo: '2', collected: false },
    { id: 16, turma: '1ª', grupo: '3', collected: false },
    { id: 17, turma: '1ª', grupo: '4', collected: false },
    { id: 18, turma: '1ª', grupo: '5', collected: false },
    { id: 19, turma: '1ª', grupo: '6', collected: false },
    // 2ª série - 5 grupos
    { id: 20, turma: '2ª', grupo: '1', collected: false },
    { id: 21, turma: '2ª', grupo: '2', collected: false },
    { id: 22, turma: '2ª', grupo: '3', collected: false },
    { id: 23, turma: '2ª', grupo: '4', collected: false },
    { id: 24, turma: '2ª', grupo: '5', collected: false },
  ];

  useEffect(() => {
    const sessionData = localStorage.getItem('currentSession');
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }

    // Carregar progresso do quebra-cabeça
    const savedProgress = localStorage.getItem('puzzleProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setPuzzlePieces(progress);
      setCollectedCount(progress.filter((p: PuzzlePiece) => p.collected).length);
    } else {
      setPuzzlePieces(allPieces);
    }
  }, []);

  const handleChangeStudent = () => {
    const confirmed = confirm(
      'Atenção! Ao escolher outro aluno, todo o progresso do quebra-cabeça será perdido. Deseja continuar?'
    );
    
    if (confirmed) {
      localStorage.removeItem('currentSession');
      localStorage.removeItem('puzzleProgress');
      window.location.href = '/';
    }
  };

  const getNextStep = () => {
    if (collectedCount === 24) {
      return 'Retirar brinde na mesa da entrada da quadra';
    }
    
    // Determinar próxima etapa baseado no progresso
    if (collectedCount < 4) {
      return 'Introdução Quântica - Sala de Robótica';
    } else if (collectedCount < 13) {
      return 'Escape Room Quântico - 4 cômodos';
    } else if (collectedCount < 14) {
      return 'Transição Quântico-IA - Corredor';
    } else {
      return 'Aplicações de IA - Quadra';
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (showScanner) {
    return <QRScanner onClose={() => setShowScanner(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 pb-24 relative overflow-hidden">
      {/* Background: Partículas e circuitos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {/* Partículas em movimento */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
        
        {/* Átomos estáticos */}
        <div className="absolute top-1/4 left-1/4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-30">
            <circle cx="20" cy="20" r="3" fill="#60a5fa" />
            <ellipse cx="20" cy="20" rx="15" ry="8" fill="none" stroke="#60a5fa" strokeWidth="1" />
            <ellipse cx="20" cy="20" rx="8" ry="15" fill="none" stroke="#60a5fa" strokeWidth="1" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-30">
            <circle cx="20" cy="20" r="3" fill="#a78bfa" />
            <ellipse cx="20" cy="20" rx="15" ry="8" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <ellipse cx="20" cy="20" rx="8" ry="15" fill="none" stroke="#a78bfa" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Trilhas de circuito */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,100 L 100,100 L 100,200 L 200,200" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M 400,50 L 300,50 L 300,150" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="4" fill="#3b82f6" />
          <circle cx="100" cy="200" r="4" fill="#3b82f6" />
          <circle cx="300" cy="50" r="4" fill="#3b82f6" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-upverse.png" 
            alt="UPverse Logo" 
            className="w-32 h-32 object-contain"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))'
            }}
          />
        </div>

        {/* Título com UPverse e Quântico estilizado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">UPverse</span>
          </h1>
          <h2 className="text-lg md:text-xl text-white/90">
            do <span className="font-quantum text-cyan-400 tracking-wider">Quântico</span> à Inteligência Artificial
          </h2>
        </div>

        {/* Card de informações do usuário */}
        <div className="glass-effect p-6 mb-6">
          {session.tipo === 'responsavel' ? (
            <div className="text-center space-y-2">
              <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full mb-2">
                <span className="text-blue-300 font-medium text-sm">Responsável</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{session.alunoNome}</h2>
              <p className="text-lg text-cyan-400">{session.turma}</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full mb-2">
                <span className="text-purple-300 font-medium text-sm">Visitante</span>
              </div>
              <h2 className="text-xl font-bold text-white">Feira de Ciências 2025</h2>
            </div>
          )}
        </div>

        {/* Quebra-cabeça Principal (6x4) */}
        <div className="glass-effect p-6 mb-6">
          <div className="relative">
            {/* Imagem de fundo do logo */}
            <img 
              src="/logo-upverse.png" 
              alt="Puzzle Background" 
              className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale"
            />
            
            {/* Grid 6x4 sobre a imagem */}
            <div className="relative grid grid-cols-6 gap-1 aspect-[3/2]">
              {puzzlePieces.slice(0, 24).map((piece) => (
                <div
                  key={piece.id}
                  className={`
                    border border-white/20 rounded-sm transition-all duration-300
                    ${piece.collected 
                      ? 'bg-transparent' 
                      : 'bg-gray-800/80 backdrop-blur-sm'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Miniaturas das peças */}
        <div className="glass-effect p-4 mb-6">
          <div className="grid grid-cols-12 gap-1">
            {puzzlePieces.map((piece) => (
              <div
                key={piece.id}
                className={`
                  aspect-square rounded-sm border transition-all duration-200
                  ${piece.collected
                    ? 'bg-cyan-500/30 border-cyan-400/50'
                    : 'bg-gray-700/50 border-gray-600/50'
                  }
                  flex flex-col items-center justify-center
                `}
                title={`${piece.turma} ano - Grupo ${piece.grupo}`}
              >
                <span className="text-[8px] text-white/70 font-medium">{piece.turma}</span>
                <span className="text-[8px] text-white/50">G{piece.grupo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contador de peças */}
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-white">
            <span className="text-cyan-400">{collectedCount}</span>
            <span className="text-white/50">/24</span>
          </p>
          <p className="text-white/70 text-sm">peças do quebra-cabeça digital</p>
        </div>

        {/* Próxima etapa */}
        <div className="glass-effect p-4 mb-6">
          <h3 className="text-sm font-semibold text-white/70 mb-2">Próxima etapa</h3>
          <p className="text-white font-medium">{getNextStep()}</p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          {/* Botão Mapa */}
          <button
            onClick={() => setShowMapModal(true)}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors border border-white/20"
          >
            Ver Mapa da Escola
          </button>

          {/* Botão Escanear QR */}
          <button
            onClick={() => setShowScanner(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Escanear QR Code
          </button>

          {/* Botão Escolher Outro Aluno */}
          <button
            onClick={handleChangeStudent}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white/80 font-medium transition-colors border border-white/10"
          >
            Escolher Outro Aluno
          </button>
        </div>
      </div>

      {/* Modal do Mapa */}
      {showMapModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowMapModal(false)}
        >
          <div 
            className="bg-slate-800 rounded-lg p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Mapa da Escola</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <img 
              src="/mapa-escola.png" 
              alt="Mapa da Escola" 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-3">
          <img 
            src="/logo-up.png" 
            alt="Colégio UP" 
            className="h-8 w-8 object-contain opacity-60"
          />
          <span className="text-white/50 text-sm">Colégio UP • 2025</span>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;