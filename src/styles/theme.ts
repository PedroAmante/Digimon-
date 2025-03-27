// src/styles/theme.ts
import { DefaultTheme } from "styled-components";
import { ThemeType } from "../types/styled";

// Tema padrão com a cor #D6ECE0
const defaultTheme: DefaultTheme = {
  colors: {
    primary: "#D6ECE0", // Cor padrão verde claro
    secondary: "#f5f5f5",
    background: "#D6ECE0", // Fundo também em verde claro
    text: "#333333",
    border: "#e0e0e0",
    accent: "#f46d1b", // Laranja para botões de ação
  },
  fonts: {
    primary: "'Poppins', sans-serif",
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1366px",
  },
  currentTheme: "default",
  // Adicionando propriedades de imagem para o tema padrão
  images: {
    background: "",
    logo: "/assets/images/logoall.png",
    fprLogo: "",
    digimonLogo: "",
  },
  // Adicionando propriedades para cores de texto
  textColors: {
    primary: "#666666",
    secondary: "#f46d1b",
  },
  // Propriedade para cor do círculo do Digimon
  digimonCircle: {
    background: "#ffffff",
  },
};

// Todos os temas disponíveis
export const themes: Record<ThemeType, DefaultTheme> = {
  default: defaultTheme,

  // Tema Coragem (Azul)
  coragem: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#0580BB",
      background: "#0580BB", // Alterado para azul
    },
    images: {
      background: "/assets/images/background-coragem.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "coragem",
  },

  // Tema Esperança (Verde)
  esperanca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#209441",
      background: "#209441", // Cor de fundo alterada para verde esperança
    },
    images: {
      background: "/assets/images/background-esperanca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "esperanca",
  },

  // Tema Sabedoria (Vermelho)
  sabedoria: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#CB1E31",
      background: "#CB1E31", // Alterado para vermelho
    },
    images: {
      background: "/assets/images/background-sabedoria.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "sabedoria",
  },

  // Tema Amor (Azul claro)
  amor: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#62B8DB",
      background: "#62B8DB", // Alterado para azul claro
    },
    images: {
      background: "/assets/images/background-amor.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "amor",
  },

  // Tema Sinceridade (Rosa)
  sinceridade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#F282B0",
      background: "#F282B0", // Alterado para rosa
    },
    images: {
      background: "/assets/images/background-sinceridade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "sinceridade",
  },

  // Tema Luz (Rosa claro)
  luz: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#EA7EB2",
      background: "#EA7EB2", // Alterado para rosa claro
    },
    images: {
      background: "/assets/images/background-luz.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "luz",
  },

  // Tema Amizade (Laranja)
  amizade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#E28C25",
      background: "#E28C25", // Alterado para laranja
    },
    images: {
      background: "/assets/images/background-amizade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "amizade",
  },

  // Tema Confiança (Roxo)
  confianca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#7D4D8B",
      background: "#7D4D8B", // Alterado para roxo
    },
    images: {
      background: "/assets/images/background-confianca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFFFFF", // Texto secundário alterado para branco
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    currentTheme: "confianca",
  },
};

// Função auxiliar para obter um tema
export const getTheme = (themeName: ThemeType): DefaultTheme => {
  return themes[themeName] || defaultTheme;
};
