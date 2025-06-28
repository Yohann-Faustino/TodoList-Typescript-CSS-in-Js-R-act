// src/components/TodoForm.tsx

import { useState } from "react";
import { Category } from "./TodoItem";
import styled from "styled-components";

// Conteneur du formulaire avec flexbox
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

// Input texte
const TextInput = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// Input date et en ligne
const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// Bouton d’ajout
const AddButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

interface TodoFormProps {
  addTodo: (text: string, dueDate?: string, category?: Category) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  // Nouvelle tâche
  const [newTodo, setNewTodo] = useState("");
  // Ajout du champ date à la création
  const [newDueDate, setNewDueDate] = useState("");
  // Champ catégorie
  const [newCategory, setNewCategory] = useState<Category | "">("");

  // Fonction déclenchée à la validation (clic bouton ou Enter)
  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Ignore si texte vide

    addTodo(newTodo, newDueDate || undefined, newCategory || undefined);

    setNewTodo("");
    setNewDueDate("");
    setNewCategory("");
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <TextInput
        type="text"
        placeholder="Nouvelle tâche"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <Row>
        <DateInput
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />

        <Select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as Category | "")}
        >
          <option value="">Sans catégorie</option>
          <option value="travail">Travail</option>
          <option value="personnel">Personnel</option>
          <option value="voyages">Voyages</option>
          <option value="autre">Autre</option>
        </Select>
      </Row>

      <AddButton type="submit">Ajouter</AddButton>
    </Form>
  );
}
