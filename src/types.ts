export interface Player {
  id: string;
  name: string;
  shots: number;
}

export interface Question {
  id: number;
  text: string;
  category: 'general' | 'vergonzosa' | 'picante' | 'yo_nunca' | 'extra';
  isChallenge?: boolean;
}

export type GameMode = 'questions' | 'yo_nunca';
export type GamePhase = 'mode_selection' | 'setup' | 'playing';