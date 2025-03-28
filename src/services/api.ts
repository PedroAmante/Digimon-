import { Digimon } from "../types/types";

const API_BASE_URL = "https://digimon-api.vercel.app/api/digimon";

/**
 *
 * @param {string} nome
 * @returns {Promise<Digimon[]>}
 */
export const buscarDigimonPorNome = async (
  nome: string
): Promise<Digimon[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${nome}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar Digimon: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

/**
 
 * @returns {Promise<Digimon[]>} 
 */
export const buscarTodosDigimons = async (): Promise<Digimon[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar todos os Digimons: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

/**
 * Busca Digimons por nível
 * @param {string} level
 * @returns {Promise<Digimon[]>}
 */
export const buscarDigimonsPorNivel = async (
  level: string
): Promise<Digimon[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/level/${level}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar Digimons por nível: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
