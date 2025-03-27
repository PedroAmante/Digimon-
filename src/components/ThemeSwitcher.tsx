// src/components/ThemeSwitcher.tsx
"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts";
import { themes, ThemeType } from "../styles/theme";

// Container para o seletor de tema no topo direito
const SwitcherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
`;

// Título do seletor com posicionamento absoluto
const ThemeLabel = styled.span`
  position: absolute;
  width: 107px;
  height: 12px;
  top: 20px;
  left: 1386px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
  white-space: nowrap;

  @media (max-width: 1500px) {
    left: auto;
    right: 220px;
  }

  @media (max-width: 768px) {
    right: 160px;
  }
`;

// Container para os círculos
const ThemeCirclesContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 20px;
`;

// Círculo de tema com label abaixo
const ThemeCircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

// Botão de tema (círculo) com borda branca se estiver ativo
const ThemeCircle = styled.button<{
  $themeColor: string;
  $isActive: boolean;
}>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.$themeColor};
  border: 2px solid ${(props) => (props.$isActive ? "#FFFFFF" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.$isActive
      ? "0 0 8px rgba(255, 255, 255, 0.5)"
      : "0 2px 4px rgba(0, 0, 0, 0.2)"};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) =>
      props.$isActive
        ? "0 0 12px rgba(255, 255, 255, 0.7)"
        : "0 4px 8px rgba(0, 0, 0, 0.3)"};
  }
`;

// Ícone dentro do círculo
const ThemeIcon = styled.span`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

// Texto do tema com cor branca quando ativo
const ThemeText = styled.span<{
  $isActive: boolean;
}>`
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 6px;
  color: ${(props) => (props.$isActive ? "#FFFFFF" : "#FFF")};
  text-align: center;
  text-transform: uppercase;
  text-shadow: ${(props) =>
    props.$isActive ? "0 0 3px rgba(0,0,0,0.5)" : "none"};
`;

// Configuração dos temas com ícones
const themeConfig = [
  {
    key: "coragem",
    themeType: "coragem" as ThemeType,
    color: "#0580BB",
    label: "CORAGEM",
    icon: "☀️", // Ícone para Coragem
  },
  {
    key: "esperanca",
    themeType: "esperanca" as ThemeType,
    color: "#209441",
    label: "ESPERANÇA",
    icon: "🌿", // Ícone para Esperança
  },
  {
    key: "sabedoria",
    themeType: "sabedoria" as ThemeType,
    color: "#CB1E31",
    label: "SABEDORIA",
    icon: "⚙️", // Ícone para Sabedoria
  },
  {
    key: "amor",
    themeType: "amor" as ThemeType,
    color: "#62B8DB",
    label: "AMOR",
    icon: "💖", // Ícone para Amor
  },
  {
    key: "sinceridade",
    themeType: "sinceridade" as ThemeType,
    color: "#F282B0",
    label: "SINCERIDADE",
    icon: "💧", // Ícone para Sinceridade
  },
  {
    key: "luz",
    themeType: "luz" as ThemeType,
    color: "#EA7EB2",
    label: "LUZ",
    icon: "✨", // Ícone para Luz
  },
  {
    key: "amizade",
    themeType: "amizade" as ThemeType,
    color: "#E28C25",
    label: "AMIZADE",
    icon: "🔄", // Ícone para Amizade
  },
  {
    key: "confianca",
    themeType: "confianca" as ThemeType,
    color: "#7D4D8B",
    label: "CONFIANÇA",
    icon: "⚔️", // Ícone para Confiança
  },
];

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const handleThemeChange = (themeType: ThemeType) => {
    // Não permitir selecionar o tema default explicitamente
    if (themeType !== "default") {
      // Salva o tema escolhido
      setCurrentTheme(themeType);
    }
  };

  return (
    <SwitcherContainer>
      <ThemeLabel>Escolha seu tema</ThemeLabel>
      <ThemeCirclesContainer>
        {themeConfig.map((theme) => {
          const isActive = currentTheme === theme.themeType;

          return (
            <ThemeCircleWrapper key={theme.key}>
              <ThemeCircle
                $themeColor={theme.color}
                $isActive={isActive}
                onClick={() => handleThemeChange(theme.themeType)}
                aria-label={`Mudar para tema ${theme.label}`}
              >
                <ThemeIcon>{theme.icon}</ThemeIcon>
              </ThemeCircle>
              <ThemeText $isActive={isActive}>{theme.label}</ThemeText>
            </ThemeCircleWrapper>
          );
        })}
      </ThemeCirclesContainer>
    </SwitcherContainer>
  );
};

export default ThemeSwitcher;
