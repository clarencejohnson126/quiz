'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const womenHair = [
  'https://images.unsplash.com/photo-1602293589930-0fd1ff6b809c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610878722345-79c5eaf7a0a2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1e1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1620331317521-0d58d6c24f7d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1635342975951-44d5c2d9c9f9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610878180933-1234567890ab?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600948836101-f9f6ab0b5b8e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1620332370402-5d5b5e4b5d6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580618672591-e8d2c5e6aa3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611605698323-b1e73cbd5f5b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621786030495-2e6d8e5f7c8d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595475887576-4437b7c6d3c7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1608248543803-ba1f8d1af7b0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621784562815-0f2d7c4e7d8f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611601322332-b8d0d7b4d8e8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1602293457228-6a3c67a9b5d7?w=400&h=400&fit=crop'
];

const menHair = [
  'https://images.unsplash.com/photo-1599351429277-22b0a1d7f2c1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503951910647-1b4b3f3e8d5a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-2d6c3a2d2e6f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1617127365659-d96db1f814c6?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595476108010-b4d1ff6b809c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-2d6c3a2d2e6f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1617118432536-8d88f9b5e8d7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1592646498724-2e8f8d8b8c8d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621786030485-2e6d8e5f7c8d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1602293589930-0fd1ff6b809c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610878722345-79c5eaf7a0a2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595475887576-4437b7c6d3c7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1620332370402-5d5b5e4b5d6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600948836101-f9f6ab0b5b8e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580618672591-e8d2c5e6aa3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611605698323-b1e73cbd5f5b?w=400&h=400&fit=crop'
];

interface Card {
  id: number;
  img: string;
  uniqueId: string;
}

type GameMode = 'women' | 'men' | 'both';

export default function XMemoryPage() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (gameMode && !gameOver) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameMode, gameOver]);

  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setGameOver(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [matchedCards, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(m => m + 1);
      setTimeout(checkMatch, 800);
    }
  }, [flippedCards]);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);

    let imageSet: string[] = [];
    if (mode === 'women') imageSet = womenHair;
    else if (mode === 'men') imageSet = menHair;
    else if (mode === 'both') imageSet = [...womenHair.slice(0, 8), ...menHair.slice(0, 8)];

    const pairs = imageSet.map((img, i) => ({ id: i, img }));
    const deck = [...pairs, ...pairs].map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`,
    }));

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
  };

  const flipCard = (uniqueId: string) => {
    if (
      flippedCards.includes(uniqueId) ||
      matchedCards.includes(uniqueId) ||
      flippedCards.length >= 2
    ) {
      return;
    }
    setFlippedCards(prev => [...prev, uniqueId]);
  };

  const checkMatch = () => {
    const [first, second] = flippedCards;
    const card1 = cards.find(c => c.uniqueId === first);
    const card2 = cards.find(c => c.uniqueId === second);

    if (card1 && card2 && card1.id === card2.id) {
      setMatchedCards(prev => [...prev, first, second]);
    }
    setFlippedCards([]);
  };

  const resetGame = () => {
    setGameMode(null);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <>
      <style jsx global>{`
        .x-memory-page {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .x-memory-title {
          margin: 20px 0;
          font-size: 2.5rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .x-mode-selection {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .x-mode-btn {
          padding: 12px 24px;
          font-size: 1.1rem;
          background: white;
          border: 2px solid #ff6b6b;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .x-mode-btn:hover {
          background: #ff6b6b;
          color: white;
          transform: translateY(-2px);
        }

        .x-mode-btn.active {
          background: #4ecdc4;
          color: white;
          border-color: #4ecdc4;
        }

        .x-game-container {
          width: 100%;
          max-width: 800px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .x-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .x-stats span {
          background: #f7f7f7;
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .x-board {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (min-width: 600px) {
          .x-board {
            grid-template-columns: repeat(8, 1fr);
          }
        }

        .x-card {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .x-card.flipped,
        .x-card.matched {
          transform: rotateY(180deg);
        }

        .x-card.matched {
          opacity: 0.7;
          cursor: default;
        }

        .x-card-front,
        .x-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .x-card-front {
          background: #4ecdc4;
          transform: rotateY(180deg);
        }

        .x-card-front img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .x-card-back {
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }

        .x-game-over {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          text-align: center;
        }

        .x-game-over h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #ff6b6b;
        }

        .x-game-over p {
          font-size: 1.3rem;
          margin: 10px 0;
          color: #2c3e50;
        }

        .x-restart-btn {
          margin-top: 20px;
          padding: 12px 30px;
          font-size: 1.2rem;
          background: #4ecdc4;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .x-restart-btn:hover {
          background: #ff6b6b;
          transform: scale(1.05);
        }

        .x-back-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          background: white;
          color: #ff6b6b;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: bold;
          text-decoration: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .x-back-btn:hover {
          background: #ff6b6b;
          color: white;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="x-memory-page">
        <Link href="/" className="x-back-btn">
          ← Back to Home
        </Link>

        <h1 className="x-memory-title">X Memory Quiz</h1>

        <div className="x-mode-selection">
          <button
            className={`x-mode-btn ${gameMode === 'women' ? 'active' : ''}`}
            onClick={() => startGame('women')}
          >
            Women's Hair
          </button>
          <button
            className={`x-mode-btn ${gameMode === 'men' ? 'active' : ''}`}
            onClick={() => startGame('men')}
          >
            Men's Hair
          </button>
          <button
            className={`x-mode-btn ${gameMode === 'both' ? 'active' : ''}`}
            onClick={() => startGame('both')}
          >
            Both
          </button>
        </div>

        {gameMode && (
          <div className="x-game-container">
            {!gameOver ? (
              <>
                <div className="x-stats">
                  <span>Time: {formatTime(timer)}</span>
                  <span>Moves: {moves}</span>
                </div>

                <div className="x-board">
                  {cards.map(card => {
                    const isFlipped = flippedCards.includes(card.uniqueId);
                    const isMatched = matchedCards.includes(card.uniqueId);
                    return (
                      <div
                        key={card.uniqueId}
                        className={`x-card ${isFlipped ? 'flipped' : ''} ${
                          isMatched ? 'matched' : ''
                        }`}
                        onClick={() => flipCard(card.uniqueId)}
                      >
                        <div className="x-card-back">✂️</div>
                        <div className="x-card-front">
                          <img
                            src={card.img}
                            alt={`Hairstyle ${card.id + 1}`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="x-game-over">
                <h2>Congratulations! 🎉</h2>
                <p>Time: {formatTime(timer)}</p>
                <p>Moves: {moves}</p>
                <button className="x-restart-btn" onClick={resetGame}>
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
