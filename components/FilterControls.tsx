import React from "react";
import styled from "styled-components";
import { Category } from "./TodoItem";

// Types des props attendues
interface FilterControlsProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  categoryFilter: Category | "all";
  setCategoryFilter: (category: Category | "all") => void;
}

// Personnalisation du container des filtres
const ControlsContainer = styled.section`
  margin-top: 20px;
  text-align: center;
`;

// Personnalisation h2
const Title = styled.h2`
  color: #2600ff; /* Bleu */
  margin-bottom: 15px;
`;

// Personnalisation du fieldset de l'état des tâches
const FilterFieldset = styled.fieldset`
  border: 2px solid #2600ff;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 20px;
`;

// Personnalisation du h3 Etat
const Legend = styled.legend`
  font-weight: bold;
  color: #2600ff;
  padding: 0 8px;
`;

// Personnalisation du bouton de soumission des tâches
const FilterButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 6px 12px;
  border: none;
  background-color: ${({ active }) => (active ? "#2600ff" : "#ccc")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover,
  &:focus-visible {
    background-color: ${({ active }) => (active ? "#3f44ff" : "#bbb")};
    outline: none;
  }
`;

// Personnalisation du h3 Catégorie
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2600ff;
`;

// Personnalisation du select des catégories
const Select = styled.select`
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 100px;
`;

export default function FilterControls({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
}: FilterControlsProps) {
  return (
    <ControlsContainer aria-label="Filtres des tâches">
      <Title>Filtres des tâches</Title>

      {/* Filtre par état dans un fieldset */}
      <FilterFieldset>
        <Legend>État des tâches</Legend>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          type="button"
        >
          Tous
        </FilterButton>
        <FilterButton
          active={filter === "active"}
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
          type="button"
        >
          Actifs
        </FilterButton>
        <FilterButton
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
          type="button"
        >
          Terminés
        </FilterButton>
      </FilterFieldset>

      {/* Filtre par catégorie */}
      <div>
        <Label htmlFor="category">Catégorie :</Label>
        <Select
          id="category"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as Category | "all")
          }
        >
          <option value="all">Toutes</option>
          <option value="travail">Travail</option>
          <option value="personnel">Personnel</option>
          <option value="voyages">Voyages</option>
        </Select>
      </div>
    </ControlsContainer>
  );
}
