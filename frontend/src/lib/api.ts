export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export type Recommendation = {
  title: string;
  artist: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function fetchMoods(): Promise<string[]> {
  const data = await request<{ moods: string[] }>('/moods');
  return data.moods || [];
}

export async function fetchRecommendations(
  mood: string
): Promise<Recommendation[]> {
  const data = await request<{ recommendations: Recommendation[] }>(
    `/moods/recommendations?mood=${encodeURIComponent(mood)}`
  );
  return data.recommendations || [];
}
