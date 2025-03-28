// src/styles/theme.ts
import { DefaultTheme } from "styled-components";

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

// Tema padrão com as cores atualizadas
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
  // Adicionando propriedades de imagem para o tema padrão com as novas imagens
  images: {
    background: "",
    logo: "/assets/images/logo-laranja.png",
    fprLogo: "/assets/images/FPR-laranja.png",
    digimonLogo: "/assets/images/DIGIMON-verde.png",
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
  // Adicionando propriedades específicas para os botões do tema default
  buttons: {
    searchIcon: "#34AC40", // Cor do ícone de pesquisa (verde)
    verTodos: "#34AC40", // Cor do botão Ver Todos (verde)
    escolhaDigimon: "#F46D1B", // Cor do botão ESCOLHA SEU DIGIMON (laranja)
  },
};

// Todos os temas disponíveis
export const themes: Record<ThemeType, DefaultTheme> = {
  default: defaultTheme,

  // Tema Coragem (Azul) - Atualizado com as novas especificações
  coragem: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#0580BB",
      background: "#0580BB", // Alterado para azul
      secondary: "#62B8DB", // Cor secundária para o botão "Ver Todos"
      accent: "#FEC435", // Nova cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-coragem.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FEC435", // Texto secundário alterado para amarelo
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#62B8DB", // Cor do botão Ver Todos
      escolhaDigimon: "#FEC435", // Cor do botão ESCOLHA SEU DIGIMON
    },
    currentTheme: "coragem",
  },

  // Tema Esperança (Verde) - Atualizado conforme as especificações
  esperanca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#209441",
      background: "#209441", // Cor de fundo alterada para verde esperança
      secondary: "#6BD476", // Cor secundária para o botão "Ver Todos"
      accent: "#F8A12E", // Cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-esperanca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#F8A12E", // Texto secundário alterado para laranja
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#6BD476", // Cor do botão Ver Todos
    },
    currentTheme: "esperanca",
  },

  // Tema Sabedoria (Vermelho) - Corrigido para usar a cor #6BD476 no botão Ver Todos
  sabedoria: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#CB1E31",
      background: "#CB1E31", // Alterado para vermelho
      secondary: "#6BD476", // Mesma cor que o tema Esperança
      accent: "#F8A12E", // Cor para texto de boas-vindas
      border: "#A50000", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-sabedoria.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#F8A12E", // Texto secundário alterado para laranja
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#A50000", // Cor do ícone de pesquisa
      verTodos: "#6BD476", // Mesma cor que o tema Esperança
    },
    currentTheme: "sabedoria",
  },

  // Tema Confiança (Roxo) - Mantendo a cor #CBAADE no botão Ver Todos
  confianca: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#7D4D8B", // Cor roxa para o tema
      background: "#7D4D8B", // Cor de fundo roxa
      secondary: "#CBAADE", // Cor secundária (lilás) para o botão "Ver Todos"
      accent: "#F8A12E", // Cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-confianca.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#F8A12E", // Texto secundário alterado para laranja
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#CBAADE", // Mantém a cor específica para Confiança
    },
    currentTheme: "confianca",
  },

  // Tema Amizade (Laranja) - Atualizado com as novas configurações
  amizade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#E28C25",
      background: "#E28C25", // Cor de fundo laranja
      secondary: "#78D1F1", // Cor secundária para o botão "Ver Todos"
      accent: "#FFD05C", // Nova cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-amizade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FFD05C", // Texto secundário alterado para amarelo dourado
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#78D1F1", // Cor do botão Ver Todos
      escolhaDigimon: "#FFD05C", // Cor do botão ESCOLHA SEU DIGIMON
    },
    currentTheme: "amizade",
  },

  // Tema Luz (Rosa claro) - Atualizado com as novas configurações
  luz: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#EA7EB2",
      background: "#EA7EB2", // Alterado para rosa claro
      secondary: "#CBAADE", // Cor secundária para o botão "Ver Todos"
      accent: "#FDF753", // Nova cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-luz.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FDF753", // Texto secundário alterado para amarelo claro
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#CBAADE", // Cor do botão Ver Todos (lilás)
      escolhaDigimon: "#FDF753", // Cor do botão ESCOLHA SEU DIGIMON
    },
    currentTheme: "luz",
  },

  // Tema Amor (Azul claro) - Atualizado com as novas configurações
  amor: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#62B8DB",
      background: "#62B8DB", // Alterado para azul claro
      secondary: "#CBAADE", // Cor secundária para o botão "Ver Todos"
      accent: "#FDF753", // Nova cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-amor.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FDF753", // Texto secundário alterado para amarelo claro
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#CBAADE", // Cor do botão Ver Todos (lilás)
      escolhaDigimon: "#FDF753", // Cor do botão ESCOLHA SEU DIGIMON
    },
    currentTheme: "amor",
  },

  // Tema Sinceridade (Rosa) - Atualizado com as novas configurações
  sinceridade: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#F282B0",
      background: "#F282B0", // Alterado para rosa
      secondary: "#CBAADE", // Cor secundária para o botão "Ver Todos"
      accent: "#FDF753", // Nova cor para texto de boas-vindas
      border: "#0580BB", // Cor da borda para o campo de pesquisa
    },
    images: {
      background: "/assets/images/background-sinceridade.png",
      logo: "/assets/images/logo-branco.png",
      fprLogo: "/assets/images/FPR-branco.png",
      digimonLogo: "/assets/images/DIGIMON-branco.png",
    },
    textColors: {
      primary: "#FFFFFF", // Texto principal alterado para branco
      secondary: "#FDF753", // Texto secundário alterado para amarelo claro
    },
    digimonCircle: {
      background: "#FFFFFF", // Círculo do Digimon com fundo branco
    },
    buttons: {
      searchIcon: "#0580BB", // Cor do ícone de pesquisa
      verTodos: "#CBAADE", // Cor do botão Ver Todos (lilás)
      escolhaDigimon: "#FDF753", // Cor do botão ESCOLHA SEU DIGIMON
    },
    currentTheme: "sinceridade",
  },
};

// Função auxiliar para obter um tema
export const getTheme = (themeName: ThemeType): DefaultTheme => {
  return themes[themeName] || defaultTheme;
};

export default themes;
