# Hair Style Memory Quiz - Web Version

A fun memory matching game with three quiz variations:
1. **Women's Hairstyles** - Match popular women's hairstyles
2. **Men's Haircuts** - Match popular men's haircuts
3. **Both Styles** - Mix of both women's and men's hairstyles

## Live Demo

The app is deployed on Vercel and available at your deployment URL.

## Features

- 3 different quiz categories
- 16 cards (8 pairs) per game
- Move counter and match tracking
- Responsive design
- Beautiful gradient UI (purple to pink)
- Smooth card flip animations
- Win detection with play again option

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `clarencejohnson126/quiz`
4. Vercel will auto-detect Next.js and configure settings
5. Click "Deploy"

## Project Structure

```
├── app/
│   ├── page.tsx           # Home page with quiz selection
│   ├── women/page.tsx     # Women's hairstyles quiz
│   ├── men/page.tsx       # Men's haircuts quiz
│   ├── both/page.tsx      # Combined quiz
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── MemoryGame.tsx     # Main game component
├── lib/
│   └── hairstyleData.ts   # Hairstyle data for all quizzes
└── package.json           # Dependencies and scripts
```

## How to Play

1. Choose a quiz category from the home page
2. Click on any card to flip it and reveal a hairstyle
3. Click on another card to find its match
4. If the cards match, they stay flipped
5. If they don't match, they flip back after 1 second
6. Match all 8 pairs to win!
7. Try to complete the game in the fewest moves possible

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **React Hooks** - State management
- **Vercel** - Deployment platform

## Customization

### Adding More Hairstyles

Edit `lib/hairstyleData.ts` to add more hairstyles:

```typescript
export const womenHairstyles: Hairstyle[] = [
  { id: 'w17', name: 'New Style', imageUrl: 'URL_HERE', gender: 'women' },
  // Add more...
];
```

### Changing Colors

Edit the gradient colors in:
- `app/page.tsx` - Home page gradient
- `components/MemoryGame.tsx` - Game gradient

Current theme uses:
- Purple: `#8B5CF6` / `purple-500`
- Pink: `#EC4899` / `pink-500`

### Adjusting Card Count

Edit `components/MemoryGame.tsx` line 30 to change the number of pairs:

```typescript
.slice(0, 8); // Change 8 to desired number of pairs
```

## License

Part of the Hair Quiz project.
