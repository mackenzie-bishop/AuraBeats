import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, useColorScheme } from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { detectMood } from "@/src/lib/moodLogic";


const EMOJIS = ["😄", "😊", "🎉", "😌", "🌿", "🫶", "😰", "😟", "🫨", "😢", "☁️", "😠", "🔥"];

export default function HomePage() {
  const router = useRouter();
  const scheme = useColorScheme() ?? "light";

  const [selected, setSelected] = useState<string[]>([]);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [positivity, setPositivity] = useState(5);

  const styles = useMemo(() => makeStyles(scheme), [scheme]);

  const toggleEmoji = (e: string) => {
    setSelected((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e].slice(0, 5)));
  };

  const submit = () => {
    const mood = detectMood({ emojis: selected, energy, stress, positivity });
    router.push({
      pathname: "/result",
      params: {
        mood: JSON.stringify(mood),
        inputs: JSON.stringify({ emojis: selected, energy, stress, positivity }),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Pressable style={styles.smallBtn} onPress={() => router.push("/history")}>
          <Text style={styles.smallBtnText}>View History</Text>
        </Pressable>
      </View>

      <Text style={styles.h1}>Mood check-in</Text>
      <Text style={styles.p}>Pick up to 5 emojis that match how you feel.</Text>

      <View style={styles.emojiGrid}>
        {EMOJIS.map((e) => {
          const active = selected.includes(e);
          return (
            <Pressable
              key={e}
              onPress={() => toggleEmoji(e)}
              style={[styles.emojiChip, active && styles.emojiChipActive]}
            >
              <Text style={styles.emoji}>{e}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>Quick sliders</Text>

        <Text style={styles.label}>Energy: {energy}</Text>
        <Slider minimumValue={0} maximumValue={10} step={1} value={energy} onValueChange={setEnergy} />

        <Text style={styles.label}>Stress: {stress}</Text>
        <Slider minimumValue={0} maximumValue={10} step={1} value={stress} onValueChange={setStress} />

        <Text style={styles.label}>Positivity: {positivity}</Text>
        <Slider minimumValue={0} maximumValue={10} step={1} value={positivity} onValueChange={setPositivity} />
      </View>

      <Pressable style={styles.primaryBtn} onPress={submit}>
        <Text style={styles.primaryBtnText}>Generate Mood</Text>
      </Pressable>
    </ScrollView>
  );
}

function makeStyles(scheme: string) {
  const dark = scheme === "dark";
  return StyleSheet.create({
    container: { padding: 16, gap: 12 },
    row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
    h1: { fontSize: 28, fontWeight: "700" },
    h2: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    p: { fontSize: 14, opacity: 0.85 },
    card: {
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
      borderRadius: 14,
      padding: 12,
      gap: 10,
    },
    label: { fontSize: 14, fontWeight: "600" },
    emojiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    emojiChip: {
      width: 46,
      height: 46,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
    },
    emojiChipActive: { borderColor: dark ? "white" : "black", transform: [{ scale: 1.03 }] },
    emoji: { fontSize: 22 },
    primaryBtn: {
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
    },
    primaryBtnText: { fontSize: 16, fontWeight: "700" },
    smallBtn: {
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
    },
    smallBtnText: { fontSize: 13, fontWeight: "600" },
  });
}
