# 🎨 Guia de Cores - UPverse

## Onde Alterar as Cores dos Textos Especiais

### **1. "Quântico" - Azul Esverdeado (Cyan)**

**Localização:** `src/components/LandingPage.tsx` e `src/components/IndexPage.tsx`

**Código Atual:**
```tsx
<span className="font-quantum text-cyan-400">Quântico</span>
```

**Como Alterar:**
```tsx
// Opções de azul-esverdeado (do mais claro ao mais escuro):
text-cyan-300   // Muito claro
text-cyan-400   // Atual ✅
text-cyan-500   // Médio
text-cyan-600   // Escuro

// Ou usar teal (verde-azulado):
text-teal-300
text-teal-400
text-teal-500
```

**Text-shadow (brilho) em `src/index.css`:**
```css
.font-quantum {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.5); /* Cyan glow */
}
```

**Para mudar o brilho:**
```css
/* Azul-verde mais intenso */
text-shadow: 0 0 15px rgba(6, 182, 212, 0.7);

/* Verde-água */
text-shadow: 0 0 12px rgba(20, 184, 166, 0.6);
```

---

### **2. "Inteligência Artificial" - Roxo Claro**

**Localização:** `src/components/LandingPage.tsx` e `src/components/IndexPage.tsx`

**Código Atual:**
```tsx
<span className="font-quantum text-purple-300">Inteligência Artificial</span>
```

**Como Alterar:**
```tsx
// Opções de roxo (do mais claro ao mais escuro):
text-purple-200  // Muito claro
text-purple-300  // Atual ✅
text-purple-400  // Médio
text-purple-500  // Mais escuro

// Ou violeta:
text-violet-300
text-violet-400

// Ou fúcsia:
text-fuchsia-300
text-fuchsia-400
```

**Para adicionar brilho roxo (opcional):**

Crie uma nova classe em `src/index.css`:
```css
.font-ai {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(192, 132, 252, 0.5); /* Purple glow */
}
```

E use no código:
```tsx
<span className="font-ai text-purple-300">Inteligência Artificial</span>
```

---

## 📝 Tabela de Referência Rápida

| Texto | Cor Atual | Classe Tailwind | RGB do Brilho |
|-------|-----------|-----------------|---------------|
| **Quântico** | Cyan 400 | `text-cyan-400` | `rgba(34, 211, 238, 0.5)` |
| **Inteligência Artificial** | Purple 300 | `text-purple-300` | - |

---

## 🎨 Exemplos de Combinações

### **Opção 1: Neon Tech**
```tsx
// Quântico - Verde neon
<span className="font-quantum text-emerald-400">Quântico</span>

// IA - Rosa neon
<span className="font-quantum text-pink-400">Inteligência Artificial</span>
```

### **Opção 2: Matrix Style**
```tsx
// Quântico - Verde Matrix
<span className="font-quantum text-green-400">Quântico</span>

// IA - Azul elétrico
<span className="font-quantum text-blue-400">Inteligência Artificial</span>
```

### **Opção 3: Pastel Futurista**
```tsx
// Quântico - Azul pastel
<span className="font-quantum text-sky-300">Quântico</span>

// IA - Lavanda
<span className="font-quantum text-purple-200">Inteligência Artificial</span>
```

---

## 🔧 Como Testar Cores Rapidamente

1. Abra o site
2. Pressione **F12** (DevTools)
3. Clique em "Inspecionar elemento" no texto
4. No painel de estilos, mude a classe diretamente:
   - `text-cyan-400` → `text-cyan-500`
5. Veja a mudança em tempo real
6. Quando gostar, copie a classe e cole no código

---

## 💡 Dica: Paleta Completa Tailwind

Todas as cores do Tailwind estão em:
https://tailwindcss.com/docs/customizing-colors

Você pode usar qualquer cor-número (100-900):
- `text-cyan-400`
- `text-purple-300`
- `text-emerald-500`
- etc.

---

## 🎯 Localizações Exatas nos Arquivos

### **LandingPage.tsx** (linha ~217):
```tsx
do <span className="font-quantum text-cyan-400">Quântico</span> à 
<span className="font-quantum text-purple-300"> Inteligência Artificial</span>
```

### **IndexPage.tsx** (linha ~125):
```tsx
do <span className="font-quantum text-cyan-400">Quântico</span> à 
<span className="font-quantum text-purple-300">Inteligência Artificial</span>
```

### **index.css** (linha ~11):
```css
.font-quantum {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
}
```

---

**Para mudar as cores, basta editar as classes `text-cyan-400` e `text-purple-300` nos arquivos tsx!** 🎨