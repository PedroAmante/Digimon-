"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { DigimonContext } from "../contexts";

// Ellipse estilizada para mostrar o Digimon selecionado
const DigimonEllipse = styled.div`
  position: absolute;
  width: 78px;
  height: 78px;
  top: 39px;
  left: 650px; /* Posicionado à esquerda da barra de pesquisa (que está em left: 769px) */
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;

  @media (max-width: 1366px) {
    left: 400px;
  }

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    top: auto;
    margin: 20px auto;
    width: 60px;
    height: 60px;
  }
`;

const SelectedDigimonEllipse: React.FC = () => {
  const { selectedDigimon } = useContext(DigimonContext);

  return (
    <DigimonEllipse>
      {selectedDigimon ? (
        <Image
          src={selectedDigimon.img}
          alt={selectedDigimon.name}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <Image
          src="/assets/images/desconhecido.png"
          alt="Desconhecido"
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
        />
      )}
    </DigimonEllipse>
  );
};

export default SelectedDigimonEllipse;
