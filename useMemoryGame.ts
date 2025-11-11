/**
 * useMemoryGame Hook
 * 
 * Core game logic hook for Memory Puzzle game.
 * Handles all game modes: Classic, Timed, and Endless.
 * 
 * Features:
 * - Card flipping and matching logic
 * - Score calculation
 * - Timer management (for timed mode)
 * - Endless mode shuffling
 * - Game state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameMode, CardCount, Card, GameState, GameConfig, GameStats, Hairstyle } from './types';
import { getRandomHairstyles } from './hairstyleLoader';

interface UseMemoryGameReturn {
  gameState: GameState;
  handleCardFlip: (index: number) => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  getGameStats: () => GameStats | null;
}

/**
 * Creates initial game cards from hairstyles
 */
function createCards(hairstyles: Hairstyle[]): Card[] {
  const cards: Card[] = [];
  
  // Create pairs
  hairstyles.forEach((hairstyle, index) => {
    const pairId = `pair-${index}`;
    
    // Create two cards with same hairstyle
    cards.push({
      id: `card-${index}-1`,
      hairstyleId: hairstyle.id,
      hairstyle,
      isFlipped: false,
      isMatched: false,
      pairId,
    });
    
    cards.push({
      id: `card-${index}-2`,
      hairstyleId: hairstyle.id,
      hairstyle,
      isFlipped: false,
      isMatched: false,
      pairId,
    });
  });
  
  // Shuffle cards
  return shuffleArray(cards);
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Calculates score based on game mode and performance
 */
function calculateScore(
  matchedPairs: number,
  moves: number,
  timeElapsed: number,
  mode: GameMode,
  cardCount: CardCount
): number {
  const baseScore = matchedPairs * 100;
  const moveBonus = Math.max(0, (cardCount - moves) * 10);
  const timeBonus = mode === 'timed' ? Math.max(0, timeElapsed * 2) : 0;
  const modeMultiplier = mode === 'endless' ? 1.5 : mode === 'timed' ? 1.2 : 1.0;
  
  return Math.floor((baseScore + moveBonus + timeBonus) * modeMultiplier);
}

/**
 * Gets time limit based on card count and difficulty
 */
function getTimeLimit(cardCount: CardCount): number {
  // Time limits in seconds
  const limits: Record<CardCount, number> = {
    4: 60,
    6: 90,
    8: 120,
    12: 180,
    16: 240,
  };
  return limits[cardCount];
}

export function useMemoryGame(config: GameConfig): UseMemoryGameReturn {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    score: 0,
    timeRemaining: config.mode === 'timed' ? getTimeLimit(config.cardCount) : undefined,
    isGameOver: false,
    isGameWon: false,
    isPaused: false,
  });
  
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Initialize game with hairstyles
   */
  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);
      try {
        // Get half the card count (since we need pairs)
        const hairstyleCount = config.cardCount / 2;
        const loadedHairstyles = await getRandomHairstyles(hairstyleCount);
        setHairstyles(loadedHairstyles);
        
        const cards = createCards(loadedHairstyles);
        setGameState(prev => ({
          ...prev,
          cards,
          timeRemaining: config.mode === 'timed' ? getTimeLimit(config.cardCount) : undefined,
        }));
      } catch (error) {
        console.error('Error loading hairstyles:', error);
      } finally {
        setIsLoading(false);
        setStartTime(Date.now());
      }
    };
    
    initializeGame();
  }, [config.cardCount, config.mode]);

  /**
   * Timer logic for timed mode
   */
  useEffect(() => {
    if (config.mode !== 'timed' || gameState.isPaused || gameState.isGameOver || isLoading) {
      return;
    }
    
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining === undefined) return prev;
        
        const newTime = prev.timeRemaining - 1;
        
        if (newTime <= 0) {
          // Time's up - game over
          return {
            ...prev,
            timeRemaining: 0,
            isGameOver: true,
            isGameWon: false,
          };
        }
        
        return {
          ...prev,
          timeRemaining: newTime,
        };
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [config.mode, gameState.isPaused, gameState.isGameOver, isLoading]);

  /**
   * Time elapsed tracker for score calculation
   */
  useEffect(() => {
    if (gameState.isPaused || gameState.isGameOver || isLoading) {
      return;
    }
    
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState.isPaused, gameState.isGameOver, isLoading, startTime]);

  /**
   * Handle card flip
   */
  const handleCardFlip = useCallback((index: number) => {
    // Don't allow flipping if game is over, paused, or card is already matched/flipped
    if (
      gameState.isGameOver ||
      gameState.isPaused ||
      gameState.cards[index].isFlipped ||
      gameState.cards[index].isMatched ||
      gameState.flippedCards.length >= 2
    ) {
      return;
    }
    
    setGameState(prev => {
      const newCards = [...prev.cards];
      const newFlippedCards = [...prev.flippedCards];
      
      // Flip the card
      newCards[index] = { ...newCards[index], isFlipped: true };
      newFlippedCards.push(index);
      
      // If two cards are flipped, check for match
      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;
        const firstCard = newCards[firstIndex];
        const secondCard = newCards[secondIndex];
        
        // Check if cards match
        if (firstCard.pairId === secondCard.pairId) {
          // Match found!
          newCards[firstIndex] = { ...firstCard, isMatched: true };
          newCards[secondIndex] = { ...secondCard, isMatched: true };
          
          const newMatchedPairs = prev.matchedPairs + 1;
          const newMoves = prev.moves + 1;
          const totalPairs = config.cardCount / 2;
          
          // Check if game is won
          const isGameWon = newMatchedPairs === totalPairs;
          const isGameOver = isGameWon || (config.mode === 'timed' && prev.timeRemaining === 0);
          
          // Calculate score
          const newScore = calculateScore(
            newMatchedPairs,
            newMoves,
            timeElapsed,
            config.mode,
            config.cardCount
          );
          
          // Handle endless mode - shuffle new pairs when all matched
          // Note: Reset will be handled after state update completes
          if (config.mode === 'endless' && isGameWon) {
            // Schedule reset for next round in endless mode
            setTimeout(() => {
              resetGame();
            }, 1500);
          }
          
          return {
            ...prev,
            cards: newCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            score: newScore,
            isGameWon,
            isGameOver,
          };
        } else {
          // No match - flip cards back after delay
          flipTimeoutRef.current = setTimeout(() => {
            setGameState(current => {
              const updatedCards = [...current.cards];
              updatedCards[firstIndex] = { ...updatedCards[firstIndex], isFlipped: false };
              updatedCards[secondIndex] = { ...updatedCards[secondIndex], isFlipped: false };
              
              return {
                ...current,
                cards: updatedCards,
                flippedCards: [],
                moves: current.moves + 1,
              };
            });
          }, 1000);
          
          return {
            ...prev,
            cards: newCards,
            flippedCards: newFlippedCards,
          };
        }
      }
      
      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
      };
    });
  }, [gameState, config.mode, config.cardCount, timeElapsed]);

  /**
   * Reset game
   */
  const resetGame = useCallback(async () => {
    // Clear any pending timeouts
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    
    setIsLoading(true);
    try {
      const hairstyleCount = config.cardCount / 2;
      const loadedHairstyles = await getRandomHairstyles(hairstyleCount);
      setHairstyles(loadedHairstyles);
      
      const cards = createCards(loadedHairstyles);
      setStartTime(Date.now());
      setTimeElapsed(0);
      
      setGameState({
        cards,
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        score: 0,
        timeRemaining: config.mode === 'timed' ? getTimeLimit(config.cardCount) : undefined,
        isGameOver: false,
        isGameWon: false,
        isPaused: false,
      });
    } catch (error) {
      console.error('Error resetting game:', error);
    } finally {
      setIsLoading(false);
    }
  }, [config.cardCount, config.mode]);

  /**
   * Pause game
   */
  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  /**
   * Resume game
   */
  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
    setStartTime(Date.now() - timeElapsed * 1000);
  }, [timeElapsed]);

  /**
   * Get final game stats
   */
  const getGameStats = useCallback((): GameStats | null => {
    if (!gameState.isGameOver) {
      return null;
    }
    
    const totalPairs = config.cardCount / 2;
    const accuracy = gameState.moves > 0 
      ? (gameState.matchedPairs / gameState.moves) * 100 
      : 0;
    
    return {
      finalScore: gameState.score,
      moves: gameState.moves,
      timeElapsed,
      matchedPairs: gameState.matchedPairs,
      accuracy: Math.round(accuracy * 100) / 100,
    };
  }, [gameState, timeElapsed, config.cardCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  return {
    gameState,
    handleCardFlip,
    resetGame,
    pauseGame,
    resumeGame,
    getGameStats,
  };
}

