// src/styles/styled.d.ts
import "styled-components";

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
    currentTheme: string;
    images: {
      background?: string;
      logo: string;
      fprLogo?: string;
      digimonLogo?: string;
    };
    textColors: {
      primary: string;
      secondary: string;
    };
    digimonCircle: {
      background: string;
    };
    buttons: {
      searchIcon: string;
      verTodos: string;
      escolhaDigimon?: string;
    };
  }
}
