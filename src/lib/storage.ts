import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "AURA_BEATS_MOODS_V1";

export async function loadMoods() {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveMoodEntry(entry: any) {
  const existing = await loadMoods();
  const next = [entry, ...existing].slice(0, 50);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export async function clearMoods() {
  await AsyncStorage.removeItem(KEY);
}
