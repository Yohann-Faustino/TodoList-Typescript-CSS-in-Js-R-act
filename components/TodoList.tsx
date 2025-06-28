// src/components/TodoList.tsx

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

export default function TodoList({
  todos,
  editingId,
  setEditingId,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
}: TodoListProps) {
  return (
    <ul>
      {/* On affiche la liste des tâches avec le composant TodoItem */}
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
    </ul>
  );
}
