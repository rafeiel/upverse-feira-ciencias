import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleScanSuccess(decodedText);
          },
          () => {
            // Ignora erros de scan contínuo
          }
        );

        setScanning(true);
      } catch (err) {
        console.error("Erro ao iniciar scanner:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
          })
          .catch((err) => console.error("Erro ao parar scanner:", err));
      }
    };
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        onScanSuccess(decodedText);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-blue-900/50">
        <div className="flex items-center gap-2 text-white">
          <Camera className="w-6 h-6" />
          <span className="font-semibold">Escanear QR Code</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {error ? (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-200 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div id="qr-reader" className="w-full max-w-md rounded-lg overflow-hidden"></div>
            
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                {scanning ? "Aponte a câmera para o QR Code" : "Iniciando câmera..."}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="p-6 bg-blue-900/30 text-center">
        <p className="text-white/80 text-sm">
          Posicione o QR Code dentro do quadrado para escanear automaticamente
        </p>
      </div>
    </div>
  );
};

export default QRScanner;