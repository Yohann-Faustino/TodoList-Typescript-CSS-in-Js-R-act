import { useState, useEffect } from "react";
import styled from "styled-components";

// Enumération des catégories disponibles pour une tâche
export enum Category {
  Travail = "travail",
  Personnel = "personnel",
  Voyages = "voyages",
  Autre = "autre",
}

// Définition d'un type Todo
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  category?: Category;
};

// Définition des props attendues par le composant TodoItem
type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  setEditingId: (id: number | null) => void;
  saveEditedTodo: (
    id: number,
    text: string,
    dueDate?: string,
    category?: Category
  ) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

// Style de la carte représentant une tâche
const Card = styled.li`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

// Champ texte stylisé
const StyledInput = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// Menu déroulant (select) stylisé pour la catégorie
const StyledSelect = styled.select`
  width: 80%;
  max-width: 400px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// Conteneur des boutons
const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`;

// Texte de la tâche, barré si complétée
const InfoText = styled.span<{ completed?: boolean }>`
  cursor: pointer;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

// Date limite avec style rouge si en retard
const DueDate = styled.small<{ isLate: boolean }>`
  color: ${({ isLate }) => (isLate ? "red" : "#333")};
  font-style: italic;
`;

// Affichage de la catégorie
const CategoryText = styled.small`
  color: #555;
`;

// Affiche et permet d’éditer une tâche individuelle dans la liste des tâches
export default function TodoItem({
  todo,
  isEditing,
  setEditingId,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  // États locaux pour l'édition
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");
  const [editedCategory, setEditedCategory] = useState<Category | "">(
    todo.category || ""
  );

  // Si on passe en mode édition, on met à jour les champs
  useEffect(() => {
    if (isEditing) {
      // isEditing est un booléen
      setEditedText(todo.text);
      setEditedDueDate(todo.dueDate || "");
      setEditedCategory(todo.category || "");
    }
  }, [isEditing, todo]);

  // Sauvegarde la tâche modifiée
  const handleSave = () => {
    if (editedText.trim() === "") return;
    saveEditedTodo(
      todo.id,
      editedText.trim(),
      editedDueDate || undefined,
      editedCategory === "" ? undefined : editedCategory
    );
    setEditingId(null); // Sort du mode édition
  };

  // Indique si la tâche est en retard
  const isLate = !!(
    todo.dueDate &&
    new Date(todo.dueDate) < new Date() &&
    !todo.completed
  );

  return (
    <Card>
      {isEditing ? (
        // MODE EDDITION DE LA CARD
        <>
          <StyledInput
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />

          <StyledInput
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />

          <StyledSelect
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value as Category | "")}
          >
            <option value="">Sans catégorie</option>
            <option value={Category.Travail}>Travail</option>
            <option value={Category.Personnel}>Personnel</option>
            <option value={Category.Voyages}>Voyages</option>
            <option value={Category.Autre}>Autre</option>
          </StyledSelect>

          <Actions>
            <button onClick={handleSave}>✅</button>
            <button onClick={() => setEditingId(null)}>❌</button>
          </Actions>
        </>
      ) : (
        // MODE AFFICHAGE DE LA CARD
        <>
          <InfoText
            completed={todo.completed}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </InfoText>

          {todo.dueDate && (
            <DueDate isLate={isLate}>
              📅 {new Date(todo.dueDate).toLocaleDateString()}
            </DueDate>
          )}

          {todo.category && <CategoryText>📂 {todo.category}</CategoryText>}

          <Actions>
            <button onClick={() => setEditingId(todo.id)}>✏️</button>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </Actions>
        </>
      )}
    </Card>
  );
}
