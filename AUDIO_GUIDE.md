# Audio System Guide

## Overview
The Melodrama Werewolf Narrator Tool includes an audio system for playing ambient sounds during gameplay. Each theme supports separate audio tracks for night and day phases.

## Current Status
The audio infrastructure is fully implemented and ready to use. Audio file placeholders are currently set to `null` and need to be populated with actual audio files.

## Audio Controls
During gameplay, audio controls appear in the header:
- **🔇/🔊 Button**: Toggle audio on/off
- **Volume Slider**: Adjust volume (0-100%)
- **Phase Indicator**: Shows current phase (Night/Day)

Audio automatically switches between night and day tracks when the game phase changes.

## Adding Audio Files

### Step 1: Prepare Audio Files
Create or obtain ambient audio files for each theme. Recommended format:
- **Format**: MP3 or OGG (for best browser compatibility)
- **Length**: 2-5 minutes (will loop automatically)
- **Quality**: 128-192 kbps (balance between quality and file size)
- **Volume**: Pre-normalized to avoid sudden volume changes

### Step 2: Add Audio Files to Project
Create an `audio` directory in the project root:
```
MelodramaGame/
├── audio/
│   ├── village-night.mp3
│   ├── village-day.mp3
│   ├── mansion-night.mp3
│   ├── mansion-day.mp3
│   ├── haunted-night.mp3
│   ├── haunted-day.mp3
│   ├── castle-night.mp3
│   ├── castle-day.mp3
│   ├── theatre-night.mp3
│   ├── theatre-day.mp3
│   ├── space-night.mp3
│   ├── space-day.mp3
│   ├── western-night.mp3
│   ├── western-day.mp3
│   ├── pirate-night.mp3
│   ├── pirate-day.mp3
│   ├── hospital-night.mp3
│   └── hospital-day.mp3
└── index.html
```

### Step 3: Update Theme Definitions
Edit `index.html` and update the `audio` property for each theme:

```javascript
const THEMES = {
  village: {
    name: "Classic Village",
    // ... other properties
    audio: {
      night: "audio/village-night.mp3",
      day: "audio/village-day.mp3"
    },
    // ... rest of theme
  },
  // ... other themes
};
```

### Step 4: Update Service Worker (Optional)
If you want audio files to work offline, add them to the service worker cache in `sw.js`:

```javascript
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/audio/village-night.mp3',
  '/audio/village-day.mp3',
  // ... add all audio files
];
```

## Theme Audio Suggestions

### Classic Village
- **Night**: Cricket sounds, distant owl hoots, wind through trees
- **Day**: Birds chirping, village activity, light wind

### Millionaire's Mansion
- **Night**: Clock ticking, subtle piano, champagne glasses
- **Day**: Busy household, classical music, refined conversations

### Haunted House
- **Night**: Creaking floorboards, distant thunder, ghostly whispers
- **Day**: Eerie silence, wind rattling windows, ominous ambiance

### Castle Tower
- **Night**: Medieval night ambiance, torches crackling, distant guard calls
- **Day**: Court activity, footsteps on stone, castle bustle

### Magic Show / Theatre
- **Night**: Stage creaking, curtain sounds, mysterious music
- **Day**: Rehearsal sounds, spotlight hum, audience murmurs

### Space Station
- **Night**: Computer beeps, life support hum, distant alarms
- **Day**: Crew activity, ship systems, communication chatter

### Wild West Town
- **Night**: Desert night sounds, distant coyotes, saloon piano
- **Day**: Town activity, horses, tumbleweeds, busy saloon

### Pirate Harbour
- **Night**: Ocean waves, creaking ship, distant foghorn
- **Day**: Seagulls, busy port, sea shanties, ship bells

### Soap Opera Hospital
- **Night**: Quiet hospital, monitors beeping, PA system
- **Day**: Busy hospital, medical equipment, staff conversations

## Technical Notes

### Browser Compatibility
- Audio playback requires user interaction (browser security policy)
- First audio play happens when user clicks the audio toggle button
- Most modern browsers support MP3 and OGG formats

### Performance
- Audio files loop automatically
- Only one track plays at a time (switches on phase change)
- Audio stops when toggled off or when navigating away

### Troubleshooting
- **Audio doesn't play**: Check browser console for errors, ensure file paths are correct
- **Audio stutters**: Reduce file size or lower bitrate
- **Audio doesn't loop**: Ensure looping is enabled (default in the code)
- **Volume too loud/quiet**: Pre-normalize audio files before adding them

## Future Enhancements
- Sound effects for specific events (eliminations, votes, etc.)
- Custom audio upload feature
- Audio crossfade between tracks
- Equalizer or audio effects
