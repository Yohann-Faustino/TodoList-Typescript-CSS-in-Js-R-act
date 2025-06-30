// src/components/TodoList.tsx

import React from "react";
import styled from "styled-components";
import TodoItem, { Todo, Category } from "./TodoItem";

// Props attendues par le composant TodoList
type TodoListProps = {
  todos: Todo[]; // Liste des tâches à afficher (filtrée ou complète)
  editingId: number | null;
  setEditingId: (id: number | null) => void; // Fonction pour définir la tâche en cours d'édition
  saveEditedTodo: (
    id: number,
    text: string,
    dueDate?: string,
    category?: Category
  ) => void; // Fonction pour sauvegarder une tâche modifiée
  toggleTodo: (id: number) => void; // Fonction pour marquer une tâche comme terminée ou non
  deleteTodo: (id: number) => void; // Fonction pour supprimer une tâche
};

// Conteneur principal avec une bordure
const TodoListContainer = styled.div`
  margin-top: 20px;
  padding: 12px;
  border: 2px solid #2600ff;
  border-radius: 12px;
  background-color: #f9faff;
`;

// Liste sans puces
const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function TodoList({
  todos,
  editingId,
  setEditingId,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
}: TodoListProps) {
  return (
    <TodoListContainer>
      <StyledUl>
        {todos.length === 0 ? (
          <li>Aucune tâche à afficher.</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editingId={editingId}
              setEditingId={setEditingId}
              saveEditedTodo={saveEditedTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </StyledUl>
    </TodoListContainer>
  );
}
