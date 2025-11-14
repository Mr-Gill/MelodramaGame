# Projector View Guide

## Overview

The Projector View is a student-facing display screen designed to be shown on a projector or second monitor during gameplay. It displays public game information without revealing secret roles or narrator-only information.

## Features

### What Students See:
- **Current Phase**: Night or Day indicator with night number
- **Discussion Timer**: Large, visible countdown during debates
- **Eliminated Players**: List of players who have been eliminated (names only, no roles)
- **Connection Status**: Visual indicator showing sync with narrator

### What Students DON'T See:
- Character roles or abilities
- Night actions or targets
- Narrator notes or instructions
- Protected/trapped player status
- Any other secret game information

## How to Use

### Opening the Projector View

1. Start your game in the narrator view (index.html)
2. Click the **"📽️ Open Projector View"** button in the top header
3. A new window will open with the projector display
4. Move this window to your projector/second screen
5. Maximize it for best visibility (F11 for fullscreen)

### Automatic Synchronization

The projector view automatically syncs with the narrator view using the browser's BroadcastChannel API:

- **Phase Changes**: When you advance through night/day phases
- **Timer Updates**: Live countdown during discussions
- **Eliminations**: When players are marked as eliminated
- **Game Reset**: When starting a new game

No manual updates needed - just control the game from the narrator view!

## Technical Details

### Browser Compatibility

The projector view requires a modern browser that supports the BroadcastChannel API:
- ✅ Chrome/Edge 54+
- ✅ Firefox 38+
- ✅ Safari 15.4+
- ❌ Internet Explorer (not supported)

### Connection Status

- **Green "Connected"**: Projector is receiving updates from narrator
- **Red "Waiting for Narrator"**: No connection detected
  - Make sure both windows are from the same origin (same domain/port)
  - Try refreshing the projector view
  - Check that the narrator view is still open

### Offline Support

Like the narrator view, the projector view works offline after the first load thanks to the service worker. Perfect for classrooms with unreliable internet!

## Classroom Tips

1. **Test Before Class**: Open both views before students arrive to ensure sync works
2. **Fullscreen Mode**: Press F11 in the projector window for immersive display
3. **High Contrast**: The dark theme with large text is optimized for projector visibility
4. **Timer Warning**: The timer changes color (yellow at 30s, red at 10s) to build tension
5. **Position**: Place where all students can see, but the narrator screen should remain private

## Troubleshooting

### Projector not updating?
- Refresh the projector window
- Click "Open Projector View" again from the narrator
- Check that popup blockers aren't preventing the window from opening

### Connection lost during game?
- The projector will automatically reconnect when the narrator view sends the next update
- You can manually refresh the projector view - it will request current state on load

### Timer desynchronized?
- This can happen if the browser tab is backgrounded for too long
- Click "Reset Timer" in the narrator view, then restart it

## Design Philosophy

The projector view is intentionally minimal and spoiler-free. It enhances the classroom experience by:
- Keeping all students informed of public information
- Creating dramatic tension with the timer
- Building anticipation as the eliminated list grows
- Maintaining the mystery of who has which roles

It's designed to complement, not replace, the drama and performance aspects of the game!
