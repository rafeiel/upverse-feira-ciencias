import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, } from 'firebase/firestore';
import { db } from '../config/firebase';
import { importarAlunos } from '../utils/importCSV';
import QuantumBackground from './QuantumBackground';
import Footer from './Footer';

interface SessionData {
  id: string;
  studentId: string | null;
  studentName: string | null;
  studentTurma: string | null;
  startTime: any;
  active: boolean;
  piecesCollected: string[];
  completedAll: boolean;
}

interface AlunoData {
  id: string;
  nome: string;
  turma: string;
  activeSessions: number;
  createdAt?: any;
}

interface Stats {
  totalSessions: number;
  activeSessions: number;
  visitorSessions: number;
  responsavelSessions: number;
  totalAlunos: number;
  alunosComSessoes: number;
  alunosNuncaSelecionados: number;
  completed24: number;
  completedMain: number;
  completedQuadra: number;
  avgPieces: number;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [alunos, setAlunos] = useState<AlunoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const handleLogin = () => {
    // Credenciais em variáveis de ambiente
    const validUser = import.meta.env.VITE_ADMIN_USER || 'ralfisael';
    const validPass = import.meta.env.VITE_ADMIN_PASS || 'abcd1234';
    
    if (username === validUser && password === validPass) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
      loadData();
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Carregar sessões
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      const sessionsData = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SessionData[];
      setSessions(sessionsData);

      // Carregar alunos
      const alunosSnapshot = await getDocs(collection(db, 'alunos'));
      const alunosData = alunosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AlunoData[];
      setAlunos(alunosData);

      // Calcular estatísticas
      const activeSessions = sessionsData.filter(s => s.active);
      const visitorSessions = activeSessions.filter(s => !s.studentId);
      const responsavelSessions = activeSessions.filter(s => s.studentId);
      
      const completed24 = sessionsData.filter(s => s.completedAll).length;
      const completedMain = sessionsData.filter(s => 
        s.piecesCollected.filter(p => !p.includes('6º') && !p.includes('7º') && !p.includes('8º')).length >= 14
      ).length;
      const completedQuadra = sessionsData.filter(s => 
        s.piecesCollected.filter(p => p.includes('6º') || p.includes('7º') || p.includes('8º')).length >= 10
      ).length;
      
      const totalPieces = sessionsData.reduce((sum, s) => sum + s.piecesCollected.length, 0);
      const avgPieces = sessionsData.length > 0 ? totalPieces / sessionsData.length : 0;

      setStats({
        totalSessions: sessionsData.length,
        activeSessions: activeSessions.length,
        visitorSessions: visitorSessions.length,
        responsavelSessions: responsavelSessions.length,
        totalAlunos: alunosData.length,
        alunosComSessoes: alunosData.filter(a => a.activeSessions > 0).length,
        alunosNuncaSelecionados: alunosData.filter(a => !a.createdAt).length,
        completed24,
        completedMain,
        completedQuadra,
        avgPieces: Math.round(avgPieces * 10) / 10
      });
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do Firebase');
    } finally {
      setLoading(false);
    }
  };

  const resetActiveSessions = async () => {
    if (!confirm('Resetar activeSessions de TODOS os alunos para 0?')) return;
    
    setLoading(true);
    try {
      for (const aluno of alunos) {
        if (aluno.activeSessions > 0) {
          await updateDoc(doc(db, 'alunos', aluno.id), { activeSessions: 0 });
        }
      }
      alert('✅ Todos os activeSessions resetados!');
      loadData();
    } catch (err) {
      alert('❌ Erro ao resetar: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllSessions = async () => {
    if (!confirm('APAGAR TODAS AS SESSÕES? Esta ação não pode ser desfeita!')) return;
    
    setLoading(true);
    try {
      for (const session of sessions) {
        await deleteDoc(doc(db, 'sessions', session.id));
      }
      alert('✅ Todas as sessões apagadas!');
      loadData();
    } catch (err) {
      alert('❌ Erro ao apagar: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllAlunos = async () => {
    if (!confirm('APAGAR TODOS OS ALUNOS? Esta ação não pode ser desfeita!')) return;
    if (!confirm('TEM CERTEZA ABSOLUTA? Digite SIM para confirmar')) return;
    
    setLoading(true);
    try {
      for (const aluno of alunos) {
        await deleteDoc(doc(db, 'alunos', aluno.id));
      }
      alert('✅ Todos os alunos apagados!');
      loadData();
    } catch (err) {
      alert('❌ Erro ao apagar: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const populateDatabase = async () => {
    if (!confirm('Popular banco de dados com 156 alunos?')) return;
    
    setLoading(true);
    try {
      await importarAlunos();
      alert('✅ Banco de dados populado com sucesso!');
      loadData();
    } catch (err) {
      alert('❌ Erro ao popular: ' + err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <QuantumBackground />
        
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-effect p-8 rounded-2xl">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Painel Admin
            </h1>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all"
              >
                Entrar
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/70 font-medium rounded-lg transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 pb-24 relative overflow-hidden">
      <QuantumBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Painel Administrativo
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>

        {loading && (
          <div className="text-center text-white mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Carregando...</p>
          </div>
        )}

        {stats && (
          <>
            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-white/70 text-sm mb-2">Sessões Totais</h3>
                <p className="text-4xl font-bold text-white">{stats.totalSessions}</p>
                <div className="mt-2 text-sm">
                  <span className="text-green-400">{stats.activeSessions} ativas</span>
                  <span className="text-white/50"> | </span>
                  <span className="text-blue-400">{stats.visitorSessions} visitantes</span>
                  <span className="text-white/50"> | </span>
                  <span className="text-purple-400">{stats.responsavelSessions} responsáveis</span>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-white/70 text-sm mb-2">Alunos</h3>
                <p className="text-4xl font-bold text-white">{stats.totalAlunos}</p>
                <div className="mt-2 text-sm">
                  <span className="text-yellow-400">{stats.alunosComSessoes} com sessões</span>
                  <span className="text-white/50"> | </span>
                  <span className="text-gray-400">{stats.alunosNuncaSelecionados} nunca selecionados</span>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-white/70 text-sm mb-2">Completaram</h3>
                <p className="text-4xl font-bold text-white">{stats.completed24}</p>
                <div className="mt-2 text-sm">
                  <span className="text-cyan-400">{stats.completedMain} circuito principal</span>
                  <span className="text-white/50"> | </span>
                  <span className="text-emerald-400">{stats.completedQuadra} quadra</span>
                  <div className="mt-1 text-white/60">Média: {stats.avgPieces} peças</div>
                </div>
              </div>
            </div>

            {/* Sessões Ativas */}
            <div className="glass-effect p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sessões Ativas ({stats.activeSessions})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead className="text-white/70 border-b border-white/20">
                    <tr>
                      <th className="text-left py-2">Tipo</th>
                      <th className="text-left py-2">Aluno</th>
                      <th className="text-left py-2">Turma</th>
                      <th className="text-left py-2">Peças</th>
                      <th className="text-left py-2">Completo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.filter(s => s.active).map(session => (
                      <tr key={session.id} className="border-b border-white/10">
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${session.studentId ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                            {session.studentId ? 'Responsável' : 'Visitante'}
                          </span>
                        </td>
                        <td className="py-3">{session.studentName || '-'}</td>
                        <td className="py-3">{session.studentTurma || '-'}</td>
                        <td className="py-3">{session.piecesCollected.length}/24</td>
                        <td className="py-3">
                          {session.completedAll ? '✅' : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alunos com Sessões */}
            <div className="glass-effect p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Alunos com Sessões Ativas ({stats.alunosComSessoes})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {alunos
                  .filter(a => a.activeSessions > 0)
                  .sort((a, b) => b.activeSessions - a.activeSessions)
                  .map(aluno => (
                    <div key={aluno.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{aluno.nome}</p>
                          <p className="text-white/60 text-sm">{aluno.turma}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-sm">
                          {aluno.activeSessions} sessão(ões)
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Ações Perigosas */}
            <div className="glass-effect p-6 rounded-xl border-2 border-red-500/30">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Ações Administrativas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={resetActiveSessions}
                  disabled={loading}
                  className="py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  🔄 Resetar activeSessions
                </button>

                <button
                  onClick={populateDatabase}
                  disabled={loading}
                  className="py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  ➕ Popular Banco (156 alunos)
                </button>

                <button
                  onClick={deleteAllSessions}
                  disabled={loading}
                  className="py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  🗑️ Apagar Todas Sessões
                </button>

                <button
                  onClick={deleteAllAlunos}
                  disabled={loading}
                  className="py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  ⚠️ Apagar Todos Alunos
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;