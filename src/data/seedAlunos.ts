import { Aluno, Turma } from '../types';

export const alunosIniciais: Omit<Aluno, 'id'>[] = [
  // 6º ano
  { nome: 'Lucas Ferreira Santos', turma: '6º ano', responsaveis: [] },
  { nome: 'Maria Eduarda Silva', turma: '6º ano', responsaveis: [] },
  { nome: 'Pedro Henrique Costa', turma: '6º ano', responsaveis: [] },
  { nome: 'Ana Carolina Oliveira', turma: '6º ano', responsaveis: [] },
  { nome: 'Gabriel Alves Souza', turma: '6º ano', responsaveis: [] },
  
  // 7º ano
  { nome: 'Beatriz Mendes Lima', turma: '7º ano', responsaveis: [] },
  { nome: 'Rafael Cardoso Rocha', turma: '7º ano', responsaveis: [] },
  { nome: 'Júlia Martins Pereira', turma: '7º ano', responsaveis: [] },
  { nome: 'Matheus Ribeiro Dias', turma: '7º ano', responsaveis: [] },
  { nome: 'Isabela Costa Andrade', turma: '7º ano', responsaveis: [] },
  
  // 8º ano
  { nome: 'Felipe Gomes Almeida', turma: '8º ano', responsaveis: [] },
  { nome: 'Larissa Santos Barbosa', turma: '8º ano', responsaveis: [] },
  { nome: 'Thiago Oliveira Cruz', turma: '8º ano', responsaveis: [] },
  { nome: 'Camila Rodrigues Nunes', turma: '8º ano', responsaveis: [] },
  { nome: 'Bruno Ferreira Moura', turma: '8º ano', responsaveis: [] },
  
  // 9º ano
  { nome: 'Fernanda Lima Carvalho', turma: '9º ano', responsaveis: [] },
  { nome: 'Guilherme Silva Monteiro', turma: '9º ano', responsaveis: [] },
  { nome: 'Mariana Souza Azevedo', turma: '9º ano', responsaveis: [] },
  { nome: 'Leonardo Costa Teixeira', turma: '9º ano', responsaveis: [] },
  { nome: 'Vitória Alves Campos', turma: '9º ano', responsaveis: [] },
  
  // 1ª série
  { nome: 'Eduardo Martins Freitas', turma: '1ª série', responsaveis: [] },
  { nome: 'Carolina Ribeiro Pinto', turma: '1ª série', responsaveis: [] },
  { nome: 'Rodrigo Santos Melo', turma: '1ª série', responsaveis: [] },
  { nome: 'Amanda Costa Duarte', turma: '1ª série', responsaveis: [] },
  { nome: 'Vinicius Oliveira Ramos', turma: '1ª série', responsaveis: [] },
  
  // 2ª série
  { nome: 'Gabriela Ferreira Castro', turma: '2ª série', responsaveis: [] },
  { nome: 'André Gomes Nogueira', turma: '2ª série', responsaveis: [] },
  { nome: 'Letícia Silva Correia', turma: '2ª série', responsaveis: [] },
  { nome: 'João Victor Alves Borges', turma: '2ª série', responsaveis: [] },
  { nome: 'Sophia Mendes Tavares', turma: '2ª série', responsaveis: [] },
];

// Função para popular o banco de dados
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function seedDatabase() {
  const alunosRef = collection(db, 'alunos');
  
  // Verifica se já tem dados
  const snapshot = await getDocs(alunosRef);
  if (!snapshot.empty) {
    console.log('Banco já populado');
    return;
  }
  
  // Adiciona os alunos
  for (const aluno of alunosIniciais) {
    await addDoc(alunosRef, aluno);
  }
  
  console.log('✅ Banco de dados populado com sucesso!');
}