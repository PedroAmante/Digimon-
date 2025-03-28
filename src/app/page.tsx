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
  background-color: ${({ theme }) => theme.colors.background};
  background-image: ${({ theme }) =>
    theme.images?.background ? `url(${theme.images.background})` : "none"};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.header`
  position: relative;
  z-index: 5;
  padding: 12px 16px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  padding: 0;
  width: 100%;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
  animation: ${fadeIn} 0.8s ease;
  padding-left: 88px;
  padding-top: 40px;

  @media (max-width: 1366px) {
    padding-left: 60px;
    width: 45%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 16px;
  }
`;

// Character Image - Posicionamento específico conforme coordenadas exatas
const CharacterImage = styled.div`
  position: absolute;
  width: 647px;
  height: 859px;
  top: 169px;
  left: 960px;
  z-index: 1;
  display: ${({ theme }) =>
    theme.currentTheme === "default" ? "block" : "none"};
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none;
  }
`;

// LogoContainer ajustado com flexbox para alinhar verticalmente
const LogoContainer = styled.div`
  display: flex;
  align-items: center; /* Alinha verticalmente no centro */
  margin-bottom: 40px;
  position: relative;
`;

// Logo principal ajustado
const MainLogo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Logos separados para FPR e DIGIMON com posicionamento refinado
const FPRLogo = styled.div`
  position: absolute;
  top: 126px;
  left: 166px; /* Ajustado para ficar mais próximo do logo */
`;

const DigimonLogo = styled.div`
  position: absolute;
  top: 193px;
  left: 151px; /* Ajustado para ficar mais próximo do logo */
`;

// Textos - Cor específica para cada tema
const WelcomeText = styled.p`
  color: ${({ theme }) => {
    if (theme.currentTheme === "default") return "#f46d1b";
    if (theme.currentTheme === "coragem") return "#FEC435";
    if (theme.currentTheme === "amizade") return "#FFD05C";
    if (theme.currentTheme === "luz") return "#FDF753";
    if (theme.currentTheme === "amor") return "#FDF753";
    if (theme.currentTheme === "sinceridade") return "#FDF753";
    return "#F8A12E"; // Cor padrão para outros temas
  }};
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 16px 0;
  animation: ${fadeIn} 0.8s ease 0.2s both;
  width: 327px;
  height: 16px;
  left: 2px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const MainTitle = styled.h1`
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? theme.colors.text : "#FFFFFF"};
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 64px;
  line-height: 1.1;
  margin: 0 0 24px 0;
  animation: ${fadeIn} 0.8s ease 0.4s both;
  width: 498px;
  height: 146px;
  top: 19px;

  @media (max-width: 1366px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    text-align: center;
  }
`;

const DescriptionText = styled.p`
  color: ${({ theme }) =>
    theme.currentTheme === "default" ? "#666666" : "#FFFFFF"};
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 30px 0;
  width: 488px;
  height: 129px;
  top: 159px;
  left: 4px;
  animation: ${fadeIn} 0.8s ease 0.6s both;

  @media (max-width: 768px) {
    text-align: center;
    width: auto;
  }
`;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  max-width: 494px;
  margin: 0 0 24px 0;
  animation: ${fadeIn} 0.8s ease 0.8s both;
  z-index: 2;
  left: 2px;

  @media (max-width: 768px) {
    margin: 0 auto 24px;
  }
`;

// Barra de pesquisa atualizada para tema default com borda verde
const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid
    ${({ theme }) => (theme.currentTheme === "default" ? "#34AC40" : "#0580BB")};
  background: #f5f5f5;
  padding: 8px 12px;
  position: relative;
  transition: all 0.3s ease;
  height: 50px;
  width: 494px;

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}40`};
    border-color: ${({ theme }) => theme.colors.primary};
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

// Botão de pesquisa atualizado para o tema default com ícone verde
const SearchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) =>
    theme.currentTheme === "default"
      ? "#34AC40"
      : theme.currentTheme === "sabedoria"
      ? "#A50000"
      : "#0580BB"};
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: absolute;
  top: 10px;
  left: 455px;
  width: 26px;
  height: 26px;

  &:hover {
    transform: scale(1.1);
  }
`;

// Ajuste no ButtonsContainer para alinhar com a barra de pesquisa
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between; // Para alinhar às extremidades
  gap: 16px;
  margin-top: 16px;
  animation: ${fadeIn} 0.8s ease 1s both;
  width: 494px; // Mesma largura da barra de pesquisa
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

// Botão "ESCOLHA SEU DIGIMON" atualizado para laranja no tema default
const PrimaryButton = styled.button`
  background-color: ${({ theme }) => {
    if (theme.currentTheme === "default") return "#F46D1B";
    if (theme.currentTheme === "coragem") return "#FEC435";
    if (theme.currentTheme === "amizade") return "#FFD05C";
    if (theme.currentTheme === "luz") return "#FDF753";
    if (theme.currentTheme === "amor") return "#FDF753";
    if (theme.currentTheme === "sinceridade") return "#FDF753";
    return "#f8a12e"; // Cor padrão para outros temas
  }};
  color: white;
  border-radius: 30px;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 226px; // Largura exata conforme solicitado
  height: 43px; // Altura exata conforme solicitado
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; // Garante que o texto fique centralizado verticalmente
  letter-spacing: 0.2px; // Espaçamento consistente entre letras
  white-space: nowrap; // Evita quebra de linha
  font-family: "Poppins", sans-serif; // Assegura a fonte consistente

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

// Botão "VER TODOS" atualizado para verde no tema default
const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => {
    if (theme.currentTheme === "default") return "#34AC40";
    if (theme.currentTheme === "esperanca") return "#6BD476";
    if (theme.currentTheme === "sabedoria") return "#6BD476";
    if (theme.currentTheme === "confianca") return "#CBAADE";
    if (theme.currentTheme === "coragem") return "#62B8DB";
    if (theme.currentTheme === "amizade") return "#78D1F1";
    if (theme.currentTheme === "luz") return "#CBAADE";
    if (theme.currentTheme === "amor") return "#CBAADE";
    if (theme.currentTheme === "sinceridade") return "#CBAADE";
    return theme.colors.primary;
  }};
  color: white;
  border-radius: 20px;
  padding: 12px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  width: 166px; // Largura exata conforme solicitado
  height: 43px; // Altura exata conforme solicitado
  letter-spacing: 0.2px; // Espaçamento consistente entre letras
  white-space: nowrap; // Evita quebra de linha
  font-family: "Poppins", sans-serif; // Assegura a fonte consistente

  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserCircle = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  top: 12px;
  left: 12px;
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
  flex: 1;

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

  // Determina a cor do ícone de pesquisa - atualizada para o tema default
  const getSearchIconColor = () => {
    if (currentTheme === "default") return "#34AC40";
    if (currentTheme === "sabedoria") return "#A50000";
    return "#0580BB";
  };

  return (
    <PageContainer>
      <Header>
        <ThemeSwitcher />
      </Header>

      {/* Círculo do Digimon selecionado */}
      <UserCircle>
        {selectedDigimon ? (
          <Image
            src={selectedDigimon.img}
            alt={selectedDigimon.name}
            width={45}
            height={45}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src="/assets/images/desconhecido.png"
            alt="Desconhecido"
            width={45}
            height={45}
            style={{ objectFit: "contain" }}
          />
        )}
      </UserCircle>

      {/* Imagem do personagem - Atualizada para o tema default */}
      <CharacterImage>
        <Image
          src="/assets/images/Personagem.png"
          alt="Digimon Characters"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
          priority
        />
      </CharacterImage>

      <ContentContainer>
        {/* Lado Esquerdo - Textos e busca */}
        <LeftSection>
          {/* Logo - Atualizado para tema default */}
          <LogoContainer>
            {currentTheme !== "default" ? (
              <>
                <MainLogo>
                  <Image
                    src="/assets/images/logo-branco.png"
                    alt="FPR DIGIMON"
                    width={119}
                    height={217}
                    priority
                  />
                </MainLogo>
                <FPRLogo>
                  <Image
                    src="/assets/images/FPR-branco.png"
                    alt="FPR"
                    width={128}
                    height={81}
                    priority
                  />
                </FPRLogo>
                <DigimonLogo>
                  <Image
                    src="/assets/images/DIGIMON-branco.png"
                    alt="DIGIMON"
                    width={197}
                    height={56}
                    priority
                  />
                </DigimonLogo>
              </>
            ) : (
              <>
                <MainLogo>
                  <Image
                    src="/assets/images/logo-laranja.png"
                    alt="FPR DIGIMON"
                    width={119}
                    height={220}
                    priority
                  />
                </MainLogo>
                <FPRLogo>
                  <Image
                    src="/assets/images/FPR-laranja.png"
                    alt="FPR"
                    width={128}
                    height={81}
                    priority
                  />
                </FPRLogo>
                <DigimonLogo>
                  <Image
                    src="/assets/images/DIGIMON-verde.png"
                    alt="DIGIMON"
                    width={197}
                    height={56}
                    priority
                  />
                </DigimonLogo>
              </>
            )}
          </LogoContainer>

          {/* Bem vindo */}
          <WelcomeText>Bem vindo ao FPR DIGIMON</WelcomeText>

          {/* Título Principal */}
          <MainTitle>
            Escolha o <br />
            seu Digimon
          </MainTitle>

          {/* Texto Descritivo */}
          <DescriptionText>
            O Universo Digimon é um mundo digital onde vivem os Digimons,
            criaturas virtuais que formam laços com parceiros humanos. Juntos,
            eles enfrentam desafios e vilões para proteger tanto o Mundo Digital
            quanto o mundo real.
          </DescriptionText>

          {/* Barra de Pesquisa (sem o label PESQUISAR) */}
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
                <Search
                  size={26}
                  color={getSearchIconColor()}
                  strokeWidth={2}
                />
              </SearchButton>
            </SearchInputContainer>
          </SearchForm>

          {/* Botões com tamanhos específicos */}
          <ButtonsContainer>
            <PrimaryButton onClick={handlePesquisa} disabled={isSearching}>
              {isSearching ? "BUSCANDO..." : "ESCOLHA SEU DIGIMON"}
            </PrimaryButton>

            <SecondaryButton href="/all">VER TODOS</SecondaryButton>
          </ButtonsContainer>
        </LeftSection>
      </ContentContainer>

      {/* Modal de Confirmação */}
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
