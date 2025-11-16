# Character Interaction Tests

This document describes the test suite for complex character interactions in Melodrama Werewolf.

## Running the Tests

1. Open `test.html` in a web browser
2. Click the "▶ Run All Tests" button
3. View the test results

Alternatively, you can run a local server:
```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080/test.html`

## Test Coverage

The test suite includes **20 comprehensive tests** covering the following character interactions:

### 1. Twins Linked Deaths (3 tests)
- ✓ Both twins die when Twin A is eliminated
- ✓ Both twins die when Twin B is eliminated  
- ✓ No linked death if twin is already eliminated

### 2. Cursed Death Explosion (2 tests)
- ✓ 4 neighbors (2 each side) die when Cursed is eliminated
- ✓ Already eliminated neighbors are not affected

### 3. Champion Protection and Power Loss (4 tests)
- ✓ Champion protects target and loses power on first successful protection
- ✓ Champion identifies a random villain when protection succeeds
- ✓ Champion cannot protect if blocked by Right Hand
- ✓ Champion cannot protect if power is already lost

### 4. Guardian Sacrifice (2 tests)
- ✓ Guardian sacrifices self when protection triggers
- ✓ Guardian does not sacrifice if protection doesn't trigger

### 5. Defender Trap (2 tests)
- ✓ Random villain dies when trap is triggered
- ✓ Trap doesn't trigger if trapped player isn't eliminated

### 6. Survivor First-Hit Immunity (2 tests)
- ✓ Survivor survives first attack and marks immunity as used
- ✓ Survivor dies on second attack after immunity is used

### 7. Stalker Backup Kill (2 tests)
- ✓ Backup kill attempt triggers when primary target is protected
- ✓ Backup kill doesn't trigger if primary target isn't protected

### 8. Complex Interactions (3 tests)
- ✓ Champion protection prevents Cursed explosion
- ✓ Defender trap works with Twin linked deaths
- ✓ Guardian sacrifice takes precedence over Survivor immunity

## Test Framework

The test suite uses a lightweight custom testing framework with:
- **describe()** blocks for test suites
- **it()** blocks for individual tests
- **expect()** assertions (toBe, toEqual, toBeTruthy, toContain, toHaveLength, etc.)

## Test Implementation

The tests extract and reuse the core game logic functions from `index.html`:
- `processLinkedDeaths()` - Handles Twin and Cursed mechanics
- `resolveNightActions()` - Processes night actions and protections
- `createMockPlayer()` - Creates test player objects

## Visual Test Results

All tests display:
- ✓ Green checkmarks for passing tests
- ✗ Red X marks for failing tests
- Detailed error messages for failures
- Summary statistics (Passed/Failed/Total)

## Test Maintenance

When adding new character mechanics to the game:
1. Add the character logic to `index.html`
2. Extract the relevant functions into `test.html`
3. Write test cases covering edge cases
4. Verify all tests pass before merging

## Current Status

**All 20 tests passing** ✓

The test suite validates that complex character interactions work correctly, including edge cases and combinations of multiple special abilities.
