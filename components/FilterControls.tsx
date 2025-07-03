import React from "react";
import styled from "styled-components";
import { Category } from "./TodoItem";

interface FilterControlsProps {
  filter: "all" | Category;
  setFilter: (filter: "all" | Category) => void;
  statusFilter: "all" | "active" | "completed";
  setStatusFilter: (filter: "all" | "active" | "completed") => void;
}

const ControlsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const FilterGroup = styled.div`
  min-width: 140px;
`;

const Title = styled.h3`
  color: #2600ff;
  margin-bottom: 12px;
  font-weight: 700;
  user-select: none;
  text-align: center;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  font-weight: ${({ checked }) => (checked ? "700" : "400")};
  color: ${({ checked }) => (checked ? "#2600ff" : "#555")};
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledRadio = styled.span<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #2600ff;
  background-color: ${({ checked }) => (checked ? "#2600ff" : "transparent")};
  display: inline-block;
  transition: background-color 0.3s;
`;

export default function FilterControls({
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
}: FilterControlsProps) {
  return (
    <ControlsContainer aria-label="Filtres des tâches">
      <FilterGroup aria-labelledby="category-filter-title">
        <Title id="category-filter-title">Catégorie</Title>
        <RadioGroup role="radiogroup" aria-label="Filtrer par catégorie">
          {[
            { value: "all", label: "Toutes" },
            { value: "travail", label: "Travail" },
            { value: "personnel", label: "Personnel" },
            { value: "voyages", label: "Voyages" },
            { value: "autre", label: "Autre" },
          ].map(({ value, label }) => {
            const checked = filter === value;
            return (
              <RadioLabel key={value} checked={checked}>
                <HiddenRadio
                  name="categoryFilter"
                  value={value}
                  checked={checked}
                  onChange={() => setFilter(value as "all" | Category)}
                />
                <StyledRadio checked={checked} />
                {label}
              </RadioLabel>
            );
          })}
        </RadioGroup>
      </FilterGroup>

      <FilterGroup aria-labelledby="status-filter-title">
        <Title id="status-filter-title">État</Title>
        <RadioGroup role="radiogroup" aria-label="Filtrer par état des tâches">
          {[
            { value: "all", label: "Tous" },
            { value: "active", label: "En cours" },
            { value: "completed", label: "Terminés" },
          ].map(({ value, label }) => {
            const checked = statusFilter === value;
            return (
              <RadioLabel key={value} checked={checked}>
                <HiddenRadio
                  name="statusFilter"
                  value={value}
                  checked={checked}
                  onChange={() =>
                    setStatusFilter(value as "all" | "active" | "completed")
                  }
                />
                <StyledRadio checked={checked} />
                {label}
              </RadioLabel>
            );
          })}
        </RadioGroup>
      </FilterGroup>
    </ControlsContainer>
  );
}
