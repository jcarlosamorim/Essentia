export enum AppScreen {
  UPLOAD = 0,
  DASHBOARD = 1,
  STEP_START = 2,
  // Steps 2-16 are handled dynamically
  OUTPUTS = 17
}

export interface StepTeachData {
  titulo: string;
  explicacao: string;
  comoInterpretar: string[];
  visualAid?: 'disc-cards' | 'performance-map' | 'map-overlay' | 'smart-diagram' | 'pie-chart' | 'tower-chart' | 'comparison-table' | 'anchors-list' | 'none'; 
}

export interface StepFazData {
  dado: string;
  valor: string; // This can be a placeholder keyword if dynamic
  status: 'neutro' | 'alerta' | 'positivo';
  fale: string;
  pergunte: string;
  atencao?: string;
}

export interface StepData {
  id: number;
  fase: string; // I, II, III, IV
  titulo: string;
  ensina: StepTeachData;
  faz: StepFazData;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

// --- Psychometric Data Structures ---

export interface DiscIndices {
  aem: number; // Atividade Externa Média
  apf: number; // Atividade Pessoal Física
  ips: number; // Índice de Pressão Sobrenatural
  ida: number; // Índice de Dispersão de Atenção
  ipm: number; // Índice de Potencial de Mudança
}

export interface DiscProfile {
  factors: {
    d: number;
    i: number;
    s: number;
    c: number;
  };
  dominantProfile: string; // e.g., "Executor-Comunicador"
  indices: DiscIndices;
  strengths: string[];
  limitations: string[];
  pieChart: {
    label: string;
    value: number;
  }[];
  towerChart: {
    natural: { d: number; i: number; s: number; c: number };
    adapted: { d: number; i: number; s: number; c: number };
  };
}

export interface AnchorItem {
  name: string;
  score: number;
  rank: number;
}

export interface StrengthItem {
  name: string;
  score: number;
  rank: number;
}

export interface ValueLanguageItem {
  language: string;
  scoreWork: number;
  scoreHome: number;
}

export interface IdentityProfile {
  disc: DiscProfile;
  anchors: AnchorItem[];
  strengths: {
    all: StrengthItem[];
    top5: StrengthItem[];
  };
  values: ValueLanguageItem[];
  summary: string;
}

export interface UserContext {
  name: string;
  role: string;
  uploadedFiles: UploadedFile[];
  profileData?: IdentityProfile;
}