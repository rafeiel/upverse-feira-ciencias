interface PuzzlePiece {
  id: number;
  turma: string;
  grupo: string;
  collected: boolean;
  tema: string;
  qrCode: string;
}
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
  { code: '2ª série grupo 4', location: 'Sala 2', turma: '2ª', grupo: '4' },
  { code: '2ª série grupo 5', location: 'Sala 2', turma: '2ª', grupo: '5' },
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
  puzzlePieces: PuzzlePiece[]
): ValidationResult => {
  // 1. Verificar se é um código válido
  const foundCode = allValidCodes.find(qr => qr.code === decodedText);
  
  if (!foundCode) {
    return {
      isValid: false,
      error: 'QR Code inválido! Escaneie apenas os códigos dos grupos da UPverse.'
    };
  }

  // 2. Peças da quadra são SEMPRE válidas
  const isQuadraPiece = qrSequenceQuadra.find(qr => qr.code === decodedText);
  if (isQuadraPiece) {
    return {
      isValid: true,
      pieceInfo: foundCode
    };
  }

  // 3. Circuito principal - contar apenas peças do circuito já coletadas
  const mainCircuitCollected = puzzlePieces.slice(0, 14).filter(p => p.collected).length;
  const pieceIndex = qrSequenceRequired.findIndex(qr => qr.code === decodedText);
  
  if (pieceIndex !== mainCircuitCollected) {
    const expectedCode = qrSequenceRequired[mainCircuitCollected];
    return {
      isValid: false,
      error: `Ordem incorreta no circuito principal!\nVocê deve ir para :\n"${expectedCode.code}" na ${expectedCode.location}`
    };
  }

  return {
    isValid: true,
    pieceInfo: foundCode
  };
};