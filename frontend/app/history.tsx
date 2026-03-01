import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { clearMoods, loadMoods, type MoodHistoryEntry } from "@/src/lib/storage";

export default function HistoryScreen() {
  const router = useRouter();
  const [items, setItems] = useState<MoodHistoryEntry[]>([]);
  const styles = useMemo(() => makeStyles(), []);

  const refresh = async () => {
    const list = await loadMoods();
    setItems(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onClear = async () => {
    await clearMoods();
    await refresh();
  };

  return (
    <LinearGradient colors={["#d7746c", "#c2517f"]} style={styles.container}>
      <Text style={styles.h1}>Mood history</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => router.replace("/")}> 
          <Text style={styles.btnText}>Home</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={refresh}>
          <Text style={styles.btnText}>Refresh</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={onClear}>
          <Text style={styles.btnText}>Clear</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ gap: 12, paddingTop: 14, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.mood}>{item.mood}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No entries yet.</Text>}
      />
    </LinearGradient>
  );
}

function makeStyles() {
  return StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 22, paddingTop: 28 },
    h1: { fontSize: 40, fontWeight: "900", color: "#0b0b0b" },
    row: { flexDirection: "row", gap: 10, marginTop: 14 },
    btn: {
      backgroundColor: "rgba(255,255,255,0.75)",
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 12,
    },
    btnText: { fontSize: 13, fontWeight: "900", color: "#111" },
    card: {
      backgroundColor: "rgba(255,255,255,0.82)",
      borderRadius: 16,
      padding: 14,
      gap: 6,
    },
    mood: { fontSize: 18, fontWeight: "900", color: "#111" },
    time: { fontSize: 12, fontWeight: "700", color: "rgba(0,0,0,0.6)" },
    empty: { marginTop: 18, fontSize: 14, fontWeight: "800", color: "rgba(0,0,0,0.65)" },
  });
}
