import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Recommendation } from './api';

const KEY = 'AURA_BEATS_MOODS_V3';

export type MoodHistoryEntry = {
  id: string;
  mood: string;
  timestamp: string;
  bgKey?: string;
  recommendations?: Recommendation[];
};

export async function loadMoods(): Promise<MoodHistoryEntry[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as MoodHistoryEntry[];
  } catch {
    return [];
  }
}

export async function saveMoodEntry(entry: MoodHistoryEntry) {
  const existing = await loadMoods();
  const deduped = existing.filter(
    (item) => !(item.mood === entry.mood && item.timestamp === entry.timestamp)
  );
  const next = [entry, ...deduped].slice(0, 50);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export async function clearMoods() {
  await AsyncStorage.removeItem(KEY);
}
