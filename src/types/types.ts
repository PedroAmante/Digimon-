export interface Digimon {
  name: string;
  img: string;
  level: string;
}
export interface LevelOption {
  value: string;
  label: string;
}
export interface ApiResponse<T> {
  data: T;
  status: number;
}
