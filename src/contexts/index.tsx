"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Digimon } from "../types/types";
import { themes, ThemeType } from "../styles/theme";

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

interface ProvidersProps {
  children: ReactNode;
}

export const AppProvider: React.FC<ProvidersProps> = ({ children }) => {
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

  const [currentTheme, setCurrentTheme] = useState<ThemeType>("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Primeiro verifica se existe um tema salvo
      const savedTheme = localStorage.getItem("theme") as ThemeType;

      if (!savedTheme) {
        localStorage.setItem("theme", "default");
      } else if (savedTheme in themes) {
        setCurrentTheme(savedTheme);
      } else {
        localStorage.setItem("theme", "default");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

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
