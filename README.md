# Memory Puzzle Module for BarberBuddy

A production-ready Memory Puzzle game module with three distinct game modes, dynamic hairstyle card assets, and vibrant gradient UI.

## Features

- **Three Game Modes:**
  - **Classic Mode**: Standard match-2 memory flip game with no time limit
  - **Timed Mode**: Race against the clock to match all pairs
  - **Endless Mode**: Cards keep shuffling in new pairs, score-based challenge

- **Flexible Difficulty**: Support for 4, 6, 8, 12, or 16 cards
- **Dynamic Assets**: Pulls hairstyle images from database (ready for Supabase integration)
- **Smooth Animations**: Card flip animations using React Native Animated API
- **Vibrant UI**: BarberBuddy purple/pink gradient theme
- **Modular Architecture**: Clean separation of concerns with reusable hooks
- **Future-Ready**: Placeholder logic for daily challenges and leaderboards

## Installation

### Required Dependencies

Install the required Expo package:

```bash
cd /path/to/barberbuddy-native
npx expo install expo-linear-gradient
```

### Optional (for enhanced animations)

If you want to use `react-native-reanimated` instead of the built-in Animated API:

```bash
npx expo install react-native-reanimated
```

Then update `MemoryGameScreen.tsx` to use Reanimated instead of Animated.

## File Structure

```
Quiz memory/
├── types.ts                 # TypeScript type definitions
├── hairstyleLoader.ts       # Mock hairstyle loader (ready for Supabase)
├── useMemoryGame.ts         # Core game logic hook
├── MemoryGameScreen.tsx     # Main game screen component
├── MemoryGamesScreen.tsx    # Mode selection landing screen
├── index.ts                 # Central export file
└── README.md               # This file
```

## Usage

### Basic Integration

```typescript
import { MemoryGamesScreen } from './Quiz memory';

// In your navigation stack
<Stack.Screen 
  name="MemoryGames" 
  component={MemoryGamesScreen} 
/>
```

### Standalone Game Screen

```typescript
import { MemoryGameScreen } from './Quiz memory';
import { GameConfig } from './Quiz memory/types';

const config: GameConfig = {
  mode: 'classic',
  cardCount: 8,
  difficulty: 'hard',
};

<MemoryGameScreen 
  config={config} 
  onBack={() => navigation.goBack()} 
/>
```

### Using the Hook Directly

```typescript
import { useMemoryGame } from './Quiz memory/useMemoryGame';
import { GameConfig } from './Quiz memory/types';

const config: GameConfig = {
  mode: 'timed',
  cardCount: 12,
  difficulty: 'expert',
};

const { gameState, handleCardFlip, resetGame } = useMemoryGame(config);
```

## Supabase Integration

To integrate with Supabase, update `hairstyleLoader.ts`:

1. Uncomment the Supabase example code
2. Add your Supabase credentials
3. Update the `loadHairstyles` function to query your `hairstyles` table
4. Ensure your table has columns: `id`, `name`, `image_url`, `category`, `tags`

Example table structure:
```sql
CREATE TABLE hairstyles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  tags TEXT[]
);
```

## Customization

### Theme Colors

Update gradient colors in:
- `MemoryGameScreen.tsx` - `styles.container` LinearGradient
- `MemoryGamesScreen.tsx` - `styles.container` LinearGradient

Current theme: Purple (`#8B5CF6`) to Pink (`#EC4899`)

### Card Counts

Modify `cardCounts` array in `MemoryGamesScreen.tsx` to add/remove difficulty levels.

### Time Limits

Adjust `getTimeLimit` function in `useMemoryGame.ts` to change time limits for timed mode.

## Future Integrations

### Daily Challenge

The module includes placeholder sections for daily challenge integration:

```typescript
// In MemoryGamesScreen.tsx
<DailyChallengeComponent 
  challenge={dailyChallenge}
  onStart={handleStartDailyChallenge}
/>
```

### Leaderboard

Leaderboard integration placeholder:

```typescript
// In MemoryGamesScreen.tsx
<LeaderboardComponent 
  entries={leaderboardEntries}
  currentUser={currentUser}
/>
```

## Game Logic Details

### Score Calculation

- Base score: `matchedPairs * 100`
- Move bonus: `(cardCount - moves) * 10`
- Time bonus (timed mode): `timeElapsed * 2`
- Mode multipliers:
  - Classic: 1.0x
  - Timed: 1.2x
  - Endless: 1.5x

### Endless Mode

In endless mode, when all pairs are matched:
1. Game automatically resets after 1.5 seconds
2. New random hairstyles are loaded
3. Cards are reshuffled
4. Score continues accumulating

## Performance Considerations

- Cards are rendered efficiently using `ScrollView` with `flexWrap`
- Images are loaded lazily (consider adding caching for production)
- Animations use native driver for smooth 60fps performance
- Game state updates are optimized with `useCallback` and `useMemo`

## Testing

Test each game mode:
1. Classic Mode: Verify pairs match correctly, no timer
2. Timed Mode: Verify timer counts down, game ends on timeout
3. Endless Mode: Verify game resets automatically after matching all pairs

Test different card counts:
- 4 cards (easy)
- 6 cards (medium)
- 8 cards (hard)
- 12 cards (expert)
- 16 cards (master)

## Production Checklist

- [ ] Replace mock hairstyle loader with Supabase integration
- [ ] Add image caching (consider `expo-image` or `react-native-fast-image`)
- [ ] Add error handling for failed image loads
- [ ] Implement daily challenge logic
- [ ] Implement leaderboard integration
- [ ] Add analytics tracking
- [ ] Add sound effects (optional)
- [ ] Test on both iOS and Android devices
- [ ] Optimize images (compress, use appropriate formats)
- [ ] Add loading states for hairstyle fetching

## License

Part of the BarberBuddy app.

