// src/types/types.ts

// Interface for a Digimon
export interface Digimon {
  name: string;
  img: string;
  level: string;
}

// Interface for level filter options
export interface LevelOption {
  value: string;
  label: string;
}

// Interface for API responses
export interface ApiResponse<T> {
  data: T;
  status: number;
}
