import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Turma, Aluno } from '../types';
import { seedDatabase } from '../data/seedAlunos';
import QuantumBackground from './QuantumBackground';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'visitante' | 'responsavel' | null>(null);
  const [selectedTurma, setSelectedTurma] = useState<Turma | ''>('');
  const [searchText, setSearchText] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const turmas: Turma[] = ['6º ano', '7º ano', '8º ano', '9º ano', '1ª série', '2ª série'];

  // Popular banco de dados na primeira vez
  useEffect(() => {
    seedDatabase();
  }, []);

  // Buscar alunos quando turma é selecionada
  useEffect(() => {
    if (selectedTurma && searchText.length >= 2) {
      fetchAlunos();
    } else {
      setFilteredAlunos([]);
      setShowSuggestions(false);
    }
  }, [selectedTurma, searchText]);

  const fetchAlunos = async () => {
  if (!selectedTurma) return;
  
  try {
    //console.log('🔍 Buscando alunos da turma:', selectedTurma);
    const alunosRef = collection(db, 'alunos');
    const q = query(alunosRef, where('turma', '==', selectedTurma));
    const snapshot = await getDocs(q);
    
    console.log('📦 Documentos encontrados:', snapshot.size);
    
    const alunos = snapshot.docs.map(doc => {
      const data = doc.data();
      //console.log('👤 Aluno:', data);
      return {
        id: doc.id,
        ...data
      };
    }) as Aluno[];
    
    const filtered = alunos.filter(aluno => 
      aluno.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    
    //console.log('✅ Alunos filtrados:', filtered.length);
    setFilteredAlunos(filtered);
  } catch (error) {
    console.error('❌ Erro ao buscar alunos:', error);
    setError('Erro ao buscar alunos. Verifique a conexão com o Firebase.');
  }
};

  const handleAlunoSelect = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setSearchText(aluno.nome);
    setShowSuggestions(false);
    setError('');
  };

  const handleIniciarJornada = async () => {
    setIsLoading(true);
    setError('');

    try {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      if (userType === 'responsavel' && selectedAluno) {
        // Buscar dados atualizados do aluno
        const alunoRef = doc(db, 'alunos', selectedAluno.id);
        const alunoSnap = await getDoc(alunoRef);
        
        if (!alunoSnap.exists()) {
          setError('Aluno não encontrado no banco de dados.');
          setIsLoading(false);
          return;
        }

        const alunoData = alunoSnap.data() as Aluno;
        
        // Verificar se já tem 2 responsáveis
        if (alunoData.responsaveis && alunoData.responsaveis.length >= 2) {
          setError(`O limite de 2 responsáveis para ${selectedAluno.nome} já foi atingido. Selecione "Visitante" para continuar.`);
          setIsLoading(false);
          return;
        }

        // Adicionar responsável ao aluno
        const newResponsavel = {
          timestamp: Timestamp.now(),
          sessionId
        };

        await updateDoc(alunoRef, {
          responsaveis: [...(alunoData.responsaveis || []), newResponsavel]
        });

        // Criar sessão do usuário
        const sessionData = {
          tipo: 'responsavel' as const,
          alunoId: selectedAluno.id,
          alunoNome: selectedAluno.nome,
          turma: selectedAluno.turma,
          timestamp: Timestamp.now()
        };

        const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
        
        console.log('✅ Sessão de responsável criada:', sessionRef.id);
        
        // Redirecionar para página de jornada
        localStorage.setItem('currentSession', JSON.stringify({ 
          id: sessionRef.id, 
          tipo: 'responsavel',
          alunoId: selectedAluno.id,
          alunoNome: selectedAluno.nome,
          turma: selectedAluno.turma,
          timestamp: new Date()
        }));
        navigate('/jornada');
      } else {
        // Visitante
        const sessionData = {
          tipo: 'visitante' as const,
          timestamp: Timestamp.now()
        };

        const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
        
        console.log('✅ Sessão de visitante criada:', sessionRef.id);
        
        localStorage.setItem('currentSession', JSON.stringify({ 
          id: sessionRef.id, 
          tipo: 'visitante',
          timestamp: new Date()
        }));
        navigate('/jornada');
      }
    } catch (err) {
      console.error('❌ Erro completo:', err);
      setError('Erro ao iniciar jornada. Verifique a configuração do Firebase no console (F12).');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonEnabled = 
    userType === 'visitante' || 
    (userType === 'responsavel' && selectedTurma && selectedAluno);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 pb-24 relative overflow-hidden">
      {/* Background Quântico Unificado */}
      <QuantumBackground />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto w-full">
        {/* Logo PNG/SVG */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-upverse.png" 
            alt="UPverse Logo" 
            className="w-64 h-64 md:w-80 md:h-80 animate-float object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3))'
            }}
          />
        </div>
        
        {/* Título principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="gradient-text">UPverse</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl lg:text-4xl font-medium text-white/90 leading-tight">
            do <span className="font-quantum text-cyan-400">Quântico</span> à 
            <br className="md:hidden" />
            <span className="font-quantum text-purple-300"> Inteligência Artificial</span>
          </h2>
        </div>
        
        {/* Subtítulo */}
        <div className="text-center space-y-2 mx-auto max-w-lg">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Feira de Ciências
          </p>
          <p className="text-base md:text-lg text-white/70">
            Colégio UP • Macaé
          </p>
          <p className="text-xl md:text-2xl text-blue-300 font-semibold mt-3">
            4 de setembro de 2025
          </p>
        </div>
        
        {/* Formulário de seleção */}
        <div className="glass-effect px-6 py-8 mx-auto max-w-lg space-y-6">
          {/* Radio buttons */}
          <div className="space-y-3">
            <p className="text-white/70 font-medium text-base mb-4">Selecione uma opção:</p>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="userType"
                value="visitante"
                checked={userType === 'visitante'}
                onChange={() => {
                  setUserType('visitante');
                  setSelectedTurma('');
                  setSearchText('');
                  setSelectedAluno(null);
                  setError('');
                }}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-white/80 group-hover:text-white transition-colors text-lg">
                Visitante
              </span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="userType"
                value="responsavel"
                checked={userType === 'responsavel'}
                onChange={() => {
                  setUserType('responsavel');
                  setError('');
                }}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-white/80 group-hover:text-white transition-colors text-lg">
                Responsável
              </span>
            </label>
          </div>

          {/* Dropdown de turmas - aparece apenas para responsável */}
          {userType === 'responsavel' && (
            <div className="space-y-4 animate-fade-in">
              <select
                id="turma-select"
                name="turma"
                value={selectedTurma}
                onChange={(e) => {
                  setSelectedTurma(e.target.value as Turma);
                  setSearchText('');
                  setSelectedAluno(null);
                }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" className="bg-gray-800">Selecione a turma</option>
                {turmas.map(turma => (
                  <option key={turma} value={turma} className="bg-gray-800">{turma}</option>
                ))}
              </select>

              {/* Campo de busca de aluno */}
              {selectedTurma && (
                <div className="relative">
                  <input
                    id="aluno-search"
                    name="aluno"
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setShowSuggestions(true);
                      setSelectedAluno(null);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Digite o nome do aluno..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Sugestões de alunos */}
                  {showSuggestions && filteredAlunos.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-gray-800 border border-white/20 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                      {filteredAlunos.map(aluno => (
                        <button
                          key={aluno.id}
                          onClick={() => handleAlunoSelect(aluno)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div className="font-medium">{aluno.nome}</div>
                          <div className="text-sm text-white/60">{aluno.turma}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Botão Iniciar Jornada */}
          <button 
            onClick={handleIniciarJornada}
            disabled={!isButtonEnabled || isLoading}
            className={`
              w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl
              ${isButtonEnabled && !isLoading
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span>Iniciar Jornada</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${isButtonEnabled ? 'group-hover:translate-x-1' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;