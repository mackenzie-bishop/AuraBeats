import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard, PillButton, Screen, SectionLabel } from '../components/ui';
import { COLORS } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen glowColors={['#09090B', '#18181F', '#09090B']}>
      <View style={styles.hero}>
        <SectionLabel>Aura Beats</SectionLabel>
        <Text style={styles.title}>Let your mood set the soundtrack.</Text>
        <Text style={styles.subtitle}>
        Feel it. Play it.
        </Text>
      </View>

      <LinearGradient
        colors={['rgba(124,58,237,0.18)', 'rgba(236,72,153,0.14)', 'rgba(255,255,255,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featurePanel}
      >
        <View style={styles.featureBadge}>
          <Text style={styles.featureBadgeText}>Mood-first music</Text>
        </View>
        <Text style={styles.featureTitle}>Start a new playlist session</Text>
        <Text style={styles.featureText}>
          Tell us how you're feeling.
        </Text>
        <PillButton
          label="Start mood check"
          onPress={() => router.push('/mood')}
          style={styles.buttonSpacing}
        />
      </LinearGradient>

      <GlassCard style={styles.secondaryCard}>
        <Text style={styles.secondaryTitle}>Review your listening history</Text>
        <Text style={styles.secondaryText}>
          Revisit your previous mood selections.
        </Text>
        <PillButton
          label="Open mood history"
          variant="secondary"
          onPress={() => router.push('/history')}
          style={styles.buttonSpacing}
        />
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 24,
    gap: 14,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    maxWidth: 320,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 19,
    lineHeight: 24,
    maxWidth: 340,
  },
  featurePanel: {
    marginTop: 28,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minHeight: 220,
    justifyContent: 'flex-end',
  },
  featureBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  featureBadgeText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  featureTitle: {
    color: COLORS.textPrimary,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  featureText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  secondaryCard: {
    marginTop: 18,
  },
  secondaryTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  secondaryText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  buttonSpacing: {
    marginTop: 18,
  },
});
