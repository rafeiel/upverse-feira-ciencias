import { useEffect, useState } from 'react';
import { UserSession } from '../types';
import QRScanner from './QRScanner';
import QuantumBackground from './QuantumBackground';

interface PuzzlePiece {
  id: number;
  turma: string;
  grupo: string;
  collected: boolean;
  tema: string;
}

const IndexPage = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [collectedCount, setCollectedCount] = useState(0);

  // Definir todas as 24 peças do quebra-cabeça na ordem correta
  const allPieces: PuzzlePiece[] = [
    // Salas 1-9
    { id: 1, turma: '9º', grupo: '1', collected: false, tema: 'Introdução à Ciência Quântica' },
    { id: 2, turma: '9º', grupo: '2', collected: false, tema: 'Introdução à Ciência Quântica' },
    { id: 3, turma: '2ª', grupo: '5', collected: false, tema: 'Escape Room Quântico' },
    { id: 4, turma: '2ª', grupo: '6', collected: false, tema: 'Escape Room Quântico' },
    { id: 5, turma: '1ª', grupo: '1', collected: false, tema: 'Escape Room Quântico' },
    { id: 6, turma: '1ª', grupo: '2', collected: false, tema: 'Escape Room Quântico' },
    { id: 7, turma: '1ª', grupo: '3', collected: false, tema: 'Escape Room Quântico' },
    { id: 8, turma: '1ª', grupo: '4', collected: false, tema: 'Escape Room Quântico' },
    { id: 9, turma: '1ª', grupo: '5', collected: false, tema: 'Escape Room Quântico' },
    { id: 10, turma: '2ª', grupo: '1', collected: false, tema: 'Escape Room Quântico' },
    { id: 11, turma: '2ª', grupo: '2', collected: false, tema: 'Escape Room Quântico' },
    { id: 12, turma: '2ª', grupo: '3', collected: false, tema: 'Escape Room Quântico' },
    { id: 13, turma: '9º', grupo: '3', collected: false, tema: 'Transição - relação com a IA' },
    // Quadra
    { id: 14, turma: '6º', grupo: '1', collected: false, tema: 'Aplicações da IA' },
    { id: 15, turma: '6º', grupo: '2', collected: false, tema: 'Aplicações da IA' },
    { id: 16, turma: '6º', grupo: '3', collected: false, tema: 'Aplicações da IA' },
    { id: 17, turma: '6º', grupo: '4', collected: false, tema: 'Aplicações da IA' },
    { id: 18, turma: '7º', grupo: '1', collected: false, tema: 'Aplicações da IA' },
    { id: 19, turma: '7º', grupo: '2', collected: false, tema: 'Aplicações da IA' },
    { id: 20, turma: '7º', grupo: '3', collected: false, tema: 'Aplicações da IA' },
    { id: 21, turma: '8º', grupo: '1', collected: false, tema: 'Aplicações da IA' },
    { id: 22, turma: '8º', grupo: '2', collected: false, tema: 'Aplicações da IA' },
    { id: 23, turma: '8º', grupo: '3', collected: false, tema: 'Aplicações da IA' },
    { id: 24, turma: '1ª', grupo: '6', collected: false, tema: 'Escape Room Quântico' },
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
    // Modal customizado ao invés de alert
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-white/20 shadow-2xl">
        <h3 class="text-xl font-bold text-white mb-4">Atenção!</h3>
        <p class="text-white/80 mb-6">
          Ao escolher outro aluno, todo o progresso do quebra-cabeça será perdido. Deseja continuar?
        </p>
        <div class="flex gap-3">
          <button 
            id="cancelBtn" 
            class="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          >
            Cancelar
          </button>
          <button 
            id="confirmBtn" 
            class="flex-1 py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    confirmBtn?.addEventListener('click', () => {
      localStorage.removeItem('currentSession');
      localStorage.removeItem('puzzleProgress');
      window.location.href = '/';
    });
    
    cancelBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
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
      {/* Background Quântico Unificado */}
      <QuantumBackground />

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
            do <span className="font-quantum text-cyan-400">Quântico</span> à <span className="font-quantum text-purple-300">Inteligência Artificial</span>
          </h2>
        </div>

        {/* Card de informações do usuário */}
        <div className="text-center mb-6 space-y-2">
          <p className="text-lg text-white/70">Feira de Ciências 2025</p>
          
          {session.tipo === 'responsavel' ? (
            <div>
              <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full mb-2">
                <span className="text-blue-300 font-medium text-sm">Responsável</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{session.alunoNome}</h2>
              <p className="text-lg text-cyan-400">{session.turma}</p>
            </div>
          ) : (
            <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
              <span className="text-purple-300 font-medium text-sm">Visitante</span>
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
            Ver mapa do colégio
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
            Escolher outro aluno
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
              <h3 className="text-xl font-bold text-white">Mapa do colégio</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <img 
              src="/mapa-escola.png" 
              alt="Mapa do Colégio" 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}

      {/* Footer Unificado */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="text-center text-white/50 text-sm space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p>Desenvolvido por</p>
            <a 
              href="https://www.instagram.com/rafaeldisoares" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@rafaeldisoares</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span>para o</span>
            <a 
              href="https://www.instagram.com/colegio_up" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@colegio_up</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            <img 
              src="/logo-up.png" 
              alt="Colégio UP" 
              className="h-8 w-8 object-contain opacity-60"
            />
            <span>Colégio UP • 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;