export type Turma = '6º ano' | '7º ano' | '8º ano' | '9º ano' | '1ª série' | '2ª série';

export interface Aluno {
  id: string;
  nome: string;
  turma: Turma;
  responsaveis: ResponsavelTimestamp[];
}

export interface ResponsavelTimestamp {
  timestamp: Date;
  sessionId: string;
}

export interface UserSession {
  id: string;
  tipo: 'visitante' | 'responsavel';
  alunoId?: string;
  alunoNome?: string;
  turma?: Turma;
  timestamp: Date;
}