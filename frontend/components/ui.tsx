import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

type ScreenProps = {
  children: React.ReactNode;
  glowColors?: [string, string, string];
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, glowColors, contentStyle }: ScreenProps) {
  const colors = glowColors ?? ['#09090B', '#111827', '#09090B'];

  return (
    <View style={styles.screen}>
      <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

export function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PillButton({
  label,
  onPress,
  variant = 'primary',
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}) {
  if (variant === 'secondary') {
    return (
      <Pressable onPress={onPress} style={[styles.secondaryButton, style]}>
        <Text style={styles.secondaryButtonText}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={style}>
      <LinearGradient
        colors={['#7C3AED', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 22,
  },
  topGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -60,
    right: -60,
    backgroundColor: 'rgba(124,58,237,0.16)',
  },
  bottomGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    bottom: -40,
    left: -40,
    backgroundColor: 'rgba(236,72,153,0.10)',
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 18,
  },
  primaryButton: {
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
