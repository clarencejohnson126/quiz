/**
 * MemoryGamesScreen Component
 * 
 * Landing screen for Memory Puzzle game mode selection.
 * 
 * Features:
 * - Three game mode options (Classic, Timed, Endless)
 * - Difficulty/card count selection
 * - Vibrant gradient UI (BarberBuddy purple/pink theme)
 * - Placeholder sections for Daily Challenge and Leaderboard
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameMode, CardCount, GameConfig } from './types';
import MemoryGameScreen from './MemoryGameScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MemoryGamesScreenProps {
  onBack?: () => void;
}

type ScreenState = 'menu' | 'game';

export default function MemoryGamesScreen({ onBack }: MemoryGamesScreenProps) {
  const [screenState, setScreenState] = useState<ScreenState>('menu');
  const [selectedConfig, setSelectedConfig] = useState<GameConfig | null>(null);

  const gameModes: { mode: GameMode; title: string; description: string; icon: string }[] = [
    {
      mode: 'classic',
      title: 'Classic Mode',
      description: 'Match all pairs at your own pace. No time limit, just focus and memory!',
      icon: '🎯',
    },
    {
      mode: 'timed',
      title: 'Timed Mode',
      description: 'Race against the clock! Match all pairs before time runs out.',
      icon: '⏱️',
    },
    {
      mode: 'endless',
      title: 'Endless Mode',
      description: 'Keep matching! Cards shuffle after each round. Score-based challenge.',
      icon: '♾️',
    },
  ];

  const cardCounts: { count: CardCount; label: string; difficulty: string }[] = [
    { count: 4, label: 'Easy', difficulty: '4 Cards' },
    { count: 6, label: 'Medium', difficulty: '6 Cards' },
    { count: 8, label: 'Hard', difficulty: '8 Cards' },
    { count: 12, label: 'Expert', difficulty: '12 Cards' },
    { count: 16, label: 'Master', difficulty: '16 Cards' },
  ];

  const handleModeSelect = (mode: GameMode) => {
    // For now, default to medium difficulty (8 cards)
    // In a full implementation, you'd show a difficulty selector
    const config: GameConfig = {
      mode,
      cardCount: 8,
      difficulty: 'hard',
    };
    setSelectedConfig(config);
    setScreenState('game');
  };

  const handleDifficultySelect = (mode: GameMode, cardCount: CardCount) => {
    const difficultyMap: Record<CardCount, 'easy' | 'medium' | 'hard' | 'expert'> = {
      4: 'easy',
      6: 'medium',
      8: 'hard',
      12: 'expert',
      16: 'expert',
    };

    const config: GameConfig = {
      mode,
      cardCount,
      difficulty: difficultyMap[cardCount],
    };
    setSelectedConfig(config);
    setScreenState('game');
  };

  const handleBackToMenu = () => {
    setScreenState('menu');
    setSelectedConfig(null);
  };

  // Show game screen if config is selected
  if (screenState === 'game' && selectedConfig) {
    return (
      <MemoryGameScreen
        config={selectedConfig}
        onBack={handleBackToMenu}
      />
    );
  }

  // Main menu screen
  return (
    <LinearGradient
      colors={['#1a0a2e', '#8B5CF6', '#EC4899']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>🧠 Memory Puzzle</Text>
          <Text style={styles.subtitle}>Test your memory with hairstyles!</Text>
        </View>

        {/* Game Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Mode</Text>
          {gameModes.map((mode) => (
            <TouchableOpacity
              key={mode.mode}
              onPress={() => handleModeSelect(mode.mode)}
              style={styles.modeCard}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)']}
                style={styles.modeCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.modeIcon}>{mode.icon}</Text>
                <Text style={styles.modeTitle}>{mode.title}</Text>
                <Text style={styles.modeDescription}>{mode.description}</Text>
                <View style={styles.difficultySelector}>
                  <Text style={styles.difficultyLabel}>Select Difficulty:</Text>
                  <View style={styles.difficultyButtons}>
                    {cardCounts.map(({ count, label, difficulty }) => (
                      <TouchableOpacity
                        key={count}
                        onPress={() => handleDifficultySelect(mode.mode, count)}
                        style={styles.difficultyButton}
                      >
                        <Text style={styles.difficultyButtonText}>{label}</Text>
                        <Text style={styles.difficultyButtonSubtext}>{difficulty}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Challenge Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Challenge</Text>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>🎁</Text>
            <Text style={styles.placeholderTitle}>Coming Soon</Text>
            <Text style={styles.placeholderDescription}>
              Complete daily challenges to earn rewards and climb the leaderboard!
            </Text>
            {/* Placeholder for future integration */}
            {/* 
            <DailyChallengeComponent 
              challenge={dailyChallenge}
              onStart={handleStartDailyChallenge}
            />
            */}
          </View>
        </View>

        {/* Leaderboard Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>🏆</Text>
            <Text style={styles.placeholderTitle}>Coming Soon</Text>
            <Text style={styles.placeholderDescription}>
              Compete with other players and see who has the best memory!
            </Text>
            {/* Placeholder for future integration */}
            {/* 
            <LeaderboardComponent 
              entries={leaderboardEntries}
              currentUser={currentUser}
            />
            */}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Match hairstyle pairs to test your memory!
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  modeCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modeCardGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modeIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  modeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  difficultySelector: {
    marginTop: 10,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 10,
    textAlign: 'center',
  },
  difficultyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  difficultyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  difficultyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyButtonSubtext: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.7,
    marginTop: 2,
  },
  placeholderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 10,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  placeholderDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
  },
});

