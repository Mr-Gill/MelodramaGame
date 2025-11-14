# Melodrama Werewolf - Next Steps & Development Roadmap

**Date**: November 14, 2025  
**Current Version**: v1.0 (Post-Projector View Implementation)  
**Repository**: [Mr-Gill/MelodramaGame](https://github.com/Mr-Gill/MelodramaGame)  
**Live Demo**: [https://mr-gill.github.io/MelodramaGame/](https://mr-gill.github.io/MelodramaGame/)

---

## 📊 Current State Assessment

### ✅ Completed Features

#### Core Infrastructure
- ✅ Single-page application (2,278 lines in `index.html`)
- ✅ PWA support with service worker for offline functionality
- ✅ LocalStorage-based auto-save and crash recovery
- ✅ GitHub Pages deployment configured
- ✅ Comprehensive documentation (README, Design Brief v2.0, PROJECTOR.md)

#### Character System
- ✅ 30 characters defined across 6 types:
  - Villain-Type (5 characters - EVIL)
  - Accomplice-Type (5 characters - EVIL) 
  - Elder-Type (5 characters - GOOD)
  - Hero-Type (5 characters - GOOD)
  - Sidekick-Type (5 characters - GOOD)
  - Damsel-Type (5 characters - GOOD)
- ✅ Character selection with type-based grouping
- ✅ Auto-balancing system with good/evil ratio validation
- ✅ Character metadata (abilities, team, type, night order)

#### Narrator Interface
- ✅ Setup screen with player count (12-25)
- ✅ Role selection by type with balance checking
- ✅ Optional player name assignment
- ✅ Theme selection (9 themes implemented)
- ✅ Dynamic script generation based on active roles
- ✅ Multi-block script types (SAY, NARRATOR, INFO, REMINDER)
- ✅ Night phase scripting with type-based order
- ✅ Day phase structure

#### Game Mechanics
- ✅ Night action tracking interface (dropdowns for all actions)
- ✅ Resolution calculator with order of operations
- ✅ Protection mechanics (Champion, Healer, Guardian, Defender)
- ✅ Block mechanics (Right Hand)
- ✅ Passive abilities (Survivor first-hit immunity)
- ✅ Player status tracking (alive, eliminated, protected)
- ✅ Night/day phase progression

#### UI/UX Features
- ✅ Timer widget with presets (1min, 3min, custom)
- ✅ Player management cards with notes
- ✅ Narrator notes area
- ✅ Export notes functionality
- ✅ Dark theme styling with gradient backgrounds
- ✅ Responsive layout (mobile-friendly)
- ✅ Phase indicators and live statistics

#### Projector View
- ✅ Student-facing display (`projector.html` - 608 lines)
- ✅ BroadcastChannel API for real-time sync
- ✅ Spoiler-free public information display
- ✅ Large fonts and high contrast for visibility
- ✅ Connection status indicator

### 🔶 Partially Implemented Features

#### Complex Character Mechanics (Defined but Not Fully Tested)
- 🔶 **Twin Linked Deaths**: Logic exists but needs validation
- 🔶 **Cursed Death Explosion**: 5-player cascade not fully implemented
- 🔶 **Champion Power**: Identification system needs work
- 🔶 **Stalker Backup Kill**: Type checking logic present but untested
- 🔶 **Guardian Sacrifice**: Mechanic needs refinement
- 🔶 **Defender Trap**: Random villain selection needs implementation

#### Day Phase Mechanics
- 🔶 **Voting System**: Basic structure exists but needs:
  - Vote counting
  - Corrupted Authority double vote
  - Manipulator silence effect
  - Traitor revote trigger
  - Marked revote demand

#### Sidekick Powers
- 🔶 **Dice Roll System**: Structure exists but needs:
  - Dice roll UI/modal
  - Success/failure logic (4-6 vs 1-3)
  - Individual power implementations:
    - Loyal Companion (+3 votes)
    - Voice (double elimination)
    - Fool (dramatic accusation)
    - Trickster (false claim)
    - Imitator (copy power)

#### Win Conditions
- 🔶 **Win Detection**: Logic needs implementation:
  - All evil eliminated → Good wins
  - Evil ≥ Good → Evil wins
  - Post-elimination checking
  - Win announcement modal

### ❌ Missing Features (From Design Brief)

#### Theme System Gaps
- ❌ Only 6 of 9 themes fully implemented
- ❌ Missing themes:
  - Wild West Town
  - Pirate Harbour  
  - Soap Opera Hospital
- ❌ Theme-specific performance cues incomplete

#### Advanced Features
- ❌ Help modal with searchable character reference
- ❌ Keyboard shortcuts (partially defined but not implemented)
- ❌ Light mode toggle (dark mode is default)
- ❌ Sound effects / audio alerts
- ❌ Export/import game state (JSON backup/restore)
- ❌ Game history tracking
- ❌ Printable materials (character reference PDF)

#### Accessibility Enhancements
- ❌ ARIA live regions for dynamic updates
- ❌ Skip to content link
- ❌ Screen reader optimizations
- ❌ Reduced motion support
- ❌ Keyboard navigation completeness

#### Quality Assurance
- ❌ No automated tests
- ❌ No linting configuration
- ❌ No CI/CD pipeline
- ❌ Limited browser compatibility testing
- ❌ No performance profiling

---

## 🎯 Prioritized Roadmap

### Phase 1: Core Gameplay Completion (Priority: HIGH)
**Goal**: Make the app fully playable for a complete game session

#### 1.1 Win Conditions (2-3 hours)
- [ ] Implement `checkWinCondition()` function
- [ ] Check after every elimination (night and day)
- [ ] Create win announcement modal/screen
- [ ] Show final statistics and role reveals
- [ ] Add "New Game" button on win screen

#### 1.2 Day Phase Voting (3-4 hours)
- [ ] Implement vote counting interface
- [ ] Add Corrupted Authority double vote logic
- [ ] Add Manipulator silence effect
- [ ] Implement Traitor revote trigger
- [ ] Implement Marked revote demand
- [ ] Create voting UI (thumbs up/point interface)

#### 1.3 Linked Deaths & Cascades (2-3 hours)
- [ ] Test and validate Twin linked death system
- [ ] Implement Cursed neighbor cascade (2 each side)
- [ ] Add visual warnings before Cursed elimination
- [ ] Handle edge cases (Cursed at end of circle)

#### 1.4 Dice Roll System for Sidekicks (4-5 hours)
- [ ] Create dice roll modal UI
- [ ] Implement random roll (1-6)
- [ ] Add success/fail logic (4-6 = success, 1-3 = fail)
- [ ] Implement each Sidekick power:
  - Loyal Companion: +3 votes to Champion's target
  - Voice: Double elimination (2nd place also out)
  - Fool: Dramatic accusation results
  - Trickster: False claim mechanics
  - Imitator: Copy another's day power
- [ ] Track dice roll history in game state

**Deliverable**: Fully playable game from setup → multiple nights/days → win condition

---

### Phase 2: Complex Mechanics Refinement (Priority: MEDIUM)
**Goal**: Ensure all 30 character abilities work correctly

#### 2.1 Champion Power System (2 hours)
- [ ] Fix protection trigger detection
- [ ] Implement villain identification (random from alive villains)
- [ ] Show identification to narrator privately
- [ ] Mark Champion power as lost after trigger
- [ ] Update UI to reflect power status

#### 2.2 Guardian & Defender (2 hours)
- [ ] Refine Guardian sacrifice offer mechanics
- [ ] Implement Defender trap victim selection
- [ ] Add random villain selection when trap triggers
- [ ] Handle simultaneous protection scenarios

#### 2.3 Stalker Backup Kill (1-2 hours)
- [ ] Validate type checking (only Damsel/Elder)
- [ ] Test against Hero-type (should fail)
- [ ] Test against first-hit Damsel immunity
- [ ] Add narrator feedback for failed attempts

#### 2.4 Accomplice Powers (3-4 hours)
- [ ] Test Right Hand blocking
- [ ] Implement Spy night action check
- [ ] Implement Manipulator silence for next day
- [ ] Implement Traitor marked player tracking
- [ ] Implement Informant role reveal to evil team

#### 2.5 Edge Case Testing (2-3 hours)
- [ ] Test multiple protections on same target
- [ ] Test blocking interactions
- [ ] Test Champion protection + Defender trap
- [ ] Test Voice double elimination with Cursed
- [ ] Document interaction matrix

**Deliverable**: All character abilities functional and tested

---

### Phase 3: User Experience Polish (Priority: MEDIUM)
**Goal**: Make the tool professional and teacher-friendly

#### 3.1 Help System (3-4 hours)
- [ ] Create help modal with tabs:
  - "Current Game" - active characters
  - "All Characters" - full 30-character reference
  - "Quick Guide" - gameplay flow
  - "Keyboard Shortcuts"
- [ ] Make character list searchable
- [ ] Add tooltips on hover for quick reference
- [ ] Include design brief link for full rules

#### 3.2 Theme Completion (2-3 hours)
- [ ] Add Wild West Town theme:
  - Narration text (saloon, sheriff, outlaws)
  - Performance cues (drawl, standoff)
- [ ] Add Pirate Harbour theme:
  - Narration text (ships, treasure, mutiny)
  - Performance cues (accents, sword fights)
- [ ] Add Soap Opera Hospital theme:
  - Narration text (patients, drama, affairs)
  - Performance cues (melodrama, gasps)
- [ ] Test theme switching mid-game

#### 3.3 Visual Enhancements (2-3 hours)
- [ ] Add light mode toggle
- [ ] Improve color contrast for accessibility
- [ ] Add animations (subtle, respectful of motion preferences)
- [ ] Polish loading states
- [ ] Add confirmation modals for destructive actions

#### 3.4 Keyboard Shortcuts (1-2 hours)
- [ ] Implement defined shortcuts:
  - `Space`: Next script step
  - `T`: Start 3-minute timer
  - `R`: Reset timer
  - `H`: Open help
  - `Esc`: Close modals
  - `?`: Show shortcuts overlay
- [ ] Add visible focus indicators
- [ ] Test tab order navigation

#### 3.5 Export/Import (2 hours)
- [ ] Add "Export Game State" button (JSON download)
- [ ] Add "Import Game State" feature
- [ ] Version game state exports
- [ ] Handle import validation

**Deliverable**: Professional, polished UI ready for teacher use

---

### Phase 4: Documentation & Accessibility (Priority: LOW-MEDIUM)
**Goal**: Make the tool accessible and well-documented

#### 4.1 Code Documentation (3-4 hours)
- [ ] Add JSDoc comments to key functions
- [ ] Document game state structure
- [ ] Document resolution engine algorithm
- [ ] Create architecture diagram
- [ ] Add inline comments for complex logic

#### 4.2 Teacher Resources (2-3 hours)
- [ ] Create printable character reference (PDF)
- [ ] Write quick-start guide (1-page)
- [ ] Create classroom setup checklist
- [ ] Add troubleshooting section to docs
- [ ] Create video tutorial script

#### 4.3 Accessibility Improvements (3-4 hours)
- [ ] Add ARIA labels to all icons
- [ ] Implement ARIA live regions for timer
- [ ] Add skip to content link
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Add `prefers-reduced-motion` support
- [ ] Run accessibility audit (Lighthouse/axe)

#### 4.4 CHANGELOG & Versioning (1 hour)
- [ ] Create CHANGELOG.md
- [ ] Document v1.0 features
- [ ] Plan v1.1, v1.2 releases
- [ ] Add semantic versioning strategy

**Deliverable**: Well-documented, accessible tool ready for production

---

### Phase 5: Testing & Quality Assurance (Priority: MEDIUM)
**Goal**: Ensure reliability and catch bugs

#### 5.1 Manual Testing Scenarios (4-5 hours)
- [ ] Test 15-player game end-to-end
- [ ] Test 18-player game end-to-end
- [ ] Test 25-player game end-to-end
- [ ] Test all 30 characters in various combinations
- [ ] Test edge cases:
  - Page refresh mid-game
  - LocalStorage full
  - No characters selected
  - Cursed explosion with 5 neighbors
  - Voice + Cursed = 7 deaths
  - All protections fail

#### 5.2 Browser Compatibility (2-3 hours)
- [ ] Test Chrome/Edge (latest)
- [ ] Test Firefox (latest)
- [ ] Test Safari (macOS and iOS)
- [ ] Test on Android mobile
- [ ] Test BroadcastChannel API support
- [ ] Document browser requirements in README

#### 5.3 Performance Testing (1-2 hours)
- [ ] Test with 25 players (max)
- [ ] Profile localStorage operations
- [ ] Optimize script rendering
- [ ] Check memory leaks (long sessions)

#### 5.4 Automated Testing Setup (Optional, 8-10 hours)
- [ ] Add Jest for unit tests
- [ ] Test resolution calculator logic
- [ ] Test win condition detection
- [ ] Test dice roll mechanics
- [ ] Add Playwright for E2E tests (optional)

**Deliverable**: Stable, tested application

---

### Phase 6: Future Enhancements (Priority: LOW)
**Goal**: Advanced features for v2.0+

#### 6.1 Sound & Audio (2-3 hours)
- [ ] Add optional timer alert sound
- [ ] Add theme-specific ambient audio
- [ ] Night phase sound cues
- [ ] Day phase sound cues
- [ ] Volume controls

#### 6.2 Game History (4-5 hours)
- [ ] Store completed games in localStorage
- [ ] Create history view modal
- [ ] Show game statistics:
  - Win rates (good vs evil)
  - Most eliminated character
  - Average game length
  - Most used characters
- [ ] Export history to CSV

#### 6.3 Multi-Language Support (8-10 hours)
- [ ] Implement i18n framework
- [ ] Translate to Spanish
- [ ] Translate to French
- [ ] Language selector in setup
- [ ] Maintain separate theme text per language

#### 6.4 Real-Time Student Voting (Complex, 15-20 hours)
- [ ] Create student join codes
- [ ] Build student view for voting
- [ ] Implement WebSocket/Firebase for real-time
- [ ] Auto-tally votes
- [ ] Maintain privacy (no role reveals)

#### 6.5 Custom Character Creator (Complex, 10-15 hours)
- [ ] UI for creating custom characters
- [ ] Define abilities, night order, team
- [ ] Save custom characters to localStorage
- [ ] Import/export custom character packs
- [ ] Balance validation for custom roles

**Deliverable**: Advanced v2.0 features

---

## 🚀 Immediate Action Items (Next Session)

### Recommended Starting Point
Start with **Phase 1.1 - Win Conditions** as it's critical for gameplay completion and relatively self-contained.

**Steps**:
1. Implement `checkWinCondition()` function
2. Call after `applyResolution()` (night) and after voting (day)
3. Create simple win modal showing:
   - Winning team (Good/Evil)
   - Final player count
   - Game duration (night count)
4. Add "Play Again" button that calls `resetState()`

**Acceptance Criteria**:
- Game correctly detects all evil eliminated
- Game correctly detects evil ≥ good
- Win modal appears automatically
- Game state can be reset for new game

### Alternative Starting Point
If you want quick visual wins, start with **Phase 3.1 - Help System** which will immediately improve user experience without touching complex game logic.

---

## 📋 Technical Debt & Known Issues

### Code Quality
- [ ] Very long `index.html` file (2,278 lines) - consider modularization
- [ ] No error handling for localStorage failures
- [ ] Some magic numbers in resolution logic
- [ ] Inconsistent naming conventions (camelCase vs snake_case)

### Performance
- [ ] Re-rendering entire player list on every update
- [ ] No debouncing on note-taking inputs
- [ ] Script steps re-generated on every render

### Security
- [ ] No input sanitization for player names
- [ ] No validation on imported JSON game state
- [ ] Potential XSS in theme text (unlikely but possible)

### UX Issues
- [ ] No confirmation before leaving page mid-game
- [ ] No visual feedback for successful actions
- [ ] Error messages not user-friendly
- [ ] No loading states for async operations

---

## 🤝 Contributing Guidelines

When implementing features:
1. **Test in browser first** - This is a client-side only app
2. **Update README** if adding user-facing features
3. **Document complex logic** with inline comments
4. **Consider edge cases** especially for character interactions
5. **Test on mobile** - many teachers use tablets
6. **Keep accessibility in mind** - WCAG 2.1 AA compliance
7. **Update this document** when completing tasks

---

## 📞 Questions & Decisions Needed

Before proceeding with some features, consider:

1. **Testing Strategy**: Add automated tests or rely on manual testing?
2. **Modularization**: Break up `index.html` into modules or keep single file?
3. **Theme Priority**: Complete remaining 3 themes or focus on mechanics?
4. **Mobile-First**: Prioritize mobile UX improvements?
5. **Analytics**: Add usage analytics (privacy-respecting)?
6. **Versioning**: Implement formal release process?

---

## 📚 Resources & References

- **Design Brief**: `Melodrama_Werewolf_App_Design_Brief_v2.md` (1,737 lines)
- **Character Roster**: `Melodrama_Werewolf_30_Character_Roster.docx`
- **Projector Guide**: `PROJECTOR.md`
- **Live App**: https://mr-gill.github.io/MelodramaGame/
- **Repository**: https://github.com/Mr-Gill/MelodramaGame

---

**Last Updated**: November 14, 2025  
**Next Review**: After Phase 1 completion
