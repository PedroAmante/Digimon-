"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Digimon } from "../types/types";
import { DigimonContext } from "../contexts";

interface DigimonCardProps {
  digimon: Digimon;
}

const Card = styled.div`
  background-color: transparent; // Alterado de white para transparent
  border-radius: 8px;
  overflow: hidden;
  box-shadow: none; // Removida a sombra padrão
  transition: transform 0.2s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); // Adicionada sombra apenas no hover
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); // Semi-transparente em vez de sólido
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 12px;
  background-color: transparent; // Garantindo que o conteúdo seja transparente
`;

const DigimonName = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.currentTheme === "default"
      ? "#333333"
      : "white"}; // Ajuste da cor do texto conforme o tema
`;

const DigimonLevel = styled.p`
  font-size: 14px;
  color: ${({ theme }) =>
    theme.currentTheme === "default"
      ? "#666"
      : "rgba(255, 255, 255, 0.8)"}; // Ajuste da cor secundária conforme o tema
  margin: 0;
`;

const DigimonCard: React.FC<DigimonCardProps> = ({ digimon }) => {
  const { setSelectedDigimon, openModal } = useContext(DigimonContext);

  const handleClick = () => {
    setSelectedDigimon(digimon);
    openModal();
  };

  return (
    <Card onClick={handleClick}>
      <ImageWrapper>
        <Image
          src={digimon.img}
          alt={digimon.name}
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </ImageWrapper>
      <CardContent>
        <DigimonName>Nome: {digimon.name}</DigimonName>
        <DigimonLevel>Level: {digimon.level}</DigimonLevel>
      </CardContent>
    </Card>
  );
};

export default DigimonCard;
