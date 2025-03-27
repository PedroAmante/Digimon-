// src/app/all/page.tsx
"use client";

import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home as HomeIcon } from "lucide-react";
import { fetchAllDigimon, buscarDigimonPorNivel } from "../../services/api";
import { DigimonContext, ThemeContext } from "../../contexts";
import { Digimon } from "../../types/types";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { themes } from "../../styles/theme";

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
  background-color: ${({ theme }) => theme.colors.background};
  background-image: ${({ theme }) =>
    theme.images?.background ? `url(${theme.images.background})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-bottom: 40px;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  animation: ${fadeIn} 0.5s ease;
  position: relative;

  @media (max-width: 1366px) {
    padding: 16px 30px;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// DigimonEllipse atualizado para usar posicionamento exato
const DigimonEllipse = styled.div`
  position: absolute;
  width: 78px;
  height: 78px;
  top: 39px;
  left: 650px;
  background: ${({ theme }) => theme.digimonCircle?.background || "#FFFFFF"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1366px) {
    left: 400px;
  }

  @media (max-width: 768px) {
    left: auto;
    right: 20px;
    top: 20px;
    width: 60px;
    height: 60px;
  }
`;

// SearchContainer atualizado para posicionamento exato
const SearchContainer = styled.div`
  position: absolute;
  top: 59px;
  left: 769px;
  display: flex;
  gap: 16px;
  animation: ${fadeIn} 0.6s ease;
  z-index: 5;

  @media (max-width: 1366px) {
    left: 500px;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    flex-direction: column;
    gap: 10px;
    margin: 80px auto 20px;
    width: 90%;
    max-width: 480px;
  }
`;

const SearchInput = styled.input`
  width: 240px;
  height: 40px;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url("/assets/images/agumon-icon.png");
  background-repeat: no-repeat;
  background-position: 8px center;
  background-size: 24px;
  padding-left: 40px;
  transition: all 0.3s ease;

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
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s ease;

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
  max-width: 1200px;
  margin: 120px auto 0; /* Ajustado para dar espaço para os elementos posicionados absolutamente */
  padding: 0 40px;
  animation: ${fadeIn} 0.7s ease;

  @media (max-width: 1366px) {
    max-width: 1000px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    margin-top: 20px;
  }
`;

const DigimonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 1366px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

// Card atualizado para usar a mesma cor do background do tema
const DigimonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  height: 140px;
  display: flex;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

// CardContent atualizado para usar cor primária do tema
const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  flex: 1;
  color: white; /* Sempre branco para contrastar com as cores do tema */
`;

// CardTitle atualizado para ser sempre branco
const CardTitle = styled.p`
  font-weight: 500;
  margin: 0 0 4px 0;
  font-size: 14px;
  color: white;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  color: white;
  margin: 0;
`;

// PaginationContainer atualizado para posicionamento específico
const PaginationContainer = styled.div`
  position: absolute;
  top: 864px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  animation: ${fadeIn} 1s ease;

  @media (max-width: 1366px) {
    position: relative;
    top: auto;
    right: auto;
    justify-content: flex-end;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 30px;
  }
`;

// PaginationButton atualizado para dimensões específicas
const PaginationButton = styled.button`
  width: 109px;
  height: 32px;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
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
  padding: 40px 0;
  color: white;
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

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: auto;
`;

const NeutralButton = styled.button`
  width: 55px;
  height: 40px;
  border-radius: 8px;
  border-width: 1px;
  padding: 8px;
  gap: 4px;
  background: #e3e3e3;
  border: 1px solid #767676;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #d6d6d6;
  }
`;

const PrimaryModalButton = styled.button`
  width: 52px;
  height: 40px;
  border-radius: 8px;
  border-width: 1px;
  padding: 8px;
  gap: 4px;
  background: ${(props) => props.theme.colors.primary};
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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocalDigimon, setSelectedLocalDigimon] =
    useState<Digimon | null>(null);
  const router = useRouter();

  const ITEMS_PER_PAGE = isMobile ? 8 : 12;

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

  useEffect(() => {
    const loadDigimons = async () => {
      try {
        let data;
        if (levelFilter !== "Todos") {
          data = await buscarDigimonPorNivel(levelFilter);
        } else {
          data = await fetchAllDigimon();
        }
        setDigimons(data);
        setFilteredDigimons(data);
      } catch (error) {
        console.error("Error loading digimons:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadDigimons();
  }, [levelFilter]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = digimons.filter((digimon) =>
        digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDigimons(filtered);
      setCurrentPage(1);
    } else {
      setFilteredDigimons(digimons);
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
    <PageContainer>
      <Header>
        <LogoContainer>
          <Link href="/">
            <Image
              src={
                currentTheme !== "default" && themes[currentTheme]?.images?.logo
                  ? themes[currentTheme].images.logo
                  : "/assets/images/logoall.png"
              }
              alt="FPR Digimon Logo"
              width={150}
              height={80}
              priority
            />
          </Link>
        </LogoContainer>

        {/* ThemeSwitcher no canto superior direito */}
        <ThemeSwitcher />
      </Header>

      {/* Ellipse do Digimon selecionado */}
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

      <SearchContainer>
        <SearchInput
          placeholder="Digimon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </SearchContainer>

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
              {/* Digimon Cards */}
              {currentDigimons.map((digimon, index) => (
                <DigimonCard
                  key={`${digimon.name}-${index}`}
                  onClick={() => handleCardClick(digimon)}
                >
                  <CardImage>
                    <Image
                      src={digimon.img}
                      alt={digimon.name}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                    />
                  </CardImage>
                  <CardContent>
                    <CardTitle>Nome: {digimon.name}</CardTitle>
                    <CardSubtitle>Level: {digimon.level}</CardSubtitle>
                  </CardContent>
                </DigimonCard>
              ))}
            </DigimonGrid>

            <PaginationContainer>
              <PaginationButton
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> Anterior
              </PaginationButton>
              <PaginationButton
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Próximo <ChevronRight size={16} />
              </PaginationButton>
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
  );
};

export default AllDigimonPage;
