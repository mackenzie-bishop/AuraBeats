# AuraBeats (Merged)

This repo combines:
- **backend/**: Express + MongoDB API (from `AuraBeats-main`)
- **frontend/**: Expo (React Native) mobile app UI (from `AuraBeats`), updated to match your Figma flow.

## 1) Run the backend

```bash
cd backend
npm install
# create a .env (see .env.example below)
npm run dev || npm start
```

**Required env vars (backend/.env):**
- `MONGO_URI=...`
- `JWT_SECRET=some-long-random-string`
- `PORT=5000` (optional)

## 2) Run the frontend

```bash
cd frontend
npm install
npm start
```

### Pointing the app at your backend

By default the app uses `http://localhost:5000`.

On a **real phone**, `localhost` means *the phone*, not your laptop.
Set this environment variable:

```bash
# frontend/.env
EXPO_PUBLIC_API_BASE_URL=http://YOUR-LAPTOP-LAN-IP:5000
```

Example:
`EXPO_PUBLIC_API_BASE_URL=http://192.168.1.20:5000`

Then restart Expo.

## Notes
- `/moods` and `/moods/recommendations` are **public** for this prototype UI.
- Auth + focus-session endpoints remain protected.
