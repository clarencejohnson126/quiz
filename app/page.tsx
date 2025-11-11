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

        <div className="grid md:grid-cols-3 gap-6">
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
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/20 backdrop-blur rounded-lg p-6 inline-block">
            <h3 className="text-white font-semibold text-lg mb-2">How to Play</h3>
            <p className="text-white/90">
              Click cards to flip them and find matching pairs. Complete all 8 pairs to win!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
