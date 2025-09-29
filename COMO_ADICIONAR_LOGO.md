# 🖼️ Como Adicionar o Logo PNG/SVG

## Opção 1: Upload Direto no GitHub

1. No seu repositório GitHub, vá para a pasta **`public/`**
   - Se não existir, crie clicando em **"Add file" > "Create new file"**
   - Digite `public/logo-upverse.png` (isso cria a pasta e o arquivo)

2. **Delete o arquivo criado** (era só para criar a pasta)

3. Clique em **"Add file" > "Upload files"**

4. **Arraste seu arquivo de logo** com o nome **`logo-upverse.png`**

5. Commit: `Adicionar logo UPverse`

## Opção 2: Estrutura Local

Se estiver trabalhando localmente:

```
upverse-feira-ciencias/
├── public/
│   └── logo-upverse.png  ⬅️ Coloque seu logo aqui
├── src/
└── ...
```

## 📐 Especificações Recomendadas

- **Formato**: PNG com fundo transparente (ou SVG)
- **Tamanho**: 512x512px ou 1024x1024px
- **Nome do arquivo**: `logo-upverse.png` (exatamente assim)
- **Localização**: pasta `public/`

## ✅ Como Testar

Após fazer upload:

1. Aguarde o deploy do Netlify (2-3 minutos)
2. Acesse seu site
3. O logo deve aparecer no topo da página

## 🔄 Se o Logo NÃO Aparece confira:

- O arquivo está na pasta `public/`?
- O nome é exatamente `logo-upverse.png`?
- O Netlify fez o deploy após o commit?
- Limpe o cache do navegador (Ctrl+F5)

## 🎨 Converter SVG para o Código

Se você tem o arquivo SVG e prefere usar o componente Logo.tsx:

1. Abra o arquivo SVG em um editor de texto
2. Copie todo o conteúdo `<svg>...</svg>`
3. Substitua o conteúdo do componente `Logo.tsx`

Mas para facilitar, **use o PNG na pasta public/** que é mais simples!