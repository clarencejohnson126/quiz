# Complete Hair Memory Quiz Code - 16 Pairs (32 Cards)

## Project Structure

```
hair-quiz/
├── app/
│   ├── page.tsx              # Home page with quiz selection
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── women/page.tsx        # Women's quiz
│   ├── men/page.tsx          # Men's quiz
│   ├── both/page.tsx         # Both genders quiz
│   └── x-memory/page.tsx     # X Memory variant
├── components/
│   └── MemoryGame.tsx        # Main game component
├── lib/
│   └── hairstyleData.ts      # Hairstyle data
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 1. package.json

\`\`\`json
{
  "name": "hair-quiz",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.10.6",
    "@types/react": "18.2.46",
    "@types/react-dom": "18.2.18",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.32",
    "tailwindcss": "3.4.0",
    "typescript": "5.3.3"
  }
}
\`\`\`

## 2. tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

## 3. tailwind.config.js

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## 4. postcss.config.js

\`\`\`javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
\`\`\`

## 5. next.config.js

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
\`\`\`

## 6. app/globals.css

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.perspective {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
\`\`\`

## 7. app/layout.tsx

\`\`\`typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hair Style Memory Quiz',
  description: 'Test your memory with hairstyle matching games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## 8. lib/hairstyleData.ts

\`\`\`typescript
export interface Hairstyle {
  id: string;
  name: string;
  imageUrl: string;
  gender: 'women' | 'men';
}

export const womenHairstyles: Hairstyle[] = [
  { id: 'w1', name: 'Long Layers', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w2', name: 'Bob Cut', imageUrl: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w3', name: 'Pixie Cut', imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w4', name: 'Beach Waves', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w5', name: 'Balayage', imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w6', name: 'Shag Cut', imageUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w7', name: 'Lob (Long Bob)', imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w8', name: 'Curtain Bangs', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w9', name: 'Updo', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w10', name: 'French Braid', imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w11', name: 'High Ponytail', imageUrl: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w12', name: 'Messy Bun', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w13', name: 'Sleek Straight', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w14', name: 'Curly Bob', imageUrl: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w15', name: 'Butterfly Cut', imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w16', name: 'Wolf Cut', imageUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop', gender: 'women' },
];

export const menHairstyles: Hairstyle[] = [
  { id: 'm1', name: 'Classic Fade', imageUrl: 'https://images.unsplash.com/photo-1560575801-c45c98fd5f7d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm2', name: 'Buzz Cut', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm3', name: 'Undercut', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm4', name: 'Pompadour', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm5', name: 'Quiff', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm6', name: 'Slick Back', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm7', name: 'Crew Cut', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm8', name: 'Mohawk', imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm9', name: 'French Crop', imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm10', name: 'Textured Crop', imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm11', name: 'Side Part', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm12', name: 'Faux Hawk', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm13', name: 'High Fade', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&sat=-100', gender: 'men' },
  { id: 'm14', name: 'Low Fade', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm15', name: 'Taper Fade', imageUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm16', name: 'Curly Top', imageUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop', gender: 'men' },
];

export const allHairstyles: Hairstyle[] = [...womenHairstyles, ...menHairstyles];
\`\`\`

## 9. components/MemoryGame.tsx

\`\`\`typescript
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
        id: \`\${hairstyle.id}-1\`,
        hairstyleId: hairstyle.id,
        hairstyle,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: \`\${hairstyle.id}-2\`,
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
                className={\`aspect-square cursor-pointer \${isChecking ? 'pointer-events-none' : ''}\`}
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
                    <div className={\`absolute inset-0 bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center \${
                      card.isMatched ? 'opacity-50' : ''
                    }\`}>
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
\`\`\`

## 10. app/page.tsx

\`\`\`typescript
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Hair Style Memory Quiz
          </h1>
          <p className="text-2xl text-white/90">
            Choose your quiz category
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/women">
            <div className="bg-white rounded-xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4 text-center">👩</div>
              <h2 className="text-2xl font-bold text-purple-600 text-center mb-2">
                Women's Hairstyles
              </h2>
              <p className="text-gray-600 text-center">
                Test your memory with popular women's hairstyles
              </p>
            </div>
          </Link>

          <Link href="/men">
            <div className="bg-white rounded-xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4 text-center">👨</div>
              <h2 className="text-2xl font-bold text-purple-600 text-center mb-2">
                Men's Haircuts
              </h2>
              <p className="text-gray-600 text-center">
                Test your memory with popular men's haircuts
              </p>
            </div>
          </Link>

          <Link href="/both">
            <div className="bg-white rounded-xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4 text-center">👥</div>
              <h2 className="text-2xl font-bold text-purple-600 text-center mb-2">
                Both Styles
              </h2>
              <p className="text-gray-600 text-center">
                Mix of women's and men's hairstyles
              </p>
            </div>
          </Link>

          <Link href="/x-memory">
            <div className="bg-gradient-to-br from-pink-400 to-orange-300 rounded-xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer">
              <div className="text-6xl mb-4 text-center">✂️</div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                X Memory
              </h2>
              <p className="text-white/90 text-center">
                Premium memory game with timer & 16 pairs
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/20 backdrop-blur rounded-lg p-6 inline-block">
            <h3 className="text-white font-semibold text-lg mb-2">How to Play</h3>
            <p className="text-white/90">
              Click cards to flip them and find matching pairs. Complete all 16 pairs to win!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## 11. app/women/page.tsx

\`\`\`typescript
import MemoryGame from '@/components/MemoryGame';
import { womenHairstyles } from '@/lib/hairstyleData';
import Link from 'next/link';

export default function WomenQuiz() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <MemoryGame
        hairstyles={womenHairstyles}
        title="Women's Hairstyles Memory Quiz 👩"
      />
    </div>
  );
}
\`\`\`

## 12. app/men/page.tsx

\`\`\`typescript
import MemoryGame from '@/components/MemoryGame';
import { menHairstyles } from '@/lib/hairstyleData';
import Link from 'next/link';

export default function MenQuiz() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <MemoryGame
        hairstyles={menHairstyles}
        title="Men's Haircuts Memory Quiz 👨"
      />
    </div>
  );
}
\`\`\`

## 13. app/both/page.tsx

\`\`\`typescript
import MemoryGame from '@/components/MemoryGame';
import { allHairstyles } from '@/lib/hairstyleData';
import Link from 'next/link';

export default function BothQuiz() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          ← Back to Home
        </Link>
      </div>
      <MemoryGame
        hairstyles={allHairstyles}
        title="All Hairstyles Memory Quiz 👥"
      />
    </div>
  );
}
\`\`\`

## Installation & Running

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Key Features

- **16 pairs (32 cards)** in 8-column grid on desktop, 4-column on mobile
- **3-second viewing time** for non-matching pairs
- **Simple conditional rendering** (no complex 3D animations)
- **Real Unsplash images** with error handling
- **Responsive design** for all devices
- **Move counter** and match tracking
- **Win detection** with play again option
- **Click prevention** during checking period
