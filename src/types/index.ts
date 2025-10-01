export type Turma = '6º ano' | '7º ano' | '8º ano' | '9º ano' | '1ª série' | '2ª série';

// Estrutura simplificada do aluno
export interface Aluno {
  id: string;
  nome: string;
  turma: Turma;
  activeSessions: number; // contador de sessões ativas (max 2)
  createdAt?: Date; // criado quando aluno é selecionado pela primeira vez
}

// Estrutura unificada de sessão (visitante ou responsável)
export interface Session {
  id: string;
  
  // Dados temporais
  startTime: Date;
  endTime?: Date;
  totalTime?: string; // formato: "5min" ou "1h 23min"
  
  // Progresso do quebra-cabeça
  piecesCollected: string[]; // array de QR codes: ["9º ano grupo 1", ...]
  completedAll: boolean;
  
  // Dados do aluno (null = visitante)
  studentId?: string | null;
  studentName?: string | null;
  studentTurma?: Turma | null;
  
  // Status
  active: boolean; // true enquanto em andamento
}

// Interface para localStorage (compatibilidade temporária)
export interface UserSession {
  id: string;
  studentId?: string | null;
  studentName?: string | null;
  studentTurma?: Turma | null;
  timestamp: Date;
}