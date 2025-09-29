interface QRScannerProps {
  onClose: () => void;
}

const QRScanner = ({ onClose }: QRScannerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Escanear QR Code</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-3xl"
          >
            ×
          </button>
        </div>

        <div className="glass-effect p-8 text-center">
          <div className="w-full aspect-square bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
            <p className="text-white/50">Scanner QR será implementado aqui</p>
          </div>
          
          <p className="text-white/70 mb-4">
            Posicione o QR Code do grupo dentro da área de leitura
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;