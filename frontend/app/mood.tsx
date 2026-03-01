import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { fetchMoods } from "@/src/lib/api";

type MoodCard = {
  name: string;
  colors: [string, string];
};

const DEFAULT_MOODS: MoodCard[] = [
  { name: "Happy", colors: ["#f2e08f", "#d79a2a"] },
  { name: "Chill", colors: ["#5fe7df", "#1491d8"] },
  { name: "Energetic", colors: ["#c5ff72", "#45a645"] },
  { name: "Romantic", colors: ["#ffb6d9", "#ff2b88"] },
  { name: "Blue", colors: ["#4b62ff", "#1b2db8"] },
];

export default function MoodSelectScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState<MoodCard[]>(DEFAULT_MOODS);

  const styles = useMemo(() => makeStyles(), []);

  useEffect(() => {
    (async () => {
      try {
        const apiMoods = await fetchMoods();
        // Keep the UI order/colors from Figma, but only show moods the API supports.
        const apiSet = new Set(apiMoods.map((m) => m.trim()));
        const filtered = DEFAULT_MOODS.filter((m) => apiSet.has(m.name));
        setMoods(filtered.length ? filtered : DEFAULT_MOODS);
      } catch (e: any) {
        // If backend isn't running yet, keep defaults.
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onPick = (mood: MoodCard) => {
    router.push({ pathname: "/result", params: { mood: mood.name } });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>How Are you{`\n`}Feeling?</Text>
      <Text style={styles.sub}>Select your mood and we'll create{`\n`}the perfect playlist for you</Text>

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading moods…</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {moods.map((m) => (
          <Pressable key={m.name} onPress={() => onPick(m)} style={styles.cardWrap}>
            <LinearGradient colors={m.colors} style={styles.card}>
              <Text style={styles.cardText}>{m.name}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    </View>
  );
}

function makeStyles() {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#1d1a2a",
      paddingHorizontal: 22,
      paddingTop: 30,
      paddingBottom: 20,
    },
    h1: { fontSize: 40, fontWeight: "900", color: "#0b0b0b", marginBottom: 10 },
    sub: { fontSize: 14, fontWeight: "600", color: "rgba(0,0,0,0.75)", marginBottom: 18 },
    loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
    loadingText: { fontSize: 13, opacity: 0.75 },
    list: { gap: 12 },
    cardWrap: { borderRadius: 16, overflow: "hidden" },
    card: {
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
    },
    cardText: { fontSize: 22, fontWeight: "900", color: "#111" },
    backBtn: { marginTop: 18, alignSelf: "flex-start" },
    backText: { fontSize: 14, fontWeight: "800", color: "rgba(255,255,255,0.9)" },
  });
}
