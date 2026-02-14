import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { loadMoods, clearMoods } from "@/src/lib/storage";

export default function HistoryPage() {
  const [items, setItems] = useState<any[]>([]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, padding: 16, gap: 12 },
        h1: { fontSize: 24, fontWeight: "800" },
        card: { borderRadius: 14, padding: 12, borderWidth: 1, borderColor: "rgba(0,0,0,0.15)", gap: 6 },
        mood: { fontSize: 16, fontWeight: "800" },
        time: { fontSize: 12, opacity: 0.7 },
        msg: { fontSize: 13, opacity: 0.9 },
        row: { flexDirection: "row", gap: 10 },
        btn: {
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.15)",
          alignSelf: "flex-start",
        },
        btnText: { fontSize: 13, fontWeight: "700" },
      }),
    []
  );

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
    <View style={styles.container}>
      <Text style={styles.h1}>Mood History</Text>

      <View style={styles.row}>
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
        contentContainerStyle={{ gap: 10, paddingVertical: 6 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftWidth: 8, borderLeftColor: item.color }]}>
            <Text style={styles.mood}>{item.moodLabel}</Text>
            <Text style={styles.msg}>{item.message}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No entries yet. Do a mood check-in first.</Text>}
      />
    </View>
  );
}
