import { useEffect, useState } from 'react';
import { UserSession } from '../types';

const JornadaPage = () => {
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const sessionData = localStorage.getItem('currentSession');
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src="/logo-upverse.png" 
            alt="UPverse Logo" 
            className="w-32 h-32 mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Bem-vindo ao UPverse!
          </h1>
        </div>

        {/* Card de informações */}
        <div className="glass-effect p-8 space-y-6">
          {session.tipo === 'responsavel' ? (
            <>
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full">
                  <span className="text-blue-300 font-medium">👨‍👩‍👧‍👦 Responsável</span>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">
                    {session.alunoNome}
                  </h2>
                  <p className="text-xl text-cyan-400">
                    {session.turma}
                  </p>
                </div>

                <div className="pt-4 text-white/70">
                  <p className="text-sm">
                    Você está acompanhando a jornada de <span className="text-white font-medium">{session.alunoNome}</span> pela feira de ciências.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full">
                  <span className="text-purple-300 font-medium">🎭 Visitante</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white">
                  UPverse: do Quântico à Inteligência Artificial
                </h2>

                <p className="text-lg text-white/70">
                  Feira de Ciências 2025
                </p>

                <div className="pt-4 text-white/60">
                  <p className="text-sm">
                    Bem-vindo! Você está prestes a embarcar em uma jornada fascinante pelo mundo quântico até as aplicações de Inteligência Artificial.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Informações da jornada */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">📍 Próximas etapas:</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="text-white font-medium">Introdução Quântica</p>
                  <p className="text-sm text-white/60">Sala de Robótica</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="text-white font-medium">Escape Room Quântico</p>
                  <p className="text-sm text-white/60">4 cômodos interativos</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="text-white font-medium">Transição Quântico-IA</p>
                  <p className="text-sm text-white/60">Corredor do laboratório</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-50">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <p className="text-white font-medium">Aplicações de IA</p>
                  <p className="text-sm text-white/60">Quadra - 6º ao 8º ano</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão para voltar ou continuar */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                // Aqui irá para o scanner QR futuramente
                alert('Scanner QR será implementado em breve!');
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Escanear QR Code
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('currentSession');
                window.location.href = '/';
              }}
              className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 font-medium transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>

        {/* Footer com timestamp */}
        <div className="mt-8 text-center text-white/50 text-sm">
          <p>Sessão iniciada em {new Date(session.timestamp).toLocaleString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
};

export default JornadaPage;