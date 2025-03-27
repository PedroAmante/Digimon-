// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  /* Estilos específicos para temas coloridos */
  ${({ theme }) =>
    theme.currentTheme !== "default" &&
    `
    body {
      background-color: ${theme.colors.background};
      background-image: ${
        theme.images?.background ? `url(${theme.images.background})` : "none"
      };
      background-size: cover;
      background-position: center right;
      background-repeat: no-repeat;
      background-attachment: fixed;
      
      @media (min-width: 1920px) {
        background-position: 90% center;
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
  `}
`;

export default GlobalStyles;
