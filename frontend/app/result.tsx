import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchRecommendations, type Recommendation } from "@/src/lib/api";
import { saveMoodEntry } from "@/src/lib/storage";

type MoodTheme = {
  colors: [string, string, string];
  subtitle: string;
};

const THEMES: Record<string, MoodTheme> = {
  Happy: { colors: ["#fff79a", "#ffb11a", "#e27d00"], subtitle: "Happy track to match your mood" },
  Chill: { colors: ["#66f1ea", "#21b7e6", "#1a6ac7"], subtitle: "Chill track to match your mood" },
  Energetic: { colors: ["#cfff7a", "#7cdf39", "#4c8b33"], subtitle: "Energetic track to match your mood" },
  Romantic: { colors: ["#ffb9da", "#ff4aa3", "#e1006d"], subtitle: "Romantic track to match your mood" },
  Blue: { colors: ["#3f67ff", "#2743e8", "#0f1f9a"], subtitle: "Blue track to match your mood" },
};

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mood = String(params.mood || "Happy");

  const theme = THEMES[mood] || THEMES.Happy;

  const [loading, setLoading] = useState(true);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [playing, setPlaying] = useState(false);

  const styles = useMemo(() => makeStyles(), []);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchRecommendations(mood);
        setRecs(list);

        await saveMoodEntry({
          id: `${Date.now()}`,
          mood,
          bgKey: mood,
          recommendations: list,
          timestamp: new Date().toISOString(),
        });
      } catch {
        // Backend might not be running yet — still render the UI.
      } finally {
        setLoading(false);
      }
    })();
  }, [mood]);

  return (
    <LinearGradient colors={theme.colors} locations={[0, 0.55, 1]} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>You're feeling{`\n`}{mood.toLowerCase()}</Text>
          <Text style={styles.subtitle}>{theme.subtitle}</Text>
        </View>

        <Pressable
          accessibilityLabel="Close"
          onPress={() => router.replace("/mood")}
          style={styles.closeBtn}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.playBtn} onPress={() => setPlaying((p) => !p)}>
          <Text style={styles.playIcon}>{playing ? "❚❚" : "▶"}</Text>
          <Text style={styles.playText}>Play All</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator />
            <Text style={styles.loadingText}>Loading playlist…</Text>
          </View>
        ) : null}

        {(recs.length ? recs : new Array(6).fill(null)).map((r, idx) => (
          <View key={idx} style={styles.trackPill}>
            {r ? (
              <Text style={styles.trackText} numberOfLines={1}>
                {r.title} — {r.artist}
              </Text>
            ) : (
              <Text style={[styles.trackText, { opacity: 0.35 }]} numberOfLines={1}>
                
              </Text>
            )}
          </View>
        ))}
      </View>

      <Pressable style={styles.historyBtn} onPress={() => router.push("/history")}>
        <Text style={styles.historyText}>Mood History</Text>
      </Pressable>
    </LinearGradient>
  );
}

function makeStyles() {
  return StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 22, paddingTop: 28, paddingBottom: 22 },
    header: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
    title: { fontSize: 36, fontWeight: "900", color: "#0b0b0b", lineHeight: 40 },
    subtitle: { fontSize: 13, fontWeight: "600", color: "rgba(0,0,0,0.7)", marginTop: 10 },
    closeBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "rgba(255,255,255,0.72)",
      alignItems: "center",
      justifyContent: "center",
    },
    closeText: { fontSize: 22, fontWeight: "900", color: "#111", marginTop: -1 },

    actions: { marginTop: 18, alignItems: "flex-start" },
    playBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "rgba(255,255,255,0.85)",
      borderRadius: 999,
      paddingVertical: 10,
      paddingHorizontal: 18,
      minWidth: 160,
    },
    playIcon: { fontSize: 12, fontWeight: "900", color: "#111" },
    playText: { fontSize: 14, fontWeight: "800", color: "#111" },

    list: { flex: 1, marginTop: 18, gap: 14 },
    loadingRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    loadingText: { fontSize: 13, fontWeight: "700", color: "rgba(0,0,0,0.6)" },

    trackPill: {
      height: 46,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.85)",
      justifyContent: "center",
      paddingHorizontal: 18,
    },
    trackText: { fontSize: 14, fontWeight: "800", color: "#111" },

    historyBtn: {
      alignSelf: "flex-start",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
    },
    historyText: { fontSize: 14, fontWeight: "800", color: "#141414" },
  });
}
