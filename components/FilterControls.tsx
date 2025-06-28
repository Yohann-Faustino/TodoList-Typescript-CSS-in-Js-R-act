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

// Conteneur principal avec espacement
const ControlsContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

// Bouton de filtre stylisé
const FilterButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 6px 12px;
  border: none;
  background-color: ${({ active }) => (active ? "#333" : "#ccc")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ active }) => (active ? "#555" : "#bbb")};
  }
`;

// Sélecteur de catégorie stylisé
const Select = styled.select`
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: blue;
`;

export default function FilterControls({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
}: FilterControlsProps) {
  return (
    <ControlsContainer>
      {/* Filtres par statut */}
      <div>
        <Label htmlFor="Etats">Etats :</Label>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          Tous
        </FilterButton>
        <FilterButton
          active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Actifs
        </FilterButton>
        <FilterButton
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Terminés
        </FilterButton>
      </div>

      {/* Filtre par catégorie */}
      <div style={{ marginTop: "15px" }}>
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
