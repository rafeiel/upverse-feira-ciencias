import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Lista de alunos mantida apenas localmente
// Em produção, este arquivo está vazio por segurança
const alunos: { nome: string; turma: string }[] = [];

export async function importarAlunos() {
  if (alunos.length === 0) {
    console.warn('⚠️ Lista de alunos não disponível neste ambiente');
    return;
  }

  for (const aluno of alunos) {
    await addDoc(collection(db, 'alunos'), {
      nome: aluno.nome,
      turma: aluno.turma
    });
  }
  console.log('✅ Importação concluída!');
}