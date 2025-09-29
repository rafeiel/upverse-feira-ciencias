# 🔥 Configuração do Firebase

## 1️⃣ Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `upverse-feira-ciencias` (ou o que preferir)
4. Desabilite Google Analytics (não é necessário para este projeto)
5. Clique em **"Criar projeto"**

## 2️⃣ Configurar Firestore Database

1. No menu lateral, vá em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Iniciar no modo de produção"**
4. Selecione a localização: **southamerica-east1 (São Paulo)**
5. Clique em **"Ativar"**

### Regras de Segurança do Firestore:

Vá em **"Regras"** e cole estas regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Alunos - apenas leitura
    match /alunos/{alunoId} {
      allow read: if true;
      allow write: if false; // Apenas pelo seed inicial
    }
    
    // Sessions - permitir criação e leitura
    match /sessions/{sessionId} {
      allow create: if true;
      allow read: if true;
      allow update, delete: if false;
    }
  }
}
```

**Importante:** Publique as regras clicando em **"Publicar"**

## 3️⃣ Obter Credenciais

1. No menu lateral, clique no ícone de **⚙️ (Configurações)**
2. Vá em **"Configurações do projeto"**
3. Role até **"Seus aplicativos"**
4. Clique no ícone **</>** (Web)
5. Registre o app com o apelido: `upverse-web`
6. **NÃO** marque "Firebase Hosting"
7. Clique em **"Registrar app"**

### Copie as credenciais:

Você verá algo assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "upverse-xxxxx.firebaseapp.com",
  projectId: "upverse-xxxxx",
  storageBucket: "upverse-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## 4️⃣ Configurar Variáveis de Ambiente

### No seu computador (desenvolvimento local):

1. Na pasta do projeto, copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abra o arquivo `.env` e preencha com suas credenciais:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=upverse-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=upverse-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=upverse-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
   ```

### No Netlify (produção):

1. Vá para seu site no Netlify
2. **Site settings** > **Environment variables**
3. Clique em **"Add a variable"**
4. Adicione CADA variável individualmente:
   - Key: `VITE_FIREBASE_API_KEY`
   - Value: (cole o valor)
   - Scopes: (deixe padrão)
5. Repita para todas as 6 variáveis
6. Faça um novo deploy (ou apenas commit no GitHub)

## 5️⃣ Popular Banco de Dados

O banco será populado automaticamente na primeira vez que alguém acessar o site!

Os 30 alunos de teste (5 por turma) serão criados automaticamente na coleção `alunos`.

## 6️⃣ Verificar se Funcionou

1. Acesse seu site
2. Vá no Firebase Console > Firestore Database
3. Você deve ver a coleção **`alunos`** com 30 documentos
4. Teste selecionar "Responsável" e escolher um aluno
5. Após clicar em "Iniciar Jornada", verifique a coleção **`sessions`**

## ✅ Pronto!

Seu Firebase está configurado e funcionando! 🎉

---

## 🔍 Estrutura do Banco de Dados

### Coleção: `alunos`
```json
{
  "id": "auto-gerado",
  "nome": "Lucas Ferreira Santos",
  "turma": "6º ano",
  "responsaveis": [
    {
      "timestamp": "2025-09-13T10:30:00Z",
      "sessionId": "session_xxxxx"
    }
  ]
}
```

### Coleção: `sessions`
```json
{
  "id": "auto-gerado",
  "tipo": "responsavel", // ou "visitante"
  "alunoId": "abc123",
  "alunoNome": "Lucas Ferreira Santos",
  "turma": "6º ano",
  "timestamp": "2025-09-13T10:30:00Z"
}
```

## 📊 Consultas Úteis

### Ver todos os responsáveis de um aluno:
```javascript
const alunoRef = doc(db, 'alunos', alunoId);
const alunoDoc = await getDoc(alunoRef);
console.log(alunoDoc.data().responsaveis);
```

### Ver todas as sessões:
```javascript
const sessionsRef = collection(db, 'sessions');
const snapshot = await getDocs(sessionsRef);
snapshot.forEach(doc => console.log(doc.data()));
```

### Gerar relatório de visitantes vs responsáveis:
```javascript
const sessionsRef = collection(db, 'sessions');
const visitantes = await getDocs(query(sessionsRef, where('tipo', '==', 'visitante')));
const responsaveis = await getDocs(query(sessionsRef, where('tipo', '==', 'responsavel')));

console.log(`Visitantes: ${visitantes.size}`);
console.log(`Responsáveis: ${responsaveis.size}`);
```