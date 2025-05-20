import React from "react";

// Simples animação de fade usando CSS transitions
const styles = `
.todo-fade-enter {
  opacity: 0;
  transform: translateY(-10px);
}
.todo-fade-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s;
}
.todo-fade-exit {
  opacity: 1;
  transform: translateY(0);
}
.todo-fade-exit-active {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s, transform 0.3s;
}
.todo-fade-filter {
  transition: opacity 0.25s, transform 0.25s;
  opacity: 1;
  transform: scale(1);
}
.todo-fade-filter.todo-fade-exit-active {
  opacity: 0;
  transform: scale(0.97);
}
.todo-fade-filter.todo-fade-enter-active {
  opacity: 1;
  transform: scale(1);
}
`;

export default function TodoAnimationsStyle() {
  return <style>{styles}</style>;
}
