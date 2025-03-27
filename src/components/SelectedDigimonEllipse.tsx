// src/components/SelectedDigimonEllipse.tsx
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
  left: 650px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
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
