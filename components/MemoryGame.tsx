'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    initializeGame();
  }, [hairstyles]);

  const initializeGame = () => {
    // Take 8 random hairstyles and create pairs
    const selectedHairstyles = [...hairstyles]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const cardPairs: Card[] = [];
    selectedHairstyles.forEach((hairstyle, index) => {
      const pairId = `pair-${index}`;
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
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Update cards to flip the clicked card
    setCards(prevCards => {
      const newCards = [...prevCards];
      newCards[index].isFlipped = true;
      return newCards;
    });

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      setTimeout(() => {
        setCards(currentCards => {
          const firstCard = currentCards[firstIndex];
          const secondCard = currentCards[secondIndex];

          if (firstCard.hairstyleId === secondCard.hairstyleId) {
            // Match found
            const matchedCards = [...currentCards];
            matchedCards[firstIndex].isMatched = true;
            matchedCards[secondIndex].isMatched = true;
            setMatchedPairs(prev => {
              const newMatched = prev + 1;
              if (newMatched === 8) {
                setIsGameWon(true);
              }
              return newMatched;
            });
            setFlippedIndices([]);
            return matchedCards;
          } else {
            // No match - flip back after showing for 3 seconds
            const resetCards = [...currentCards];
            resetCards[firstIndex].isFlipped = false;
            resetCards[secondIndex].isFlipped = false;
            setFlippedIndices([]);
            return resetCards;
          }
        });
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
            <div>Matched: {matchedPairs}/8</div>
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

        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className="aspect-square cursor-pointer perspective"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                }`}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg flex items-center justify-center backface-hidden"
                >
                  <div className="text-white text-6xl">💇</div>
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center backface-hidden rotate-y-180 ${
                    card.isMatched ? 'opacity-50' : ''
                  }`}
                >
                  <img
                    src={card.hairstyle.imageUrl}
                    alt={card.hairstyle.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold text-center text-gray-800">
                    {card.hairstyle.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
