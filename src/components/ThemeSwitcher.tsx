"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ThemeContext } from "../contexts";
import { ThemeType } from "../styles/theme";

const ThemeLabel = styled.span`
  position: absolute;
  width: 107px;
  height: 12px;
  top: 20px;
  left: 1386px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#F46D1B" : "#ffffff"};
  white-space: nowrap;

  @media (max-width: 1500px) {
    left: auto;
    right: 220px;
  }

  @media (max-width: 768px) {
    right: 160px;
  }
`;

const ThemeCirclesContainer = styled.div`
  display: flex;
  position: absolute;
  top: 44px;
  left: 1384px;
  gap: 8px;

  @media (max-width: 1500px) {
    left: auto;
    right: 120px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    justify-content: center;
    margin-top: 40px;
  }
`;

const ThemeCircleWrapper = styled.div<{
  $left: number;
}>`
  position: absolute;
  left: ${(props) => props.$left}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (max-width: 1500px) {
    position: relative;
    left: auto;
  }
`;

const ThemeCircle = styled.button<{
  $themeColor: string;
  $isActive: boolean;
}>`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isActive ? "#FFFFFF" : props.$themeColor};
  border: 2px solid ${(props) => (props.$isActive ? "#FFFFFF" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.$isActive
      ? "0px 4px 4px 0px #00000040"
      : "0 2px 4px rgba(0, 0, 0, 0.2)"};
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${(props) =>
      props.$isActive
        ? "0px 4px 4px 0px #00000040"
        : "0 4px 8px rgba(0, 0, 0, 0.3)"};
  }
`;

const ThemeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`;

const ThemeText = styled.span<{
  $isActive: boolean;
  $themeType: string;
}>`
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 6px;
  color: ${(props) => {
    if (props.$isActive) {
      if (props.$themeType === "esperanca") return "#209441";
      if (props.$themeType === "sabedoria") return "#CB1E31";
      if (props.$themeType === "confianca") return "#7D4D8B";
      if (props.$themeType === "coragem") return "#0580BB";
      if (props.$themeType === "amizade") return "#E28C25";
      if (props.$themeType === "luz") return "#EA7EB2";
      if (props.$themeType === "amor") return "#62B8DB";
      if (props.$themeType === "sinceridade") return "#F282B0";
      return "#FFFFFF";
    }
    return "#FFFFFF";
  }};
  text-align: center;
  text-transform: uppercase;
  text-shadow: ${(props) =>
    props.$isActive ? "0 0 3px rgba(0,0,0,0.5)" : "none"};
`;

const getThemeImage = (themeType: string, isActive: boolean): string => {
  if (isActive) {
    if (themeType === "esperanca")
      return "/assets/images/esperanca-colorido.png";
    if (themeType === "sabedoria")
      return "/assets/images/sabedoria_colorido.png";
    if (themeType === "confianca")
      return "/assets/images/confianca_colorido.png";
    if (themeType === "coragem") return "/assets/images/coragem_colorido.png";
    if (themeType === "amizade") return "/assets/images/amizade_colorido.png";
    if (themeType === "luz") return "/assets/images/LUZ_colorido.png";
    if (themeType === "amor") return "/assets/images/AMOR_colorido.png";
    if (themeType === "sinceridade")
      return "/assets/images/SINCERIDADE_colorido.png";
  }

  if (themeType === "esperanca") return "/assets/images/esperanca_branco.png";
  if (themeType === "sabedoria") return "/assets/images/sabedoria_branco.png";
  if (themeType === "confianca") return "/assets/images/confianca_branco.png";
  if (themeType === "coragem") return "/assets/images/coragem_branco.png";
  if (themeType === "amizade") return "/assets/images/amizade-branco.png";
  if (themeType === "luz") return "/assets/images/LUZ_BRANCO 1.png";
  if (themeType === "amor") return "/assets/images/AMOR_BRANCO 1.png";
  if (themeType === "sinceridade")
    return "/assets/images/SINCERIDADE_BRANCO 1.png";

  // Fallback para evitar o retorno de undefined
  return "/assets/images/default.png";
};

// Configuração dos temas com imagens
const themeConfig = [
  {
    key: "esperanca",
    themeType: "esperanca" as ThemeType,
    color: "#209441",
    label: "ESPERANÇA",
    imgWidth: 21,
    imgHeight: 30,
    position: 0,
  },
  {
    key: "sabedoria",
    themeType: "sabedoria" as ThemeType,
    color: "#CB1E31",
    label: "SABEDORIA",
    imgWidth: 39,
    imgHeight: 19,
    position: 63,
  },
  {
    key: "confianca",
    themeType: "confianca" as ThemeType,
    color: "#7D4D8B",
    label: "CONFIANÇA",
    imgWidth: 19,
    imgHeight: 32,
    position: 126,
  },
  {
    key: "coragem",
    themeType: "coragem" as ThemeType,
    color: "#0580BB",
    label: "CORAGEM",
    imgWidth: 34,
    imgHeight: 34,
    position: 189,
  },
  {
    key: "amizade",
    themeType: "amizade" as ThemeType,
    color: "#E28C25",
    label: "AMIZADE",
    imgWidth: 48,
    imgHeight: 26,
    position: 252,
  },
  {
    key: "luz",
    themeType: "luz" as ThemeType,
    color: "#EA7EB2",
    label: "LUZ",
    imgWidth: 35,
    imgHeight: 35,
    position: 313,
  },
  {
    key: "amor",
    themeType: "amor" as ThemeType,
    color: "#62B8DB",
    label: "AMOR",
    imgWidth: 33,
    imgHeight: 26,
    position: 375,
  },
  {
    key: "sinceridade",
    themeType: "sinceridade" as ThemeType,
    color: "#F282B0",
    label: "SINCERIDADE",
    imgWidth: 21,
    imgHeight: 32,
    position: 441,
    imgStyle: { transform: "rotate(180deg)" },
  },
];

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const handleThemeChange = (themeType: ThemeType) => {
    if (themeType !== "default") {
      setCurrentTheme(themeType);
    }
  };

  return (
    <>
      <ThemeLabel>Escolha seu tema</ThemeLabel>
      <ThemeCirclesContainer>
        {themeConfig.map((theme) => {
          const isActive = currentTheme === theme.themeType;
          const imageSrc = getThemeImage(theme.themeType, isActive);

          return (
            <ThemeCircleWrapper key={theme.key} $left={theme.position}>
              <ThemeCircle
                $themeColor={theme.color}
                $isActive={isActive}
                onClick={() => handleThemeChange(theme.themeType)}
                aria-label={`Mudar para tema ${theme.label}`}
              >
                <ThemeIconContainer>
                  <Image
                    src={imageSrc}
                    alt={theme.label}
                    width={theme.imgWidth}
                    height={theme.imgHeight}
                    style={theme.imgStyle}
                  />
                </ThemeIconContainer>
                <ThemeText $isActive={isActive} $themeType={theme.themeType}>
                  {theme.label}
                </ThemeText>
              </ThemeCircle>
            </ThemeCircleWrapper>
          );
        })}
      </ThemeCirclesContainer>
    </>
  );
};

export default ThemeSwitcher;
