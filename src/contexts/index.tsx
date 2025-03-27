// src/contexts/index.tsx
"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Digimon } from "../types/types";
import { themes, ThemeType } from "../styles/theme";

// DigimonContext
interface DigimonContextType {
  selectedDigimon: Digimon | null;
  digimonToConfirm: Digimon | null;
  setSelectedDigimon: (digimon: Digimon | null) => void;
  setDigimonToConfirm: (digimon: Digimon | null) => void;
  isModalOpen: boolean;
  isConfirmationModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openConfirmationModal: () => void;
  closeConfirmationModal: () => void;
}

export const DigimonContext = createContext<DigimonContextType>({
  selectedDigimon: null,
  digimonToConfirm: null,
  setSelectedDigimon: () => {},
  setDigimonToConfirm: () => {},
  isModalOpen: false,
  isConfirmationModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  openConfirmationModal: () => {},
  closeConfirmationModal: () => {},
});

// ThemeContext
interface ThemeContextType {
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  theme: typeof themes.default;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "default",
  setCurrentTheme: () => {},
  theme: themes.default,
});

// Combined Provider
interface ProvidersProps {
  children: ReactNode;
}

export const AppProvider: React.FC<ProvidersProps> = ({ children }) => {
  // DigimonContext state
  const [selectedDigimon, setSelectedDigimon] = useState<Digimon | null>(null);
  const [digimonToConfirm, setDigimonToConfirm] = useState<Digimon | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  // ThemeContext state - inicializa com "default"
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("default");

  // Load theme from localStorage on startup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeType;
      if (savedTheme && savedTheme in themes) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  // Atualiza o objeto de tema atual com a informação do tema selecionado
  const currentThemeObject = {
    ...themes[currentTheme],
    currentTheme: currentTheme,
  };

  return (
    <DigimonContext.Provider
      value={{
        selectedDigimon,
        digimonToConfirm,
        setSelectedDigimon,
        setDigimonToConfirm,
        isModalOpen,
        isConfirmationModalOpen,
        openModal,
        closeModal,
        openConfirmationModal,
        closeConfirmationModal,
      }}
    >
      <ThemeContext.Provider
        value={{
          currentTheme,
          setCurrentTheme,
          theme: currentThemeObject,
        }}
      >
        <ThemeProvider theme={currentThemeObject}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </DigimonContext.Provider>
  );
};

export default AppProvider;
