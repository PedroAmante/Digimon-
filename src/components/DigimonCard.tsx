// src/components/DigimonCard.tsx
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
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 12px;
`;

const DigimonName = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
`;

const DigimonLevel = styled.p`
  font-size: 14px;
  color: #666;
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
