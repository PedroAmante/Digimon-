import { DefaultTheme } from "styled-components";

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

const defaultTheme: DefaultTheme = {
  colors: {
    primary: "#D6ECE0", // Cor padrão verde claro
    secondary: "#f5f5f5",
    background: "#D6ECE0", // Fundo também em verde claro
    text: "#333333",
    border: "#34AC40", // Atualizada para verde
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

  images: {
    background: "",
    logo: "/assets/images/logo-laranja.png",
    fprLogo: "/assets/images/FPR-laranja.png",
    digimonLogo: "/assets/images/DIGIMON-verde.png",
  },

  textColors: {
    primary: "#666666",
    secondary: "#f46d1b",
  },

  digimonCircle: {
    background: "#ffffff",
  },

  buttons: {
    searchIcon: "#34AC40",
    verTodos: "#34AC40",
    escolhaDigimon: "#F46D1B",
  },
};

export const themes: Record<ThemeType, DefaultTheme> = {
  default: defaultTheme,

  coragem: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#0580BB",
      background: "#0580BB",
      secondary: "#62B8DB",
      accent: "#FEC435",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-coragem.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#FEC435",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#62B8DB",
      escolhaDigimon: "#FEC435",
    },
    currentTheme: "coragem",
  },

  esperanca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#209441",
      background: "#209441",
      secondary: "#6BD476",
      accent: "#F8A12E",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-esperanca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#F8A12E",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#6BD476",
    },
    currentTheme: "esperanca",
  },

  sabedoria: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#CB1E31",
      background: "#CB1E31",
      secondary: "#6BD476",
      accent: "#F8A12E",
      border: "#A50000",
    },
    images: {
      background: "/assets/images/background-sabedoria.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#F8A12E",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#A50000",
      verTodos: "#6BD476",
    },
    currentTheme: "sabedoria",
  },

  confianca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#7D4D8B",
      background: "#7D4D8B",
      secondary: "#CBAADE",
      accent: "#F8A12E",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-confianca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#F8A12E",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#CBAADE",
    },
    currentTheme: "confianca",
  },

  amizade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#E28C25",
      background: "#E28C25",
      secondary: "#78D1F1",
      accent: "#FFD05C",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-amizade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#FFD05C",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#78D1F1",
      escolhaDigimon: "#FFD05C",
    },
    currentTheme: "amizade",
  },

  luz: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#EA7EB2",
      background: "#EA7EB2",
      secondary: "#CBAADE",
      accent: "#FDF753",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-luz.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#FDF753",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#CBAADE",
      escolhaDigimon: "#FDF753",
    },
    currentTheme: "luz",
  },

  amor: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#62B8DB",
      background: "#62B8DB",
      secondary: "#CBAADE",
      accent: "#FDF753",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-amor.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#FDF753",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#CBAADE",
      escolhaDigimon: "#FDF753",
    },
    currentTheme: "amor",
  },

  sinceridade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#F282B0",
      background: "#F282B0",
      secondary: "#CBAADE",
      accent: "#FDF753",
      border: "#0580BB",
    },
    images: {
      background: "/assets/images/background-sinceridade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF",
      secondary: "#FDF753",
    },
    digimonCircle: {
      background: "#FFFFFF",
    },
    buttons: {
      searchIcon: "#0580BB",
      verTodos: "#CBAADE",
      escolhaDigimon: "#FDF753",
    },
    currentTheme: "sinceridade",
  },
};

export const getTheme = (themeName: ThemeType): DefaultTheme => {
  return themes[themeName] || defaultTheme;
};

export default themes;
