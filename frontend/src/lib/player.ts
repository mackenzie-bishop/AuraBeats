import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

export async function ensureLoaded() {
  if (sound) return sound;

  sound = new Audio.Sound();
  await sound.loadAsync(require("../../assets/audio/sample.mp3"));
  return sound;
}

export async function play() {
  const s = await ensureLoaded();
  await s.playAsync();
}

export async function pause() {
  if (!sound) return;
  await sound.pauseAsync();
}

export async function unload() {
  if (!sound) return;
  await sound.unloadAsync();
  sound = null;
}
