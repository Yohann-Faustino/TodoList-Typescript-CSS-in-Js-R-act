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

// Types des props
type TodoListProps = {
  todos: Todo[];
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  saveEditedTodo: (
    id: number,
    text: string,
    dueDate?: string,
    category?: Category
  ) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

// Conteneur principal
const TodoListContainer = styled.div`
  padding: 12px;
  border: 2px solid #2600ff;
  border-radius: 12px;
  background-color: #f9faff;
`;

// UL obligatoire pour respecter la logique verticale de react-beautiful-dnd
const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

// Chaque tâche occupe un espace flexible
const FlexItem = styled.div`
  width: calc(33.33% - 16px);
  min-width: 280px;
  flex: 1 0 280px;
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
    <TodoListContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/*⚠️ direction="horizontal"sinon les taches qu'on ne touchent pas forment un bloc et on pourra mettre la tâche saisie que en 1ere ou dernière position */}
        <Droppable droppableId="todo-list" direction="horizontal">
          {(provided) => (
            <StyledUl ref={provided.innerRef} {...provided.droppableProps}>
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
                      <FlexItem>
                        <TodoItem
                          todo={todo}
                          isEditing={editingId === todo.id}
                          setEditingId={setEditingId}
                          saveEditedTodo={saveEditedTodo}
                          toggleTodo={toggleTodo}
                          deleteTodo={deleteTodo}
                        />
                      </FlexItem>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledUl>
          )}
        </Droppable>
      </DragDropContext>
    </TodoListContainer>
  );
}
