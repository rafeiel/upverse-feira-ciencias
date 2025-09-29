# 🎯 Implementação da Página Index (Jornada)

## ✅ O Que Foi Implementado

### **1. Estrutura da Página**
- ✅ Logo menor (128x128px)
- ✅ Título "UPverse: do Quântico à IA" com "Quântico" estilizado
- ✅ Card de informações (Responsável com nome/turma OU Visitante)
- ✅ Quebra-cabeça principal (grid 6x4 = 24 células)
- ✅ Miniaturas das peças (2-3 linhas com turma e grupo)
- ✅ Contador "X/24 peças do quebra-cabeça digital"
- ✅ Próxima etapa (dinâmica baseada no progresso)
- ✅ Botão "Ver Mapa da Escola" (abre modal)
- ✅ Botão "Escanear QR Code" (abre scanner)
- ✅ Botão "Escolher Outro Aluno" (com aviso de perda de progresso)
- ✅ Footer com logo-up.png pequeno

### **2. Background Temático**
- ✅ Partículas pequenas se deslocando
- ✅ Trilhas de circuito impresso (SVG)
- ✅ Átomos estáticos em posições estratégicas
- ✅ Tudo com `pointer-events-none` (não atrapalha cliques)

### **3. Quebra-cabeça**
**Grid Principal (6x4):**
- Imagem do logo ao fundo (20% opacidade, grayscale)
- 24 células sobrepostas
- Células coletadas = transparentes (revelam logo)
- Células não coletadas = cinza escuro com blur

**Miniaturas (Grid 12 colunas):**
- 24 quadradinhos pequenos
- Cada um mostra: turma (6º, 7º, etc) e grupo (G1, G2, etc)
- Coletadas = azul/cyan
- Não coletadas = cinza
- Hover mostra tooltip com info completa

### **4. Distribuição das 24 Peças**
```
6º ano:  4 grupos  (IDs 1-4)
7º ano:  3 grupos  (IDs 5-7)
8º ano:  3 grupos  (IDs 8-10)
9º ano:  3 grupos  (IDs 11-13)
1ª série: 6 grupos (IDs 14-19)
2ª série: 5 grupos (IDs 20-24)
TOTAL: 24 peças
```

### **5. Lógica de Próxima Etapa**
```javascript
0-3 peças   → Introdução Quântica (Sala Robótica)
4-12 peças  → Escape Room Quântico (4 cômodos)
13 peças    → Transição Quântico-IA (Corredor)
14-23 peças → Aplicações de IA (Quadra)
24 peças    → Retirar brinde (mesa entrada quadra)
```

### **6. Componentes Criados**

**IndexPage.tsx:**
- Página principal da jornada
- Gerencia estado do quebra-cabeça
- Salva progresso no localStorage
- Modal do mapa
- Navegação para QRScanner

**QRScanner.tsx:**
- Componente separado (futuras modificações)
- Interface placeholder (será implementado depois)
- Botão de voltar

### **7. Estilização Especial**

**Fonte "Quântico":**
```css
.font-quantum {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
}
```

**Efeitos:**
- Drop-shadow no logo
- Gradientes azul/roxo nos botões
- Glass effect nos cards
- Transições suaves
- Hover states

### **8. Funcionalidades**

**LocalStorage:**
- `currentSession` → dados do usuário (tipo, aluno, turma)
- `puzzleProgress` → array com 24 peças e status collected

**Modal do Mapa:**
- Overlay escuro (80% opacidade)
- Imagem centralizada
- Botão X para fechar
- Click fora fecha também

**Aviso de Troca:**
- Alert nativo do navegador
- Confirma antes de limpar progresso
- Limpa localStorage
- Redireciona para home

---

## 📁 Arquivos Novos Criados

1. ✅ `src/components/IndexPage.tsx`
2. ✅ `src/components/QRScanner.tsx`
3. ✅ `ADICIONAR_IMAGENS.md`
4. ✅ `IMPLEMENTACAO_INDEX.md` (este arquivo)

## 📝 Arquivos Modificados

1. ✅ `src/App.tsx` - Trocar JornadaPage por IndexPage
2. ✅ `src/index.css` - Adicionar .font-quantum

---

## 🖼️ Imagens Necessárias

### **Já Existe:**
- ✅ `public/logo-upverse.png`

### **Precisa Adicionar:**
- ⭐ `public/logo-up.png` (logo pequeno do colégio)
- ⭐ `public/mapa-escola.png` (mapa da escola)

Veja detalhes em `ADICIONAR_IMAGENS.md`

---

## 🚀 Como Fazer Deploy

```bash
# 1. Adicionar novos arquivos
git add src/components/IndexPage.tsx
git add src/components/QRScanner.tsx
git add src/App.tsx
git add src/index.css
git add ADICIONAR_IMAGENS.md
git add IMPLEMENTACAO_INDEX.md

# 2. Adicionar imagens (quando tiver)
git add public/logo-up.png
git add public/mapa-escola.png

# 3. Commit
git commit -m "feat: implementar página Index com quebra-cabeça digital"

# 4. Push
git push origin main
```

---

## 🧪 Como Testar

### **1. Testar Visitante:**
1. Landing page → Selecionar "Visitante"
2. Clicar "Iniciar Jornada"
3. Deve aparecer badge "Visitante"
4. Quebra-cabeça deve estar vazio (0/24)

### **2. Testar Responsável:**
1. Landing page → Selecionar "Responsável"
2. Escolher turma e aluno
3. Clicar "Iniciar Jornada"
4. Deve aparecer nome do aluno e turma
5. Badge "Responsável"

### **3. Testar Quebra-cabeça:**
- Grid 6x4 deve aparecer sobre logo esmaecido
- 24 miniaturas embaixo com labels corretos
- Contador mostrando 0/24

### **4. Testar Botões:**
- "Ver Mapa" → abre modal com imagem
- "Escanear QR Code" → vai para tela do scanner
- "Escolher Outro Aluno" → mostra aviso, confirma e volta

### **5. Testar Background:**
- Partículas animadas
- Átomos estáticos visíveis
- Trilhas de circuito
- Tudo não deve interferir com cliques

---

## 🐛 Troubleshooting

### **Logo não aparece:**
- Verificar se `logo-upverse.png` está em `public/`
- Limpar cache (Ctrl+F5)

### **Modal do mapa vazio:**
- Adicionar `mapa-escola.png` em `public/`
- Ou usar imagem placeholder temporária

### **Quebra-cabeça não salva progresso:**
- Abrir DevTools (F12) > Application > Local Storage
- Verificar se `puzzleProgress` aparece
- Se não, problema no localStorage do navegador

### **Botão "Escolher Outro" não funciona:**
- Verificar console do navegador
- Problema pode ser com `confirm()` nativo
- Testar em navegador diferente

---

## 🎨 Customizações Futuras

### **Cores:**
Todas definidas em Tailwind:
- Azul: `blue-600`, `cyan-400`
- Roxo: `purple-600`
- Cinza: `slate-900`, `gray-800`

### **Animações:**
Podem ser ajustadas no `index.css`:
- `animate-ping` - partículas
- `animate-pulse` - átomos
- `animate-bounce` - elementos

### **Grid do Quebra-cabeça:**
Atualmente 6x4, mas pode mudar:
```tsx
// Em IndexPage.tsx
<div className="grid grid-cols-6 gap-1"> 
  {/* Trocar grid-cols-6 para outro número */}
</div>
```

---

## 📊 Próximas Implementações

### **QR Scanner (Prioridade Alta):**
- [ ] Integrar biblioteca `qr-scanner`
- [ ] Ler QR codes dos grupos
- [ ] Validar código escaneado
- [ ] Atualizar peça correspondente
- [ ] Salvar no Firebase
- [ ] Atualizar UI em tempo real

### **Fatiamento do Logo (Média):**
- [ ] Dividir logo-upverse.png em 24 partes
- [ ] Salvar como `piece-01.png` até `piece-24.png`
- [ ] Atualizar grid para usar imagens individuais
- [ ] Adicionar efeito de "encaixe" ao coletar

### **Animações (Baixa):**
- [ ] Animação ao coletar peça
- [ ] Efeito de "reveal" no quebra-cabeça
- [ ] Confete ao completar 24/24
- [ ] Som de feedback (opcional)

---

## 📱 Responsividade

**Mobile (< 768px):**
- Logo 96px
- Grid 6x4 mantém proporção
- Miniaturas ajustam tamanho
- Botões full-width
- Modal ocupa tela inteira

**Desktop (≥ 768px):**
- Logo 128px
- Grid mais espaçado
- Hover effects ativos
- Modal centralizado
- Max-width: 768px (3xl)

---

## 🎯 Checklist Final

### **Implementação:**
- [x] IndexPage criada
- [x] QRScanner placeholder
- [x] Grid 6x4 quebra-cabeça
- [x] Miniaturas 24 peças
- [x] Lógica próxima etapa
- [x] Modal do mapa
- [x] Botão escolher outro aluno
- [x] Background temático
- [x] Footer com logo UP
- [x] Fonte especial "Quântico"

### **Para Fazer:**
- [ ] Adicionar logo-up.png
- [ ] Adicionar mapa-escola.png
- [ ] Testar em mobile
- [ ] Testar em desktop
- [ ] Implementar QR Scanner real
- [ ] Integrar com Firebase (salvar progresso)
- [ ] Fatiar logo em 24 peças

---

**A página Index está pronta para uso básico! O próximo passo é adicionar as imagens e implementar o QR Scanner funcional.** 🎉