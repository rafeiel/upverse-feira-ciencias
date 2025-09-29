import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Turma, Aluno } from '../types';
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
      setShowSuggestions(false);
    }
  }, [selectedTurma, searchText]);

  const fetchAlunos = async () => {
    if (!selectedTurma) return;
    
    try {
      console.log('🔍 Buscando alunos da turma:', selectedTurma);
      const alunosRef = collection(db, 'alunos');
      const q = query(alunosRef, where('turma', '==', selectedTurma));
      const snapshot = await getDocs(q);
      
      console.log('📦 Documentos encontrados:', snapshot.size);
      
      const alunos = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('👤 Aluno:', data);
        return {
          id: doc.id,
          ...data
        };
      }) as Aluno[];
      
      // Filtrar pelo texto digitado
      const filtered = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      
      console.log('✅ Alunos filtrados:', filtered.length);
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
        window.location.href = '/jornada';
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
        window.location.href = '/jornada';
      }
    } catch (err) {
      console.error('❌ Erro completo:', err);
      setError('Erro ao iniciar jornada. Verifique a configuração do Firebase no console (F12).');
    } finally {
      setIsLoading(false);
    }
  };setError('Erro ao iniciar jornada. Verifique a configuração do Firebase.');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonEnabled = 
    userType === 'visitante' || 
    (userType === 'responsavel' && selectedTurma && selectedAluno);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 pb-24 relative overflow-hidden">
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
            4 de setembro de 2025
          </p>
        </div>
        
        {/* Formulário de seleção */}
        <div className="glass-effect px-6 py-8 mx-auto max-w-lg space-y-6">
          {/* Radio buttons */}
          <div className="space-y-3">
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
      <div className="mt-16 text-center text-white/50 text-sm flex items-center justify-center gap-2 flex-wrap">
        <p>Desenvolvido por</p>
        <a 
          href="https://www.instagram.com/rafaeldisoares" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @rafaeldisoares
        </a>
        <span>para o</span>
        <a 
          href="https://www.instagram.com/colegio_up" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @colegio_up
        </a>
      </div>
    </div>
  );
};

export default LandingPage;