# 📤 Como Atualizar o GitHub com as Novas Funcionalidades

## 🎯 Resumo
Você precisa adicionar novos arquivos e atualizar arquivos existentes no seu repositório.

## 📁 NOVOS ARQUIVOS para adicionar

### 1. Criar pasta `src/config/`
No GitHub, vá em `src/` e clique em **"Add file" > "Create new file"**

Nome: `config/firebase.ts`

Copie o conteúdo do artifact **"src/config/firebase.ts"**

### 2. Criar pasta `src/types/`
Nome: `types/index.ts`

Copie o conteúdo do artifact **"src/types/index.ts"**

### 3. Criar pasta `src/data/`
Nome: `data/seedAlunos.ts`

Copie o conteúdo do artifact **"src/data/seedAlunos.ts"**

### 4. Adicionar novo componente
Vá em `src/components/`

Nome: `JornadaPage.tsx`

Copie o conteúdo do artifact **"src/components/JornadaPage.tsx"**

### 5. Arquivos na raiz
Adicione estes arquivos na **raiz do projeto**:

- `.env.example` (artifact: ".env.example")
- `INSTRUCOES_FIREBASE.md` (artifact: "INSTRUCOES_FIREBASE.md")
- `COMO_ADICIONAR_LOGO.md` (artifact: "COMO_ADICIONAR_LOGO.md")
- `RESUMO_IMPLEMENTACAO.md` (artifact: "RESUMO_IMPLEMENTACAO.md")
- `COMO_ATUALIZAR_GITHUB.md` (este arquivo)

## 🔄 ARQUIVOS EXISTENTES para substituir

### 1. `src/components/LandingPage.tsx`
- Clique no arquivo no GitHub
- Clique no ícone de **✏️ Editar**
- **Apague TODO o conteúdo**
- Cole o **novo conteúdo** do artifact "src/components/LandingPage.tsx"
- Commit: `Atualizar LandingPage com formulário completo`

### 2. `src/App.tsx`
- Mesmo processo acima
- Cole o conteúdo do artifact "src/App.tsx"
- Commit: `Adicionar roteamento simples`

### 3. `src/index.css`
- Mesmo processo
- Cole o conteúdo do artifact "src/index.css"
- Commit: `Adicionar novas animações CSS`

## 📦 Estrutura Final

Após todas as atualizações, seu repositório deve ter:

```
upverse-feira-ciencias/
├── .env.example ⭐ NOVO
├── .gitignore
├── COMO_ADICIONAR_LOGO.md ⭐ NOVO
├── COMO_ATUALIZAR_GITHUB.md ⭐ NOVO
├── INSTRUCOES_FIREBASE.md ⭐ NOVO
├── README.md
├── RESUMO_IMPLEMENTACAO.md ⭐ NOVO
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── logo-upverse.png ⭐ VOCÊ PRECISA ADICIONAR
└── src/
    ├── App.tsx ✏️ ATUALIZADO
    ├── index.css ✏️ ATUALIZADO
    ├── main.tsx
    ├── components/
    │   ├── JornadaPage.tsx ⭐ NOVO
    │   ├── LandingPage.tsx ✏️ ATUALIZADO
    │   └── Logo.tsx
    ├── config/
    │   └── firebase.ts ⭐ NOVO
    ├── data/
    │   └── seedAlunos.ts ⭐ NOVO
    └── types/
        └── index.ts ⭐ NOVO
```

## ✅ Checklist de Atualização

### Novos Arquivos:
- [ ] `src/config/firebase.ts`
- [ ] `src/types/index.ts`
- [ ] `src/data/seedAlunos.ts`
- [ ] `src/components/JornadaPage.tsx`
- [ ] `.env.example`
- [ ] `INSTRUCOES_FIREBASE.md`
- [ ] `COMO_ADICIONAR_LOGO.md`
- [ ] `RESUMO_IMPLEMENTACAO.md`
- [ ] `COMO_ATUALIZAR_GITHUB.md`

### Arquivos Atualizados:
- [ ] `src/components/LandingPage.tsx`
- [ ] `src/App.tsx`
- [ ] `src/index.css`

### Para Adicionar Depois:
- [ ] `public/logo-upverse.png` (seu arquivo de logo)

## 🚀 Após Atualizar

1. **Aguarde o deploy do Netlify** (2-3 minutos)
2. **Configure o Firebase** (veja INSTRUCOES_FIREBASE.md)
3. **Adicione o logo** (veja COMO_ADICIONAR_LOGO.md)
4. **Teste o site**

## 💡 Dica Rápida

Se quiser fazer tudo de uma vez:

1. Clone o repositório localmente (ou use GitHub Desktop)
2. Adicione todos os arquivos de uma vez
3. Faça um commit: `feat: adicionar sistema de seleção e Firebase`
4. Push para o GitHub

## ⚠️ Importante

- **NÃO** commite arquivo `.env` (apenas `.env.example`)
- Mantenha a estrutura de pastas exata
- Nomes de arquivos são case-sensitive
- Verifique se cada arquivo está na pasta correta

## 🐛 Se algo der errado

1. Verifique os logs de build do Netlify
2. Procure por erros de import/export
3. Confirme que todos os arquivos estão nos locais corretos
4. Verifique se os nomes dos arquivos estão exatos

---

**Qualquer dúvida, consulte os outros arquivos de documentação!** 📚