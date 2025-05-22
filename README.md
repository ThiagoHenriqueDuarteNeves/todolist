# TodoList React App

Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida em React e Vite.

## O que o projeto faz?
- Permite adicionar, remover e marcar tarefas como feitas ou pendentes.
- Cada tarefa pode ter uma prioridade (1 a 5) e data de criação.
- Filtros para exibir todas, apenas feitas ou apenas pendentes.
- Ordenação opcional por prioridade.
- Persistência automática das tarefas no navegador (localStorage).
- Destaque visual para tarefas de prioridade máxima.
- Contadores de tarefas feitas e pendentes.
- Animações de transição para tarefas e filtros.

## Como rodar localmente

1. Instale as dependências:
   ```
   npm install
   ```
2. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Como fazer deploy na Vercel

1. Faça push da branch `develop` para o GitHub.
2. No painel da Vercel, clique em "Add New Project" e selecione seu repositório.
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `Vite` ou `Other`
4. Clique em Deploy.
5. Acesse a URL gerada pela Vercel.

O arquivo `vercel.json` já está configurado para garantir o roteamento correto de SPA.

## Scripts disponíveis
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção na pasta `dist`
- `npm run preview` — serve a build de produção localmente

## Tecnologias
- React 19
- Vite
- JavaScript (ES6+)
- CSS3

## Licença
MIT

---

Dúvidas? Abra uma issue no repositório!
