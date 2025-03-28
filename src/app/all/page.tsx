"use client";

import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home as HomeIcon } from "lucide-react";
import {
  buscarTodosDigimons,
  buscarDigimonsPorNivel,
} from "../../services/api";
import { DigimonContext, ThemeContext } from "../../contexts";
import { Digimon } from "../../types/types";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import SelectedDigimonEllipse from "../../components/SelectedDigimonEllipse";

// Estilos globais para remover a barra de rolagem e escurecer o fundo
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: hidden;
    padding: 0;
    background-color: ${({ theme }) =>
      theme.currentTheme !== "default" ? "#001628" : theme.colors.background};
  }

  html {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: hidden;
  }

  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// Overlay escuro para temas personalizados
const DarkOverlay = styled.div<{ $isCustomTheme: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => (props.$isCustomTheme ? "block" : "none")};
`;

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components - Atualizado para suportar imagens de fundo do tema
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.currentTheme !== "default" ? "#001628" : theme.colors.background};
  background-image: ${({ theme }) =>
    theme.images?.background && theme.currentTheme !== "default"
      ? `url(${theme.images.background})`
      : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  animation: ${fadeIn} 0.5s ease;
  position: relative;
  width: 100%;
  height: 150px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    height: auto;
  }
`;

// NOVOS COMPONENTES PARA LOGOS COM POSICIONAMENTO EXATO
const LogoWhite = styled.div`
  position: absolute;
  width: 64px;
  height: 117px;
  top: 30px;
  left: 40px;
  display: ${({ theme }) =>
    theme.currentTheme === "default" ? "none" : "block"};
  transition: transform 0.3s ease;
  z-index: 15;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1366px) {
    left: 30px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: 10px;
    left: 0;
    margin: 0 auto;
  }
`;

// Logo do DIGIMON-branco adicionado novamente com posicionamento exato
const DigimonLogoWhite = styled.div`
  position: absolute;
  width: 103.49708557128906px;
  height: 17.67023277282715px;
  top: 117.48px;
  left: 109.5px;
  display: ${({ theme }) =>
    theme.currentTheme === "default" ? "none" : "block"};
  z-index: 15;

  @media (max-width: 1366px) {
    left: 100px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const FPRLogoWhite = styled.div`
  position: absolute;
  width: 67.9778060913086px;
  height: 33.28945541381836px;
  top: 79.01px;
  left: 123.4px;
  display: ${({ theme }) =>
    theme.currentTheme === "default" ? "none" : "block"};
  z-index: 15;

  @media (max-width: 1366px) {
    left: 110px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: ${({ theme }) =>
    theme.currentTheme === "default" ? "flex" : "none"};
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;
  margin: 0;
  position: absolute;
  top: 30px;
  left: 40px;
  z-index: 15;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// DigimonEllipse atualizado para ficar centralizado mais à direita
const DigimonEllipse = styled.div`
  position: absolute;
  width: 78px;
  height: 78px;
  top: 39px;
  right: 50%;
  transform: translateX(150px);
  background: ${({ theme }) => theme.digimonCircle?.background || "#FFFFFF"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  margin: 0;

  &:hover {
    transform: translateX(150px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1366px) {
    right: 45%;
  }

  @media (max-width: 768px) {
    position: relative;
    right: auto;
    transform: none;
    margin: 20px auto;
    width: 60px;
    height: 60px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// SearchContainer removido, vamos posicionar cada input individualmente
const SearchInputContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 40px;
  top: 59px;
  left: 769px;
  z-index: 5;
  animation: ${fadeIn} 0.6s ease;
  margin: 0;

  @media (max-width: 1366px) {
    left: 500px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    margin: 20px auto;
    width: 90%;
    max-width: 240px;
  }
`;

const SelectInputContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 40px;
  top: 59px;
  left: 1060px;
  z-index: 5;
  animation: ${fadeIn} 0.6s ease;
  margin: 0;

  @media (max-width: 1366px) {
    left: 760px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    margin: 10px auto;
    width: 90%;
    max-width: 240px;
  }
`;

const SearchInput = styled.input`
  width: 240px;
  height: 40px;
  padding: 0 0 0 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url("/assets/images/agumon-icon.png");
  background-repeat: no-repeat;
  background-position: 8px center;
  background-size: 24px;
  transition: all 0.3s ease;
  margin: 0;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}40;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SelectInput = styled.select`
  width: 240px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s ease;
  margin: 0;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}40;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;

  @media (max-width: 1366px) {
    margin-top: 150px;
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

// Digimon Grid com posicionamento absoluto removido - os cards serão posicionados individualmente
const DigimonGrid = styled.div`
  position: relative;
  width: 100%;
  height: 700px;

  @media (max-width: 1366px) {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    height: auto;
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

// Card de Digimon com posicionamento absoluto para cada card - moved up 170px
// Agora com background transparente e sem sombra apenas para o tema default
const DigimonCard = styled.div<{ $position: number; $row: number }>`
  position: absolute;
  width: 302px;
  height: 132px;
  top: ${(props) =>
    props.$row === 1 ? "166px" : props.$row === 2 ? "349px" : "538px"};
  left: ${(props) => {
    switch (props.$position) {
      case 1:
        return "81px";
      case 2:
        return props.$row === 2 ? "538px" : "539px";
      case 3:
        return "1007px";
      case 4:
        return props.$row === 2 || props.$row === 3 ? "1476px" : "1467px";
      default:
        return "81px";
    }
  }};
  background-color: transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  z-index: 5;
  margin: 0;
  padding: 0;
  box-shadow: ${({ theme }) =>
    theme.currentTheme === "default" ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};

  @media (max-width: 1366px) {
    position: relative;
    top: auto;
    left: auto;
    width: 302px;
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:hover::after {
    content: "Escolher";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }

  &:active {
    transform: translateY(0);
  }
`;

// CardImage com fundo semi-transparente apenas para o tema default
const CardImage = styled.div`
  position: relative;
  width: 80px;
  min-width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.currentTheme === "default" ? "rgba(255, 255, 255, 0.5)" : "white"};
  margin: 0;
  padding: 0;
  border-radius: 8px 0 0 8px;
`;

// CardContent com fundo transparente para todos os temas
const CardContent = styled.div`
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  flex: 1;
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#333333" : "white"};
  border-radius: 0 8px 8px 0;
`;

// Textos ajustados para ter cor preta no tema default e branca nos outros temas
const CardTitle = styled.p`
  font-weight: normal;
  margin: 0 0 4px 0;
  padding: 0;
  font-size: 14px;
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#333333" : "white"};
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#333333" : "white"};
  margin: 0;
  padding: 0;
  font-weight: normal;
`;

// Botões de paginação posicionados exatamente como solicitado
const PaginationContainer = styled.div`
  /* Container removido, cada botão tem seu próprio posicionamento absoluto */
  display: contents;

  @media (max-width: 1366px) {
    display: flex;
    gap: 10px;
    margin: 50px auto 30px;
    justify-content: center;
  }
`;

const PreviousButton = styled.button`
  position: absolute;
  width: 109px;
  height: 32px;
  top: 700px;
  left: 1627px;
  border-radius: 4px; /* Radius/200 */
  padding-top: 4px; /* Space/200 */
  padding-right: 8px; /* Space/300 */
  padding-bottom: 4px; /* Space/200 */
  padding-left: 8px; /* Space/300 */
  gap: 4px; /* Space/200 */
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: normal;
  z-index: 50;

  svg {
    margin: 0 5px 0 0;
  }

  &:hover {
    background-color: #e9e9e9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 1366px) {
    position: static;
    width: 109px;
    height: 32px;
  }
`;

const NextButton = styled.button`
  position: absolute;
  width: 109px;
  height: 32px;
  top: 700px;
  left: 1760px;
  border-radius: 4px; /* Radius/200 */
  padding-top: 4px; /* Space/200 */
  padding-right: 8px; /* Space/300 */
  padding-bottom: 4px; /* Space/200 */
  padding-left: 8px; /* Space/300 */
  gap: 4px; /* Space/200 */
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: normal;
  z-index: 50;

  svg {
    margin: 0 0 0 5px;
  }

  &:hover {
    background-color: #e9e9e9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 1366px) {
    position: static;
    width: 109px;
    height: 32px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  margin: 0;
  padding: 0;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid
    ${({ theme }) =>
      theme.currentTheme === "default" ? theme.colors.primary : "white"};
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 0;
  padding: 0;
`;

const FloatingHomeButton = styled(Link)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 10;
  margin: 0;
  padding: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

// NoResultsMessage com cor do tema
const NoResultsMessage = styled.div`
  text-align: center;
  padding: 0;
  margin: 40px 0;
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? theme.colors.text : "white"};
  font-size: 18px;
  animation: ${fadeIn} 0.5s ease;
`;

// Modal de confirmação
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
  margin: 0;
  padding: 0;
`;

const ModalContent = styled.div`
  width: 466px;
  height: 186px;
  max-width: 600px;
  border-radius: 8px;
  border-width: 1px;
  padding: 24px;
  gap: 16px;
  background: #ffffff;
  border-top: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px -4px rgba(12, 12, 13, 0.05),
    0px 16px 32px -4px rgba(12, 12, 13, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: auto;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
`;

const NeutralButton = styled.button`
  width: 55px;
  height: 40px;
  border-radius: 8px;
  border-width: 1px;
  padding: 0;
  margin: 0;
  gap: 4px;
  background: #e3e3e3;
  border: 1px solid #767676;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  color: #333;

  &:hover {
    background: #d6d6d6;
  }
`;

const PrimaryModalButton = styled.button`
  width: 52px;
  height: 40px;
  border-radius: 8px;
  border-width: 1px;
  padding: 0;
  margin: 0;
  gap: 4px;
  background: #2c2c2c;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

// Main Component
const AllDigimonPage: React.FC = () => {
  const { selectedDigimon, setSelectedDigimon } = useContext(DigimonContext);
  const { currentTheme } = useContext(ThemeContext);
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [filteredDigimons, setFilteredDigimons] = useState<Digimon[]>([]);
  const [allDigimons, setAllDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocalDigimon, setSelectedLocalDigimon] =
    useState<Digimon | null>(null);
  const router = useRouter();

  const isCustomTheme = currentTheme !== "default";
  const ITEMS_PER_PAGE = isMobile ? 8 : 12;

  // Função auxiliar para calcular a posição de cada card
  const getCardPosition = (
    index: number
  ): { position: number; row: number } => {
    const row = Math.floor(index / 4) + 1; // 1, 2, ou 3
    const position = (index % 4) + 1; // 1, 2, 3, ou 4
    return { position, row };
  };

  // Detecta se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Carrega todos os digimons uma vez
  useEffect(() => {
    const loadAllDigimons = async () => {
      try {
        const data = await buscarTodosDigimons();
        setAllDigimons(data);
        setDigimons(data);
        setFilteredDigimons(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar todos os digimons:", error);
        setLoading(false);
      }
    };

    setLoading(true);
    loadAllDigimons();
  }, []);

  // Filtra pelo nível selecionado usando dados locais
  useEffect(() => {
    if (allDigimons.length > 0) {
      setLoading(true);

      if (levelFilter !== "Todos") {
        const filtered = allDigimons.filter(
          (digimon) => digimon.level === levelFilter
        );
        setDigimons(filtered);
      } else {
        setDigimons(allDigimons);
      }

      setLoading(false);
    }
  }, [levelFilter, allDigimons]);

  // Filtra por texto digitado usando dados locais
  useEffect(() => {
    if (digimons.length > 0) {
      if (searchTerm) {
        const filtered = digimons.filter((digimon) =>
          digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDigimons(filtered);
        setCurrentPage(1);
      } else {
        setFilteredDigimons(digimons);
      }
    }
  }, [searchTerm, digimons]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDigimons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDigimons = filteredDigimons.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleCardClick = (digimon: Digimon) => {
    setSelectedLocalDigimon(digimon);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedLocalDigimon) {
      setSelectedDigimon(selectedLocalDigimon);
      // Navegar para a página inicial após a seleção para ver o Digimon na Ellipse
      router.push("/");
    }
    setModalOpen(false);
  };

  const handleDismiss = () => {
    setModalOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <DarkOverlay $isCustomTheme={isCustomTheme} />
      <PageContainer>
        <Header>
          {/* Container para o tema padrão */}
          <LogoContainer>
            <Link href="/">
              <Image
                src="/assets/images/logoall.png"
                alt="FPR Digimon Logo"
                width={150}
                height={80}
                priority
              />
            </Link>
          </LogoContainer>

          {/* Logos para temas não-padrão com posicionamento exato */}
          <LogoWhite>
            <Link href="/">
              <Image
                src="/assets/images/logo-branco.png"
                alt="Logo"
                width={64}
                height={117}
                priority
              />
            </Link>
          </LogoWhite>

          <FPRLogoWhite>
            <Image
              src="/assets/images/FPR-branco.png"
              alt="FPR Logo"
              width={67.9778060913086}
              height={33.28945541381836}
              priority
            />
          </FPRLogoWhite>

          <DigimonLogoWhite>
            <Image
              src="/assets/images/DIGIMON-branco.png"
              alt="Digimon Logo"
              width={103.49708557128906}
              height={17.67023277282715}
              priority
            />
          </DigimonLogoWhite>

          {/* ThemeSwitcher diretamente no header */}
          <ThemeSwitcher />
        </Header>

        {/* Elipse do Digimon usando o componente global */}
        <SelectedDigimonEllipse />

        <SearchInputContainer>
          <SearchInput
            placeholder="Digimon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputContainer>

        <SelectInputContainer>
          <SelectInput
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            aria-label="Filtrar por nível"
          >
            <option value="Todos">Level</option>
            <option value="Fresh">Fresh</option>
            <option value="In Training">In Training</option>
            <option value="Rookie">Rookie</option>
            <option value="Champion">Champion</option>
            <option value="Ultimate">Ultimate</option>
            <option value="Mega">Mega</option>
          </SelectInput>
        </SelectInputContainer>

        <ContentContainer>
          {loading ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : filteredDigimons.length === 0 ? (
            <NoResultsMessage>
              Nenhum Digimon encontrado com os filtros aplicados.
            </NoResultsMessage>
          ) : (
            <>
              <DigimonGrid>
                {/* Digimon Cards com posicionamento absoluto */}
                {currentDigimons.map((digimon, index) => {
                  const { position, row } = getCardPosition(index);
                  return (
                    <DigimonCard
                      key={`${digimon.name}-${index}`}
                      onClick={() => handleCardClick(digimon)}
                      $position={position}
                      $row={row}
                    >
                      <CardImage>
                        <Image
                          src={digimon.img}
                          alt={digimon.name}
                          width={70}
                          height={70}
                          style={{ objectFit: "contain" }}
                        />
                      </CardImage>
                      <CardContent>
                        <CardTitle>Nome: {digimon.name}</CardTitle>
                        <CardSubtitle>Level: {digimon.level}</CardSubtitle>
                      </CardContent>
                    </DigimonCard>
                  );
                })}
              </DigimonGrid>

              <PaginationContainer>
                <PreviousButton
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} /> Anterior
                </PreviousButton>
                <NextButton
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Próximo <ChevronRight size={14} />
                </NextButton>
              </PaginationContainer>
            </>
          )}
        </ContentContainer>

        {/* Modal de confirmação */}
        {modalOpen && selectedLocalDigimon && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>
                Você deseja adicionar {selectedLocalDigimon.name} como digimon
                favorito?
              </ModalTitle>
              <ButtonGroup>
                <NeutralButton onClick={handleDismiss}>Não</NeutralButton>
                <PrimaryModalButton onClick={handleConfirm}>
                  Sim
                </PrimaryModalButton>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Botão flutuante de Home para mobile */}
        <FloatingHomeButton href="/">
          <HomeIcon size={24} />
        </FloatingHomeButton>
      </PageContainer>
    </>
  );
};

export default AllDigimonPage;
