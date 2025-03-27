// src/types/styled.d.ts
import "styled-components";

// Definição dos tipos de tema
export type ThemeType =
  | "default"
  | "esperanca"
  | "sabedoria"
  | "confianca"
  | "coragem"
  | "amizade"
  | "luz"
  | "amor"
  | "sinceridade";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
      accent: string;
    };
    fonts: {
      primary: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    currentTheme: ThemeType;
    images?: {
      background?: string;
      logo?: string;
      fprLogo?: string;
      digimonLogo?: string;
    };
    textColors?: {
      primary: string;
      secondary: string;
    };
    digimonCircle?: {
      background: string;
    };
  }
}
