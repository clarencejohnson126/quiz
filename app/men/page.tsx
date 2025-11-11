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
