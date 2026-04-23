import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, PillButton } from '../components/ui';
import { COLORS } from '../constants/theme';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <Screen glowColors={['#09090B', '#18181F', '#09090B']}>
      <View style={styles.container}>
        <Text style={styles.title}>Aura Beats</Text>
        <Text style={styles.subtitle}>
          This route is available for future extras like account details, focus
          session summaries, or app settings.
        </Text>
        <PillButton label="Close" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
});
