export const COLORS = {
  background: '#09090B',
  backgroundElevated: '#111116',
  card: 'rgba(255,255,255,0.06)',
  cardStrong: 'rgba(255,255,255,0.10)',
  border: 'rgba(255,255,255,0.10)',
  textPrimary: '#FFFFFF',
  textSecondary: '#B5B7C4',
  textMuted: '#7D8194',
  whiteOverlay: 'rgba(255,255,255,0.08)',
  pink: '#EC4899',
  purple: '#7C3AED',
  blue: '#3B82F6',
  teal: '#14B8A6',
  green: '#84CC16',
  amber: '#F59E0B',
};

export const MOOD_STYLES = {
  Happy: {
    gradient: ['#5B21B6', '#EC4899', '#F59E0B'] as [string, string, string],
    glow: 'rgba(236,72,153,0.30)',
    accent: '#F59E0B',
    subtitle: 'Bright, upbeat songs for a lighter mood.',
  },
  Chill: {
    gradient: ['#0F172A', '#155E75', '#3B82F6'] as [string, string, string],
    glow: 'rgba(59,130,246,0.28)',
    accent: '#22D3EE',
    subtitle: 'Smooth, calm tracks to help you settle in.',
  },
  Energetic: {
    gradient: ['#14532D', '#65A30D', '#F59E0B'] as [string, string, string],
    glow: 'rgba(132,204,22,0.28)',
    accent: '#A3E635',
    subtitle: 'Momentum-building songs for focus and motion.',
  },
  Romantic: {
    gradient: ['#4C1D95', '#BE185D', '#FB7185'] as [string, string, string],
    glow: 'rgba(244,114,182,0.30)',
    accent: '#F472B6',
    subtitle: 'Warm, intimate songs with softer energy.',
  },
  Blue: {
    gradient: ['#172554', '#1D4ED8', '#312E81'] as [string, string, string],
    glow: 'rgba(59,130,246,0.28)',
    accent: '#60A5FA',
    subtitle: 'Gentler tracks for reflective or low moods.',
  },
};

export type MoodName = keyof typeof MOOD_STYLES;
