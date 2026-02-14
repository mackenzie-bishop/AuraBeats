import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { playlistForMood } from "../src/lib/moodLogic";
import { saveMoodEntry } from "@/src/lib/storage";
import * as player from "@/src/lib/player";

export default function ResultPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const mood = JSON.parse(String(params.mood || "{}"));
  const inputs = JSON.parse(String(params.inputs || "{}"));

  const [saved, setSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlists = useMemo(() => playlistForMood(mood.key), [mood.key]);
  const styles = useMemo(() => makeStyles(mood.color || "#999"), [mood.color]);

  useEffect(() => {
    (async () => {
      const entry = {
        id: `${Date.now()}`,
        moodKey: mood.key,
        moodLabel: mood.label,
        color: mood.color,
        message: mood.message,
        inputs,
        timestamp: new Date().toISOString(),
      };
      await saveMoodEntry(entry);
      setSaved(true);
    })();

    return () => {
      player.unload().catch(() => {});
    };
  }, []);

  const onPlayPause = async () => {
    try {
      if (!isPlaying) {
        await player.play();
        setIsPlaying(true);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch {
      // Most common cause: you haven't added assets/audio/sample.mp3 yet
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.moodCard}>
        <Text style={styles.h1}>{mood.label || "Mood"}</Text>
        <Text style={styles.p}>{mood.message || ""}</Text>
        <Text style={styles.meta}>{saved ? "Saved to history ✓" : "Saving..."}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h2}>Suggested playlists</Text>
        {playlists.map((p: string) => (
          <Text key={p} style={styles.item}>• {p}</Text>
        ))}
      </View>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={onPlayPause}>
          <Text style={styles.btnText}>{isPlaying ? "Pause" : "Play"}</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => router.push("/history")}>
          <Text style={styles.btnText}>History</Text>
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(accent: string) {
  return StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    moodCard: { borderRadius: 16, padding: 14, borderWidth: 2, borderColor: accent },
    h1: { fontSize: 28, fontWeight: "800" },
    h2: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    p: { fontSize: 14, opacity: 0.9, marginTop: 6 },
    meta: { marginTop: 10, fontSize: 12, opacity: 0.7 },
    card: { borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "rgba(0,0,0,0.15)" },
    item: { fontSize: 14, marginBottom: 6 },
    row: { flexDirection: "row", gap: 12, marginTop: 6 },
    btn: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.15)" },
    btnText: { fontSize: 16, fontWeight: "700" },
  });
}
