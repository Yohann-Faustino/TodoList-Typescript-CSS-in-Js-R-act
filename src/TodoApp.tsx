import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import FilterControls from "../components/FilterControls";
import TodoItem, { Todo, Category } from "../components/TodoItem";
import Osaka from "../src/assets/Osaka.avif";

const Background = styled.div`
  min-height: 100vh;
  background-image: url(${Osaka});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
`;

// Container principal
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Titre principal
const Title = styled.h1`
  text-align: center;
  color: #2600ff;
`;

export default function TodoApp() {
  // État des tâches, initialisé depuis localStorage si existant
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved) as Todo[];
      } catch (e) {
        console.error("Erreur lors du parsing des tâches sauvegardées :", e);
      }
    }
    return [];
  });

  // État du filtre (all, active, completed)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Filtre par catégorie, ou "all"
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  // Id de la tâche en cours d'édition (null si aucune)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Sauvegarde automatique des todos dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Fonction pour ajouter une nouvelle tâche, passée au composant TodoForm
  const addTodo = (text: string, dueDate?: string, category?: Category) => {
    const newTodo: Todo = {
      id: Date.now(), // id simple avec timestamp
      text,
      completed: false,
      dueDate,
      category: category || "autre",
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Fonction pour basculer le statut completed d'une tâche
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fonction pour supprimer une tâche par id
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Fonction pour sauvegarder une tâche modifiée (édition)
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
    setEditingId(null); // Sort du mode édition
  };

  // Filtrage des tâches selon filter (statut) et categoryFilter (catégorie)
  const filteredTodos = todos.filter((todo) => {
    const statusMatch =
      filter === "all"
        ? true
        : filter === "active"
          ? !todo.completed
          : todo.completed;

    const categoryMatch =
      categoryFilter === "all" ? true : todo.category === categoryFilter;

    return statusMatch && categoryMatch;
  });

  return (
    <Background>
      <Container>
        <Title>Ma To-do list</Title>

        {/* Formulaire d'ajout de tâche */}
        <TodoForm addTodo={addTodo} />

        {/* Contrôles des filtres statut et catégorie */}
        <FilterControls
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        {/* Liste des tâches filtrées, avec gestion édition, suppression, etc */}
        <TodoList
          todos={filteredTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          saveEditedTodo={saveEditedTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </Container>
    </Background>
  );
}
