# TodoList App React

Um aplicativo simples de lista de tarefas desenvolvido com React e Vite. Este projeto demonstra o uso de:
- Gerenciamento de estado com React Hooks (useState, useEffect)
- Persistência de dados com localStorage
- Filtros e ordenação de itens
- Animações CSS para transições suaves
- Priorização de tarefas
- Indicadores visuais (contadores, destaque para alta prioridade)

![Screenshot do TodoList App](https://i.imgur.com/placeholder.png)

## Funcionalidades

- Adicionar, editar e remover tarefas
- Marcar tarefas como concluídas
- Definir prioridades (1-5)
- Ordenação por prioridade (opcional)
- Filtrar tarefas (todas, pendentes, concluídas)
- Persistência de dados no navegador
- Destaque para tarefas prioritárias
- Contadores de tarefas
- Animações de transição

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/ThiagoHenriqueDuarteNeves/todolist.git
   cd todolist
   ```

2. Instale as dependências:
   ```
   npm install
   ```

## Executando o projeto

1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

2. Abra o navegador e acesse:
   ```
   http://localhost:5173/
   ```

## Construção para produção

Para criar uma versão otimizada para produção:

```
npm run build
```

Os arquivos de build estarão disponíveis na pasta `dist`.

## Como usar a aplicação

1. Digite o nome da tarefa no campo de entrada e clique em "Adicionar"
2. Clique na tarefa para marcá-la como concluída/pendente
3. Use o seletor de prioridade para definir a importância da tarefa (1-5)
4. Use os botões de filtro para visualizar diferentes grupos de tarefas
5. Marque a opção "Ordenar por prioridade" para reorganizar as tarefas por importância
6. Clique no botão "Remover" para eliminar uma tarefa

## Tecnologias utilizadas

- React 19
- Vite
- JavaScript (ES6+)
- CSS3
- HTML5
- LocalStorage API

## Licença

MIT

## Autor

[Thiago Henrique Duarte Neves](https://github.com/ThiagoHenriqueDuarteNeves)
