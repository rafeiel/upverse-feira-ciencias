import Logo from './Logo';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="xl" className="mb-6" />
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
        
        {/* Call to Action */}
        <div className="pt-8">
          <button 
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/25"
            onClick={() => {
              // Aqui será implementada a navegação para o scanner QR
              console.log('Iniciar jornada quântica!');
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Iniciar Jornada</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-full"></div>
          </button>
        </div>
        
        {/* Informações adicionais */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400 mb-2">4</div>
            <div className="text-sm text-white/70">Estágios da Jornada</div>
          </div>
          
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-sm text-white/70">Possibilidades Quânticas</div>
          </div>
          
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-2">🧩</div>
            <div className="text-sm text-white/70">Quebra-cabeça Digital</div>
          </div>
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
