import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchRecommendations, type Recommendation } from '../src/lib/api';
import { saveMoodEntry } from '../src/lib/storage';
import { COLORS, MOOD_STYLES, type MoodName } from '../constants/theme';
import { GlassCard, PillButton, Screen, SectionLabel } from '../components/ui';

function getMoodName(value: string): MoodName {
  return (Object.keys(MOOD_STYLES) as MoodName[]).includes(value as MoodName)
    ? (value as MoodName)
    : 'Happy';
}

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mood = getMoodName(String(params.mood || 'Happy'));
  const theme = MOOD_STYLES[mood];
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchRecommendations(mood);
        setRecommendations(list);
        await saveMoodEntry({
          id: String(Date.now()),
          mood,
          bgKey: mood,
          recommendations: list,
          timestamp: new Date().toISOString(),
        });
      } catch {
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [mood]);

  const playlistCount = useMemo(
    () => (recommendations.length ? recommendations.length : 5),
    [recommendations.length]
  );

  return (
    <Screen glowColors={theme.gradient}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SectionLabel>Generated playlist</SectionLabel>

        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{mood} playlist</Text>
            <Text style={styles.subtitle}>{theme.subtitle}</Text>
          </View>
          <Pressable
            onPress={() => router.replace('/mood')}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>

        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroCaption}>Your mood is</Text>
          <Text style={styles.heroMood}>{mood}</Text>
          <Text style={styles.heroMeta}>
            {playlistCount} tracks ready for your listening
          </Text>

          <PillButton
            label={playing ? 'Pause playlist' : 'Play all'}
            onPress={() => setPlaying((prev) => !prev)}
            style={styles.heroButton}
          />
        </LinearGradient>

        <GlassCard style={styles.listCard}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Tracks</Text>
            {loading ? (
              <View style={styles.loadingChip}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.loadingChipText}>Loading</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.trackList}>
            {(recommendations.length
              ? recommendations
              : new Array(5).fill(null)
            ).map((track, index) => (
              <View key={`${track?.title ?? 'skeleton'}-${index}`} style={styles.trackRow}>
                <View style={styles.trackNumber}>
                  <Text style={styles.trackNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.trackCopy}>
                  <Text style={styles.trackTitle}>
                    {track ? track.title : 'Playlist item'}
                  </Text>
                  <Text style={styles.trackArtist}>
                    {track ? track.artist : 'Waiting for backend response'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={styles.actionRow}>
          <PillButton
            label="Try another mood"
            variant="secondary"
            onPress={() => router.push('/mood')}
            style={styles.actionButton}
          />
          <PillButton
            label="View history"
            onPress={() => router.push('/history')}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 18,
    paddingBottom: 28,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    marginTop: 10,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: 300,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 26,
    marginTop: -2,
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    minHeight: 220,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  heroCaption: {
    color: 'rgba(255,255,255,0.90)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroMood: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 8,
  },
  heroMeta: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  heroButton: {
    marginTop: 18,
  },
  listCard: {
    paddingBottom: 8,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  listTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  loadingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  loadingChipText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  trackList: {
    marginTop: 14,
    gap: 12,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  trackNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackNumberText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  trackCopy: {
    flex: 1,
  },
  trackTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  trackArtist: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  actionRow: {
    gap: 12,
    marginTop: 4,
  },
  actionButton: {
    width: '100%',
  },
});
