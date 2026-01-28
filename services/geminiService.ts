import { GoogleGenAI, Type } from "@google/genai";
import { IdentityProfile, DiscProfile, AnchorItem, StrengthItem, ValueLanguageItem } from "../types";

// Simulated delay for "processing"
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * SCHEMA DEFINITION
 * This ensures the LLM returns strictly formatted JSON matching our Types.
 */
const EXTRACT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    disc: {
      type: Type.OBJECT,
      properties: {
        factors: {
            type: Type.OBJECT,
            properties: {
                d: { type: Type.NUMBER },
                i: { type: Type.NUMBER },
                s: { type: Type.NUMBER },
                c: { type: Type.NUMBER }
            }
        },
        dominantProfile: { type: Type.STRING },
        indices: {
             type: Type.OBJECT,
             properties: {
                aem: { type: Type.NUMBER },
                apf: { type: Type.NUMBER },
                ips: { type: Type.NUMBER },
                ida: { type: Type.NUMBER },
                ipm: { type: Type.NUMBER }
             }
        },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
        pieChart: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                }
            }
        },
        towerChart: {
            type: Type.OBJECT,
            properties: {
                natural: { 
                    type: Type.OBJECT, 
                    properties: { d: {type: Type.NUMBER}, i: {type: Type.NUMBER}, s: {type: Type.NUMBER}, c: {type: Type.NUMBER} } 
                },
                adapted: { 
                    type: Type.OBJECT, 
                    properties: { d: {type: Type.NUMBER}, i: {type: Type.NUMBER}, s: {type: Type.NUMBER}, c: {type: Type.NUMBER} } 
                }
            }
        }
      }
    },
    anchors: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                score: { type: Type.NUMBER },
                rank: { type: Type.NUMBER }
            }
        }
    },
    strengths: {
        type: Type.OBJECT,
        properties: {
            all: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        score: { type: Type.NUMBER },
                        rank: { type: Type.NUMBER }
                    }
                }
            }
        }
    },
    values: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                language: { type: Type.STRING },
                scoreWork: { type: Type.NUMBER },
                scoreHome: { type: Type.NUMBER }
            }
        }
    },
    summary: { type: Type.STRING }
  }
};

/**
 * MOCK DATA
 * Used to simulate the extraction process when no API Key is present.
 */
const MOCK_PROFILE: IdentityProfile = {
  disc: {
    factors: { d: 65, i: 20, s: 10, c: 5 },
    dominantProfile: "Executor-Dominante",
    indices: { aem: 15, apf: 8, ips: 55, ida: 12, ipm: 30 },
    strengths: ["Decisão Rápida", "Foco em Resultados", "Visão Global"],
    limitations: ["Impaciência", "Baixa Escuta", "Centralização"],
    pieChart: [
      { label: "Executor", value: 65 },
      { label: "Comunicador", value: 20 },
      { label: "Planejador", value: 10 },
      { label: "Analista", value: 5 }
    ],
    towerChart: {
      natural: { d: 80, i: 40, s: 20, c: 10 },
      adapted: { d: 60, i: 60, s: 20, c: 20 }
    }
  },
  anchors: [
    { rank: 1, name: "Autonomia e Independência", score: 28 },
    { rank: 2, name: "Desafio Puro", score: 24 },
    { rank: 3, name: "Estilo de Vida", score: 20 },
    { rank: 4, name: "Competência Técnica", score: 18 },
    { rank: 5, name: "Dedicação a uma Causa", score: 15 },
    { rank: 6, name: "Segurança e Estabilidade", score: 12 },
    { rank: 7, name: "Gerência Geral", score: 10 },
    { rank: 8, name: "Criatividade Empreendedora", score: 8 }
  ],
  strengths: {
    all: Array(24).fill(0).map((_, i) => ({ rank: i+1, name: `Força ${i+1}`, score: 100 - i*3 })),
    top5: [
      { rank: 1, name: "Liderança", score: 24 },
      { rank: 2, name: "Bravura", score: 23 },
      { rank: 3, name: "Perspectiva", score: 22 },
      { rank: 4, name: "Esperança", score: 20 },
      { rank: 5, name: "Honestidade", score: 19 }
    ]
  },
  values: [
    { language: "Palavras de Afirmação", scoreWork: 10, scoreHome: 8 },
    { language: "Tempo de Qualidade", scoreWork: 4, scoreHome: 10 },
    { language: "Atos de Serviço", scoreWork: 7, scoreHome: 5 },
    { language: "Presentes", scoreWork: 2, scoreHome: 3 },
    { language: "Toque Físico", scoreWork: 0, scoreHome: 9 }
  ],
  summary: "Perfil com alta energia de comando (D) e motivação por autonomia. Apresenta gap significativo na adaptação de comunicação (I)."
};

export const analyzeFiles = async (files: Partial<Record<string, File>>): Promise<IdentityProfile> => {
  console.log("Starting Analysis of Files:", Object.keys(files));
  
  // 1. In a real app, we would convert Files to Base64 here
  // const parts = await Promise.all(Object.values(files).map(file => fileToGenerativePart(file)));

  // 2. We would initialize Gemini
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 3. We would call the model with the Schema
  /*
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro', // Use Pro for complex PDF parsing
    contents: [
      ...parts,
      { text: `Extract the following data from these 4 reports (DISC, Anchors, Strengths, Values). 
               Ensure 'towerChart' captures both Natural and Adapted graphs.
               Ensure 'indices' captures A.E.M., A.P.F., I.P.S., I.D.A., I.P.M. specifically.` }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: EXTRACT_SCHEMA
    }
  });
  return JSON.parse(response.text);
  */

  // 4. Mock Delay and Return
  await delay(3000); 
  
  // Populate top 5 strengths correctly based on 'all'
  const finalMock = { ...MOCK_PROFILE };
  finalMock.strengths.top5 = finalMock.strengths.all.slice(0, 5);
  
  return finalMock;
};

export const generateSpecificPrompt = async (stepId: number, context: string) => {
    return `Gerando pergunta contextualizada para o passo ${stepId}...`;
};