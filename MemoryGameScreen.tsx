/**
 * MemoryGameScreen Component
 * 
 * Main game screen with card grid, flip animations, and game UI.
 * 
 * Features:
 * - Card flip animations (using React Native Animated API)
 * - Score display
 * - Timer display (for timed mode)
 * - Pause/resume functionality
 * - Game over modal with stats
 * - Vibrant gradient backgrounds (BarberBuddy purple/pink theme)
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemoryGame } from './useMemoryGame';
import { GameConfig, Card } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 3;
const CARD_SIZE = (SCREEN_WIDTH - CARD_MARGIN * (CARDS_PER_ROW + 1) * 2) / CARDS_PER_ROW;

interface MemoryGameScreenProps {
  config: GameConfig;
  onBack: () => void;
}

export default function MemoryGameScreen({ config, onBack }: MemoryGameScreenProps) {
  const { gameState, handleCardFlip, resetGame, pauseGame, resumeGame, getGameStats } = useMemoryGame(config);
  const [showStatsModal, setShowStatsModal] = React.useState(false);
  const flipAnimations = useRef<Map<number, Animated.Value>>(new Map());

  // Initialize flip animations for each card
  useEffect(() => {
    gameState.cards.forEach((_, index) => {
      if (!flipAnimations.current.has(index)) {
        flipAnimations.current.set(index, new Animated.Value(0));
      }
    });
  }, [gameState.cards.length]);

  // Animate card flip
  useEffect(() => {
    gameState.cards.forEach((card, index) => {
      const animValue = flipAnimations.current.get(index);
      if (!animValue) return;

      if (card.isFlipped && !card.isMatched) {
        Animated.spring(animValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      } else if (!card.isFlipped && !card.isMatched) {
        Animated.spring(animValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    });
  }, [gameState.cards]);

  // Show stats modal when game ends
  useEffect(() => {
    if (gameState.isGameOver && !showStatsModal) {
      setTimeout(() => {
        setShowStatsModal(true);
      }, 500);
    }
  }, [gameState.isGameOver]);

  const formatTime = (seconds: number | undefined): string => {
    if (seconds === undefined) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderCard = (card: Card, index: number) => {
    const animValue = flipAnimations.current.get(index) || new Animated.Value(0);
    
    const frontInterpolate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
      transform: [{ rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
      transform: [{ rotateY: backInterpolate }],
    };

    return (
      <TouchableOpacity
        key={card.id}
        style={styles.cardContainer}
        onPress={() => handleCardFlip(index)}
        disabled={card.isMatched || gameState.isPaused}
        activeOpacity={0.8}
      >
        <View style={[styles.card, { width: CARD_SIZE, height: CARD_SIZE }]}>
          {/* Card Back (Hidden) */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardBack,
              frontAnimatedStyle,
              { opacity: card.isFlipped || card.isMatched ? 0 : 1 },
            ]}
          >
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardBackText}>?</Text>
            </LinearGradient>
          </Animated.View>

          {/* Card Front (Visible when flipped) */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardFront,
              backAnimatedStyle,
              { opacity: card.isFlipped || card.isMatched ? 1 : 0 },
            ]}
          >
            <View style={styles.cardContent}>
              {card.hairstyle.imageUrl ? (
                <Image
                  source={{ uri: card.hairstyle.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.cardImagePlaceholder}>
                  <Text style={styles.cardImagePlaceholderText}>📷</Text>
                </View>
              )}
              <Text style={styles.cardName} numberOfLines={1}>
                {card.hairstyle.name}
              </Text>
            </View>
          </Animated.View>

          {/* Matched overlay */}
          {card.isMatched && (
            <View style={styles.matchedOverlay}>
              <Text style={styles.matchedText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const stats = getGameStats();

  return (
    <LinearGradient
      colors={['#1a0a2e', '#8B5CF6', '#EC4899']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{gameState.score}</Text>
          </View>
          
          {config.mode === 'timed' && (
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Time</Text>
              <Text style={[styles.statValue, gameState.timeRemaining && gameState.timeRemaining < 30 && styles.timeWarning]}>
                {formatTime(gameState.timeRemaining)}
              </Text>
            </View>
          )}
          
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Moves</Text>
            <Text style={styles.statValue}>{gameState.moves}</Text>
          </View>
        </View>
      </View>

      {/* Game Info */}
      <View style={styles.gameInfo}>
        <Text style={styles.modeText}>
          {config.mode.charAt(0).toUpperCase() + config.mode.slice(1)} Mode
        </Text>
        <Text style={styles.pairsText}>
          Pairs: {gameState.matchedPairs} / {config.cardCount / 2}
        </Text>
      </View>

      {/* Pause Overlay */}
      {gameState.isPaused && (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseContent}>
            <Text style={styles.pauseText}>PAUSED</Text>
            <TouchableOpacity onPress={resumeGame} style={styles.resumeButton}>
              <Text style={styles.resumeButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Cards Grid */}
      <ScrollView
        contentContainerStyle={styles.cardsGrid}
        showsVerticalScrollIndicator={false}
      >
        {gameState.cards.map((card, index) => renderCard(card, index))}
      </ScrollView>

      {/* Controls */}
      <View style={styles.controls}>
        {!gameState.isPaused && !gameState.isGameOver && (
          <TouchableOpacity onPress={pauseGame} style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetGame} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Modal */}
      <Modal
        visible={showStatsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStatsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.modalTitle}>
              {gameState.isGameWon ? '🎉 You Won!' : '⏱️ Time\'s Up!'}
            </Text>
            
            {stats && (
              <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Final Score:</Text>
                  <Text style={styles.statRowValue}>{stats.finalScore}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Moves:</Text>
                  <Text style={styles.statRowValue}>{stats.moves}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Time:</Text>
                  <Text style={styles.statRowValue}>{formatTime(stats.timeElapsed)}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statRowLabel}>Accuracy:</Text>
                  <Text style={styles.statRowValue}>{stats.accuracy.toFixed(1)}%</Text>
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowStatsModal(false);
                  resetGame();
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowStatsModal(false);
                  onBack();
                }}
                style={[styles.modalButton, styles.modalButtonSecondary]}
              >
                <Text style={styles.modalButtonText}>Back to Menu</Text>
              </TouchableOpacity>
            </View>

            {/* Placeholder for future integrations */}
            <View style={styles.futureIntegrations}>
              <Text style={styles.futureIntegrationsText}>
                {/* Daily Challenge & Leaderboard integration points */}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 10,
    minWidth: 80,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeWarning: {
    color: '#FF6B6B',
  },
  gameInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  modeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pairsText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pauseContent: {
    alignItems: 'center',
  },
  pauseText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resumeButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resumeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 20,
  },
  cardContainer: {
    margin: CARD_MARGIN,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: 'transparent',
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    backgroundColor: '#F3F4F6',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '70%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImagePlaceholderText: {
    fontSize: 40,
  },
  cardName: {
    height: '30%',
    padding: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  matchedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(139, 92, 246, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  matchedText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  statRowLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
  },
  statRowValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtons: {
    width: '100%',
    gap: 15,
  },
  modalButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  modalButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  futureIntegrations: {
    marginTop: 20,
    opacity: 0.5,
  },
  futureIntegrationsText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

