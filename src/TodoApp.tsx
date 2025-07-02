// src/components/TodoApp.tsx

import { useState, useEffect } from "react";
import styled from "styled-components";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Todo, Category } from "../components/TodoItem";

// Fond d'écran "Osaka" sur toute la page
const AppContainer = styled.div`
  min-height: 100vh;
  background-image: url("/Osaka.avif");
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

// Titre
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

// Barre du haut avec ajout (gauche) + filtre (droite)
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
`;

// Bloc à gauche : ajout de tâches
const FormContainer = styled.div`
  background-color: #e0f7fa;
  padding: 12px;
  border-radius: 8px;
  min-width: 300px;
`;

// Bloc à droite : filtre des tâches
const FilterContainer = styled.div`
  background-color: #ffe0b2;
  padding: 12px;
  border-radius: 8px;
  min-width: 200px;
`;

// Container pour la liste des tâches
const TaskListWrapper = styled.div`
  margin-top: 20px;
`;

export default function TodoApp() {
  // État principal des tâches
  const [todos, setTodos] = useState<Todo[]>([]);

  // Gestion de l'édition
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filtre sélectionné par catégorie
  const [filter, setFilter] = useState<"all" | Category>("all");

  // Charger les tâches depuis localStorage une seule fois
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Sauvegarder les tâches à chaque changement
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

  // Marquer comme complétée ou non
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

  // Filtrer les tâches selon la catégorie
  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.category === filter);

  // Gérer le changement de filtre
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as "all" | Category);
  };

  return (
    <AppContainer>
      <Title>⛩️ Bienvenu sur ma To do List 🍙</Title>
      {/* Bloc du haut : Formulaire + filtre */}
      <TopBar>
        {/* Bloc de gauche : ajout de tâche */}
        <FormContainer>
          <TodoForm addTodo={addTodo} />
        </FormContainer>

        {/* Bloc de droite : filtre par catégorie */}
        <FilterContainer>
          <label htmlFor="filter-select">Filtrer par catégorie :</label>
          <select
            id="filter-select"
            value={filter}
            onChange={handleFilterChange}
            style={{ marginTop: "8px", padding: "8px", width: "100%" }}
          >
            <option value="all">Toutes les tâches</option>
            <option value="travail">Travail</option>
            <option value="personnel">Personnel</option>
            <option value="voyages">Voyages</option>
            <option value="autre">Autre</option>
          </select>
        </FilterContainer>
      </TopBar>

      {/* Bloc du bas : liste des tâches */}
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
