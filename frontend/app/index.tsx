import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(height), [height]);

  return (
    <LinearGradient
      colors={["#ff5aa5", "#6a4cff", "#0d1b1e", "#000000"]}
      locations={[0, 0.35, 0.75, 1]}
      style={styles.container}
    >
      <View style={styles.top}>
        <Text style={styles.title}>Aura Beats</Text>
      </View>

      <View style={styles.center}>
        <Pressable style={styles.startBtn} onPress={() => router.push("/mood")}> 
          <Text style={styles.startText}>Start mood check</Text>
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.historyBtn} onPress={() => router.push("/history")}> 
          <Text style={styles.historyText}>Mood History</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function makeStyles(height: number) {
  return StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 22, paddingTop: 26, paddingBottom: 26 },
    top: { flex: 1, justifyContent: "flex-start" },
    center: { flex: 3, justifyContent: "center", alignItems: "center" },
    bottom: { flex: 1, justifyContent: "flex-end", alignItems: "flex-start" },

    title: {
      fontSize: 44,
      fontWeight: "900",
      letterSpacing: 0.5,
      color: "#0b0b0b",
      marginTop: Math.max(6, height * 0.03),
    },

    startBtn: {
      width: "100%",
      backgroundColor: "rgba(9, 20, 26, 0.72)",
      borderRadius: 14,
      paddingVertical: 22,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.08)",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
    },
    startText: { fontSize: 18, fontWeight: "800", color: "#ff67b0" },

    historyBtn: {
      backgroundColor: "#ffd1e6",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
    },
    historyText: { fontSize: 14, fontWeight: "800", color: "#141414" },
  });
}
