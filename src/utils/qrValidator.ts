export interface QRStep {
  code: string;
  location: string;
}

export interface ScannedPiece {
  id: number;
  code: string;
  timestamp: string;
  location: string;
}

// Ordem sequencial obrigatória dos QR Codes
export const qrSequence: QRStep[] = [
  { code: '9º ano grupo 1', location: 'Sala 1' },
  { code: '9º ano grupo 2', location: 'Sala 1' },
  { code: '2ª série grupo 5', location: 'Sala 2' },
  { code: '2ª série grupo 6', location: 'Sala 2' },
  { code: '1ª série grupo 1', location: 'Sala 3' },
  { code: '1ª série grupo 2', location: 'Sala 3' },
  { code: '1ª série grupo 3', location: 'Sala 4' },
  { code: '1ª série grupo 4', location: 'Sala 5' },
  { code: '1ª série grupo 5', location: 'Sala 5' },
  { code: '1ª série grupo 6', location: 'Sala 6' },
  { code: '2ª série grupo 1', location: 'Sala 7' },
  { code: '2ª série grupo 2', location: 'Sala 7' },
  { code: '2ª série grupo 3', location: 'Sala 8' },
  { code: '9º ano grupo 3', location: 'Sala 9' },
  // Quadra - sem ordem específica
  { code: '6º ano grupo 1', location: 'Quadra' },
  { code: '6º ano grupo 2', location: 'Quadra' },
  { code: '6º ano grupo 3', location: 'Quadra' },
  { code: '6º ano grupo 4', location: 'Quadra' },
  { code: '7º ano grupo 1', location: 'Quadra' },
  { code: '7º ano grupo 2', location: 'Quadra' },
  { code: '7º ano grupo 3', location: 'Quadra' },
  { code: '8º ano grupo 1', location: 'Quadra' },
  { code: '8º ano grupo 2', location: 'Quadra' },
  { code: '8º ano grupo 3', location: 'Quadra' },
];

// Lista completa de códigos válidos
export const validCodes = [
  ...qrSequence.map(item => item.code),
  'brinde final'
];

export interface ValidationResult {
  isValid: boolean;
  message: string;
  shouldNavigateHome?: boolean;
}

export const validateQRCode = (
  decodedText: string,
  scannedPieces: ScannedPiece[]
): ValidationResult => {
  // 1. Verificar se é um código válido da UPverse
  if (!validCodes.includes(decodedText)) {
    return {
      isValid: false,
      message: '⚠️ Este não é um QR Code válido da UPverse. Por favor, escaneie apenas os códigos oficiais da feira.',
      shouldNavigateHome: true
    };
  }

  // 2. Verificar se é o código do brinde final
  if (decodedText === 'brinde final') {
    if (scannedPieces.length < 24) {
      return {
        isValid: false,
        message: `⚠️ Você ainda não completou todas as etapas! Faltam ${24 - scannedPieces.length} peças. Continue visitando os grupos!`,
        shouldNavigateHome: true
      };
    }
    return { isValid: true, message: 'brinde' };
  }

  // 3. Verificar se o código já foi escaneado
  const alreadyScanned = scannedPieces.some(piece => piece.code === decodedText);
  if (alreadyScanned) {
    return {
      isValid: false,
      message: '⚠️ Você já escaneou este QR Code! Siga para a próxima etapa.',
      shouldNavigateHome: true
    };
  }

  // 4. Verificar ordem sequencial (primeiros 14 códigos)
  const currentPosition = scannedPieces.length;
  
  if (currentPosition < 14) {
    const expectedCode = qrSequence[currentPosition].code;
    
    if (decodedText !== expectedCode) {
      const expectedLocation = qrSequence[currentPosition].location;
      return {
        isValid: false,
        message: `⚠️ Ordem incorreta!\n\nVocê deve escanear primeiro:\n"${expectedCode}" - ${expectedLocation}\n\nSiga a sequência correta do percurso.`,
        shouldNavigateHome: true
      };
    }
  } else {
    // Após sala 9, verificar se está na quadra
    const scannedItem = qrSequence.find(item => item.code === decodedText);
    if (!scannedItem) {
      return {
        isValid: false,
        message: '⚠️ QR Code inválido. Retorne ao início.',
        shouldNavigateHome: true
      };
    }
  }

  return { isValid: true, message: 'success' };
};

export const getNextStep = (scannedCount: number): { code: string; location: string } | null => {
  if (scannedCount === 24) return null;
  
  if (scannedCount < 14) {
    return qrSequence[scannedCount];
  }
  
  return { code: 'Grupos da Quadra', location: 'Quadra (qualquer ordem)' };
};

export const calculateTotalTime = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;
  
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
};