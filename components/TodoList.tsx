// src/components/TodoList.tsx

import React from "react";
import styled from "styled-components";
import TodoItem, { Todo, Category } from "./TodoItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Fonction pour mettre à jour l'état des todos, accepte un nouveau tableau ou une fonction de mise à jour basée sur l'état précédent
};

// Conteneur principal avec une bordure
const TodoListContainer = styled.div`
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

// Container de la liste des tâches
const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Affichage et gestion des tâches via drag&drop
export default function TodoList({
  todos,
  editingId,
  setEditingId,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
  setTodos,
}: TodoListProps) {
  // Fonction appelée à la fin du drag & drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(todos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTodos(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      isEditing={editingId === todo.id}
                      setEditingId={setEditingId}
                      saveEditedTodo={saveEditedTodo}
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
