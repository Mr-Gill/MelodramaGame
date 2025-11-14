# MELODRAMA WEREWOLF - Digital Narrator Tool
## Comprehensive Design Brief v2.0

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
A single-page web application designed for secondary school drama teachers to narrate the "Melodrama Werewolf" game. The tool manages a 30-character type-based system with complex interactions, special abilities, and thematic flexibility while minimizing narrator cognitive load during live classroom gameplay.

### 1.2 Core Requirements
- **Target Users:** Drama teachers running 25-35 minute classroom sessions
- **Player Count:** 12-25 students (typical: 15-18)
- **Platform:** Single HTML file + embedded CSS/JS for maximum portability
- **Deployment:** GitHub Pages (static hosting)
- **Offline Support:** Full functionality after initial load (service worker)
- **Mobile-Friendly:** Responsive design for tablet/phone narrator view
- **Accessibility:** WCAG 2.1 AA compliant

### 1.3 Success Metrics
- Teachers can run a complete 18-player game in 25-35 minutes
- New teachers can successfully narrate their first game with <5 minutes of tool familiarization
- 90%+ of narrator errors prevented by the tool
- Zero technical support required during gameplay

---

## 2. GAME SYSTEM ARCHITECTURE

### 2.1 Character Type System (30 Characters Total)

The game uses a **type-based system** with 6 character types (5 characters per type):

#### **A. VILLAIN-TYPE (5 characters - EVIL)**
- **Night Behavior:** All wake together in Step 1, every night
- **Core Mechanic:** Coordinate to choose one elimination
- **Characters:**
  1. **The Evil Mastermind** - Leads decisions, breaks ties
  2. **The Assassin** - Once per game: second victim same night
  3. **The Pretender** - Appears GOOD to Elder-type checks
  4. **Corrupted Authority** - Vote counts as 2 (narrator repeats vote)
  5. **The Stalker** - Backup kill if first target protected (only works on Damsel/Elder types)

#### **B. ACCOMPLICE-TYPE (5 characters - EVIL)**
- **Night Behavior:** Night 1: See all evil | After: Thumbs-up in Step 2 (once per game)
- **Core Mechanic:** One powerful ability, used strategically
- **Characters:**
  6. **The Right Hand** - Block one player's night ability
  7. **The Spy** - Check if player has night action
  8. **The Manipulator** - Silence player's vote next day
  9. **The Traitor** - Force revote if marked player eliminated
  10. **The Informant** - Reveal player's exact role to all evil

#### **C. ELDER-TYPE (5 characters - GOOD)**
- **Night Behavior:** Wake every night in Step 3, individually
- **Core Mechanic:** Information gathering only (never save/kill)
- **Characters:**
  11. **The Sage** - Check 2 players (👍 if ≥1 evil, 👎 if both good)
  12. **The Oracle** - Check 1 player (🟥 evil or 🟦 good)
  13. **The Sensitive** - Check if player has night action
  14. **The Dreamer** - Learn # of evil adjacent to them
  15. **The Witness** - Narrator gives 1 meta-clue about previous day/night

#### **D. HERO-TYPE (5 characters - GOOD)**
- **Night Behavior:** Wake every night in Step 4, individually
- **Core Mechanic:** Protection, survival, defensive powers
- **Characters:**
  16. **The Champion** - N1: Sees Cursed | Every night: Protect (if triggered: both survive, identifies 1 villain, loses power permanently)
  17. **The Healer** - Protect one player (can't repeat)
  18. **The Guardian** - Offer to sacrifice self for target
  19. **The Survivor** - If killed at night, survives until after next day's vote
  20. **The Defender** - Trap player (if killed, random villain also dies)

#### **E. SIDEKICK-TYPE (5 characters - GOOD)**
- **Night Behavior:** May wake Night 1 for info | Thumbs-up in Step 5 (once per game)
- **Core Mechanic:** Risky day effects with dice rolls (4-6 success, 1-3 fail + blowback)
- **Characters:**
  21. **The Loyal Companion** - N1: Sees Champion | Once: +3 votes to Champion's target (dice)
  22. **The Voice** - After vote: Double elimination (dice)
  23. **The Fool** - Dramatic accusation (dice)
  24. **The Trickster** - False claim (dice)
  25. **The Imitator** - Copy another's day power (dice)

#### **F. DAMSEL-TYPE (5 characters - GOOD)**
- **Night Behavior:** No regular night actions (some Night 1 links)
- **Core Mechanic:** Powerful day twists
- **Characters:**
  26. **The Marked** - Once: Demand revote when voted out
  27. **The Innocent** - Once: Narrator confirms as good
  28. **Twin A** - N1: Sees Twin B | Linked death
  29. **Twin B** - N1: Sees Twin A | Linked death
  30. **The Cursed** - N1: Champion sees | Death kills 2 neighbors each side (5 total deaths)

### 2.2 Night Order Sequence

**EVERY NIGHT (after Night 1 setup):**
1. **Step 1:** VILLAIN-TYPE (all wake together) → Choose victim
2. **Step 2:** ACCOMPLICE-TYPE thumbs-up check → 0-1 player acts
3. **Step 3:** ELDER-TYPE (each wakes individually) → Gather info
4. **Step 4:** HERO-TYPE (each wakes individually) → Protect/defend
5. **Step 5:** SIDEKICK-TYPE thumbs-up check → 0-1 player acts

**NIGHT 1 SPECIAL ADDITIONS:**
- **Before Step 1:** Accomplices wake WITH Villains to see evil team
- **Before Step 3:** Champion sees Cursed
- **Before Step 3:** Twins see each other
- **Before Step 5:** Loyal Companion sees Champion

### 2.3 Win Conditions
- **Good Wins:** All evil eliminated
- **Evil Wins:** Evil ≥ Good (e.g., 6 evil + 6 good = evil wins)
- **Check:** After every elimination (night and day)

---

## 3. INFORMATION ARCHITECTURE

### 3.1 Application States

```
SETUP → NIGHT_1_INTRO → NIGHT_LOOP → DAY_LOOP → RESOLUTION → GAME_OVER
                              ↑_______________|
```

#### State Details:
- **SETUP:** Character selection, player names, theme choice
- **NIGHT_1_INTRO:** Special Night 1 calls (Accomplices see evil, Champion sees Cursed, Twins, etc.)
- **NIGHT_LOOP:** Steps 1-5 (see 2.2)
- **DAY_LOOP:** Announce deaths → Discussion (timer) → Vote → Check win
- **RESOLUTION:** Calculate night outcomes, handle special deaths
- **GAME_OVER:** Win announcement, role reveals, new game option

### 3.2 Data Models

#### Game State Object:
```javascript
{
  // Core Setup
  players: [
    {
      id: 0,                    // Sequential player ID
      name: "Student Name",
      charId: 16,              // References CHARACTERS_DATA
      charName: "The Champion",
      team: "good",            // or "evil"
      type: "hero",            // villain|accomplice|elder|hero|sidekick|damsel
      isAlive: true,
      notes: "",               // Narrator's private notes
      
      // Tracking
      protectedLastNight: null,     // Player ID or null
      targetedTonight: false,       // Boolean flag
      abilityUsed: false,          // For limited-use abilities
      
      // Special Trackers
      twinId: null,                // For Twin A/B pairing
      belovedId: null,            // For Romantic links (if added)
      wasHitOnce: false,          // For Damsel-type survivals
    }
  ],
  
  // Game Progress
  currentNight: 1,
  currentPhase: "night",     // "night" | "day" | "setup"
  scriptStep: 0,             // Current step in script generator
  
  // Night Resolution Tracking
  nightActions: {
    villainTarget: null,         // Player ID
    assassinTarget: null,        // Player ID (once per game)
    stalkerBackupTarget: null,   // Player ID
    
    accompliceActing: null,      // Char ID (6-10)
    rightHandBlock: null,        // Player ID
    spyCheck: null,             // Player ID
    manipulatorSilence: null,   // Player ID
    traitorMark: null,          // Player ID
    informantReveal: null,      // Player ID
    
    championProtect: null,       // Player ID
    healerProtect: null,        // Player ID
    guardianProtect: null,      // Player ID
    defenderTrap: null,         // Player ID
    
    sidekickActing: null,       // Char ID (21-25)
    sidekickDiceRoll: null,     // 1-6 or null
    
    loyalCompanionTarget: null, // Player ID (Champion's vote target)
    voiceActivated: false,      // Boolean
    foolTarget: null,           // Player ID
    tricksterClaim: "",         // String description
    imitatorTarget: null,       // Player ID
  },
  
  // Day Tracking
  dayActions: {
    votedOut: null,            // Player ID
    corruptedAuthorityVoted: null, // Player ID they voted for
    manipulatedPlayer: null,   // Player ID who can't vote
    traitorTriggered: false,   // Boolean
    markedRevoteUsed: false,   // Boolean
  },
  
  // Special State
  specialTrackers: {
    championPowerActive: true,     // Loses power after first trigger
    championIdentifiedVillain: null, // Player ID
    
    stalkerLastAttempt: null,      // Player ID (for tracking)
    
    twinPair: { a: null, b: null }, // Player IDs
    cursedId: null,                 // Player ID
    
    // Passive survival tracking
    damselHitOnce: {},             // { playerId: true }
    
    // Dice roll history (for Sidekicks)
    diceHistory: [],               // [{ night, charId, roll, result }]
  },
  
  // Meta
  theme: "village",          // Theme key
  abilityTrackers: {         // { charId: usesRemaining }
    2: 1,  // Assassin
    6: 1,  // Right Hand
    // ... etc for all limited-use abilities
  },
  
  // History & Logs
  gameLog: [],              // [{ timestamp, phase, message }]
  eliminationHistory: [],   // [{ night/day, playerId, cause }]
}
```

#### Character Definition Object:
```javascript
CHARACTERS_DATA = {
  16: {
    id: 16,
    name: "The Champion",
    team: "good",
    type: "hero",
    nightOrder: 4,              // Which step (1-5)
    limitedUse: false,          // or number
    
    ability: {
      night1: "See the Cursed",
      ongoing: "Protect one player. If attacked: both survive, you identify one villain, lose power permanently."
    },
    
    // For script generation
    scriptCalls: {
      night1: {
        prompt: "Champion, open your eyes.",
        instruction: "Point to [Cursed Player]. They need your protection.",
        action: "identifyCursed"
      },
      everyNight: {
        prompt: "Champion, choose one player to protect.",
        instruction: "Click player to protect. If they're attacked, Champion identifies a villain.",
        action: "selectProtection",
        constraint: "powerActive"  // Only if championPowerActive === true
      }
    },
    
    // For resolution engine
    resolution: {
      onProtectionTriggered: (state, protectedId) => {
        // Complex logic here
        state.specialTrackers.championPowerActive = false;
        // Identify random villain
        // etc.
      }
    }
  },
  // ... (all 30 characters)
}
```

#### Theme Definition Object:
```javascript
THEMES = {
  village: {
    name: "Classic Village",
    
    script: {
      nightOpening: "The village falls asleep... Evil stirs in the darkness...",
      dayOpening: "The sun rises over the village. Everyone, open your eyes.",
      noDeaths: "Last night, the village was quiet. No one was eliminated.",
      deaths: "Last night, there was terrible melodrama! We lost {victims}.",
      dayDiscussion: "Now we discuss. Be dramatic with your accusations!",
      voting: "Time's up! On three, everyone point to who you want to eliminate.",
    },
    
    styling: {
      background: "linear-gradient(to bottom, #1e3a8a, #7c3aed)",
      fontFamily: "Georgia, serif",
      accentColor: "#f59e0b",
    },
    
    audio: {
      nightAmbient: "url_to_cricket_sounds.mp3",  // Optional
      dayAmbient: "url_to_birds.mp3",
    }
  },
  // ... (9 themes total)
}
```

---

## 4. USER INTERFACE SPECIFICATION

### 4.1 Layout Structure

#### **SETUP SCREEN** (Full-Width Single Column)
```
┌─────────────────────────────────────────────────────┐
│  MELODRAMA WEREWOLF         [Help] [Dark] [Reset]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Game Setup                                         │
│  ┌─────────────────────────────────────────────┐  │
│  │ 1. Player Count: [15 ▼]   (12-25)          │  │
│  │                                              │  │
│  │ 2. Load Preset: [15 Players] [18] [21]     │  │
│  │    Current: 0 Good, 0 Evil (0 Total)       │  │
│  │    ⚠️ Balance: Select characters           │  │
│  │                                              │  │
│  │ 3. Select Characters (by Type)              │  │
│  │                                              │  │
│  │    VILLAIN-TYPE (EVIL) - Select 2-4        │  │
│  │    [Card 1] [Card 2] [Card 3] [Card 4] ... │  │
│  │                                              │  │
│  │    ACCOMPLICE-TYPE (EVIL) - Select 2-3     │  │
│  │    [Card 6] [Card 7] [Card 8] [Card 9] ... │  │
│  │                                              │  │
│  │    ELDER-TYPE (GOOD) - Select 2-3          │  │
│  │    [Card 11] [Card 12] [Card 13] ...       │  │
│  │                                              │  │
│  │    HERO-TYPE (GOOD) - Select 2-3           │  │
│  │    [Card 16] [Card 17] [Card 18] ...       │  │
│  │                                              │  │
│  │    SIDEKICK-TYPE (GOOD) - Select 2-3       │  │
│  │    [Card 21] [Card 22] [Card 23] ...       │  │
│  │                                              │  │
│  │    DAMSEL-TYPE (GOOD) - Select 2-3         │  │
│  │    [Card 26] [Card 27] [Card 28] ...       │  │
│  │                                              │  │
│  │ 4. Theme: [Classic Village ▼]              │  │
│  │                                              │  │
│  │ 5. Assign Player Names (Optional)           │  │
│  │    [Expandable list of selected chars]     │  │
│  │                                              │  │
│  │           [START GAME]                      │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **GAME SCREEN** (Three-Column Responsive Grid)

**Desktop Layout (>1024px):**
```
┌──────────────────────────────────────────────────────────────┐
│  MELODRAMA WEREWOLF - Night 1    [Help] [Dark] [New Game]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   SCRIPT     │  │   STATUS     │  │   PLAYERS        │  │
│  │   (40%)      │  │   (30%)      │  │   (30%)          │  │
│  │──────────────│  │──────────────│  │──────────────────│  │
│  │              │  │   ⏱ TIMER    │  │  [Filter: All▼]  │  │
│  │ [Phase]      │  │   3:00       │  │                   │  │
│  │ Night 1      │  │              │  │  ▼ Player 1      │  │
│  │              │  │  ┌─────────┐ │  │     The Champion │  │
│  │ "SAY:        │  │  │Night: 1 │ │  │     [✓] [Note]   │  │
│  │  Evil team   │  │  │Alive: 15│ │  │                   │  │
│  │  choose..."  │  │  │Good: 10 │ │  │  ▼ Player 2      │  │
│  │              │  │  │Evil: 5  │ │  │     The Sage     │  │
│  │ [NARRATOR:   │  │  │Elim: 0  │ │  │     [✓] [Note]   │  │
│  │  Wait for    │  │  └─────────┘ │  │                   │  │
│  │  agreement]  │  │              │  │  ... (scroll)     │  │
│  │              │  │  LIMITED USE │  │                   │  │
│  │ [INFO:       │  │  • Assassin  │  │                   │  │
│  │  Evil sees   │  │    1 left    │  │                   │  │
│  │  cards 1-5]  │  │  • Right Hand│  │                   │  │
│  │              │  │    1 left    │  │                   │  │
│  │              │  │              │  │                   │  │
│  │ (scrollable) │  │ (scrollable) │  │  (scrollable)     │  │
│  │              │  │              │  │                   │  │
│  ├──────────────┤  └──────────────┘  └──────────────────┘  │
│  │    [NEXT]    │                                           │
│  └──────────────┘                                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Mobile/Tablet Layout (<1024px):**
- Stack vertically: Script → Status → Players
- Script panel fixed at top (collapsible)
- NEXT button always visible (floating or sticky)

### 4.2 Component Specifications

#### **A. CHARACTER SELECTION CARDS**

**Visual Design:**
- Size: 180px × 240px (desktop), 140px × 180px (mobile)
- Border: 3px solid (team color)
- Hover: Scale 1.05, shadow glow
- Selected: Border 5px, checkmark overlay, scale 1.08

**Color Coding by Type:**
| Type | Background | Border | Text |
|------|-----------|--------|------|
| Villain | Pink-100/900 | Pink-500 | Pink-900/100 |
| Accomplice | Red-100/900 | Red-500 | Red-900/100 |
| Elder | Blue-100/900 | Blue-500 | Blue-900/100 |
| Hero | Cyan-100/900 | Cyan-500 | Cyan-900/100 |
| Sidekick | Green-100/900 | Green-500 | Green-900/100 |
| Damsel | Purple-100/900 | Purple-500 | Purple-900/100 |

**Card Content:**
```
┌────────────────────┐
│ [TYPE BADGE]       │  ← Small pill: "VILLAIN"
│                    │
│  The Evil          │  ← Character Name (bold, 18px)
│  Mastermind        │
│                    │
│  EVIL              │  ← Team (12px, caps)
│                    │
│  ───────────────   │  ← Divider
│                    │
│  Night: Leads evil │  ← Ability (14px, 3 lines max)
│  decisions. Breaks │
│  ties.             │
│                    │
│  [👁] View Full   │  ← Expandable tooltip
└────────────────────┘
```

**Interaction:**
- Click: Toggle selection
- Hover: Show full ability in tooltip
- Disabled state: Grayed out if conflicts (e.g., can't select both Twin A without Twin B)

#### **B. SCRIPT PANEL**

**Typography:**
- Read-aloud text: 24px, italic, white-on-dark or dark-on-light
- Narrator instructions: 20px, bold, yellow/amber background
- Info boxes: 18px, normal, blue/indigo background

**Block Types:**
1. **"SAY" Block** (What narrator reads aloud)
```
┌─────────────────────────────────────┐
│ 💬 SAY:                             │
│ "Evil team, open your eyes.         │
│  Silently choose one player to      │
│  eliminate."                        │
└─────────────────────────────────────┘
```

2. **"NARRATOR" Block** (Silent instructions)
```
┌─────────────────────────────────────┐
│ 📋 NARRATOR:                        │
│ Wait for them to agree. Watch for  │
│ pointing. Click the player they     │
│ target below.                       │
└─────────────────────────────────────┘
```

3. **"INFO" Block** (Reference information)
```
┌─────────────────────────────────────┐
│ ℹ️ INFO:                            │
│ Evil Team in this game:             │
│ • Player 1 (Evil Mastermind)        │
│ • Player 3 (Assassin)               │
│ • Player 5 (Pretender)              │
└─────────────────────────────────────┘
```

4. **"REMINDER" Block** (Critical alerts)
```
┌─────────────────────────────────────┐
│ ⚠️ REMINDER:                        │
│ Corrupted Authority (Player 8) is   │
│ alive. Their vote counts DOUBLE!    │
│ Repeat their vote: "Alex. Alex."    │
└─────────────────────────────────────┘
```

5. **"ACTION" Block** (Interactive prompts)
```
┌─────────────────────────────────────┐
│ 👆 ACTION NEEDED:                   │
│ Click the player the evil team      │
│ pointed to.                         │
│                                     │
│ [Player selection mode activated]   │
└─────────────────────────────────────┘
```

**Navigation:**
- Large NEXT button: 100% width, 60px height, always visible
- Keyboard: Spacebar = Next, Backspace = Previous (with confirm)
- Progress indicator: "Step 5 of 12" or progress bar

#### **C. STATUS PANEL**

**Timer Widget:**
```
┌─────────────────────┐
│  Discussion Timer   │
│                     │
│      3:00          │  ← 72px font, color-coded
│                     │     (green >30s, yellow >10s, red <10s)
│  [1m] [3m] [Custom] │  ← Quick start buttons
│  [Pause] [Reset]    │
│                     │
│  🔊 Alert at 30s: ☑│  ← Optional chime
└─────────────────────┘
```

**Game State Card:**
```
┌─────────────────────┐
│   Game State        │
├─────────────────────┤
│ Night: 2            │
│                     │
│ Alive: 13           │
│ ├─ Good: 8          │
│ └─ Evil: 5          │
│                     │
│ Eliminated: 5       │
└─────────────────────┘
```

**Limited Use Tracker:**
```
┌─────────────────────────┐
│   Limited Abilities     │
├─────────────────────────┤
│ [●] Assassin (2x)       │  ← Green dot = available
│     Player 3            │     Gray dot = used
│                         │
│ [○] Right Hand (6x)     │
│     Player 6 - USED     │
│                         │
│ [●] Voice (22x)         │
│     Player 11           │
└─────────────────────────┘
```

**Special Trackers:**
```
┌─────────────────────────┐
│   Special States        │
├─────────────────────────┤
│ 🔗 Twins Linked:        │
│    Player 5 ↔ Player 9  │
│                         │
│ 💀 Cursed:              │
│    Player 12            │
│    (2 neighbors/side)   │
│                         │
│ 🛡️ Champion Power:     │
│    [ACTIVE]             │
└─────────────────────────┘
```

#### **D. PLAYER LIST**

**Player Card (View Mode):**
```
┌─────────────────────────────────┐
│ ▼ Player 1 - Sarah              │  ← Click to expand
│   The Champion (HERO)           │
│   [Alive] [Note ▼]              │  ← Toggle buttons
├─────────────────────────────────┤
│ 📝 Notes:                       │  ← Expandable
│ [Protected by Healer N2]        │  ← Auto-added tags
│ [_____________________]         │  ← Freeform input
│                                 │
│ 🔍 Quick Facts:                 │
│ • Type: Hero                    │
│ • Night Order: Step 4           │
│ • Power Active: ✓               │
│                                 │
│ 🎲 History:                     │
│ • N1: Identified Cursed         │
│ • N2: Protected Player 7        │
└─────────────────────────────────┘
```

**Player Card (Selection Mode):**
```
┌─────────────────────────────────┐
│ 👆 Player 1 - Sarah              │  ← Clickable, highlighted
│   The Champion (HERO)           │
│   ✓ AVAILABLE                   │
└─────────────────────────────────┘
```

**Filters:**
- All Players
- Alive Only
- Good Team
- Evil Team
- By Type (dropdown)

**Visual States:**
- Alive: Full opacity, colored border
- Eliminated: 50% opacity, strikethrough, gray border
- Protected: Green shield icon
- Targeted: Red crosshair icon
- Acting Now: Yellow pulse animation

#### **E. MODALS**

**Help Modal:**
- Tabbed interface: "Current Game" | "All Characters" | "Quick Guide"
- Searchable character list
- Keyboard shortcuts reference
- PDF export button (opens printable version)

**Win Modal:**
- Large team color overlay (blue/red)
- Confetti animation (CSS only)
- Final stats
- "New Game" and "View History" buttons

**Dice Roll Modal** (for Sidekick powers):
```
┌───────────────────────────────────┐
│         🎲 DICE ROLL               │
│                                   │
│   [Roll d6]                       │
│                                   │
│   Result: 5                       │
│                                   │
│   ✅ SUCCESS!                     │
│   Voice's double elimination      │
│   works!                          │
│                                   │
│   [Confirm]                       │
└───────────────────────────────────┘
```

**Confirmation Modal:**
- Standard pattern for destructive actions
- Clear primary/secondary button hierarchy

---

## 5. SCRIPT ENGINE SPECIFICATION

### 5.1 Generator Function Architecture

Use JavaScript generator functions to create a **pausable, step-by-step script**:

```javascript
function* createScriptEngine(gameState) {
  // Night 1 Setup
  if (gameState.currentNight === 1) {
    yield renderScriptStep({ /* Night 1 intro */ });
    
    // Night 1 special calls
    if (hasType("accomplice")) {
      yield callAccomplicesNight1();
    }
    if (hasChar(16)) { // Champion
      yield callChampionSeesCursed();
    }
    if (hasChar(28) && hasChar(29)) { // Twins
      yield callTwinsIdentify();
    }
    if (hasChar(21)) { // Loyal Companion
      yield callCompanionSeesChampion();
    }
  }
  
  // Main Game Loop
  while (true) {
    // NIGHT PHASE
    yield* nightPhaseSequence();
    
    // RESOLUTION
    const resolution = calculateNightResolution();
    yield renderResolutionSummary(resolution);
    
    // Handle special deaths (Brave Youth, Twins, Cursed)
    yield* handleSpecialDeaths(resolution);
    
    // DAY PHASE
    yield* dayPhaseSequence();
    
    // Check win condition
    if (checkWinCondition()) {
      yield renderWinScreen();
      break;
    }
    
    gameState.currentNight++;
  }
}

function* nightPhaseSequence() {
  // Step 1: Villain-Type
  yield* callVillainType();
  
  // Step 2: Accomplice-Type (thumbs-up)
  if (hasAvailableAccomplice()) {
    yield* callAccompliceThumbsUp();
  }
  
  // Step 3: Elder-Type (individual calls)
  yield* callElderType();
  
  // Step 4: Hero-Type (individual calls)
  yield* callHeroType();
  
  // Step 5: Sidekick-Type (thumbs-up)
  if (hasAvailableSidekick()) {
    yield* callSidekickThumbsUp();
  }
}

function* dayPhaseSequence() {
  yield renderDayOpening();
  
  // Announce eliminations
  yield announceDeaths();
  
  // Special day events
  if (gameState.currentNight === 1 && hasChar(27)) {
    yield announceInnocentChild();
  }
  
  // Discussion
  yield startDiscussionTimer();
  
  // Vote
  yield* handleDayVote();
  
  // Post-vote effects
  yield* handlePostVoteEffects();
}
```

### 5.2 Script Step Rendering

Each `yield` produces a script step object:

```javascript
{
  type: "script" | "action" | "selection" | "dice" | "confirmation",
  
  // For type: "script"
  title: "Call: Evil Team",
  blocks: [
    { type: "say", content: "Evil team, open your eyes." },
    { type: "narrator", content: "Wait for agreement..." },
    { type: "info", content: "Evil players: P1, P3, P5" },
    { type: "reminder", content: "Stalker gets backup if first fails" }
  ],
  
  // For type: "action"
  action: "selectPlayer",
  prompt: "Click the player evil targeted",
  callback: "setEvilTarget",
  filter: (player) => player.isAlive,
  optional: false,
  
  // For type: "selection"
  // (Similar to action but with multi-select)
  
  // For type: "dice"
  character: "The Voice",
  player: "Sarah",
  onRoll: (result) => { /* handle */ },
  
  // For type: "confirmation"
  message: "Are you sure?",
  onConfirm: () => { /* handle */ },
  onCancel: () => { /* handle */ }
}
```

### 5.3 Dynamic Script Generation

Scripts should be **context-aware**:

```javascript
// Example: Calling Villain-Type
function* callVillainType() {
  const villains = getAlivePlayersByType("villain");
  const villainNames = villains.map(p => p.name).join(", ");
  
  yield {
    type: "script",
    title: "Step 1: Villain-Type",
    blocks: [
      { 
        type: "say", 
        content: `${villainNames}, lift your heads. Choose one player to eliminate.`
      },
      {
        type: "narrator",
        content: "Watch for pointing and agreement. Remind them to use silent communication."
      },
      {
        type: "info",
        content: `${villains.length} villains alive: ${villainNames}`
      }
    ]
  };
  
  // Check for Assassin
  const assassin = getPlayerByCharId(2);
  if (assassin?.isAlive && assassin.abilityUsed === false) {
    yield {
      type: "script",
      blocks: [
        {
          type: "narrator",
          content: "If Assassin (Player 3) wishes to use their second kill, they may point now."
        }
      ]
    };
    
    yield {
      type: "action",
      prompt: "Click player evil targeted (first victim)",
      callback: "setVillainTarget",
      filter: (p) => p.isAlive
    };
    
    yield {
      type: "action",
      prompt: "Click Assassin's second victim (or SKIP)",
      callback: "setAssassinTarget",
      filter: (p) => p.isAlive,
      optional: true
    };
  } else {
    yield {
      type: "action",
      prompt: "Click player evil targeted",
      callback: "setVillainTarget",
      filter: (p) => p.isAlive
    };
  }
  
  // Check for Stalker
  const stalker = getPlayerByCharId(5);
  if (stalker?.isAlive) {
    yield {
      type: "script",
      blocks: [
        {
          type: "reminder",
          content: "If the target is protected, Stalker may choose a backup (only works on Damsel/Elder types)."
        }
      ]
    };
  }
}
```

---

## 6. RESOLUTION ENGINE SPECIFICATION

### 6.1 Night Resolution Algorithm

**Order of Operations:**
1. **Collect Actions** → From nightActions state
2. **Apply Blocks** → Right Hand blocking
3. **Determine Targets** → Villain target + Assassin (if used)
4. **Apply Protections** → Champion, Healer, Guardian, Defender
5. **Check Passives** → Damsel first-time survival, etc.
6. **Check Stalker** → If target protected + Stalker alive → backup attempt
7. **Compile Pre-Doctor List** → Who *would* die
8. **Call Doctor** (if in play) → Can save pre-doctor victims
9. **Compile Final List** → Actual deaths
10. **Trigger Reactions** → Brave Youth, Twins, Cursed, Champion identification

### 6.2 Complex Interaction Matrix

| Scenario | Resolution |
|----------|-----------|
| **Champion protects target that is attacked** | Both survive, Champion learns 1 random villain, Champion loses power permanently |
| **Stalker backup kill on Hero-type** | Fails (only works on Damsel/Elder) |
| **Stalker backup kill on Damsel (first hit)** | Damsel survives (passive), Stalker learns Damsel is protected |
| **Stalker backup kill on Damsel (second hit)** | Damsel dies |
| **Healer protects + Assassin both target same player** | Player survives (Healer protection blocks both) |
| **Defender trap triggered** | Victim dies, one random Villain-type also dies |
| **Champion protects + Defender traps same player** | Both protections apply, both trigger if attacked |
| **Right Hand blocks Champion** | Champion doesn't act that night |
| **Right Hand blocks Sidekick-type** | No block (Sidekicks use thumbs-up, not direct night action) |
| **Manipulator silences Corrupted Authority** | Corrupted Authority loses their double vote that day |
| **Twin A dies** | Twin B immediately dies (linked death) |
| **Cursed dies** | 2 neighbors each side die (5 total deaths) |
| **Doctor saves + Brave Youth died** | Brave Youth is saved, doesn't take anyone with them |
| **Doctor saves + Cursed died** | Cursed saved, neighbors DON'T die |
| **Voice double elimination + Cursed voted out** | Cursed + 2nd place die, then Cursed triggers explosion (could be 7 deaths!) |

### 6.3 Resolution Output Format

```javascript
{
  actions: [
    { type: "target", actor: "Evil Team", target: "Player 5" },
    { type: "protect", actor: "Player 2 (Champion)", target: "Player 5" },
    { type: "block", actor: "Player 6 (Right Hand)", target: "Player 8" }
  ],
  
  protections: [
    { player: "Player 5", protectedBy: "Champion", triggered: true }
  ],
  
  preDoctorEliminations: [
    { player: "Player 12", cause: "Assassin" }
  ],
  
  doctorSaved: [
    // If Doctor acted
  ],
  
  finalEliminations: [
    { player: "Player 12", cause: "Assassin" }
  ],
  
  specialEvents: [
    { type: "championIdentified", villain: "Player 3 (Evil Mastermind)" },
    { type: "championPowerLost", champion: "Player 5" }
  ],
  
  stateChanges: {
    "specialTrackers.championPowerActive": false,
    "abilityTrackers.2": 0
  }
}
```

### 6.4 Resolution Visualization

Display in **collapsible summary** before Doctor call:

```
┌─────────────────────────────────────────┐
│  📊 NIGHT RESOLUTION SUMMARY            │
├─────────────────────────────────────────┤
│  🎯 TARGETS:                            │
│  • Player 5 (Evil Team)                 │
│  • Player 12 (Assassin)                 │
│                                         │
│  🛡️ PROTECTIONS:                        │
│  • Player 5 protected by Champion       │
│    → Champion triggered! Identifies     │
│       villain: Player 3                 │
│    → Champion LOSES POWER               │
│                                         │
│  💀 PENDING ELIMINATIONS:               │
│  • Player 12 (Assassin)                 │
│                                         │
│  [CALL DOCTOR NOW] or [PROCEED]        │
└─────────────────────────────────────────┘
```

---

## 7. SPECIAL MECHANICS IMPLEMENTATION

### 7.1 Dice Roll System (Sidekick Powers)

**UI Flow:**
1. Sidekick uses thumbs-up in Step 5
2. Script notes: "Will resolve during Day phase"
3. During Day, *before* vote, show dice roll modal
4. Narrator rolls (or player rolls if preferred)
5. Apply success (4-6) or failure (1-3) immediately

**Code Structure:**
```javascript
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function applySidekickPower(charId, roll, gameState) {
  const success = roll >= 4;
  
  const powerHandlers = {
    21: handleLoyalCompanion,    // +3 votes
    22: handleVoice,             // Double elimination
    23: handleFool,              // Dramatic accusation
    24: handleTrickster,         // False claim
    25: handleImitator,          // Copy power
  };
  
  return powerHandlers[charId](success, gameState);
}

function handleVoice(success, gameState) {
  if (success) {
    return {
      message: "SUCCESS! Second-place player is also eliminated.",
      action: () => {
        // Add second-place to elimination list
        const secondPlace = calculateSecondPlace();
        eliminatePlayer(secondPlace);
      }
    };
  } else {
    return {
      message: "FAIL! Voice must perform embarrassing monologue.",
      action: () => {
        // Just record the failure
        gameState.gameLog.push({
          message: "Voice's power failed. They revealed themselves!"
        });
      }
    };
  }
}
```

### 7.2 Card Type Checking (Stalker)

**When Stalker targets a backup:**
1. Get target player
2. Check `CHARACTERS_DATA[player.charId].type`
3. If type === "damsel" OR type === "elder" → Kill succeeds
4. Otherwise → Show narrator: "Stalker's backup failed (target too strong)"

**UI Helper:**
```javascript
// In player card view mode, add a small badge
function renderPlayerCard(player) {
  return `
    <div class="player-card">
      <span class="type-badge">${player.type}</span>
      ${player.name} - ${player.charName}
    </div>
  `;
}
```

### 7.3 Corrupted Authority Double Vote

**Implementation:**
1. During vote counting, ask: "Who did Corrupted Authority vote for?"
2. When narrator clicks player, **automatically repeat** the vote audibly
3. Script shows: "Say: '[Player name]. [Player name].'"
4. Add 2 votes to that player's total instead of 1

**Code:**
```javascript
function handleDayVote() {
  const corruptedAuthority = getPlayerByCharId(4);
  
  if (corruptedAuthority?.isAlive) {
    // Show reminder
    yield {
      type: "script",
      blocks: [{
        type: "reminder",
        content: `${corruptedAuthority.name} (Corrupted Authority) votes count DOUBLE. Repeat their vote: "Name. Name."`
      }]
    };
  }
  
  // ... vote counting
}
```

### 7.4 Twin Linked Death

**Implementation:**
1. When calculating eliminations (night or day), check if victim is a Twin
2. If victim.twinId !== null:
   - Get twin = getPlayerById(victim.twinId)
   - If twin.isAlive:
     - Add twin to elimination list
     - Add event: "Twin [name] died of heartbreak"

**Script:**
```javascript
if (player.twinId && getPlayerById(player.twinId).isAlive) {
  yield {
    type: "script",
    title: "Heartbreak!",
    blocks: [
      {
        type: "say",
        content: `As ${player.name} is eliminated... ${getTwinName(player)} dies of a broken heart!`
      },
      {
        type: "narrator",
        content: "Both Twins perform death scenes simultaneously."
      }
    ]
  };
  
  eliminatePlayer(player.twinId);
}
```

### 7.5 Cursed Death Explosion

**Implementation:**
1. When Cursed is eliminated (night or day)
2. Calculate seating position:
   ```javascript
   const victims = [
     getPlayerAtPosition(cursed.position - 2),
     getPlayerAtPosition(cursed.position - 1),
     cursed,
     getPlayerAtPosition(cursed.position + 1),
     getPlayerAtPosition(cursed.position + 2),
   ].filter(p => p && p.isAlive);
   ```
3. Eliminate all 5 (or however many are actually alive)

**UI Warning:**
Before eliminating Cursed, show confirmation:
```
⚠️ WARNING: Eliminating the Cursed will kill 4 additional players:
• Player at position [N-2]
• Player at position [N-1]
• Player at position [N+1]
• Player at position [N+2]

Are you sure? [Confirm] [Cancel]
```

---

## 8. TECHNICAL IMPLEMENTATION

### 8.1 File Structure

```
melodrama-werewolf/
│
├── index.html              (All-in-one file for portability)
│
├── README.md
├── LICENSE
│
├── docs/                   (For GitHub Pages)
│   ├── index.html         (Copy of main file)
│   ├── manifest.json      (PWA manifest)
│   └── sw.js              (Service worker)
│
└── assets/                 (Optional - can be embedded as data URIs)
    ├── icons/
    │   ├── icon-192.png
    │   └── icon-512.png
    └── audio/              (Optional ambient sounds)
```

### 8.2 Core Modules (Embedded in index.html)

**Structure within `<script type="module">`:**

```javascript
// ============================================
// DATA LAYER
// ============================================
const CHARACTERS_DATA = { /* 30 characters */ };
const THEMES = { /* 9 themes */ };
const PRESETS = { /* 15, 18, 21 player setups */ };

// ============================================
// STATE MANAGEMENT
// ============================================
let gameState = { /* main game object */ };

function initGameState() { }
function saveGame() { }
function loadGame() { }
function resetGame() { }

// ============================================
// UI RENDERING
// ============================================
function renderSetupScreen() { }
function renderGameScreen() { }
function renderScriptPanel(step) { }
function renderPlayerList(mode, options) { }
function renderStatusPanel() { }

// ============================================
// SCRIPT ENGINE
// ============================================
function* createScriptEngine(state) { }
function* nightPhaseSequence() { }
function* dayPhaseSequence() { }
function* callVillainType() { }
function* callAccompliceThumbsUp() { }
// ... etc

// ============================================
// RESOLUTION ENGINE
// ============================================
function calculateNightResolution() { }
function applyProtections(targets) { }
function checkSpecialDeaths(eliminations) { }
function handleStalkerBackup(target) { }
function handleChampionTrigger(protectedId) { }
// ... etc

// ============================================
// GAME LOGIC HELPERS
// ============================================
function checkWinCondition() { }
function getPlayersByType(type) { }
function getPlayerByCharId(charId) { }
function hasAvailableAbility(charId) { }
function useAbility(charId) { }
// ... etc

// ============================================
// UI CONTROLLERS
// ============================================
function showModal(type, data) { }
function startTimer(seconds) { }
function pauseTimer() { }
function rollDice() { }
function setPlayerSelectionMode(options) { }
// ... etc

// ============================================
// EVENT HANDLERS
// ============================================
function handleCharacterSelect(event) { }
function handlePlayerListClick(event) { }
function handleScriptNext() { }
function handleDayVote() { }
// ... etc

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', init);
```

### 8.3 LocalStorage Schema

```javascript
localStorage.setItem('melodrama_werewolf_game', JSON.stringify({
  version: "2.0",
  savedAt: "2025-01-15T10:30:00Z",
  gameState: { /* full gameState object */ }
}));

localStorage.setItem('melodrama_werewolf_preferences', JSON.stringify({
  darkMode: true,
  soundEnabled: false,
  timerDefault: 180,
  autoSave: true
}));
```

### 8.4 Service Worker (Offline Support)

**sw.js:**
```javascript
const CACHE_NAME = 'melodrama-werewolf-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add any external resources if not embedded
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### 8.5 PWA Manifest

**manifest.json:**
```json
{
  "name": "Melodrama Werewolf Narrator Tool",
  "short_name": "MW Narrator",
  "description": "Digital narrator tool for running Melodrama Werewolf in drama classes",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e293b",
  "theme_color": "#ec4899",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 9. ACCESSIBILITY & USABILITY

### 9.1 WCAG 2.1 AA Compliance

**Color Contrast:**
- Text: Minimum 4.5:1 ratio
- Large text (>24px): Minimum 3:1 ratio
- Interactive elements: 3:1 against background

**Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Visible focus indicators (2px solid outline)
- Keyboard shortcuts:
  - Space: Next script step
  - T: Start 3-minute timer
  - R: Reset timer
  - H: Open help
  - Esc: Close modals
  - ?: Show keyboard shortcuts

**Screen Reader Support:**
- Semantic HTML5 elements
- ARIA labels for all icons
- ARIA live regions for timer and status updates
- Skip to content link

**Reduced Motion:**
- Detect `prefers-reduced-motion`
- Disable animations if preferred
- Use instant transitions instead

### 9.2 Classroom-Specific Features

**Projector Mode:**
- Toggle for increased font sizes (1.5x)
- High-contrast mode
- Simplified layout (hide non-essential panels)

**Quick Recovery:**
- Auto-save every 5 seconds
- "Resume Game" on page load if interrupted
- Export game state as JSON (backup)
- Import game state (restore from backup)

**Teacher Notes:**
- Persistent notepad in sidebar
- Export notes as text file
- Pre-game checklist (cards shuffled, timers set, etc.)

---

## 10. TESTING & VALIDATION

### 10.1 Test Scenarios

**Setup Phase:**
1. Select 15, 18, 21, 25 players (all presets)
2. Manually select unbalanced teams (9 evil, 3 good)
3. Select characters without twins (verify warning)
4. Assign duplicate player names
5. Switch themes mid-setup

**Night Phase:**
1. Evil targets player protected by Champion
2. Stalker backup on Hero-type (should fail)
3. Stalker backup on Damsel (first time - should fail, second time - succeed)
4. Right Hand blocks Champion
5. Multiple protections on same player
6. Doctor saves Brave Youth (should prevent revenge kill)

**Day Phase:**
1. Vote out Cursed (verify explosion)
2. Vote out Twin A (verify Twin B dies)
3. Corrupted Authority votes (verify double count)
4. Manipulator silences player (verify can't vote)
5. Voice double elimination on Cursed (7 deaths possible!)
6. Dice rolls (all success, all fail, mixed)

**Win Conditions:**
1. All evil eliminated (good wins)
2. Evil = Good (evil wins immediately)
3. Evil > Good (evil wins immediately)
4. Voice causes good to drop below evil (instant evil win)

### 10.2 Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Page refresh mid-game | Auto-resume from localStorage |
| localStorage full | Graceful degradation, show warning |
| No characters selected | Disable start button, show error |
| Select Twin A without Twin B | Show warning, auto-select Twin B |
| Doctor tries to save when no one died | Skip Doctor call entirely |
| Champion loses power mid-game | Gray out in status panel |
| All Elders blocked same night | Still call them (they just do nothing) |
| Cursed explosion kills Champion who was about to identify villain | Champion identification happens BEFORE death |

---

## 11. DEPLOYMENT & MAINTENANCE

### 11.1 GitHub Pages Deployment

**Repository Structure:**
```
your-username/melodrama-werewolf/
├── README.md
├── LICENSE
├── index.html              ← Main app file
├── manifest.json
├── sw.js
└── assets/
```

**Steps:**
1. Push to GitHub
2. Go to Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: main, folder: / (root)
5. Custom domain (optional): melodrama.yourdomain.com

**URL:** `https://your-username.github.io/melodrama-werewolf/`

### 11.2 Version Control

**Semantic Versioning:**
- Major: Breaking changes to game system (e.g., 1.0 → 2.0)
- Minor: New features, new characters (e.g., 2.0 → 2.1)
- Patch: Bug fixes, UI improvements (e.g., 2.1.0 → 2.1.1)

**Changelog:**
Maintain CHANGELOG.md with format:
```markdown
## [2.0.0] - 2025-01-20
### Added
- Type-based character system (30 characters)
- Dice roll mechanics for Sidekick powers
- Champion combined ability

### Changed
- Night order now uses type-based steps
- Doctor now acts before announcement (proactive)

### Fixed
- Stalker backup kill now checks card types
- Twin linked death timing
```

### 11.3 Documentation

**In-App Help:**
- Quick start guide (modal)
- Character reference (searchable)
- Keyboard shortcuts

**External Documentation:**
- README.md: Installation, usage, credits
- CONTRIBUTING.md: How to report bugs, suggest features
- Character reference PDF (printable for teachers)

---

## 12. FUTURE ENHANCEMENTS (v2.1+)

### Phase 2 Features:
- **Player-facing display mode:** Second window/projector showing phase, timer, eliminated players (no spoilers)
- **BroadcastChannel sync:** Narrator device controls player display
- **Multiple language support:** Spanish, French (i18n)
- **Sound effects:** Optional ambient audio per theme
- **Game history:** View past games, statistics
- **Custom character creator:** Teachers design unique roles
- **Printable materials:** Generate character cards, role sheets

### Phase 3 Features:
- **Automated role assignment:** Generate shareable codes for students
- **Live player view:** Students see their role on own device (no physical cards)
- **Real-time voting:** Students vote on devices, auto-tallied
- **Analytics dashboard:** Win rates, most effective characters, average game length

---

## 13. SUCCESS CRITERIA

**Must Have (v2.0):**
- ✅ 30 characters with type-based system fully functional
- ✅ All special mechanics implemented correctly (Champion, Stalker, Cursed, Twins, etc.)
- ✅ Dice rolls with success/fail for Sidekicks
- ✅ Offline-capable after first load
- ✅ Mobile-responsive (works on tablets)
- ✅ Auto-save and crash recovery
- ✅ Accessible (keyboard navigation, screen reader support)
- ✅ Complete 18-player game runs in 25-35 minutes

**Should Have (v2.0):**
- ✅ All 9 themes with unique scripts
- ✅ Help modal with searchable character reference
- ✅ Printable PDF export of character list
- ✅ Dark mode
- ✅ Timer with color coding and audio alert

**Nice to Have (v2.1):**
- Player-facing display
- Sound effects
- Game history
- Multiple languages

---

## 14. DEVELOPMENT TIMELINE

**Week 1: Foundation**
- Set up repository, file structure
- Implement CHARACTERS_DATA with all 30 characters
- Create basic HTML/CSS layout (three columns)
- State management and localStorage

**Week 2: Setup Screen**
- Character selection grid by type
- Presets and balance checking
- Player name assignment
- Theme selector

**Week 3: Script Engine**
- Generator function architecture
- Type-based night sequence
- Script rendering system
- Navigation (Next/Back)

**Week 4: Resolution Engine**
- Night resolution algorithm
- Complex interaction matrix
- Special deaths (Brave Youth, Twins, Cursed)
- Doctor integration

**Week 5: Day Phase & Special Mechanics**
- Day discussion and voting
- Dice roll system for Sidekicks
- Corrupted Authority double vote
- Manipulator silence, Traitor revote

**Week 6: Polish & Testing**
- All special mechanics edge cases
- Win condition checking
- Accessibility audit
- Mobile responsiveness
- Offline testing

**Week 7: Documentation & Deployment**
- README, CHANGELOG
- In-app help content
- Printable character reference
- Deploy to GitHub Pages
- User testing with teachers

---

## 15. RESOURCES & REFERENCES

**Character Design Documents:**
- Melodrama_Werewolf_30_Character_Roster.docx
- 18_Player_Standard_Setup_Reference.docx

**Design References:**
- Current HTML prototype (for structure inspiration)
- Tailwind CSS documentation
- MDN Web Docs (JavaScript generators, service workers)

**Accessibility:**
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

**PWA:**
- Google PWA Checklist: https://web.dev/pwa-checklist/
- Service Worker API: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

---

## APPENDIX A: Color Palette

**Dark Mode (Default):**
```css
:root {
  --bg-primary: #0f172a;      /* slate-900 */
  --bg-secondary: #1e293b;    /* slate-800 */
  --bg-tertiary: #334155;     /* slate-700 */
  
  --text-primary: #f1f5f9;    /* slate-100 */
  --text-secondary: #cbd5e1;  /* slate-300 */
  
  --accent-good: #3b82f6;     /* blue-500 */
  --accent-evil: #ec4899;     /* pink-500 */
  
  --success: #10b981;         /* green-500 */
  --warning: #f59e0b;         /* amber-500 */
  --danger: #ef4444;          /* red-500 */
}
```

**Light Mode:**
```css
:root.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;    /* slate-50 */
  --bg-tertiary: #e2e8f0;     /* slate-200 */
  
  --text-primary: #0f172a;    /* slate-900 */
  --text-secondary: #475569;  /* slate-600 */
  
  --accent-good: #2563eb;     /* blue-600 */
  --accent-evil: #db2777;     /* pink-600 */
  
  --success: #059669;         /* green-600 */
  --warning: #d97706;         /* amber-600 */
  --danger: #dc2626;          /* red-600 */
}
```

---

## APPENDIX B: Example Script Flow

**Night 1 → Day 1 → Night 2 (Abbreviated)**

```
NIGHT 1
-------
1. Opening: "Welcome... look at your cards..."
2. "Everyone heads down..."
3. Call: Accomplices see evil (first time only)
4. Call: Champion sees Cursed (first time only)
5. Call: Twins identify each other (first time only)
6. Call: Loyal Companion sees Champion (first time only)

7. STEP 1: Villain-Type
   "Evil team, lift heads... choose victim"
   → [ACTION: Click evil's target]
   
8. STEP 2: Accomplice-Type
   "Accomplices with power, thumbs up..."
   → [ACTION: If thumb up, select who/what]
   
9. STEP 3: Elder-Type (individually)
   "Sage, lift head... point to 2 players"
   → [ACTION: Select 2 players, show result]
   "Oracle, lift head... point to 1 player"
   → [ACTION: Select 1 player, show result]
   
10. STEP 4: Hero-Type (individually)
    "Champion, lift head... choose to protect"
    → [ACTION: Select protection target]
    
11. STEP 5: Sidekick-Type
    "Sidekicks with big moment, thumbs up..."
    → [No action Night 1 typically]

12. Resolution Summary
    → Display who was targeted, protected, etc.

13. Call Doctor (if applicable)
    → [ACTION: Save or don't save]

14. Morning Announcement
    → "Good news! No one died." OR "We lost [names]"

DAY 1
-----
15. Announce Innocent Child (first day only)
    "Player X is the Innocent Child - definitely GOOD"

16. Discussion Phase
    "You have 3 minutes to discuss..."
    → [ACTION: Start timer]

17. Voting Phase
    "On three, point to eliminate... 1... 2... 3!"
    → [ACTION: Tally votes, check for specials]
    → [ACTION: Click player voted out]

18. Elimination
    "Player Y was voted out. Reveal card, death scene."

19. Check Win Condition
    → If met: GAME OVER
    → If not: Continue

NIGHT 2
-------
20. "Everyone heads down... Night falls..."

21. STEP 1: Villain-Type
    → [Repeat similar to Night 1]
    
... (continue loop)
```

---

## FINAL NOTES

This design brief is comprehensive but should remain a **living document**. As development progresses and teacher feedback is gathered, iterate and refine. The goal is to create a tool that genuinely reduces narrator cognitive load while maintaining the theatrical drama that makes this game special for students.

**Key Success Factor:** The tool should feel like having an expert assistant who knows all the rules, never forgets a step, and lets the teacher focus on the students' performances rather than managing complex game mechanics.

---

**Document Version:** 2.0  
**Last Updated:** January 2025  
**Author:** Design Brief for Melodrama Werewolf Digital Narrator Tool
