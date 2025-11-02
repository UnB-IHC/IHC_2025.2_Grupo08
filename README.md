# ⚠️ Atenção - Branch de Deploy da Documentação

Esta branch **não deve ser alterada manualmente**.  

Ela contém apenas os arquivos estáticos do site gerado pelo **MkDocs**, usados para publicar a documentação no **GitHub Pages**.  

## Como atualizar a documentação

1. Faça todas as alterações nos arquivos Markdown (`.md`) na **branch `main`** ou em uma branch criada para documentação.
2. Comite e envie as alterações:
   ```bash
   git add .
   git commit -m "doc: Atualizar documentação 'complemento'"
   git push origin main
3. Gere e publique o site:
   ```bash
   mkdocs gh-deploy
Isso vai atualizar automaticamente os arquivos desta branch (gh-pages).
