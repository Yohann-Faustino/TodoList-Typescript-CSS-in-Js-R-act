// src/components/TodoList.tsx

import React from "react";
import styled from "styled-components";
import TodoItem, { Todo, Category } from "./TodoItem";

type TodoListProps = {
  todos: Todo[]; // Liste des tâches à afficher (déjà filtrée)
  editingId: number | null; // Id de la tâche en cours d'édition
  setEditingId: (id: number | null) => void; // Setter pour l'édition
  saveEditedTodo: (
    id: number,
    text: string,
    dueDate?: string,
    category?: Category
  ) => void; // Fonction pour sauvegarder une tâche modifiée
  toggleTodo: (id: number) => void; // Fonction pour cocher/décocher une tâche
  deleteTodo: (id: number) => void; // Fonction pour supprimer une tâche
};

// Conteneur avec bordure bleue arrondie
const TodoListContainer = styled.div`
  margin-top: 20px;
  padding: 12px;
  border: 2px solid #2600ff;
  border-radius: 12px;
  background-color: #f9faff;
`;

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
