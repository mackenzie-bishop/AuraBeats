export const MOODS = {
    HAPPY: { label: "Happy", color: "#F9D65C", message: "You seem upbeat — keep that energy going!" },
    CALM: { label: "Calm", color: "#6BCB77", message: "Steady and calm. Breathe easy." },
    ANXIOUS: { label: "Anxious", color: "#FFD6A5", message: "It’s okay to feel tense — try something soothing." },
    SAD: { label: "Sad", color: "#A0C4FF", message: "Be gentle with yourself today." },
    ANGRY: { label: "Angry", color: "#FF6B6B", message: "Let’s cool down — something mellow might help." },
  } as const;
  
  export type MoodKey = keyof typeof MOODS;
  
  type Inputs = {
    emojis: string[];
    energy: number;     // 0–10
    stress: number;     // 0–10
    positivity: number; // 0–10
  };
  
  export function detectMood({ emojis, energy, stress, positivity }: Inputs) {
    const score: Record<MoodKey, number> = {
      HAPPY: 0,
      CALM: 0,
      ANXIOUS: 0,
      SAD: 0,
      ANGRY: 0,
    };
  
    for (const e of emojis) {
      if (["😄", "😊", "🎉"].includes(e)) score.HAPPY += 3;
      if (["😌", "🫶", "🌿"].includes(e)) score.CALM += 3;
      if (["😰", "😟", "🫨"].includes(e)) score.ANXIOUS += 3;
      if (["😢", "☁️", "🥀"].includes(e)) score.SAD += 3;
      if (["😠", "🔥", "💢"].includes(e)) score.ANGRY += 3;
    }
  
    if (energy >= 7 && positivity >= 6) score.HAPPY += 2;
    if (stress <= 3 && positivity >= 5) score.CALM += 2;
    if (stress >= 7) score.ANXIOUS += 2;
    if (positivity <= 3) score.SAD += 2;
    if (energy >= 7 && stress >= 6) score.ANGRY += 1;
  
    const bestKey = (Object.keys(score) as MoodKey[]).reduce((a, b) =>
      score[a] >= score[b] ? a : b
    );
  
    return { key: bestKey, ...MOODS[bestKey] };
  }
  
  export function playlistForMood(moodKey: MoodKey) {
    const map: Record<MoodKey, string[]> = {
      HAPPY: ["Bright Pop", "Feel-Good Beats", "Sunny Vibes"],
      CALM: ["Lo-fi Chill", "Soft Ambient", "Quiet Focus"],
      ANXIOUS: ["Grounding Tones", "Slow Piano", "Breathing Rhythm"],
      SAD: ["Gentle Acoustic", "Warm Pads", "Soft Strings"],
      ANGRY: ["Cool Down", "Low Bass Slow", "Deep Focus"],
    };
    return map[moodKey];
  }
  