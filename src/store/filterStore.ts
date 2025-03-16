import { create } from "zustand";

type Filter = {
  category: string;
  condition: string;
  value: string;
};

type FilterState = {
  filters: Filter[]; 
  setFilters: (filters: Filter[]) => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (index: number) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: [],
  
  setFilters: (filters) => set(() => ({ filters })),

  addFilter: (filter) => 
    set((state) => ({ filters: [...state.filters, filter] })),

  removeFilter: (index) => 
    set((state) => ({ filters: state.filters.filter((_, i) => i !== index) })),

  resetFilters: () => set(() => ({ filters: [] })),
}));
