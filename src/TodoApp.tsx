import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterControls from "../components/FilterControls";
import { Todo, Category } from "../components/TodoItem";

// Fond d'écran "Osaka" sur toute la page
const AppContainer = styled.div`
  min-height: 100vh;
  background-image: url("/Osaka.avif");
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

// Titre principal
const Title = styled.h1`
  background-color: #ffffffcc;
  color: #2600ff;
  display: table;
  margin: 0 auto 20px auto;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  user-select: none;
`;

// Barre du haut : ajout à gauche + filtres à droite (responsive)
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
`;

// Bloc gauche pour ajout de tâche
const FormContainer = styled.div`
  background-color: #ffffffcc;
  border-radius: 8px;
  min-width: 300px;
`;

// Bloc droit pour filtres
const FilterContainer = styled.div`
  background-color: #ffffffcc;
  padding: 12px;
  border-radius: 8px;
  min-width: 250px;
`;

// Wrapper pour la liste des tâches
const TaskListWrapper = styled.div`
  margin-top: 20px;
`;

export default function TodoApp() {
  // État des tâches
  const [todos, setTodos] = useState<Todo[]>([]);

  // ID de la tâche en cours d'édition (null si aucune)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filtre par catégorie ("all" = toutes)
  const [filter, setFilter] = useState<"all" | Category>("all");

  // Filtre par état ("all" = toutes)
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  // Charger les tâches depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Sauvegarder les tâches dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Ajouter une nouvelle tâche
  const addTodo = (text: string, dueDate?: string, category?: Category) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      category,
    };
    setTodos([newTodo, ...todos]);
  };

  // Sauvegarder une tâche modifiée
  const saveEditedTodo = (
    id: number,
    text: string,
    dueDate?: string,
    category?: Category
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text, dueDate, category } : todo
      )
    );
    setEditingId(null);
  };

  // Basculer l'état complété d'une tâche
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Supprimer une tâche
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Filtrer les tâches selon catégorie ET état
  const filteredTodos = todos.filter((todo) => {
    const matchCategory = filter === "all" ? true : todo.category === filter;
    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? !todo.completed
          : todo.completed;
    return matchCategory && matchStatus;
  });

  return (
    <AppContainer>
      <Title>⛩️ Bienvenu sur ma To do List 🍙</Title>
      <TopBar>
        {/* Formulaire d'ajout */}
        <FormContainer>
          <TodoForm addTodo={addTodo} />
        </FormContainer>

        {/* Filtres catégorie + état */}
        <FilterContainer>
          <FilterControls
            filter={filter}
            setFilter={setFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </FilterContainer>
      </TopBar>

      {/* Liste des tâches filtrées */}
      <TaskListWrapper>
        <TodoList
          todos={filteredTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          saveEditedTodo={saveEditedTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          setTodos={setTodos}
        />
      </TaskListWrapper>
    </AppContainer>
  );
}
