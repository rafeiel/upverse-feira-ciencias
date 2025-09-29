import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Turma, Aluno, UserSession } from '../types';
import { seedDatabase } from '../data/seedAlunos';

const LandingPage = () => {
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
    }
  }, [selectedTurma, searchText]);

  const fetchAlunos = async () => {
    if (!selectedTurma) return;
    
    const alunosRef = collection(db, 'alunos');
    const q = query(alunosRef, where('turma', '==', selectedTurma));
    const snapshot = await getDocs(q);
    
    const alunos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Aluno[];
    
    // Filtrar pelo texto digitado
    const filtered = alunos.filter(aluno => 
      aluno.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setFilteredAlunos(filtered);
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
        // Verificar se já tem 2 responsáveis
        if (selectedAluno.responsaveis && selectedAluno.responsaveis.length >= 2) {
          setError(`O limite de 2 responsáveis para ${selectedAluno.nome} já foi atingido. Selecione "Visitante" para continuar.`);
          setIsLoading(false);
          return;
        }

        // Adicionar responsável ao aluno
        const alunoRef = doc(db, 'alunos', selectedAluno.id);
        const newResponsavel = {
          timestamp: Timestamp.now(),
          sessionId
        };

        await updateDoc(alunoRef, {
          responsaveis: [...(selectedAluno.responsaveis || []), newResponsavel]
        });

        // Criar sessão do usuário
        const sessionData: Omit<UserSession, 'id'> = {
          tipo: 'responsavel',
          alunoId: selectedAluno.id,
          alunoNome: selectedAluno.nome,
          turma: selectedAluno.turma,
          timestamp: new Date()
        };

        const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
        
        // Redirecionar para página de jornada
        localStorage.setItem('currentSession', JSON.stringify({ id: sessionRef.id, ...sessionData }));
        window.location.href = '/jornada';
      } else {
        // Visitante
        const sessionData: Omit<UserSession, 'id'> = {
          tipo: 'visitante',
          timestamp: new Date()
        };

        const sessionRef = await addDoc(collection(db, 'sessions'), sessionData);
        localStorage.setItem('currentSession', JSON.stringify({ id: sessionRef.id, ...sessionData }));
        window.location.href = '/jornada';
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao iniciar jornada. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonEnabled = 
    userType === 'visitante' || 
    (userType === 'responsavel' && selectedTurma && selectedAluno);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Efeitos de fundo animados - ocultos no mobile */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {/* Partículas quânticas flutuantes */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-30"></div>
        
        {/* Ondas quânticas */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse delay-1000"></div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto w-full">
        {/* Logo PNG/SVG */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-upverse.png" 
            alt="UPverse Logo" 
            className="w-64 h-64 md:w-80 md:h-80 animate-float quantum-pulse object-contain"
          />
        </div>
        
        {/* Título principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="gradient-text">UPverse</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl lg:text-4xl font-medium text-white/90 leading-tight">
            do Quântico à 
            <br className="md:hidden" />
            <span className="text-cyan-400 font-semibold"> Inteligência Artificial</span>
          </h2>
        </div>
        
        {/* Subtítulo */}
        <div className="glass-effect px-8 py-6 mx-auto max-w-2xl">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Feira de Ciências • Colégio UP • Macaé
          </p>
          <p className="text-base md:text-lg text-blue-300 font-medium mt-2">
            13 de setembro de 2025
          </p>
        </div>
        
        {/* Formulário de seleção */}
        <div className="glass-effect px-6 py-8 mx-auto max-w-lg space-y-6">
          {/* Radio buttons */}
          <div className="space-y-3">
            <p className="text-white/90 font-medium text-lg mb-4">Selecione seu tipo:</p>
            
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
      
      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
        <p>Desenvolvido para o Colégio UP • 2025</p>
      </div>
    </div>
  );
};

export default LandingPage;