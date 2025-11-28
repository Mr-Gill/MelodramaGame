/**
 * Melodrama Werewolf - Shared Character Data
 * Single source of truth for all 30 characters
 * Used by both the main app (index.html) and physical cards (V4.html)
 */

const CHARACTERS = [
  // ===== VILLAIN-TYPE (5 characters - EVIL) =====
  {
    id: 1,
    charId: "V1",
    name: "The Evil Mastermind",
    team: "evil",
    type: "villain",
    typeLabel: "Villain",
    illustration: "mastermind",
    accentColor: "#fca5a5",
    motivation: "You crave power and control. The village will bow before you.",
    power: "You lead the evil team decisions and break ties when your team cannot agree on a target.",
    short: "Leads the villains, breaks ties.",
    nightOrder: 1,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Steepled fingers, calculated movements, commanding posture",
      face: "Cold eyes, knowing smirk, raised eyebrow of superiority",
      voice: "Low, measured, dripping with condescension",
      death: "Defiant laugh, 'You may have won today...' then dramatic collapse"
    },
    actingB: {
      physical: "Move with quiet confidence and authority",
      vocal: "Speak thoughtfully, as if considering multiple angles",
      deathHint: "Show disbelief that YOUR plan could fail"
    },
    nightB: [
      "Every Night: Evil team wakes together in Step 1",
      "Lead your team in choosing a victim",
      "Break ties if your team cannot agree"
    ],
    dayB: [
      "Guide evil team's accusations subtly",
      "Appear reasonable while sowing chaos"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 2,
    charId: "V2",
    name: "The Assassin",
    team: "evil",
    type: "villain",
    typeLabel: "Villain",
    illustration: "assassin",
    accentColor: "#fca5a5",
    motivation: "You are the blade in the darkness. One precise strike can change everything.",
    power: "ONCE PER GAME: During the villain night phase, you may choose a SECOND victim to eliminate in addition to the team's main target.",
    short: "Once per game, add a second victim.",
    nightOrder: 1,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Swift, silent, economical movements",
      face: "Blank expression, eyes that miss nothing",
      voice: "Whispers, short sentences, no wasted words",
      death: "Quick, shocked gasp, immediate stillness"
    },
    actingB: {
      physical: "Move quietly, appear unremarkable",
      vocal: "Speak rarely, observe more than talk",
      deathHint: "Die efficiently, even your death is clean"
    },
    nightB: [
      "Every Night: Wake with evil team in Step 1",
      "ONE TIME ONLY: Point to a second target",
      "If you choose two victims tonight, you cannot use this power again"
    ],
    dayB: [
      "Blend in, avoid suspicion",
      "Save your double-kill for maximum impact"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 3,
    charId: "V3",
    name: "The Pretender",
    team: "evil",
    type: "villain",
    typeLabel: "Villain",
    illustration: "pretender",
    accentColor: "#fca5a5",
    motivation: "You are the wolf in sheep's clothing. They will never suspect the truth.",
    power: "When checked by Elder-type characters, you appear as GOOD instead of evil.",
    short: "Appears good to Elder checks.",
    nightOrder: 1,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Warm, open gestures that invite trust",
      face: "Friendly smile, concerned expressions, innocent eyes",
      voice: "Kind, helpful, slightly too eager to please",
      death: "Betrayed shock, 'But I trusted you all...'"
    },
    actingB: {
      physical: "Mirror the body language of good players",
      vocal: "Sound genuinely concerned for the village",
      deathHint: "Die confused, as if you truly were innocent"
    },
    nightB: [
      "Every Night: Wake with evil team in Step 1",
      "Your passive ability protects you from being detected",
      "Elder checks will show you as GOOD"
    ],
    dayB: [
      "Act completely innocent and helpful",
      "If accused, act hurt and betrayed"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 4,
    charId: "V4",
    name: "Corrupted Authority",
    team: "evil",
    type: "villain",
    typeLabel: "Villain",
    illustration: "authority",
    accentColor: "#fca5a5",
    motivation: "You have power, and you will use it. The system serves those who control it.",
    power: "During day votes, your vote counts as TWO votes instead of one. The narrator will say your vote twice.",
    short: "Day vote counts as two.",
    nightOrder: 1,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Expansive gestures, taking up space, pointing fingers",
      face: "Stern disapproval, judging expressions",
      voice: "Loud, authoritative, interrupting others",
      death: "Outraged disbelief, 'You can't do this to ME!'"
    },
    actingB: {
      physical: "Stand tall, command attention",
      vocal: "Speak with conviction and authority",
      deathHint: "Die indignant that rules applied to YOU"
    },
    nightB: [
      "Every Night: Wake with evil team in Step 1",
      "Help choose the night's victim"
    ],
    dayB: [
      "YOUR VOTE COUNTS DOUBLE!",
      "Narrator says your vote twice: 'Name. Name.'",
      "Use your influence to sway village decisions"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 5,
    charId: "V5",
    name: "The Stalker",
    team: "evil",
    type: "villain",
    typeLabel: "Villain",
    illustration: "stalker",
    accentColor: "#fca5a5",
    motivation: "You always have a backup plan. When one prey escapes, you have another ready.",
    power: "If the evil team's primary target is protected/saved, you may immediately choose a BACKUP target. This backup ONLY works on Elder-type or Damsel-type characters.",
    short: "Backup elimination if target survives.",
    nightOrder: 1,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Lurking at edges, watching intently, sudden movements",
      face: "Intense stare, slightly unnerving focus",
      voice: "Quiet, observant comments, remembers everything",
      death: "Lunging forward one last time before falling"
    },
    actingB: {
      physical: "Watch others more than speak",
      vocal: "Note details others miss",
      deathHint: "Die reaching for your next target"
    },
    nightB: [
      "Every Night: Wake with evil team in Step 1",
      "If main target is saved: Choose backup target",
      "BACKUP ONLY WORKS on Elder or Damsel types!",
      "Cannot target Heroes or Sidekicks as backup"
    ],
    dayB: [
      "Watch who protects whom",
      "Identify Elder and Damsel players for backup options"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },

  // ===== ACCOMPLICE-TYPE (5 characters - EVIL) =====
  {
    id: 6,
    charId: "A1",
    name: "The Right Hand",
    team: "evil",
    type: "accomplice",
    typeLabel: "Accomplice",
    illustration: "righthand",
    accentColor: "#fb7185",
    motivation: "You are the unseen hand that blocks the hero's sword. Your timing is everything.",
    power: "ONCE PER GAME: During the Accomplice phase (Step 2), block one player's night ability entirely. They cannot use their power that night.",
    short: "Block one player's night ability.",
    nightOrder: 2,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Always slightly behind someone else, supporting gestures",
      face: "Knowing looks, slight nods of approval",
      voice: "Agreeable, supportive, 'building on' others' ideas",
      death: "Reaching out as if to help someone, then collapsing"
    },
    actingB: {
      physical: "Stay close to powerful players",
      vocal: "Agree with others while subtly steering",
      deathHint: "Die trying to help your master escape"
    },
    nightB: [
      "Night 1: See all evil team members",
      "ONCE PER GAME: Thumbs up in Step 2 to act",
      "When acting: Point to block one player's night ability",
      "Blocked player cannot use their power that night"
    ],
    dayB: [
      "Protect evil team members from suspicion",
      "Time your block for maximum impact"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 7,
    charId: "A2",
    name: "The Spy",
    team: "evil",
    type: "accomplice",
    typeLabel: "Accomplice",
    illustration: "spy",
    accentColor: "#fb7185",
    motivation: "Information is power. You see what others try to hide.",
    power: "ONCE PER GAME: During the Accomplice phase (Step 2), check if a player has a night action. Narrator shows 👍 (has night action) or 👎 (no night action).",
    short: "Learn if a player has night action.",
    nightOrder: 2,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Shifty movements, always positioning for sight lines",
      face: "Darting eyes, small reactions to information",
      voice: "Probing questions, remembering answers",
      death: "Clutching secret documents, dying before revealing"
    },
    actingB: {
      physical: "Position yourself to overhear conversations",
      vocal: "Ask seemingly innocent questions",
      deathHint: "Die with secrets on your lips"
    },
    nightB: [
      "Night 1: See all evil team members",
      "ONCE PER GAME: Thumbs up in Step 2 to act",
      "When acting: Point to check one player",
      "👍 = has night action, 👎 = no night action"
    ],
    dayB: [
      "Share intel with evil team subtly",
      "Identify key targets based on your information"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 8,
    charId: "A3",
    name: "The Manipulator",
    team: "evil",
    type: "accomplice",
    typeLabel: "Accomplice",
    illustration: "manipulator",
    accentColor: "#fb7185",
    motivation: "Words are weapons. You silence those who would speak against you.",
    power: "ONCE PER GAME: During the Accomplice phase (Step 2), silence one player. That player CANNOT VOTE during the next day phase.",
    short: "Silence one player's vote next day.",
    nightOrder: 2,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Leaning in close, touching shoulders, controlling",
      face: "Intense eye contact, persuasive expressions",
      voice: "Smooth, convincing, making everything sound reasonable",
      death: "Trying to talk your way out until the very end"
    },
    actingB: {
      physical: "Control the physical space of conversations",
      vocal: "Sound utterly reasonable and sympathetic",
      deathHint: "Die mid-sentence, still manipulating"
    },
    nightB: [
      "Night 1: See all evil team members",
      "ONCE PER GAME: Thumbs up in Step 2 to act",
      "When acting: Point to silence one player",
      "Silenced player CANNOT VOTE tomorrow"
    ],
    dayB: [
      "Silence key voters at crucial moments",
      "Use your power when votes are close"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 9,
    charId: "A4",
    name: "The Traitor",
    team: "evil",
    type: "accomplice",
    typeLabel: "Accomplice",
    illustration: "traitor",
    accentColor: "#fb7185",
    motivation: "You have leverage on someone. If they fall, everyone votes again.",
    power: "ONCE PER GAME: During the Accomplice phase (Step 2), secretly mark one player. If that marked player is voted out during the day, you may reveal yourself to force a COMPLETE REVOTE.",
    short: "Force revote if marked player eliminated.",
    nightOrder: 2,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Shifty, always looking for advantage",
      face: "False sincerity, calculating eyes",
      voice: "Earnest promises, quickly broken",
      death: "'Wait, we can make a deal!' then collapse"
    },
    actingB: {
      physical: "Appear loyal while watching for opportunity",
      vocal: "Make promises you don't intend to keep",
      deathHint: "Die trying to negotiate one last deal"
    },
    nightB: [
      "Night 1: See all evil team members",
      "ONCE PER GAME: Thumbs up in Step 2 to act",
      "When acting: Point to secretly mark one player",
      "If marked player is voted out: You may force revote"
    ],
    dayB: [
      "Protect your marked player (they're your leverage)",
      "Reveal only when revote would help evil"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },
  {
    id: 10,
    charId: "A5",
    name: "The Informant",
    team: "evil",
    type: "accomplice",
    typeLabel: "Accomplice",
    illustration: "informant",
    accentColor: "#fb7185",
    motivation: "You trade in secrets. For the right price, anyone's identity is for sale.",
    power: "ONCE PER GAME: During the Accomplice phase (Step 2), reveal one player's EXACT ROLE to the entire evil team. The narrator whispers the role to all evil players.",
    short: "Reveal exact role of a player to evil team.",
    nightOrder: 2,
    hasNightAction: true,
    oneTimeOnly: false,
    limited: 1,
    actingA: {
      body: "Secretive gestures, cupped hands, looking over shoulder",
      face: "Knowing smirk, arched eyebrows",
      voice: "Hushed tones, 'I know something you don't know'",
      death: "Trying to bargain with information until the end"
    },
    actingB: {
      physical: "Pull others aside for 'private' conversations",
      vocal: "Hint that you know secrets",
      deathHint: "Die threatening to reveal something"
    },
    nightB: [
      "Night 1: See all evil team members",
      "ONCE PER GAME: Thumbs up in Step 2 to act",
      "When acting: Point to reveal one player's exact role",
      "Narrator whispers the role to ALL evil players"
    ],
    dayB: [
      "Help evil team target key roles",
      "Know when revealing a role is most valuable"
    ],
    winCondition: "Evil wins when evil players ≥ good players"
  },

  // ===== ELDER-TYPE (5 characters - GOOD) =====
  {
    id: 11,
    charId: "E1",
    name: "The Sage",
    team: "good",
    type: "elder",
    typeLabel: "Elder",
    illustration: "sage",
    accentColor: "#93c5fd",
    motivation: "Ancient wisdom guides you. You see patterns others miss.",
    power: "Every night, check TWO players. Narrator shows 👍 if AT LEAST ONE is evil, 👎 if BOTH are good.",
    short: "Check two players; learn if at least one is evil.",
    nightOrder: 3,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Slow, deliberate movements, stroking chin",
      face: "Wise, knowing expressions, seeing deeper truths",
      voice: "Measured, cryptic, speaks in riddles",
      death: "Peaceful acceptance, 'The truth will emerge...'"
    },
    actingB: {
      physical: "Move with quiet dignity",
      vocal: "Speak in measured, thoughtful phrases",
      deathHint: "Die at peace, having seen the truth"
    },
    nightB: [
      "Every Night: Wake in Step 3 (Elder phase)",
      "Point to TWO players to check",
      "👍 = at least one is evil",
      "👎 = both are good"
    ],
    dayB: [
      "Share your wisdom carefully",
      "Two 'good' results = both players definitely good"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 12,
    charId: "E2",
    name: "The Oracle",
    team: "good",
    type: "elder",
    typeLabel: "Elder",
    illustration: "oracle",
    accentColor: "#93c5fd",
    motivation: "The spirits whisper truths to you. Good or evil - you see their soul.",
    power: "Every night, check ONE player. Narrator shows 🟥 (evil) or 🟦 (good). Note: The Pretender appears good to you!",
    short: "Check one player; good or evil.",
    nightOrder: 3,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Trance-like movements, hands outstretched",
      face: "Faraway gaze, seeing visions",
      voice: "Ethereal, prophetic, speaking truths from beyond",
      death: "Final prophecy, then peaceful collapse"
    },
    actingB: {
      physical: "Move as if guided by unseen forces",
      vocal: "Speak with certainty from the beyond",
      deathHint: "Die delivering one final vision"
    },
    nightB: [
      "Every Night: Wake in Step 3 (Elder phase)",
      "Point to ONE player to check",
      "🟥 = evil, 🟦 = good",
      "WARNING: The Pretender appears as GOOD!"
    ],
    dayB: [
      "Share your visions when the time is right",
      "Be wary - the Pretender can fool you"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 13,
    charId: "E3",
    name: "The Sensitive",
    team: "good",
    type: "elder",
    typeLabel: "Elder",
    illustration: "sensitive",
    accentColor: "#93c5fd",
    motivation: "You feel the ripples of power. Night actions disturb your slumber.",
    power: "Every night, check ONE player. Narrator shows 👍 (has a night action) or 👎 (no night action).",
    short: "Learn if a player has a night action.",
    nightOrder: 3,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Nervous, twitching, hypersensitive to surroundings",
      face: "Wide eyes, startled reactions",
      voice: "Breathless, excitable, overwhelmed by feelings",
      death: "Overwhelmed by the darkness, dramatic faint"
    },
    actingB: {
      physical: "React to things others don't notice",
      vocal: "Speak of 'feelings' and 'sensations'",
      deathHint: "Die from sensory overload of violence"
    },
    nightB: [
      "Every Night: Wake in Step 3 (Elder phase)",
      "Point to ONE player to check",
      "👍 = has a night action",
      "👎 = no night action"
    ],
    dayB: [
      "Night actions indicate active roles",
      "No night action could mean Damsel or Sidekick"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 14,
    charId: "E4",
    name: "The Dreamer",
    team: "good",
    type: "elder",
    typeLabel: "Elder",
    illustration: "dreamer",
    accentColor: "#93c5fd",
    motivation: "Your dreams reveal the darkness nearby. How many wolves sit beside you?",
    power: "Every night, learn how many EVIL players are sitting directly adjacent to you (left and right neighbors only).",
    short: "Learn how many evil sit beside them.",
    nightOrder: 3,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Sleepy, dreamy movements, head nodding",
      face: "Half-closed eyes, sudden starts of awareness",
      voice: "Murmured prophecies, sudden clarity",
      death: "Drifting off to eternal sleep, peaceful smile"
    },
    actingB: {
      physical: "Seem partially in another world",
      vocal: "Speak as if recounting dreams",
      deathHint: "Die drifting into final slumber"
    },
    nightB: [
      "Every Night: Wake in Step 3 (Elder phase)",
      "Narrator shows 0, 1, or 2 on fingers",
      "This is how many evil sit DIRECTLY beside you",
      "Pay attention to who's next to you!"
    ],
    dayB: [
      "Your info changes if players are eliminated",
      "Track seating positions carefully"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 15,
    charId: "E5",
    name: "The Witness",
    team: "good",
    type: "elder",
    typeLabel: "Elder",
    illustration: "witness",
    accentColor: "#93c5fd",
    motivation: "You see more than you should. The narrator shares hidden truths with you.",
    power: "Every night, the narrator gives you ONE cryptic meta-clue about what happened during the previous day or night. The clue's meaning is your burden to interpret.",
    short: "Narrator gives a clue about the night.",
    nightOrder: 3,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Haunted movements, looking over shoulder",
      face: "Troubled expressions, hidden knowledge",
      voice: "Hesitant, burdened by what you know",
      death: "'I saw everything... EVERYTHING!' then collapse"
    },
    actingB: {
      physical: "Carry the weight of terrible knowledge",
      vocal: "Hint at things you shouldn't know",
      deathHint: "Die screaming about what you witnessed"
    },
    nightB: [
      "Every Night: Wake in Step 3 (Elder phase)",
      "Narrator whispers ONE cryptic clue",
      "Clue relates to previous day/night events",
      "You must interpret its meaning"
    ],
    dayB: [
      "Share clues carefully - they may be misunderstood",
      "Your hints could save or doom the village"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },

  // ===== HERO-TYPE (5 characters - GOOD) =====
  {
    id: 16,
    charId: "H1",
    name: "The Champion",
    team: "good",
    type: "hero",
    typeLabel: "Hero",
    illustration: "champion",
    accentColor: "#34d399",
    motivation: "You are the village's protector. Your shield is their hope.",
    power: "Night 1: You see who The Cursed is. Every night: Protect one player. If your target is attacked, BOTH survive, you identify ONE random villain, but your power ends permanently.",
    short: "Protects nightly. First success reveals a villain but ends power.",
    nightOrder: 4,
    hasNightAction: true,
    oneTimeOnly: false,
    firstNightSetup: true,
    actingA: {
      body: "Strong, protective stance, shielding gestures",
      face: "Noble determination, heroic resolve",
      voice: "Brave, reassuring, inspiring confidence",
      death: "Heroic last stand, 'Run! Save yourselves!'"
    },
    actingB: {
      physical: "Stand protectively near others",
      vocal: "Speak with confidence and courage",
      deathHint: "Die heroically protecting someone"
    },
    nightB: [
      "Night 1: See who The Cursed is (protect them!)",
      "Every Night: Wake in Step 4 (Hero phase)",
      "Point to ONE player to protect",
      "If they're attacked: Both survive, you identify a villain, power ENDS"
    ],
    dayB: [
      "Protect The Cursed - their death hurts everyone",
      "Your power ending reveals you saved someone"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 17,
    charId: "H2",
    name: "The Healer",
    team: "good",
    type: "hero",
    typeLabel: "Hero",
    illustration: "healer",
    accentColor: "#34d399",
    motivation: "Life is precious. You will not let death take them - not tonight.",
    power: "Every night, protect ONE player from elimination. You CANNOT protect the same player two nights in a row.",
    short: "Save one player, can't repeat.",
    nightOrder: 4,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Gentle, caring touches, healing gestures",
      face: "Compassionate, worried for others",
      voice: "Soothing, reassuring, medical terminology",
      death: "Reaching out to heal someone, dying mid-touch"
    },
    actingB: {
      physical: "Tend to others, check on people",
      vocal: "Ask about people's wellbeing",
      deathHint: "Die trying to save someone else"
    },
    nightB: [
      "Every Night: Wake in Step 4 (Hero phase)",
      "Point to ONE player to protect",
      "CANNOT protect same player twice in a row",
      "Track who you protected last night!"
    ],
    dayB: [
      "Vary your protections - can't repeat",
      "Consider who evil is likely to target"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 18,
    charId: "H3",
    name: "The Guardian",
    team: "good",
    type: "hero",
    typeLabel: "Hero",
    illustration: "guardian",
    accentColor: "#34d399",
    motivation: "You will take the blow meant for another. Your life for theirs.",
    power: "Every night, choose ONE player to guard. If they are attacked, YOU DIE INSTEAD and they survive.",
    short: "Sacrifice self to save another.",
    nightOrder: 4,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Vigilant, tense, ready to leap in front",
      face: "Watchful, protective glares",
      voice: "Gruff, loyal, 'I've got your back'",
      death: "'NOOO!' diving to save someone, heroic sacrifice"
    },
    actingB: {
      physical: "Position yourself as a human shield",
      vocal: "Express willingness to sacrifice",
      deathHint: "Die dramatically protecting another"
    },
    nightB: [
      "Every Night: Wake in Step 4 (Hero phase)",
      "Point to ONE player to guard",
      "If they're attacked: YOU DIE, THEY LIVE",
      "Ultimate sacrifice protection"
    ],
    dayB: [
      "Guard the most valuable/vulnerable player",
      "Your death saves them - worth it?"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 19,
    charId: "H4",
    name: "The Survivor",
    team: "good",
    type: "hero",
    typeLabel: "Hero",
    illustration: "survivor",
    accentColor: "#34d399",
    motivation: "You have faced death before and walked away. Once more, you will cheat fate.",
    power: "PASSIVE: The FIRST time you are targeted for night elimination, you survive until AFTER the next day's vote. You die immediately after that vote concludes.",
    short: "Survives first night attack until after next vote.",
    nightOrder: 4,
    hasNightAction: false,
    oneTimeOnly: false,
    passive: true,
    actingA: {
      body: "Scarred, experienced, always alert",
      face: "Haunted eyes, seen too much",
      voice: "Gravelly, practical, survivor's wisdom",
      death: "Finally accepting fate, 'My luck ran out...'"
    },
    actingB: {
      physical: "Move with wary, battle-tested experience",
      vocal: "Speak of past close calls",
      deathHint: "Die at peace, having survived longer than expected"
    },
    nightB: [
      "PASSIVE - No night action needed",
      "FIRST time you're night-targeted:",
      "You survive until AFTER next day's vote",
      "You die immediately after the vote concludes"
    ],
    dayB: [
      "If hit at night: Survive to vote tomorrow",
      "Use your extra time wisely",
      "Second attack kills you immediately"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 20,
    charId: "H5",
    name: "The Defender",
    team: "good",
    type: "hero",
    typeLabel: "Hero",
    illustration: "defender",
    accentColor: "#34d399",
    motivation: "Your traps are set. If they take someone down, they're coming with them.",
    power: "Every night, set a trap on ONE player. If that player is killed, ONE random Villain-type character ALSO dies.",
    short: "Traps a player; if they die, a villain dies too.",
    nightOrder: 4,
    hasNightAction: true,
    oneTimeOnly: false,
    actingA: {
      body: "Crafty, setting traps, checking wires",
      face: "Cunning, satisfied smirk when trap springs",
      voice: "Strategic, 'If I go down, I'm taking one with me'",
      death: "'Ha! Check the trap...' evil villain screams in distance"
    },
    actingB: {
      physical: "Appear to be 'setting things up'",
      vocal: "Drop hints about consequences",
      deathHint: "Die knowing your trap will trigger"
    },
    nightB: [
      "Every Night: Wake in Step 4 (Hero phase)",
      "Point to ONE player to trap",
      "If trapped player dies: ONE random Villain also dies!",
      "Trap resets each night"
    ],
    dayB: [
      "Trap likely targets to deter attacks",
      "Evil knows your trap could backfire on them"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },

  // ===== SIDEKICK-TYPE (5 characters - GOOD) =====
  {
    id: 21,
    charId: "S1",
    name: "The Loyal Companion",
    team: "good",
    type: "sidekick",
    typeLabel: "Sidekick",
    illustration: "companion",
    accentColor: "#bef264",
    motivation: "The Champion is your hero. You will support them no matter what.",
    power: "Night 1: You learn who The Champion is. ONCE (dice roll): During day vote, add +3 votes to whoever the Champion voted for. Success on 4-6, failure on 1-3 reveals you.",
    short: "Knows Champion; can boost their vote (dice).",
    nightOrder: 5,
    hasNightAction: false,
    oneTimeOnly: false,
    firstNightSetup: true,
    actingA: {
      body: "Devoted, following Champion's lead, eager",
      face: "Adoring looks at Champion, fierce protection",
      voice: "Enthusiastic support, 'Whatever you say!'",
      death: "'Tell the Champion... I tried...'"
    },
    actingB: {
      physical: "Stay near the Champion subtly",
      vocal: "Agree with the Champion's suggestions",
      deathHint: "Die calling out to your hero"
    },
    nightB: [
      "Night 1: Learn who The Champion is",
      "Sidekicks use thumbs-up in Step 5 (once per game)"
    ],
    dayB: [
      "DICE ROLL to add +3 votes to Champion's target",
      "Roll 4-6: SUCCESS! +3 votes added",
      "Roll 1-3: FAIL! You're revealed as a Sidekick"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 22,
    charId: "S2",
    name: "The Voice",
    team: "good",
    type: "sidekick",
    typeLabel: "Sidekick",
    illustration: "voice",
    accentColor: "#bef264",
    motivation: "Your words carry weight. When you speak, extra justice falls.",
    power: "ONCE (dice roll): After a day vote elimination, the second-place player is ALSO eliminated. Success on 4-6, failure on 1-3 and you become a target.",
    short: "Double elimination after vote (dice).",
    nightOrder: 5,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Dramatic gestures, theatrical presence",
      face: "Passionate expressions, righteous anger",
      voice: "Booming, persuasive, crowd-rousing",
      death: "Final dramatic speech, 'Let my words echo...'"
    },
    actingB: {
      physical: "Command attention when speaking",
      vocal: "Speak with conviction and passion",
      deathHint: "Die mid-speech, dramatically silenced"
    },
    nightB: [
      "Sidekicks use thumbs-up in Step 5 (once per game)",
      "Typically no night action"
    ],
    dayB: [
      "DICE ROLL after vote for DOUBLE ELIMINATION",
      "Roll 4-6: SUCCESS! 2nd place ALSO eliminated",
      "Roll 1-3: FAIL! You become prime suspect"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 23,
    charId: "S3",
    name: "The Fool",
    team: "good",
    type: "sidekick",
    typeLabel: "Sidekick",
    illustration: "fool",
    accentColor: "#bef264",
    motivation: "In madness there is wisdom. Your wild accusations may hit the mark.",
    power: "ONCE (dice roll): Make a dramatic wild accusation against any player. Success on 4-6 adds suspicion to target, failure on 1-3 turns suspicion on YOU.",
    short: "Wild accusation with dramatic blowback (dice).",
    nightOrder: 5,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Erratic, unpredictable, spinning around",
      face: "Wild eyes, manic grins, sudden seriousness",
      voice: "Sing-song, then sudden clarity, mad prophecy",
      death: "Laughing until the very end, 'The joke's on you!'"
    },
    actingB: {
      physical: "Move unpredictably, startle people",
      vocal: "Mix nonsense with occasional insights",
      deathHint: "Die laughing at some private joke"
    },
    nightB: [
      "Sidekicks use thumbs-up in Step 5 (once per game)",
      "Typically no night action"
    ],
    dayB: [
      "DICE ROLL for wild accusation",
      "Roll 4-6: SUCCESS! Target gains suspicion",
      "Roll 1-3: FAIL! YOU become the prime suspect"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 24,
    charId: "S4",
    name: "The Trickster",
    team: "good",
    type: "sidekick",
    typeLabel: "Sidekick",
    illustration: "trickster",
    accentColor: "#bef264",
    motivation: "Lies can serve the truth. Your false claims sow useful chaos.",
    power: "ONCE (dice roll): Create a convincing false claim about another player (fake role, fake info). Success on 4-6 deceives others, failure on 1-3 exposes you as a liar.",
    short: "Creates a false claim (dice).",
    nightOrder: 5,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Sly movements, mischievous poses",
      face: "Knowing winks, barely contained smirks",
      voice: "Smooth lies, convincing falsehoods",
      death: "'It was all a trick! But not this...' collapse"
    },
    actingB: {
      physical: "Move with playful energy",
      vocal: "Tell stories that may or may not be true",
      deathHint: "Die with one last lie on your lips"
    },
    nightB: [
      "Sidekicks use thumbs-up in Step 5 (once per game)",
      "Typically no night action"
    ],
    dayB: [
      "DICE ROLL to create a convincing false claim",
      "Roll 4-6: SUCCESS! Your lie is believed",
      "Roll 1-3: FAIL! Caught lying, lose credibility"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 25,
    charId: "S5",
    name: "The Imitator",
    team: "good",
    type: "sidekick",
    typeLabel: "Sidekick",
    illustration: "imitator",
    accentColor: "#bef264",
    motivation: "You learn by watching. Copy what others do, but better.",
    power: "ONCE (dice roll): Copy another Sidekick's day power and use it as your own. Success on 4-6 copies power successfully, failure on 1-3 wastes your attempt.",
    short: "Copies another day power (dice).",
    nightOrder: 5,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Mirroring others' movements exactly",
      face: "Copying expressions, becoming someone else",
      voice: "Echoing phrases, mimicking voices",
      death: "Imitating someone else's death scene perfectly"
    },
    actingB: {
      physical: "Copy the mannerisms of others",
      vocal: "Echo phrases others use",
      deathHint: "Die imitating a famous death scene"
    },
    nightB: [
      "Sidekicks use thumbs-up in Step 5 (once per game)",
      "Typically no night action"
    ],
    dayB: [
      "DICE ROLL to copy another Sidekick's power",
      "Roll 4-6: SUCCESS! Use their power as your own",
      "Roll 1-3: FAIL! Power copy fails, turn wasted"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },

  // ===== DAMSEL-TYPE (5 characters - GOOD) =====
  {
    id: 26,
    charId: "D1",
    name: "The Marked",
    team: "good",
    type: "damsel",
    typeLabel: "Damsel",
    illustration: "marked",
    accentColor: "#a855f7",
    motivation: "You bear a mark of fate. If they vote against you, give them one more chance.",
    power: "ONCE: If you are voted out during the day, you may reveal yourself and demand a COMPLETE REVOTE. All previous votes are cancelled.",
    short: "If voted out, demand a dramatic revote.",
    nightOrder: 0,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Marked gestures, drawing attention to 'the mark'",
      face: "Mysterious, fatalistic expressions",
      voice: "Cryptic warnings, 'You will regret this...'",
      death: "'I warned you... the mark remains...'"
    },
    actingB: {
      physical: "Draw attention to something 'marked' about you",
      vocal: "Speak of fate and destiny",
      deathHint: "Die warning of consequences"
    },
    nightB: [
      "No regular night action",
      "Damsel powers are mostly day-focused"
    ],
    dayB: [
      "ONE TIME: If voted out, reveal and demand REVOTE",
      "All votes cancel - everyone votes again",
      "Use this power to change the outcome"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 27,
    charId: "D2",
    name: "The Innocent",
    team: "good",
    type: "damsel",
    typeLabel: "Damsel",
    illustration: "innocent",
    accentColor: "#a855f7",
    motivation: "Pure and true. When you reveal yourself, all will know you are good.",
    power: "ONCE: At any time during the day, you may reveal yourself. The narrator CONFIRMS you are DEFINITELY GOOD. Cannot be used after being voted out.",
    short: "Can reveal once to confirm they are good.",
    nightOrder: 0,
    hasNightAction: false,
    oneTimeOnly: false,
    actingA: {
      body: "Open, trusting, childlike wonder",
      face: "Wide innocent eyes, confused by accusations",
      voice: "Simple, honest, 'But I didn't do anything!'",
      death: "Confused betrayal, 'Why would you...?'"
    },
    actingB: {
      physical: "Move with open, trusting body language",
      vocal: "Speak simply and honestly",
      deathHint: "Die confused and hurt"
    },
    nightB: [
      "No night action",
      "Your power is day-focused"
    ],
    dayB: [
      "ONE TIME: Reveal yourself during discussion",
      "Narrator CONFIRMS you are definitely GOOD",
      "Use to clear your name or prove trust"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 28,
    charId: "D3",
    name: "Twin A",
    team: "good",
    type: "damsel",
    typeLabel: "Damsel",
    illustration: "twina",
    accentColor: "#a855f7",
    motivation: "Your twin is your other half. If one falls, both must follow.",
    power: "Night 1: You see who Twin B is. LINKED DEATH: If either Twin dies (night or day), the other IMMEDIATELY dies too.",
    short: "Linked to Twin B. If one dies, both do.",
    nightOrder: 0,
    hasNightAction: false,
    oneTimeOnly: false,
    firstNightSetup: true,
    linkedTo: 29,
    actingA: {
      body: "Mirrored movements with Twin B, connected",
      face: "Finishing each other's expressions",
      voice: "Speaking in tandem, 'We think...'",
      death: "Reaching for Twin B, dying together dramatically"
    },
    actingB: {
      physical: "Move in sync with your twin",
      vocal: "Speak as 'we' not 'I'",
      deathHint: "Die reaching for your other half"
    },
    nightB: [
      "Night 1: See who Twin B is",
      "LINKED: If you die, Twin B dies too",
      "If Twin B dies, YOU die too"
    ],
    dayB: [
      "Protect your twin at all costs",
      "If either twin is voted out, BOTH die",
      "Your fates are bound together"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 29,
    charId: "D4",
    name: "Twin B",
    team: "good",
    type: "damsel",
    typeLabel: "Damsel",
    illustration: "twinb",
    accentColor: "#a855f7",
    motivation: "Your twin is your other half. If one falls, both must follow.",
    power: "Night 1: You see who Twin A is. LINKED DEATH: If either Twin dies (night or day), the other IMMEDIATELY dies too.",
    short: "Linked to Twin A. If one dies, both do.",
    nightOrder: 0,
    hasNightAction: false,
    oneTimeOnly: false,
    firstNightSetup: true,
    linkedTo: 28,
    actingA: {
      body: "Mirrored movements with Twin A, connected",
      face: "Finishing each other's expressions",
      voice: "Speaking in tandem, 'We think...'",
      death: "Reaching for Twin A, dying together dramatically"
    },
    actingB: {
      physical: "Move in sync with your twin",
      vocal: "Speak as 'we' not 'I'",
      deathHint: "Die reaching for your other half"
    },
    nightB: [
      "Night 1: See who Twin A is",
      "LINKED: If you die, Twin A dies too",
      "If Twin A dies, YOU die too"
    ],
    dayB: [
      "Protect your twin at all costs",
      "If either twin is voted out, BOTH die",
      "Your fates are bound together"
    ],
    winCondition: "Good wins when all evil is eliminated"
  },
  {
    id: 30,
    charId: "D5",
    name: "The Cursed",
    team: "good",
    type: "damsel",
    typeLabel: "Damsel",
    illustration: "cursed",
    accentColor: "#a855f7",
    motivation: "A dark curse binds you. Your death will drag others to the grave.",
    power: "The Champion sees you Night 1 (and should protect you). WHEN YOU DIE: Random players also die! Victims scale with game size (1-4). Each victim has 1-in-3 chance to be Evil, 2-in-3 Good.",
    short: "If eliminated, random players also die (scales with game size, can hit Evil!).",
    nightOrder: 0,
    hasNightAction: false,
    oneTimeOnly: false,
    firstNightSetup: true,
    actingA: {
      body: "Hunched, burdened, dark aura",
      face: "Haunted, apologetic, 'I'm so sorry...'",
      voice: "Mournful, warning others away",
      death: "Screaming curse explodes outward, dramatic collapse"
    },
    actingB: {
      physical: "Move as if carrying a heavy burden",
      vocal: "Apologize for your very existence",
      deathHint: "Die knowing you're taking others with you"
    },
    nightB: [
      "Night 1: Champion sees you and should protect you",
      "No regular night action",
      "Your power triggers on death"
    ],
    dayB: [
      "WHEN YOU DIE: Curse explosion!",
      "24+ players: 4 random victims",
      "18-23 players: 3 random victims",
      "12-17 players: 2 random victims",
      "Under 12: 1 victim",
      "Each victim: 1/3 Evil, 2/3 Good"
    ],
    winCondition: "Good wins when all evil is eliminated"
  }
];

// Character type configuration
const TYPE_DETAILS = {
  villain: {
    label: "Villain-Type",
    min: 2,
    max: 5,
    description: "All wake together in Step 1 to pick the night's target.",
    accent: "#fca5a5"
  },
  accomplice: {
    label: "Accomplice-Type",
    min: 1,
    max: 5,
    description: "Thumbs-up helpers with one-off tricks to boost the villains.",
    accent: "#fb7185"
  },
  elder: {
    label: "Elder-Type",
    min: 1,
    max: 5,
    description: "Information gatherers who never directly save or kill.",
    accent: "#93c5fd"
  },
  hero: {
    label: "Hero-Type",
    min: 1,
    max: 5,
    description: "Defensive powers keeping the village alive.",
    accent: "#34d399"
  },
  sidekick: {
    label: "Sidekick-Type",
    min: 1,
    max: 5,
    description: "Daytime drama with risky dice rolls.",
    accent: "#bef264"
  },
  damsel: {
    label: "Damsel-Type",
    min: 1,
    max: 5,
    description: "Melodramatic twists when the crowd turns on them.",
    accent: "#a855f7"
  }
};

// Helper function to get character by ID
function getCharacterById(id) {
  return CHARACTERS.find(c => c.id === id);
}

// Helper function to get character by charId (V1, A2, etc.)
function getCharacterByCharId(charId) {
  return CHARACTERS.find(c => c.charId === charId);
}

// Helper function to get all characters of a specific type
function getCharactersByType(type) {
  return CHARACTERS.filter(c => c.type === type);
}

// Helper function to get all characters of a specific team
function getCharactersByTeam(team) {
  return CHARACTERS.filter(c => c.team === team);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHARACTERS, TYPE_DETAILS, getCharacterById, getCharacterByCharId, getCharactersByType, getCharactersByTeam };
}
