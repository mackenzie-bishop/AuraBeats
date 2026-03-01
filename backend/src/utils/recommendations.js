// Mood names aligned to the mobile UI (Figma): Happy, Chill, Energetic, Romantic, Blue
// These are example recommendations (title + artist) used for the prototype.
const RECS = {
  Happy: [
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake" },
    { title: "Good as Hell", artist: "Lizzo" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
    { title: "Sunday Best", artist: "Surfaces" }
  ],
  Chill: [
    { title: "Sunset Lover", artist: "Petit Biscuit" },
    { title: "Space Song", artist: "Beach House" },
    { title: "Lo-fi Study Mix", artist: "Various" },
    { title: "Holocene", artist: "Bon Iver" },
    { title: "Bloom", artist: "The Paper Kites" }
  ],
  Energetic: [
    { title: "Stronger", artist: "Kanye West" },
    { title: "Titanium", artist: "David Guetta ft. Sia" },
    { title: "Don't Stop Me Now", artist: "Queen" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levels", artist: "Avicii" }
  ],
  Romantic: [
    { title: "Lover", artist: "Taylor Swift" },
    { title: "At Last", artist: "Etta James" },
    { title: "Perfect", artist: "Ed Sheeran" },
    { title: "Adore You", artist: "Harry Styles" },
    { title: "Just the Two of Us", artist: "Grover Washington Jr." }
  ],
  Blue: [
    { title: "Fix You", artist: "Coldplay" },
    { title: "Someone Like You", artist: "Adele" },
    { title: "The Night We Met", artist: "Lord Huron" },
    { title: "i love you", artist: "Billie Eilish" },
    { title: "Skinny Love", artist: "Birdy" }
  ]
};

function getMoods() {
  return Object.keys(RECS);
}

function getRecommendations(mood) {
  return RECS[mood] || [];
}

module.exports = { getMoods, getRecommendations };
