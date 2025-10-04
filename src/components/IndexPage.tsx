import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserSession } from '../types';
import QRScanner from './QRScanner';
import QuantumBackground from './QuantumBackground';
import Footer from './Footer';
import { validateQRCode } from '../utils/qrValidator';


interface PuzzlePiece {
  id: number;
  turma: string;
  grupo: string;
  collected: boolean;
  tema: string;
  qrCode: string;
}

const IndexPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<UserSession | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [collectedCount, setCollectedCount] = useState(0);

  const allPieces: PuzzlePiece[] = [
    { id: 1, turma: '9º', grupo: '1', collected: false, tema: 'Introdução à Ciência Quântica', qrCode: '9º ano grupo 1' },
    { id: 2, turma: '9º', grupo: '2', collected: false, tema: 'Introdução à Ciência Quântica', qrCode: '9º ano grupo 2' },
    { id: 3, turma: '2ª', grupo: '5', collected: false, tema: 'Escape Room Quântico', qrCode: '2ª série grupo 4' },
    { id: 4, turma: '2ª', grupo: '6', collected: false, tema: 'Escape Room Quântico', qrCode: '2ª série grupo 5' },
    { id: 5, turma: '1ª', grupo: '1', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 1' },
    { id: 6, turma: '1ª', grupo: '2', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 2' },
    { id: 7, turma: '1ª', grupo: '3', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 3' },
    { id: 8, turma: '1ª', grupo: '4', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 4' },
    { id: 9, turma: '1ª', grupo: '5', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 5' },
    { id: 10, turma: '1ª', grupo: '6', collected: false, tema: 'Escape Room Quântico', qrCode: '1ª série grupo 6' },
    { id: 11, turma: '2ª', grupo: '1', collected: false, tema: 'Escape Room Quântico', qrCode: '2ª série grupo 1' },
    { id: 12, turma: '2ª', grupo: '2', collected: false, tema: 'Escape Room Quântico', qrCode: '2ª série grupo 2' },
    { id: 13, turma: '2ª', grupo: '3', collected: false, tema: 'Escape Room Quântico', qrCode: '2ª série grupo 3' },
    { id: 14, turma: '9º', grupo: '3', collected: false, tema: 'Transição - relação com a IA', qrCode: '9º ano grupo 3' },
    { id: 15, turma: '6º', grupo: '1', collected: false, tema: 'Aplicações da IA', qrCode: '6º ano grupo 1' },
    { id: 16, turma: '6º', grupo: '2', collected: false, tema: 'Aplicações da IA', qrCode: '6º ano grupo 2' },
    { id: 17, turma: '6º', grupo: '3', collected: false, tema: 'Aplicações da IA', qrCode: '6º ano grupo 3' },
    { id: 18, turma: '6º', grupo: '4', collected: false, tema: 'Aplicações da IA', qrCode: '6º ano grupo 4' },
    { id: 19, turma: '7º', grupo: '1', collected: false, tema: 'Aplicações da IA', qrCode: '7º ano grupo 1' },
    { id: 20, turma: '7º', grupo: '2', collected: false, tema: 'Aplicações da IA', qrCode: '7º ano grupo 2' },
    { id: 21, turma: '7º', grupo: '3', collected: false, tema: 'Aplicações da IA', qrCode: '7º ano grupo 3' },
    { id: 22, turma: '8º', grupo: '1', collected: false, tema: 'Aplicações da IA', qrCode: '8º ano grupo 1' },
    { id: 23, turma: '8º', grupo: '2', collected: false, tema: 'Aplicações da IA', qrCode: '8º ano grupo 2' },
    { id: 24, turma: '8º', grupo: '3', collected: false, tema: 'Aplicações da IA', qrCode: '8º ano grupo 3' },
  ];

  useEffect(() => {
    const sessionData = localStorage.getItem('currentSession');
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }

    const savedProgress = localStorage.getItem('puzzleProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setPuzzlePieces(progress);
      setCollectedCount(progress.filter((p: PuzzlePiece) => p.collected).length);
    } else {
      setPuzzlePieces(allPieces);
    }
  }, []);

 const handleChangeStudent = async () => {
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
  
  confirmBtn?.addEventListener('click', async () => {
    // Decrementar activeSessions se for responsável
    if (session?.studentId) {
      try {
        const alunoRef = doc(db, 'alunos', session.studentId);
        const alunoSnap = await getDoc(alunoRef);
        
        if (alunoSnap.exists()) {
          const currentSessions = alunoSnap.data().activeSessions || 0;
          await updateDoc(alunoRef, {
            activeSessions: Math.max(0, currentSessions - 1)
          });
        }
      } catch (err) {
        console.error('Erro ao decrementar activeSessions:', err);
      }
    }
    
    document.body.removeChild(modal);
    localStorage.removeItem('currentSession');
    localStorage.removeItem('puzzleProgress');
    navigate('/');
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

  const showErrorModal = (message: string) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-white/20 shadow-2xl">
        <h3 class="text-xl font-bold text-white mb-4">Atenção!</h3>
        <p class="text-white/80 mb-6 whitespace-pre-line">
          ${message}
        </p>
        <button 
          id="okBtn" 
          class="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium transition-all"
        >
          Entendi
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    const okBtn = document.getElementById('okBtn');
    okBtn?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };

  const handleScanSuccess = async (decodedText: string) => {
    console.log('QR Code escaneado:', decodedText);
    setShowScanner(false);
    
    const validation = validateQRCode(decodedText, puzzlePieces);
    
    if (!validation.isValid) {
      showErrorModal(validation.error!);
      return;
    }

    if (decodedText.toUpperCase() === 'BRINDE') {
  showBrindeModal();
  return;
}

    
    const alreadyCollected = puzzlePieces.find(p => p.qrCode === decodedText && p.collected);
    if (alreadyCollected) {
      showErrorModal('Você já escaneou este QR Code!\n\nSiga para a próxima etapa.');
      return;
    }
    
    const updatedPieces = puzzlePieces.map(piece => 
      piece.qrCode === decodedText 
        ? { ...piece, collected: true }
        : piece
    );
    
    setPuzzlePieces(updatedPieces);
    const newCollectedCount = updatedPieces.filter(p => p.collected).length;
    setCollectedCount(newCollectedCount);
    
    localStorage.setItem('puzzleProgress', JSON.stringify(updatedPieces));
    
    console.log(`Peça coletada! Total: ${newCollectedCount}/24`);
    
    // Salvar progresso no Firebase
    if (session?.id) {
      try {
        const sessionRef = doc(db, 'sessions', session.id);
        await updateDoc(sessionRef, {
          piecesCollected: updatedPieces.filter(p => p.collected).map(p => p.qrCode),
          completedAll: newCollectedCount === 24
        });
      } catch (error) {
        console.error('Erro ao salvar progresso no Firebase:', error);
      }
    }
    
    // Modal especial apenas quando completar tudo
    if (newCollectedCount === 24) {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
      modal.innerHTML = `
        <div class="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-white/20 shadow-2xl">
          <h3 class="text-2xl font-bold text-white mb-4 text-center">🎊 Parabéns! 🎊</h3>
          <p class="text-white/80 mb-6 text-center">
            Você completou todas as 24 peças do quebra-cabeça!<br/><br/>
            Dirija-se à mesa da entrada da quadra para retirar seu brinde!
          </p>
          <button 
            id="congratsBtn" 
            class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-white font-semibold transition-all"
          >
            Retirar Brinde
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      const congratsBtn = document.getElementById('congratsBtn');
      congratsBtn?.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    }
  };

  const showBrindeModal = () => {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="text-center space-y-8 max-w-2xl">
      <img 
        src="/logo-upverse.png" 
        alt="UPverse Logo" 
        class="w-64 h-64 mx-auto object-contain animate-pulse"
        style="filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 80px rgba(147, 51, 234, 0.6))"
      />
      
      <div class="space-y-4">
        <h2 class="text-5xl font-bold text-white">
          Parabéns!
        </h2>
        
        <p class="text-2xl text-white/90">
          Obrigado por participar do
        </p>
        
        <h1 class="text-6xl font-bold gradient-text">
          UPverse
        </h1>
        
        <p class="text-xl text-cyan-400">
          do Quântico à Inteligência Artificial
        </p>
        
        <div class="pt-8">
          <div class="inline-block px-8 py-4 bg-green-500/20 border-2 border-green-400 rounded-full">
            <p class="text-3xl font-bold text-green-300">
              ✓ BRINDE LIBERADO
            </p>
          </div>
        </div>
      </div>
      
      <button 
        id="closeBrindeBtn" 
        class="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white text-xl font-semibold transition-all transform hover:scale-105"
      >
        Fechar
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = document.getElementById('closeBrindeBtn');
  closeBtn?.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
};

const getNextStep = () => {
  const mainCircuitPieces = puzzlePieces.slice(0, 14); // Peças 1-14
  const quadraPieces = puzzlePieces.slice(14, 24); // Peças 15-24
  
  const mainCircuitComplete = mainCircuitPieces.every(p => p.collected);
  const quadraComplete = quadraPieces.every(p => p.collected);
  
  // Completou TUDO (24 peças)
  if (mainCircuitComplete && quadraComplete) {
    return 'Você completou o circuito Upverse! Escaneie o QR Code "Brinde" ao lado do Laboratório de Química para retirar seu brinde.';
  }
  
  // Completou circuito principal (14 peças) - direciona para quadra OU brinde
  if (mainCircuitComplete && !quadraComplete) {
    return 'Escape Room Quântico concluído! Agora você pode ir para a quadra completar os grupos do 6º, 7º e 8º ano OU Escaneie o QR Code "Brinde" ao lado do Laboratório de Química para retirar seu brinde.';
  }
  
  // Completou quadra (10 peças) - direciona para circuito principal OU brinde
  if (quadraComplete && !mainCircuitComplete) {
    return 'Grupos do 6º, 7º e 8º ano - Completos! Agora você pode ir para Sala 1 (robótica) começar o circuito principal OU OU Escaneie o QR Code "Brinde" ao lado do Laboratório de Química para retirar seu brinde.';
  }
  
  // Início - pode escolher qualquer rota
  if (collectedCount === 0) {
    return 'Siga para Sala 1 (robótica) - 9º ano e Ensino Médio OU Quadra - grupos do 6º, 7º e 8º ano';
  }
  
  // Se começou pelo circuito principal
  if (puzzlePieces[0].collected && collectedCount === 1) {
    return 'Sala 1 (robótica) - 9º ano Grupo 2';
  }
  
  // Escape Room (peças 3-13)
  if (collectedCount >= 2 && collectedCount <= 13) {
    switch (collectedCount) {
      case 2: return 'Sala 2 - 2ª série Grupo 4 (Escape Room)';
      case 3: return 'Sala 2 - 2ª série Grupo 5 (Escape Room)';
      case 4: return 'Sala 3 - 1ª série Grupo 1 (Escape Room)';
      case 5: return 'Sala 3 - 1ª série Grupo 2 (Escape Room)';
      case 6: return 'Sala 4 - 1ª série Grupo 3 (Escape Room)';
      case 7: return 'Sala 5 - 1ª série Grupo 4 (Escape Room)';
      case 8: return 'Sala 5 - 1ª série Grupo 5 (Escape Room)';
      case 9: return 'Sala 6 - 1ª série Grupo 6 (Escape Room)';
      case 10: return 'Sala 7 - 2ª série Grupo 1 (Escape Room)';
      case 11: return 'Sala 7 - 2ª série Grupo 2 (Escape Room)';
      case 12: return 'Sala 8 - 2ª série Grupo 3 (Escape Room)';
      case 13: return 'Sala 9 - 9º ano Grupo 3 (Transição Quântica → IA)';
    }
  }
  
  // Caso padrão
  return 'Quadra - grupos do 6º, 7º e 8º ano OU continue o circuito principal';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 pb-24 relative overflow-hidden">
      <QuantumBackground />

      {showScanner && (
        <QRScanner 
          onClose={() => setShowScanner(false)} 
          onScanSuccess={handleScanSuccess} 
        />
      )}

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-upverse.png" 
            alt="UPverse Logo" 
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">UPverse</span>
          </h1>
          <h2 className="text-lg md:text-xl text-white/90">
            do <span className="font-quantum text-cyan-400">Quântico</span> à <span className="font-quantum text-purple-300">Inteligência Artificial</span>
          </h2>
        </div>

        <div className="text-center mb-6 space-y-2">
          <p className="text-lg text-white/70">Feira de Ciências 2025</p>
          
          {session.studentId ? (
            <div>
              <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full mb-2">
                <span className="text-blue-300 font-medium text-sm">Responsável</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{session.studentName}</h2>
              <p className="text-lg text-cyan-400">{session.studentTurma}</p>
            </div>
          ) : (
            <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
              <span className="text-purple-300 font-medium text-sm">Visitante</span>
            </div>
          )}
        </div>

        <div className="glass-effect p-6 mb-6">
          <div className="relative">
            <img 
              src="/logo-upverse.png" 
              alt="Puzzle Background" 
              className="absolute inset-0 w-full h-full object-contain opacity-80"
            />
            
            <div className="relative grid grid-cols-6 gap-0 aspect-[3/2]">
              {(() => {
                // Ordem fixa embaralhada (índices de 0 a 23)
                const shuffledOrder = [14, 7, 19, 2, 11, 23, 5, 16, 0, 22, 9, 3, 17, 12, 6, 20, 1, 15, 8, 21, 13, 4, 18, 10];
                
                return shuffledOrder.map((index) => {
                  const piece = puzzlePieces[index];
                  return (
                    <div
                      key={piece.id}
                      className={`
                        border border-white/20 rounded-sm transition-all duration-300
                        ${piece.collected 
                          ? 'bg-transparent' 
                          : 'bg-black/95 backdrop-blur-sm'
                        }
                      `}
                    />
                  );
                });
              })()}
            </div>
          </div>
        </div>

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

        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-white">
            <span className="text-cyan-400">{collectedCount}</span>
            <span className="text-white/50">/24</span>
          </p>
          <p className="text-white/70 text-sm">peças do quebra-cabeça digital</p>
        </div>

        <div className="glass-effect p-4 mb-6">
          <h3 className="text-sm font-semibold text-white/70 mb-2">Próxima etapa</h3>
          <p className="text-white font-medium">{getNextStep()}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowScanner(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Escanear QR Code
          </button>
          
          <button
            onClick={() => setShowMapModal(true)}
            className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-emerald-200 font-medium transition-colors"
          >
            Ver mapa do colégio
          </button>

          <a
            href="/informacoes-upverse-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-200 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ver informações da feira
          </a>

          <button
            onClick={handleChangeStudent}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white/80 font-medium transition-colors border border-white/10"
          >
            Escolher outro aluno
          </button>
        </div>
      </div>

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

      <Footer />
    </div>
  );
};

export default IndexPage;