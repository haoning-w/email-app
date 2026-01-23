"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type FilterType = "folder" | "label";

interface FilterState {
  type: FilterType;
  value: string;
}

interface FilterContextType {
  filter: FilterState;
  setFilter: (type: FilterType, value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<FilterState>({
    type: "folder",
    value: "Inbox",
  });

  const setFilter = useCallback((type: FilterType, value: string) => {
    setFilterState({ type, value });
  }, []);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
