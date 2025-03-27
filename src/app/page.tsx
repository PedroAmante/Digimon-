// src/app/page.tsx
"use client";

import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { buscarDigimonPorNome } from "../services/api";
import { DigimonContext, ThemeContext } from "../contexts";
import { themes } from "../styles/theme";
import { Digimon } from "../types/types";

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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #7d4d8b; /* Roxo para o tema confiança */
  position: relative;
  overflow: hidden; /* Previne barra de rolagem */
`;

const Header = styled.header`
  padding: 20px;
  position: relative;
  z-index: 3;
`;

const ThemeTitle = styled.h3`
  position: absolute;
  top: 12px;
  right: 174px; /* Alinhado com o primeiro tema */
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  width: 107px;
  height: 12px;
  z-index: 10;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: 0;
  padding-left: 98px;
  padding-right: 0;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  height: auto;
  z-index: 2;

  @media (max-width: 1366px) {
    padding-left: 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 16px;
    height: auto;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  z-index: 2;
  position: relative;
  animation: ${fadeIn} 0.8s ease;
  max-width: 600px;
  margin-left: 15px; /* Adicionado para mover o conteúdo mais para a direita */

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 10px;
    max-width: 100%;
    margin-left: 0;
  }
`;

// Imagem de fundo
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/assets/images/background-confianca.png");
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

// Character Image - Oculto no tema confiança, visível apenas no tema default
const CharacterImage = styled.div`
  display: none;
`;

// LogoContainer com altura variável dependendo do tema
const LogoContainer = styled.div`
  position: relative;
  display: flex;
  height: 250px;
  margin-bottom: 30px;
`;

// Logo principal
const MainLogo = styled.div`
  position: absolute;
  top: 45px;
  left: 33px;
  width: 119px;
  height: 217px;
  z-index: 3;
`;

// Logo FPR para temas personalizados
const FprLogo = styled.div`
  display: block;
  position: absolute;
  top: 126px;
  left: 196px;
  width: 128px;
  height: 81px;
`;

// Logo DIGIMON para temas personalizados
const DigimonLogo = styled.div`
  display: block;
  position: absolute;
  top: 193px;
  left: 171px;
  width: 197px;
  height: 56px;
`;

// Textos
const WelcomeText = styled.p`
  color: #f8a12e;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  animation: ${fadeIn} 0.8s ease 0.2s both;
  margin-left: 10px; /* Adicionado para mover para a direita */

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
  }
`;

const MainTitle = styled.h1`
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 64px;
  line-height: 100%;
  letter-spacing: 0px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.8s ease 0.4s both;
  width: 498px;
  height: 146px;
  position: relative;
  margin-left: 10px; /* Adicionado para mover para a direita */
  z-index: 2;

  @media (max-width: 1366px) {
    font-size: 40px;
    width: auto;
    height: auto;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
    width: auto;
    height: auto;
    margin-left: 0;
  }
`;

const DescriptionText = styled.p`
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#666666" : "#FFFFFF"};
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0px;
  vertical-align: middle;
  margin-bottom: 30px;
  width: 488px;
  height: 129px;
  position: relative;
  animation: ${fadeIn} 0.8s ease 0.6s both;

  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto 30px;
    width: auto;
    height: auto;
    top: auto;
    left: auto;
  }
`;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  max-width: 470px;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.8s ease 0.8s both;
  margin-left: 10px; /* Adicionado para mover para a direita */
  z-index: 2;

  @media (max-width: 768px) {
    margin: 0 auto 24px;
  }
`;

// Barra de pesquisa com borda azul em temas personalizados
const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #0580bb; /* Sempre azul */
  background: #ffffff;
  padding: 8px 12px;
  position: relative;
  transition: all 0.3s ease;
  width: ${({ theme }) =>
    theme.currentTheme === "default" ? "auto" : "494px"};
  height: ${({ theme }) =>
    theme.currentTheme === "default" ? "auto" : "50px"};
  left: ${({ theme }) => (theme.currentTheme === "default" ? "auto" : "2px")};

  &:focus-within {
    box-shadow: 0 0 0 2px #0580bb40;
    border-color: #0580bb;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  border: none;
  outline: none;
  background: transparent;
`;

// Botão de busca com ícone azul em temas personalizados
const SearchButton = styled.button`
  background: none;
  border: none;
  color: #0580bb; /* Sempre azul */
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  animation: ${fadeIn} 0.8s ease 1s both;
  width: 100%; // Garantir largura total
  max-width: 500px; // Alinhar com a barra de pesquisa
  margin-left: 10px; /* Adicionado para mover para a direita */
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
`;

const PrimaryButton = styled.button`
  background-color: #f8a12e;
  color: white;
  border-radius: 25px;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1; // Distribui o espaço igualmente

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: #cbaade;
  color: white;
  border-radius: 20px;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  flex: 1; // Distribui o espaço igualmente
  width: 166px;
  height: 43px;
  position: relative;

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserCircle = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  top: 24px;
  left: 32px;
  background: #ffffff;
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
`;

// Modal
const fadeInModal = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  opacity: 0;
  animation: ${fadeInModal} 0.3s ease forwards;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  animation: ${fadeInModal} 0.3s ease forwards;

  @media (max-width: 600px) {
    width: calc(100% - 32px);
    padding: 16px;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ModalImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ModalButton = styled.button`
  padding: 12px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  flex: 1; // Distribui o espaço igualmente

  &.confirm {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }

  &.cancel {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #bbb;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;

// Interface para o resultado da busca
interface DigimonSearchResult {
  name: string;
  img: string;
  level: string;
}

// Componente Home
const Home: React.FC = () => {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchResult, setSearchResult] = useState<DigimonSearchResult | null>(
    null
  );
  const { selectedDigimon, setSelectedDigimon } = useContext(DigimonContext);
  const [isSearching, setIsSearching] = useState(false);
  const { currentTheme } = useContext(ThemeContext);

  const handlePesquisa = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    if (!termoPesquisa.trim()) {
      return;
    }

    setIsSearching(true);

    try {
      const resultado = await buscarDigimonPorNome(termoPesquisa);

      if (resultado.length > 0) {
        setSearchResult(resultado[0]);
        setShowConfirmModal(true);
      } else {
        alert("Digimon não encontrado. Tente outro nome.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar Digimon. Tente novamente.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmSelection = () => {
    if (searchResult) {
      setSelectedDigimon(searchResult as Digimon);
    }
    setShowConfirmModal(false);
    setSearchResult(null);
    setTermoPesquisa("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePesquisa(e as unknown as React.MouseEvent);
    }
  };

  // Não precisamos mais das funções de logo

  return (
    <PageContainer>
      <Background />
      <Header>
        <ThemeTitle>Escolha seu tema</ThemeTitle>
        <ThemeSwitcher />
      </Header>

      {/* Ellipse única do Digimon selecionado */}
      <UserCircle>
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
      </UserCircle>

      <ContentContainer>
        {/* Lado Esquerdo - Textos e busca */}
        <LeftSection>
          {/* RENDERIZAÇÃO DOS LOGOS */}
          <LogoContainer>
            <MainLogo>
              <Image
                src="/assets/images/logo-branco.png"
                alt="Logo"
                width={119}
                height={217}
                priority
              />
            </MainLogo>
            <FprLogo>
              <Image
                src="/assets/images/FPR-branco.png"
                alt="FPR"
                width={128}
                height={81}
                priority
              />
            </FprLogo>
            <DigimonLogo>
              <Image
                src="/assets/images/DIGIMON-branco.png"
                alt="DIGIMON"
                width={197}
                height={56}
                priority
              />
            </DigimonLogo>
          </LogoContainer>

          {/* Bem vindo */}
          <WelcomeText>Bem vindo ao FPR DIGIMON</WelcomeText>

          {/* Título Principal dividido em duas linhas nos temas personalizados */}
          <MainTitle>
            {currentTheme === "default" ? (
              "Escolha o seu Digimon"
            ) : (
              <>
                Escolha o <br />
                seu Digimon
              </>
            )}
          </MainTitle>

          {/* Texto Descritivo */}
          <DescriptionText>
            O Universo Digimon é um mundo digital onde vivem os Digimons,
            criaturas virtuais que formam laços com parceiros humanos. Juntos,
            eles enfrentam desafios e vilões para proteger tanto o Mundo Digital
            quanto o mundo real.
          </DescriptionText>

          {/* Barra de Pesquisa */}
          <SearchForm onSubmit={handlePesquisa}>
            <SearchInputContainer>
              <SearchInput
                placeholder="Digite o nome do DIGIMON"
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
              />
              <SearchButton
                type="submit"
                aria-label="search"
                disabled={isSearching}
              >
                <Search size={24} />
              </SearchButton>
            </SearchInputContainer>
          </SearchForm>

          {/* Botões */}
          <ButtonsContainer>
            <PrimaryButton onClick={handlePesquisa} disabled={isSearching}>
              {isSearching ? "BUSCANDO..." : "ESCOLHA SEU DIGIMON"}
            </PrimaryButton>

            <SecondaryButton href="/all">VER TODOS</SecondaryButton>
          </ButtonsContainer>
        </LeftSection>

        {/* Não precisamos mais do personagem */}
        <CharacterImage></CharacterImage>
      </ContentContainer>

      {/* Modal de Confirmação Customizado */}
      {showConfirmModal && searchResult && (
        <ModalOverlay onClick={() => setShowConfirmModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Digimon Encontrado!</ModalTitle>
            <ModalImage>
              <Image
                src={searchResult.img}
                alt={searchResult.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </ModalImage>
            <p>
              <strong>Nome:</strong> {searchResult.name}
            </p>
            <p>
              <strong>Nível:</strong> {searchResult.level}
            </p>
            <p>Deseja selecionar este Digimon?</p>
            <ModalButtons>
              <ModalButton className="confirm" onClick={handleConfirmSelection}>
                Sim, escolher este!
              </ModalButton>
              <ModalButton
                className="cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Não, continuar procurando
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Home;
