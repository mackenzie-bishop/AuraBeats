import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fetchMoods } from '../src/lib/api';
import { COLORS, MOOD_STYLES, type MoodName } from '../constants/theme';
import { GlassCard, PillButton, Screen, SectionLabel } from '../components/ui';

type MoodCard = {
  name: MoodName;
  colors: [string, string, string];
  accent: string;
  subtitle: string;
};

const DEFAULT_MOODS: MoodCard[] = (Object.keys(MOOD_STYLES) as MoodName[]).map(
  (name) => ({
    name,
    colors: MOOD_STYLES[name].gradient,
    accent: MOOD_STYLES[name].accent,
    subtitle: MOOD_STYLES[name].subtitle,
  })
);

export default function MoodScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState<MoodCard[]>(DEFAULT_MOODS);

  useEffect(() => {
    (async () => {
      try {
        const apiMoods = await fetchMoods();
        const apiSet = new Set(apiMoods.map((m) => m.trim()));
        const filtered = DEFAULT_MOODS.filter((m) => apiSet.has(m.name));
        setMoods(filtered.length ? filtered : DEFAULT_MOODS);
      } catch {
        setMoods(DEFAULT_MOODS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onPick = (mood: MoodCard) => {
    router.push({ pathname: '/result', params: { mood: mood.name } });
  };

  const titleBlock = useMemo(
    () => (
      <View style={styles.header}>
        <SectionLabel>Mood selection</SectionLabel>
        <Text style={styles.title}>How are you feeling right now?</Text>
        <Text style={styles.subtitle}>
          Select a mood that best fits.
        </Text>
      </View>
    ),
    []
  );

  return (
    <Screen glowColors={['#09090B', '#111827', '#09090B']}>
      {titleBlock}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.loadingText}>Loading available moods…</Text>
          </View>
        ) : null}

        {moods.map((mood) => (
          <Pressable key={mood.name} onPress={() => onPick(mood)}>
            <LinearGradient
              colors={mood.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.moodCard}
            >
              <View style={styles.moodTopRow}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      shadowColor: mood.accent,
                    },
                  ]}
                />
                <Text style={styles.pickLabel}>Select mood</Text>
              </View>
              <Text style={styles.moodName}>{mood.name}</Text>
              <Text style={styles.moodDescription}>{mood.subtitle}</Text>
            </LinearGradient>
          </Pressable>
        ))}

        <View style={styles.footerActions}>
          <PillButton
            label="Back home"
            variant="secondary"
            onPress={() => router.replace('/')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 18,
    gap: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    maxWidth: 320,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 340,
  },
  tipCard: {
    marginTop: 20,
  },
  tipTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  tipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  list: {
    paddingTop: 18,
    paddingBottom: 16,
    gap: 14,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  moodCard: {
    minHeight: 150,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  moodTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  pickLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  moodName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  moodDescription: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 280,
  },
  footerActions: {
    marginTop: 6,
    marginBottom: 10,
  },
});
