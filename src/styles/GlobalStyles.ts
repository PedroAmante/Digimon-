// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1366px) {
      font-size: 15px;
    }
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  html, body {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  /* Estilos específicos para tema padrão */
  ${({ theme }) =>
    theme.currentTheme === "default" &&
    `
    body {
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
    }
  `}

  /* Estilos específicos para tema Esperança */
  ${({ theme }) =>
    theme.currentTheme === "esperanca" &&
    `
    body {
      background-color: ${theme.colors.background};
      background-image: ${
        theme.images?.background ? `url(${theme.images.background})` : "none"
      };
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }

    h1, h2, h3, h4, h5, h6, p, span, label {
      color: ${theme.textColors?.primary || "#FFFFFF"};
    }

    .welcome-text {
      color: ${theme.textColors?.secondary || "#F8A12E"} !important;
    }

    .search-icon {
      color: ${theme.colors.border || "#0580BB"} !important;
    }

    .ver-todos-button {
      background-color: ${theme.colors.secondary || "#6BD476"} !important;
      border-radius: 20px !important;
    }

    .search-input-container {
      border-color: ${theme.colors.border || "#0580BB"} !important;
      background-color: #F5F5F5 !important;
    }

    img {
      image-rendering: optimizeQuality;
    }
  `}

  /* Estilos específicos para outros temas coloridos */
  ${({ theme }) =>
    theme.currentTheme !== "default" &&
    theme.currentTheme !== "esperanca" &&
    `
    body {
      background-color: ${theme.colors.background};
      background-image: ${
        theme.images?.background ? `url(${theme.images.background})` : "none"
      };
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      
      @media (min-width: 1920px) {
        background-position: 90% center;
        background-size: contain;
      }
      
      @media (max-width: 1366px) {
        background-position: right center;
      }
      
      @media (max-width: 768px) {
        background-position: center center;
        background-attachment: scroll;
      }
    }

    h1, h2, h3, h4, h5, h6, p, span, label {
      color: ${theme.textColors?.primary || "#FFFFFF"};
    }

    .highlight {
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    }

    a {
      color: white;
      
      &:hover {
        text-decoration: underline;
      }
    }

    .digimon-circle {
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    
    img {
      image-rendering: optimizeQuality;
    }
    
    input, button, select, textarea {
      font-family: 'Poppins', sans-serif;
    }
    
    ::placeholder {
      color: #999;
      opacity: 0.8;
    }
  `}
  
  /* Estilos globais adicionais para melhorar a responsividade */
  button, a {
    touch-action: manipulation;
  }
  
  /* Evitar que elementos ultrapassem suas containers */
  img, video, iframe, canvas, svg {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
