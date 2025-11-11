# Installation Instructions

## Required Package

The Memory Puzzle module requires `expo-linear-gradient` for the gradient backgrounds.

### Install Command

```bash
cd /path/to/barberbuddy-native
npx expo install expo-linear-gradient
```

This will install the package compatible with your Expo SDK version (currently SDK 53).

## Verification

After installation, verify the package is in your `package.json`:

```json
{
  "dependencies": {
    "expo-linear-gradient": "~14.0.1"
  }
}
```

## Alternative (If You Don't Want Gradients)

If you prefer not to use gradients, you can replace `LinearGradient` components with regular `View` components and solid colors:

```typescript
// Instead of:
<LinearGradient colors={['#8B5CF6', '#EC4899']} style={styles.container}>
  {/* content */}
</LinearGradient>

// Use:
<View style={[styles.container, { backgroundColor: '#8B5CF6' }]}>
  {/* content */}
</View>
```

However, gradients provide a much better visual experience and are recommended.

## Next Steps

1. Install `expo-linear-gradient`
2. Restart Metro bundler: `npx expo start --clear`
3. Import and use the Memory Puzzle components in your app

