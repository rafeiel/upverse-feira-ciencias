# 🖼️ Imagens Necessárias para o Projeto

## 📁 Arquivos para Adicionar na Pasta `public/`

### 1. **logo-upverse.png** ✅ Já existe
- Usado na landing page e na página index
- Tamanho recomendado: 512x512px ou maior
- Fundo transparente

### 2. **logo-up.png** ⭐ NOVO - Adicionar
- Logo pequeno do Colégio UP para o footer
- Tamanho: 128x128px (quadrado)
- Fundo transparente ou branco
- Localização: `public/logo-up.png`

### 3. **mapa-escola.png** ⭐ NOVO - Adicionar
- Mapa da escola mostrando localizações dos grupos
- Tamanho recomendado: 1920x1080px (landscape)
- Formato: PNG ou JPG
- Localização: `public/mapa-escola.png`

### 4. **puzzle-pieces/** ⭐ FUTURO - Opcional
Se quiser usar imagens específicas ao invés do logo fatiado:
- Criar pasta: `public/puzzle-pieces/`
- Adicionar 24 imagens nomeadas: `piece-01.png` até `piece-24.png`
- Cada imagem representa uma fatia do quebra-cabeça
- Tamanho uniforme recomendado: 200x200px

---

## 📂 Estrutura Final da Pasta `public/`

```
public/
├── logo-upverse.png       ✅ Já tem
├── logo-up.png           ⭐ Adicionar
├── mapa-escola.png       ⭐ Adicionar
└── puzzle-pieces/        📦 Opcional (futuro)
    ├── piece-01.png
    ├── piece-02.png
    └── ... (até 24)
```

---

## 🎨 Especificações das Imagens

### **logo-up.png**
```
Tipo: Logo do Colégio UP
Formato: PNG com transparência
Dimensões: 128x128px
Uso: Footer da página index
Onde conseguir: Solicitar ao colégio ou extrair do site
```

### **mapa-escola.png**
```
Tipo: Mapa/planta baixa da escola
Formato: PNG ou JPG
Dimensões: 1920x1080px (ou maior)
Conteúdo: Deve mostrar:
  - Entrada da escola
  - Sala de robótica
  - Cômodos do escape room
  - Corredor do laboratório
  - Quadra
  - Mesa de brindes (entrada da quadra)
Criação: Pode ser criado no Canva, Figma ou manualmente
```

---

## 🔧 Como Adicionar no GitHub

### **Opção 1: Via VS Code**
```bash
# Copie os arquivos para a pasta public/
cp /caminho/logo-up.png public/
cp /caminho/mapa-escola.png public/

# Adicione ao git
git add public/logo-up.png
git add public/mapa-escola.png

# Commit
git commit -m "feat: adicionar logo UP e mapa da escola"

# Push
git push origin main
```

### **Opção 2: Via GitHub Web**
1. No repositório, vá para pasta `public/`
2. Clique em **"Add file" > "Upload files"**
3. Arraste `logo-up.png` e `mapa-escola.png`
4. Commit: `Adicionar logo UP e mapa da escola`

---

## ✅ Checklist

- [ ] `logo-up.png` adicionado em `public/`
- [ ] `mapa-escola.png` adicionado em `public/`
- [ ] Imagens commitadas no GitHub
- [ ] Deploy feito no Netlify
- [ ] Testado no site (logo aparece no footer, mapa abre no modal)

---

## 🎯 Temporário - Enquanto Não Tem as Imagens

### **logo-up.png**
Se não tiver ainda, pode usar temporariamente uma versão do logo-upverse redimensionado ou simplesmente remover o `<img>` do footer e deixar apenas o texto.

### **mapa-escola.png**
Enquanto não tem o mapa real, você pode:
1. Criar um placeholder simples no Canva
2. Ou desabilitar temporariamente o botão "Ver Mapa"
3. Ou usar uma imagem genérica de planta baixa

---

## 📸 Dica: Criar Mapa Rápido

Se precisar criar o mapa rapidamente:

### **Canva:**
1. Acesse canva.com
2. "Criar design" > Dimensões personalizadas (1920x1080)
3. Adicione formas geométricas representando salas
4. Use textos para identificar cada local
5. Adicione ícones de localização
6. Baixe como PNG

### **Figma/Excalidraw:**
Ferramentas gratuitas para criar plantas baixas simples

---

**Depois de adicionar as imagens, teste abrindo o site e verificando se tudo aparece corretamente!** 🎉