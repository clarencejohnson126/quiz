/**
 * Memory Puzzle Game - Type Definitions
 * 
 * All type definitions for the Memory Puzzle module
 */

export type GameMode = 'classic' | 'timed' | 'endless';

export type CardCount = 4 | 6 | 8 | 12 | 16;

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Hairstyle {
  id: string;
  name: string;
  imageUrl: string;
  // Additional fields can be added here for future use
  category?: string;
  tags?: string[];
}

export interface Card {
  id: string;
  hairstyleId: string;
  hairstyle: Hairstyle;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string; // Used to identify matching pairs
}

export interface GameState {
  cards: Card[];
  flippedCards: number[]; // Indices of currently flipped cards
  matchedPairs: number;
  moves: number;
  score: number;
  timeRemaining?: number; // For timed mode
  isGameOver: boolean;
  isGameWon: boolean;
  isPaused: boolean;
}

export interface GameConfig {
  mode: GameMode;
  cardCount: CardCount;
  difficulty: Difficulty;
  timeLimit?: number; // Seconds for timed mode
}

export interface GameStats {
  finalScore: number;
  moves: number;
  timeElapsed: number;
  matchedPairs: number;
  accuracy: number; // Percentage of correct matches
}

// Placeholder interfaces for future integrations
export interface DailyChallenge {
  id: string;
  date: string;
  mode: GameMode;
  cardCount: CardCount;
  targetScore: number;
  reward?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  mode: GameMode;
  cardCount: CardCount;
  timestamp: number;
  rank: number;
}

