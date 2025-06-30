// components/TaskCard.tsx
import React from "react";
import styled from "styled-components";

// Types des props attendues par le composant
type TaskCardProps = {
  task: string;
  onEdit: () => void;
  onDelete: () => void;
};

// Conteneur principal de la carte avec style
const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Style pour le texte de la tâche
const TaskText = styled.span`
  font-size: 1rem;
  color: #333;
  flex-grow: 1;
`;

// Conteneur des boutons d'action (éditer / supprimer)
const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

// Style commun aux boutons d'action
const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #2600ff;
  }
`;

// Composant fonctionnel TaskCard
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card>
      {/* Texte de la tâche */}
      <TaskText>{task}</TaskText>

      {/* Boutons éditer et supprimer */}
      <Actions>
        <ActionButton onClick={onEdit} aria-label="Modifier">
          ✏️
        </ActionButton>
        <ActionButton onClick={onDelete} aria-label="Supprimer">
          🗑️
        </ActionButton>
      </Actions>
    </Card>
  );
};

export default TaskCard;
