// src/services/api.ts
import { Digimon } from "../types/types";

// Use a variável de ambiente ou fallback para a URL base
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://digimon-api.vercel.app/api/digimon";

/**
 * Busca todos os Digimon disponíveis na API
 */
export const fetchAllDigimon = async (): Promise<Digimon[]> => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar todos os Digimon:", error);
    throw error;
  }
};

/**
 * Busca um Digimon específico pelo nome
 * @param name Nome do Digimon a ser buscado
 */
export const buscarDigimonPorNome = async (
  name: string
): Promise<Digimon[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar Digimon por nome (${name}):`, error);
    throw error;
  }
};

/**
 * Busca Digimons por nível
 * @param level Nível dos Digimon a serem buscados
 */
export const buscarDigimonPorNivel = async (
  level: string
): Promise<Digimon[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/level/${level}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar Digimon por nível (${level}):`, error);
    throw error;
  }
};
