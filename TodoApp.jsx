import React, { useState, useEffect } from "react";
import TodoAnimationsStyle from "./TodoAnimationsStyle";

function getPriorityColor(priority) {
  switch (priority) {
    case 1: return "#e74c3c"; // vermelho
    case 2: return "#e67e22"; // laranja
    case 3: return "#f1c40f"; // amarelo
    case 4: return "#3498db"; // azul
    case 5: return "#5dade2"; // azul claro
    default: return "#bbb";
  }
}

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // all | done | notdone
  const [sortByPriority, setSortByPriority] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        const parsed = JSON.parse(saved);
        let loadedTodos = Array.isArray(parsed) ? parsed : (parsed.todos || []);
        const today = new Date().toDateString();
        loadedTodos = loadedTodos.filter(todo => {
          if (todo.createdAt === today) return true;
          if (!todo.done) return true;
          return false;
        }).map(todo => {
          if (todo.createdAt !== today && !todo.done) {
            return { ...todo, createdAt: today, priority: 1 };
          }
          return todo;
        });
        setTodos(Array.isArray(loadedTodos) ? loadedTodos : []);
        // Se houver preferências salvas
        if (typeof parsed === 'object' && parsed !== null) {
          if (parsed.sortByPriority !== undefined) setSortByPriority(parsed.sortByPriority);
          if (parsed.filter !== undefined) setFilter(parsed.filter);
        }
      }
    } catch {
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar todos os dados relevantes sempre que qualquer estado principal mudar
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "todos",
        JSON.stringify({ todos, sortByPriority, filter })
      );
    }
  }, [todos, sortByPriority, filter, loading]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { text: trimmed, done: false, priority: null, createdAt: new Date().toDateString() }
    ]);
    setInput("");
  };

  // Remover, marcar feito e setPriority NÃO devem salvar individualmente, pois o useEffect já faz isso corretamente
  const handleRemove = (idx) => {
    setTodos(todos => todos.filter((_, i) => i !== idx));
  };

  const toggleDone = (idx) => {
    setTodos(todos => todos.map((todo, i) =>
      i === idx ? { ...todo, done: !todo.done } : todo
    ));
  };

  const setPriority = (idx, value) => {
    setTodos(todos => {
      const updated = todos.map((todo, i) =>
        i === idx ? { ...todo, priority: value ? Number(value) : null } : todo
      );
      // Se estiver ordenando por prioridade, reordene imediatamente
      if (sortByPriority) {
        updated.sort((a, b) => {
          if (a.priority == null && b.priority == null) return 0;
          if (a.priority == null) return 1;
          if (b.priority == null) return -1;
          return a.priority - b.priority;
        });
      }
      return updated;
    });
  };

  // Filtro
  let filteredTodos = todos;
  if (filter === "done") filteredTodos = todos.filter(t => t.done);
  if (filter === "notdone") filteredTodos = todos.filter(t => !t.done);

  // Ordenação
  if (sortByPriority) {
    filteredTodos = [...filteredTodos].sort((a, b) => {
      if (a.priority == null && b.priority == null) return 0;
      if (a.priority == null) return 1;
      if (b.priority == null) return -1;
      return a.priority - b.priority;
    });
  }

  // Contadores
  const doneCount = todos.filter(t => t.done).length;
  const notDoneCount = todos.length - doneCount;

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Carregando...</div>;

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, background: "#fafbfc" }}>
      <TodoAnimationsStyle />
      <h2>Todo List</h2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#27ae60" }}>Feitas: {doneCount}</span>
        <span style={{ color: "#e67e22" }}>Pendentes: {notDoneCount}</span>
      </div>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Adicione uma tarefa"
          style={{ flex: 2, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Adicionar</button>
      </form>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "center" }}>
        <button type="button" onClick={() => setFilter("all")} style={{ background: filter==="all"?"#3498db":"#eee", color: filter==="all"?"#fff":"#333", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer" }}>Todas</button>
        <button type="button" onClick={() => setFilter("notdone")} style={{ background: filter==="notdone"?"#3498db":"#eee", color: filter==="notdone"?"#fff":"#333", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer" }}>Pendentes</button>
        <button type="button" onClick={() => setFilter("done")} style={{ background: filter==="done"?"#3498db":"#eee", color: filter==="done"?"#fff":"#333", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer" }}>Feitas</button>
      </div>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <label style={{ cursor: "pointer", fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={sortByPriority}
            onChange={e => setSortByPriority(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Ordenar por prioridade
        </label>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 10, minHeight: 40 }}>
        {filteredTodos.map((todo, idx) => {
          // idx é o índice no array filtrado, precisamos do índice real no array original
          const realIdx = todos.indexOf(todo);
          return (
            <li key={realIdx} style={{ display: "flex", alignItems: "center", marginBottom: 10, background: "#fff", borderRadius: 6, boxShadow: "0 1px 2px #eee", padding: 8 }}>
              <span
                onClick={() => toggleDone(realIdx)}
                style={{
                  flex: 2,
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "#aaa" : todo.priority === 1 ? "#e74c3c" : "#222",
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
                title="Clique para marcar como feito/não feito"
              >
                {todo.priority === 1 && <span style={{color: "#e74c3c", fontWeight: 700}} title="Prioridade máxima">⚠️</span>}
                {todo.text}
              </span>
              <select
                value={todo.priority ?? ""}
                onChange={e => setPriority(realIdx, e.target.value)}
                style={{
                  flex: 1,
                  marginLeft: 8,
                  padding: 4,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  background: todo.priority ? getPriorityColor(todo.priority) : "#f8f9fa",
                  color: todo.priority ? "#fff" : "#888",
                  fontWeight: 600,
                  minWidth: 90
                }}
              >
                <option value="">Sem prioridade</option>
                <option value={1}>Prioridade 1</option>
                <option value={2}>Prioridade 2</option>
                <option value={3}>Prioridade 3</option>
                <option value={4}>Prioridade 4</option>
                <option value={5}>Prioridade 5</option>
              </select>
              <button onClick={() => toggleDone(realIdx)} style={{ marginLeft: 8, background: todo.done ? "#bbb" : "#27ae60", color: "#fff", border: "none", borderRadius: 4, padding: "4px 8px", cursor: "pointer" }}>{todo.done ? "Desfazer" : "Marcar como feito"}</button>
              <button onClick={() => handleRemove(realIdx)} style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: 4, padding: "4px 8px", cursor: "pointer", marginLeft: 8 }}>Remover</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoApp;
