'use client';

import { useState, useEffect, useRef } from 'react';
import { Hairstyle } from '@/lib/hairstyleData';

interface Card {
  id: string;
  hairstyleId: string;
  hairstyle: Hairstyle;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  hairstyles: Hairstyle[];
  title: string;
}

export default function MemoryGame({ hairstyles, title }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeGame();
    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [hairstyles]);

  const initializeGame = () => {
    // Take 16 random hairstyles and create pairs
    const selectedHairstyles = [...hairstyles]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16);

    const cardPairs: Card[] = [];
    selectedHairstyles.forEach((hairstyle) => {
      cardPairs.push({
        id: `${hairstyle.id}-1`,
        hairstyleId: hairstyle.id,
        hairstyle,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `${hairstyle.id}-2`,
        hairstyleId: hairstyle.id,
        hairstyle,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameWon(false);
    setIsChecking(false);
  };

  const handleCardClick = (index: number) => {
    // Prevent clicking if already checking, card is already flipped, or card is matched
    if (
      isChecking ||
      flippedIndices.includes(index) ||
      cards[index].isMatched ||
      flippedIndices.length >= 2
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // If this is the second card, check for match after delay
    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);

      checkTimeoutRef.current = setTimeout(() => {
        setCards(prevCards => {
          const [firstIdx, secondIdx] = newFlippedIndices;
          const firstCard = prevCards[firstIdx];
          const secondCard = prevCards[secondIdx];
          const newCards = [...prevCards];

          if (firstCard.hairstyleId === secondCard.hairstyleId) {
            // Match found!
            newCards[firstIdx].isMatched = true;
            newCards[secondIdx].isMatched = true;

            setMatchedPairs(prev => {
              const newCount = prev + 1;
              if (newCount === 16) {
                setIsGameWon(true);
              }
              return newCount;
            });
          } else {
            // No match - flip back
            newCards[firstIdx].isFlipped = false;
            newCards[secondIdx].isFlipped = false;
          }

          return newCards;
        });

        setFlippedIndices([]);
        setIsChecking(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <div className="flex justify-center gap-8 text-white text-xl">
            <div>Moves: {moves}</div>
            <div>Matched: {matchedPairs}/16</div>
          </div>
        </div>

        {isGameWon && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-lg p-8 inline-block">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                You won in {moves} moves!
              </p>
              <button
                onClick={initializeGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            // Card is visible if: matched, flipped permanently, or currently being checked
            const isFlipped = card.isMatched || card.isFlipped || flippedIndices.includes(index);
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square cursor-pointer ${isChecking ? 'pointer-events-none' : ''}`}
              >
                <div className="relative w-full h-full">
                  {/* Show either front or back based on flip state */}
                  {!isFlipped ? (
                    /* Card Back */
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-white text-6xl">💇</div>
                    </div>
                  ) : (
                    /* Card Front */
                    <div className={`absolute inset-0 bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center ${
                      card.isMatched ? 'opacity-50' : ''
                    }`}>
                      <img
                        src={card.hairstyle.imageUrl}
                        alt={card.hairstyle.name}
                        className="w-full h-24 object-cover rounded mb-2"
                        onError={(e) => {
                          console.error('Image failed to load:', card.hairstyle.imageUrl);
                          e.currentTarget.src = 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Hair';
                        }}
                      />
                      <p className="text-xs font-semibold text-center text-gray-800">
                        {card.hairstyle.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={initializeGame}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
