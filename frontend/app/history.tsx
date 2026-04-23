import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { clearMoods, loadMoods, type MoodHistoryEntry } from '../src/lib/storage';
import { COLORS, MOOD_STYLES, type MoodName } from '../constants/theme';
import { GlassCard, PillButton, Screen, SectionLabel } from '../components/ui';

function resolveMood(value: string): MoodName {
  return (Object.keys(MOOD_STYLES) as MoodName[]).includes(value as MoodName)
    ? (value as MoodName)
    : 'Happy';
}

export default function HistoryScreen() {
  const router = useRouter();
  const [items, setItems] = useState<MoodHistoryEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    const list = await loadMoods();
    setItems(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const onClear = async () => {
    await clearMoods();
    await refresh();
  };

  return (
    <Screen glowColors={['#09090B', '#171723', '#09090B']}>
      <View style={styles.header}>
        <SectionLabel>Mood history</SectionLabel>
        <Text style={styles.title}>Recent sessions</Text>
        <Text style={styles.subtitle}>
          Review your previous moods and the playlists generated for
          them.
        </Text>
      </View>

      <View style={styles.actionRow}>
        <PillButton label="Home" variant="secondary" onPress={() => router.replace('/')} />
        <PillButton label="Clear history" onPress={onClear} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
        renderItem={({ item }) => {
          const mood = resolveMood(item.mood);
          const moodStyle = MOOD_STYLES[mood];
          return (
            <GlassCard style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View
                  style={[
                    styles.moodDot,
                    { backgroundColor: moodStyle.accent },
                  ]}
                />
                <Text style={styles.moodName}>{item.mood}</Text>
              </View>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>

              <View style={styles.recommendationWrap}>
                {(item.recommendations?.slice(0, 3) || []).map((rec, index) => (
                  <Text key={`${item.id}-${index}`} style={styles.recommendationText}>
                    {rec.title} — {rec.artist}
                  </Text>
                ))}
                {!item.recommendations?.length ? (
                  <Text style={styles.emptyRecText}>No tracks saved for this entry.</Text>
                ) : null}
              </View>
            </GlassCard>
          );
        }}
        ListEmptyComponent={
          <GlassCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No history yet</Text>
            <Text style={styles.emptyText}>
              Generate a playlist from the mood screen and it will appear here.
            </Text>
          </GlassCard>
        }
      />
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
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 330,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 14,
  },
  list: {
    paddingBottom: 30,
    gap: 12,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moodDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  moodName: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  timestamp: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
  recommendationWrap: {
    marginTop: 14,
    gap: 8,
  },
  recommendationText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  emptyRecText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  emptyCard: {
    marginTop: 10,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
