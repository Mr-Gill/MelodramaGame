# Melodrama Werewolf Narrator Tool

🎭 **[Launch the App →](https://mr-gill.github.io/MelodramaGame/)**

This repository hosts a single-page web application that helps drama teachers run the classroom game **Melodrama Werewolf**. The app is designed to work on GitHub Pages (or any static host) and includes a full roster of characters, night/day narration prompts, a classroom-friendly timer, and note-taking utilities.

## ✨ Features

### 🎯 Setup & Configuration
- **30 Character Roster**: Complete type-based system with 6 dramatic character types:
  - **Villain-Type** (EVIL): 5 characters including Evil Mastermind, Assassin, Pretender, Corrupted Authority, and Stalker
  - **Accomplice-Type** (EVIL): 5 characters including Right Hand, Spy, Manipulator, Traitor, and Informant
  - **Elder-Type** (GOOD): 5 information-gathering characters including Sage, Oracle, Sensitive, Dreamer, and Witness
  - **Hero-Type** (GOOD): 5 protective characters including Champion, Healer, Guardian, Survivor, and Defender
  - **Sidekick-Type** (GOOD): 5 dramatic day-action characters including Loyal Companion, Voice, Fool, Trickster, and Imitator
  - **Damsel-Type** (GOOD): 5 twist characters including Marked, Innocent, Twin A, Twin B, and Cursed
- **Flexible Player Count**: Support for 12-25 players with suggested role distributions
- **Auto-Balancing System**: Real-time feedback ensuring proper good/evil ratios and type distribution
- **Character Presets**: Quick-start configurations for common class sizes
- **Optional Name Assignment**: Enter student names to personalize the experience

### 🎬 Narrator Dashboard
- **Dynamic Script Generation**: Context-aware narration that adapts to:
  - Selected characters and their abilities
  - Current night/day phase
  - Special Night 1 introductions (Accomplices meet Villains, Champion sees Cursed, Twins identify, etc.)
  - Type-based night sequence (Steps 1-5)
- **Multi-Block Script Steps**: Clear visual hierarchy with:
  - 💬 **SAY blocks**: What to read aloud to players
  - 📋 **NARRATOR blocks**: Silent instructions for game management
  - ℹ️ **INFO blocks**: Quick reference information
  - ⚠️ **REMINDER blocks**: Critical alerts for special abilities
  - 👆 **ACTION blocks**: Interactive prompts for narrator decisions
- **Phase Navigation**: Easy progression through night and day sequences with Back/Next controls
- **Step-by-Step Guidance**: Never miss a character call or special ability

### ⏱️ Timer & Game Flow
- **Discussion Timer**: Built-in countdown for timed debates
  - Preset options: 1 minute, 3 minutes
  - Custom duration support
  - Start, Pause, and Reset controls
  - Large, classroom-visible display
- **Night/Day Tracking**: Visual phase indicators and night counter
- **Live Statistics**: Real-time tracking of:
  - Current night number
  - Total players alive
  - Good vs Evil team counts

### 👥 Player Management
- **Visual Player Cards**: Each player shows:
  - Student name and character role
  - Team affiliation (Good/Evil) with color coding
  - Character type badge
  - Ability description
  - Elimination status
  - Protection status
- **Quick Actions**:
  - Toggle eliminated status
  - Toggle protected status
  - Per-player notes field
- **Status Indicators**: Visual cues for alive, eliminated, and protected players

### 📝 Notes & Memory
- **Narrator Notes**: General notes area for game-wide reminders
- **Per-Player Notes**: Individual note fields for tracking protections, abilities used, and suspicions
- **Export Functionality**: Download all notes as a text file for record-keeping
- **Auto-Save**: Automatic localStorage persistence every action
- **Crash Recovery**: Resume interrupted games automatically

### 🎨 Themes & Customization
- **Multiple Themes**: Choose narrative flavor:
  - **Classic Village**: Foggy streets and suspicious glances
  - **Haunted Mansion**: Thunder, portraits, and supernatural drama
  - **Starship Melodrama**: Sci-fi setting with airlocks and zero-g reveals
- **Theme-Specific Scripts**: Each theme has unique narration for night openings, day announcements, and dramatic moments
- **Dark/Light Mode**: Toggle for different lighting conditions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 📽️ Projector View (NEW!)
- **Student-Facing Display**: Second screen optimized for classroom projectors
- **Auto-Sync**: Real-time updates from narrator view via BroadcastChannel API
- **Spoiler-Free**: Shows only public information (phase, timer, eliminated players)
- **High Visibility**: Large fonts and high contrast for easy viewing
- **One-Click Launch**: Open projector view with a single button click
- See [PROJECTOR.md](PROJECTOR.md) for detailed guide

### 💾 Progressive Web App (PWA)
- **Offline Support**: Full functionality after initial load via service worker
- **No Installation Required**: Runs entirely in the browser
- **No Build Step**: Single HTML file with embedded CSS and JavaScript
- **Mobile-Friendly**: Touch-optimized interface for tablet narration

## 🚀 Quick Start

### Use Online (Recommended)
Simply visit **[https://mr-gill.github.io/MelodramaGame/](https://mr-gill.github.io/MelodramaGame/)** in any modern browser. The app works offline after the first load.

### Run Locally
1. Clone this repository
2. Open `index.html` in a modern web browser
3. Alternatively, serve with a static server:
   ```bash
   npx serve .
   ```
   Then navigate to `http://localhost:3000`

No build step or dependencies required—the application is completely client-side.

## 📚 How to Use

1. **Setup Phase**:
   - Adjust player count slider (12-25)
   - Select characters from each type group
   - Watch the balance indicator to ensure proper distribution
   - Choose a theme for flavor
   - Optionally enter student names
   - Click "Enter Narrator View" when ready

2. **Night Phase**:
   - Follow the script prompts step by step
   - Call each character type in order (Villains → Accomplices → Elders → Heroes → Sidekicks)
   - Track eliminations and protections in the player panel
   - Use Next/Back buttons to navigate

3. **Day Phase**:
   - Announce night eliminations dramatically
   - Start the discussion timer
   - Facilitate voting
   - Record elimination results
   - Check for win conditions

4. **Throughout the Game**:
   - Toggle player eliminated/protected status as needed
   - Take notes on individual players
   - Use the narrator notes area for general reminders
   - Export notes at game end for records

## 🎓 For Teachers

This tool is designed specifically for secondary school drama teachers running 25-35 minute classroom sessions with 12-25 students. Key benefits:

- **Reduces cognitive load**: Never forget a character call or special ability
- **Prevents errors**: Built-in validation ensures game balance
- **Speeds up gameplay**: Streamlined interface keeps the game moving
- **Enhances drama**: Themed scripts add theatrical flair
- **Zero setup time**: No cards to shuffle or roles to assign manually
- **Crash-proof**: Auto-save means technical issues won't ruin your game

## 📖 Game System

The game uses a **type-based system** with 30 characters across 6 types. Each type has specific behaviors and night order positions:

- **Night Order**: Villains (Step 1) → Accomplices (Step 2) → Elders (Step 3) → Heroes (Step 4) → Sidekicks (Step 5)
- **Win Conditions**: Good wins when all evil eliminated; Evil wins when evil ≥ good
- **Special Mechanics**: Champion protection triggers, Stalker backup kills, Twin linked deaths, Cursed death explosions, and more

For full game rules and character details, see `Melodrama_Werewolf_App_Design_Brief_v2.md`.

## 🛠️ Development

The entire application is contained in `index.html` with:
- Embedded CSS for styling
- Embedded JavaScript for logic
- No external dependencies
- Service worker (`sw.js`) for offline support
- PWA manifest (`manifest.json`) for app installation

## 🌐 Deployment

The app is automatically deployed to GitHub Pages at **[https://mr-gill.github.io/MelodramaGame/](https://mr-gill.github.io/MelodramaGame/)**.

To deploy your own version:
1. Fork this repository
2. Enable GitHub Pages (Settings → Pages → Deploy from main branch)
3. Visit your published URL

## 📄 License

Created as a teaching aid for the **Melodrama Werewolf: Year 7** drama unit.

## 🙏 Acknowledgements

Design and development based on the comprehensive design brief v2.0. All character concepts and game mechanics are original to the Melodrama Werewolf system.
