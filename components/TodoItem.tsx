import { useState, useEffect } from "react";

// Enum pour les catégories
export enum Category {
  Travail = "travail",
  Personnel = "personnel",
  Voyages = "voyages",
  Autre = "autre",
}

// Type pour une tâche Todo
export type Todo = {
  id: number;
  text: string;
  completed: boolean; // Statut : terminée ou non
  dueDate?: string; // date d’échéance
  category?: Category; // catégorie
};

// Props
type TodoItemProps = {
  todo: Todo;
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
};

export default function TodoItem({
  todo,
  editingId,
  setEditingId,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  // Etats locaux pour l’édition
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");
  const [editedCategory, setEditedCategory] = useState<Category | "">(
    todo.category || ""
  );

  // Quand on entre en mode édition, on initialise les champs avec les valeurs de la tâche
  useEffect(() => {
    if (editingId === todo.id) {
      setEditedText(todo.text);
      setEditedDueDate(todo.dueDate || "");
      setEditedCategory(todo.category || "");
    }
  }, [editingId, todo]);

  // Fonction pour valider l’édition quand on clique sur ✅ ou appuie sur Enter
  const handleSave = () => {
    if (editedText.trim() === "") return; // pas de texte vide
    saveEditedTodo(
      todo.id,
      editedText.trim(),
      editedDueDate || undefined,
      editedCategory === "" ? undefined : editedCategory
    );
    setEditingId(null);
  };

  // Affichage de la tâche ou formulaire d’édition selon le mode
  return (
    <li>
      {editingId === todo.id ? (
        <>
          {/* Champ texte */}
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />

          {/* Champ date d’échéance */}
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />

          {/* Sélecteur de catégorie */}
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value as Category | "")}
          >
            <option value="">Sans catégorie</option>
            <option value={Category.Travail}>Travail</option>
            <option value={Category.Personnel}>Personnel</option>
            <option value={Category.Voyages}>Voyages</option>
            <option value={Category.Autre}>Autre</option>
          </select>

          {/* Boutons valider / annuler */}
          <button onClick={handleSave}>✅</button>
          <button onClick={() => setEditingId(null)}>❌</button>
        </>
      ) : (
        <>
          {/* Texte cliquable pour toggle "terminé" */}
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>

          {/* Affichage date d’échéance, en rouge si passée */}
          {todo.dueDate && (
            <small
              style={{
                marginLeft: 10,
                fontStyle: "italic",
                color:
                  new Date(todo.dueDate) < new Date() && !todo.completed
                    ? "red"
                    : "inherit",
              }}
            >
              📅 {new Date(todo.dueDate).toLocaleDateString()}
            </small>
          )}

          {/* Affichage catégorie */}
          {todo.category && (
            <small style={{ marginLeft: 10, color: "#555" }}>
              📂 {todo.category}
            </small>
          )}

          {/* Boutons éditer / supprimer */}
          <button onClick={() => setEditingId(todo.id)}>✏️</button>
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </>
      )}
    </li>
  );
}
