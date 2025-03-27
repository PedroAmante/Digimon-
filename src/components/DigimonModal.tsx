// src/components/DigimonModal.tsx
"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import { X } from "lucide-react";
import { DigimonContext } from "../contexts";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const DigimonImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const DigimonName = styled.h2`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
`;

const DigimonInfo = styled.div`
  margin-bottom: 16px;
`;

const DigimonLevel = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

export const DigimonModal: React.FC = () => {
  const { selectedDigimon, isModalOpen, closeModal } =
    useContext(DigimonContext);

  if (!isModalOpen || !selectedDigimon) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>
          <X size={24} />
        </CloseButton>

        <DigimonImage>
          <Image
            src={selectedDigimon.img}
            alt={selectedDigimon.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </DigimonImage>

        <DigimonName>{selectedDigimon.name}</DigimonName>

        <DigimonInfo>
          <DigimonLevel>Level: {selectedDigimon.level}</DigimonLevel>
        </DigimonInfo>

        <p>
          {selectedDigimon.name} is a {selectedDigimon.level.toLowerCase()}{" "}
          level Digimon. Each Digimon has unique abilities and characteristics
          based on their type and level.
        </p>

        <ActionButton onClick={closeModal}>Back to list</ActionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export const DigimonConfirmationModal: React.FC = () => {
  const {
    digimonToConfirm,
    isConfirmationModalOpen,
    closeConfirmationModal,
    setSelectedDigimon,
    openModal,
  } = useContext(DigimonContext);

  if (!isConfirmationModalOpen || !digimonToConfirm) return null;

  const handleConfirm = () => {
    setSelectedDigimon(digimonToConfirm);
    closeConfirmationModal();
    openModal();
  };

  return (
    <ModalOverlay onClick={closeConfirmationModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeConfirmationModal}>
          <X size={24} />
        </CloseButton>

        <DigimonName>We found your Digimon!</DigimonName>

        <DigimonImage>
          <Image
            src={digimonToConfirm.img}
            alt={digimonToConfirm.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </DigimonImage>

        <DigimonInfo>
          <p>
            Name: <strong>{digimonToConfirm.name}</strong>
          </p>
          <p>
            Level: <strong>{digimonToConfirm.level}</strong>
          </p>
        </DigimonInfo>

        <p>Is this the Digimon you were looking for?</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <ActionButton onClick={handleConfirm}>
            Yes, that&apos;s it!
          </ActionButton>
          <ActionButton
            onClick={closeConfirmationModal}
            style={{ backgroundColor: "#ccc", color: "#333" }}
          >
            No, continue searching
          </ActionButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};
