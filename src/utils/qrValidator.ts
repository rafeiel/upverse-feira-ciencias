export interface QRStep {
  code: string;
  location: string;
  turma: string;
  grupo: string;
}

// Ordem sequencial obrigatória dos QR Codes (14 primeiros)
export const qrSequenceRequired: QRStep[] = [
  { code: '9º ano grupo 1', location: 'Sala 1', turma: '9º', grupo: '1' },
  { code: '9º ano grupo 2', location: 'Sala 1', turma: '9º', grupo: '2' },
  { code: '2ª série grupo 5', location: 'Sala 2', turma: '2ª', grupo: '5' },
  { code: '2ª série grupo 6', location: 'Sala 2', turma: '2ª', grupo: '6' },
  { code: '1ª série grupo 1', location: 'Sala 3', turma: '1ª', grupo: '1' },
  { code: '1ª série grupo 2', location: 'Sala 3', turma: '1ª', grupo: '2' },
  { code: '1ª série grupo 3', location: 'Sala 4', turma: '1ª', grupo: '3' },
  { code: '1ª série grupo 4', location: 'Sala 5', turma: '1ª', grupo: '4' },
  { code: '1ª série grupo 5', location: 'Sala 5', turma: '1ª', grupo: '5' },
  { code: '1ª série grupo 6', location: 'Sala 6', turma: '1ª', grupo: '6' },
  { code: '2ª série grupo 1', location: 'Sala 7', turma: '2ª', grupo: '1' },
  { code: '2ª série grupo 2', location: 'Sala 7', turma: '2ª', grupo: '2' },
  { code: '2ª série grupo 3', location: 'Sala 8', turma: '2ª', grupo: '3' },
  { code: '9º ano grupo 3', location: 'Sala 9', turma: '9º', grupo: '3' },
];

// Quadra - sem ordem específica (10 últimos)
export const qrSequenceQuadra: QRStep[] = [
  { code: '6º ano grupo 1', location: 'Quadra', turma: '6º', grupo: '1' },
  { code: '6º ano grupo 2', location: 'Quadra', turma: '6º', grupo: '2' },
  { code: '6º ano grupo 3', location: 'Quadra', turma: '6º', grupo: '3' },
  { code: '6º ano grupo 4', location: 'Quadra', turma: '6º', grupo: '4' },
  { code: '7º ano grupo 1', location: 'Quadra', turma: '7º', grupo: '1' },
  { code: '7º ano grupo 2', location: 'Quadra', turma: '7º', grupo: '2' },
  { code: '7º ano grupo 3', location: 'Quadra', turma: '7º', grupo: '3' },
  { code: '8º ano grupo 1', location: 'Quadra', turma: '8º', grupo: '1' },
  { code: '8º ano grupo 2', location: 'Quadra', turma: '8º', grupo: '2' },
  { code: '8º ano grupo 3', location: 'Quadra', turma: '8º', grupo: '3' },
];

// Todos os QR codes válidos
export const allValidCodes = [
  ...qrSequenceRequired,
  ...qrSequenceQuadra,
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  pieceInfo?: QRStep;
}

export const validateQRCode = (
  decodedText: string,
  collectedPieces: number
): ValidationResult => {
  // 1. Verificar se é um código válido da UPverse
  const foundCode = allValidCodes.find(qr => qr.code === decodedText);
  
  if (!foundCode) {
    return {
      isValid: false,
      error: '⚠️ QR Code inválido! Escaneie apenas os códigos oficiais da UPverse.'
    };
  }

  // 2. Verificar se já foi coletado (verificação será feita no IndexPage)
  
  // 3. Verificar ordem sequencial (primeiros 14 códigos)
  if (collectedPieces < 14) {
    const expectedCode = qrSequenceRequired[collectedPieces];
    
    if (decodedText !== expectedCode.code) {
      return {
        isValid: false,
        error: `⚠️ Ordem incorreta!\n\nVocê deve escanear primeiro:\n"${expectedCode.code}"\n📍 ${expectedCode.location}`
      };
    }
  } else {
    // Após 14 peças, apenas verificar se está na quadra
    if (!qrSequenceQuadra.find(qr => qr.code === decodedText)) {
      return {
        isValid: false,
        error: '⚠️ Este grupo não faz parte da etapa atual.'
      };
    }
  }

  return {
    isValid: true,
    pieceInfo: foundCode
  };
};