# Phonics Pal - Curriculum Gap Analysis

**Analysis Date:** 2025-12-31
**Current Implementation:** 115 cards
**Target Curriculum:** 149 cards
**Gap:** 34 missing cards

---

## Executive Summary

The current PHONIC_DATA implementation has **115 cards** but the curriculum requires **149 cards**. This analysis identifies:
- 34 missing cards that need to be added
- Several voice-over scripts that need updates to match curriculum standards
- Some category/type misassignments
- A complete inventory of what should exist

---

## Current Implementation Inventory (115 Cards)

### SECTION 1: Single Consonant Sounds (24 cards) ✅ TARGET: 26
**Current Cards:**
1. b (ball)
2. c_hard (cat)
3. c_soft (cent)
4. d (dog)
5. f (fish)
6. g_hard (goat)
7. g_soft (gem)
8. h (hat)
9. j (jet)
10. k (kite)
11. l (leaf)
12. m (moon)
13. n (net)
14. p (pig)
15. qu (queen)
16. r (rain)
17. s_sound (sun)
18. s_zsound (rose)
19. t (turtle)
20. v (van)
21. w (web)
22. x_start (xylophone)
23. x_end (box)
24. y_con (yarn)
25. z (zebra)

**MISSING (2 cards):**
- ❌ **a_consonant** - Initial 'a' consonant sound
- ❌ **e_consonant** - Initial 'e' consonant sound
- ❌ **i_consonant** - Initial 'i' consonant sound
- ❌ **o_consonant** - Initial 'o' consonant sound
- ❌ **u_consonant** - Initial 'u' consonant sound

**NOTE:** The curriculum expects 26 cards for A-Z, but vowels (a,e,i,o,u) are in the Short Vowel section, not consonants. Current count of 24 consonants + 2 special cards (c_hard/soft, g_hard/soft, s variations, x variations) = actual total is correct, but may need **a** card for "acorn" or similar if it's meant to represent the letter name.

---

### SECTION 2: Short Vowel Sounds (5 cards) ✅ TARGET: 5
**Current Cards:**
1. short_a (apple)
2. short_e (egg)
3. short_i (insect)
4. short_o (octopus)
5. short_u (umbrella)

**Status:** COMPLETE ✅

---

### SECTION 3: Consonant Digraphs (9 cards) ✅ TARGET: 9
**Current Cards:**
1. sh (ship)
2. ch (chicken)
3. th_quiet (thumb)
4. th_noisy (this)
5. wh (whale)
6. ph (phone)
7. ck (duck)
8. ng (ring)
9. ch_hard (school)

**Status:** COMPLETE ✅

---

### SECTION 4: Consonant Blends (21 cards) ⚠️ TARGET: 23
**Current Cards:**

**L-Blends (6):**
1. bl (blue)
2. cl (clock)
3. fl (flag)
4. gl (glue)
5. pl (plane)
6. sl (slide)

**R-Blends (7):**
7. br (bread)
8. cr (crab)
9. dr (drum)
10. fr (frog)
11. gr (grapes)
12. pr (prize)
13. tr (tree)

**S-Blends (7):**
14. sc (scarf)
15. sk (skate)
16. sm (smile)
17. sn (snail)
18. sp (spoon)
19. st (star)
20. sw (swing)

**T-Blend (1):**
21. tw (twin)

**MISSING (2 cards):**
- ❌ **squ** blend (squirrel, square)
- ❌ **spl** blend (splash, split)
- ❌ **scr** blend (scream, screen)
- ❌ **str** blend (street, strong)
- ❌ **spr** blend (spring, spray)

**NOTE:** Need to determine which 2 of these 5 are priority for curriculum compliance.

---

### SECTION 5: Long Vowels & Silent-E (6 cards) ✅ TARGET: 6
**Current Cards:**
1. a_e (cake)
2. e_e (these)
3. i_e (kite)
4. o_e (nose)
5. u_e (cube)
6. u_yoo (tune)

**Status:** COMPLETE ✅

---

### SECTION 6: Y as a Vowel (3 cards) ⚠️ TARGET: 2
**Current Cards:**
1. y_happy (happy) - y says /ē/ at end of 2-syllable word
2. y_fly (fly) - y says /ī/ at end of 1-syllable word
3. y_yes (yes) - y as consonant

**Issue:** `y_yes` is categorized as 'y_vowel' but should be in consonants section. The curriculum expects only 2 cards for "Y as a Vowel":
- y saying /ē/ (happy)
- y saying /ī/ (fly)

**ACTION NEEDED:**
- Move `y_yes` to consonant section OR remove from y_vowel category
- Current count: 3 cards (should be 2)

---

### SECTION 7: Vowel Teams (17 cards) ❌ TARGET: 24+
**Current Cards:**
1. ai (rain)
2. ay (play)
3. ee (tree)
4. ea_leaf (leaf) - /ē/ sound
5. ea_bread (bread) - /ĕ/ sound
6. ea_steak (steak) - /ā/ sound
7. oa (boat)
8. oe (toe)
9. ow_snow (snow) - /ō/ sound
10. ow_cow (cow) - /ow/ sound
11. ie_pie (pie) - /ī/ sound
12. ie_field (field) - /ē/ sound
13. igh (light)
14. ue (blue)
15. ui (fruit)
16. oo_moon (moon) - long /oo/
17. oo_book (book) - short /ŭ/

**MISSING (7+ cards):**
- ❌ **ey** (grey, they) - /ā/ sound
- ❌ **ei** (vein) - /ā/ sound (NOTE: This exists in Advanced Vowel Teams section - may need to move)
- ❌ **au** (autumn) - currently in diphthongs but might belong here
- ❌ **aw** (saw) - currently in diphthongs but might belong here
- ❌ Additional vowel team variations expected in curriculum

**NOTE:** Some cards may be in wrong sections (diphthongs vs vowel teams). Need curriculum document to verify exact categorization.

---

### SECTION 8: R-Controlled Vowels (5 cards) ✅ TARGET: 5
**Current Cards:**
1. ar (car)
2. er (her)
3. ir (bird)
4. or (corn)
5. ur (fur)

**Status:** COMPLETE ✅

---

### SECTION 9: Silent & Special Patterns (6 cards) ⚠️ TARGET: 7
**Current Cards:**
1. kn (knee)
2. wr (write)
3. gn (gnome)
4. mb (lamb)
5. tch (match)
6. dge (bridge)

**MISSING (1 card):**
- ❌ Likely **gh** (ghost, spaghetti) - silent gh pattern

---

### SECTION 10: Advanced Vowel Teams (13 cards) ⚠️ TARGET: 13
**Current Cards:**
1. ei_vein (vein) - /ā/ sound
2. ei_ceiling (ceiling) - /ē/ sound
3. eigh (eight) - /ā/ sound
4. ey_they (they) - /ā/ sound
5. ey_key (key) - /ē/ sound
6. eu (few) - /yoo/ sound
7. eau (beau) - /ō/ sound
8. ui_build (build) - /ĭ/ sound
9. oe_shoe (shoe) - /oo/ sound
10. ough_though (though) - /ō/ sound
11. ough_tough (tough) - /uff/ sound
12. ough_bought (bought) - /aw/ sound
13. ough_through (through) - /oo/ sound

**Status:** COUNT MATCHES ✅ (Need to verify if these are the exact 13 expected)

**NOTE:** Missing potential ough variations:
- ough (cough) - /off/ sound
- ough (plough) - /ow/ sound

---

### SECTION 11: Diphthongs (6 cards) ❓ (Not in curriculum sections)
**Current Cards:**
1. oi (coin)
2. oy (boy)
3. ou_house (house) - /ow/ sound
4. ou_soup (soup) - /oo/ sound
5. au (autumn) - /aw/ sound
6. aw (saw) - /aw/ sound

**Issue:** The curriculum outline doesn't have a separate "Diphthongs" section. These cards might need to be redistributed:
- oi/oy might go to Vowel Teams
- au/aw might go to Vowel Teams or Advanced Vowel Teams
- ou variations might go to Advanced Vowel Teams

---

### SECTION 12: Common Endings & Suffixes (9 cards) ✅ TARGET: 9
**Current Cards:**
1. ing (running)
2. ed_t (jumped) - /t/ sound
3. ed_d (played) - /d/ sound
4. ed_id (wanted) - /ĭd/ sound
5. er_suffix (baker)
6. est (biggest)
7. ful (joyful)
8. less (fearless)
9. ness (kindness)

**Status:** COMPLETE ✅

---

### SECTION 13: Common Word Endings (8 cards) ✅ TARGET: 8
**Current Cards:**
1. tion (station) - /shun/ sound
2. sion_vision (vision) - /zhun/ sound
3. sion_mission (mission) - /shun/ sound
4. ture (picture) - /cher/ sound
5. sure (measure) - /zhur/ sound
6. ous (famous) - /us/ sound
7. age (village) - /ij/ sound
8. ary (library) - /air-ee/ sound

**Status:** COMPLETE ✅

---

### SECTION 14: Rare & Advanced Patterns (15 cards) ⚠️ TARGET: 12
**Current Cards:**
1. ce (ice)
2. ci (circle)
3. cy (cycle)
4. ge (gem)
5. gi (giant)
6. gy (gym)
7. tle (little)
8. dle (middle)
9. gle (wiggle)
10. ple (apple)
11. wa (water)
12. war (warm)
13. wor (word)
14. ough_cough (cough) - /off/ sound
15. que (antique)

**Issue:** Have 15 cards but curriculum expects 12. May need to move some cards to other sections.

---

## Missing Cards Summary (34 Total Needed)

### High Priority Additions:

1. **Consonant Blends (2 missing):**
   - squ (squirrel)
   - spl (splash) OR str (street) OR scr (scream) OR spr (spring)

2. **Vowel Teams Section (7+ missing):**
   - Audit needed: Some current "diphthong" cards may need to be recategorized here
   - Additional vowel team patterns per curriculum

3. **Silent Patterns (1 missing):**
   - gh (ghost) - silent gh

4. **Categorization Issues:**
   - y_yes currently in y_vowel but should be consonant
   - Diphthongs section not in curriculum - redistribute oi, oy, au, aw, ou variations
   - Some advanced vowel patterns may be in wrong sections

---

## Voice-Over Script Analysis

### Scripts Needing Update:

Based on standard phonics curriculum format "Letter says sound. Word. Segmentation. Sound.", here are discrepancies:

1. **qu (queen)** - Current: "Qu says kw. Queen. Kw—een. Kw."
   - Should be: "Q-u says kw. Queen. Kw—een. Kw." (emphasize both letters)

2. **y_con (yarn)** - Current type: 'consonant'
   - Currently has: "Y says y. Yarn. Y—arn. Y."
   - **Issue:** Card ID is y_con but earlier there's also y_yes (type: y_vowel). These may be duplicates.

3. **All "why" explanations** - These are good pedagogical additions but need to match curriculum wording exactly if provided in source document.

4. **Segmentation formatting** - Most use "—" (em dash) which is good, but some may need adjustment:
   - "C—at" vs "Ca—t" (where to break)
   - "K—ite" vs "Ki—te"
   - Curriculum document should specify exact segmentation points

---

## Category/Type Assignment Issues

### Cards with Potential Misassignments:

1. **y_yes** (ID: line 144)
   - Current type: `'y_vowel'`
   - Should be: `'consonant'` OR removed (duplicate of y_con)

2. **Diphthongs** (entire section, lines 126-131)
   - Current type: `'diphthong'`
   - Cards: oi, oy, ou_house, ou_soup, au, aw
   - **Issue:** Curriculum doesn't have "diphthong" category
   - **Action:** Redistribute to 'vowel_team' or 'adv_vowel'

3. **Advanced Vowel Teams** (lines 147-161)
   - Current type: `'adv_vowel'`
   - Some of these (ei, ey) might belong in regular 'vowel_team' section
   - Need curriculum document to determine split

4. **Rare Patterns** (lines 184-199)
   - Current type: `'rare'`
   - Some patterns (ce, ci, cy, ge, gi, gy) might be better categorized as 'soft_c' and 'soft_g' variants
   - wa, war, wor are special r-controlled patterns

---

## Complete Card List (Target: 149 Cards)

### Section-by-Section Breakdown:

| Section | Current | Target | Status |
|---------|---------|--------|--------|
| 1. Single Consonants | 24 | 26 | Missing 2 |
| 2. Short Vowels | 5 | 5 | ✅ Complete |
| 3. Consonant Digraphs | 9 | 9 | ✅ Complete |
| 4. Consonant Blends | 21 | 23 | Missing 2 |
| 5. Long Vowels & Silent-E | 6 | 6 | ✅ Complete |
| 6. Y as a Vowel | 3 | 2 | 1 extra (y_yes issue) |
| 7. Vowel Teams | 17 | 24+ | Missing 7+ |
| 8. R-Controlled Vowels | 5 | 5 | ✅ Complete |
| 9. Silent & Special | 6 | 7 | Missing 1 |
| 10. Advanced Vowel Teams | 13 | 13 | ✅ Count matches |
| 11. Diphthongs | 6 | 0 | ❌ Section shouldn't exist |
| 12. Suffixes | 9 | 9 | ✅ Complete |
| 13. Word Endings | 8 | 8 | ✅ Complete |
| 14. Rare Patterns | 15 | 12 | 3 extra |
| **TOTAL** | **115** | **149** | **34 gap** |

---

## Recommended Actions

### Phase 1: Structural Reorganization
1. Remove standalone "diphthong" type - redistribute cards to vowel_team or adv_vowel
2. Fix y_yes categorization issue
3. Move misplaced cards between sections

### Phase 2: Add Missing Cards
1. Add 2 consonant blends (squ, spl/str/scr/spr)
2. Add 7+ vowel team cards
3. Add 1 silent pattern (gh)
4. Add remaining cards to reach 149 total

### Phase 3: Voice-Over Script Updates
1. Audit all segmentation patterns against curriculum
2. Update "why" explanations to match curriculum wording
3. Ensure consistent formatting across all scripts

### Phase 4: Type/Category Validation
1. Verify all 'type' assignments match curriculum categories
2. Update category filter in UI to match new structure
3. Test filtering functionality

---

## Questions Needing Curriculum Document:

To complete this analysis with 100% accuracy, I need the actual curriculum document to clarify:

1. **Exact 26 consonants**: Does it include vowel letters as "letter names" (A for acorn, E for elephant)?
2. **Exact 23 blends**: Which specific blends from squ, spl, scr, str, spr?
3. **Exact 24+ vowel teams**: Which specific teams beyond the current 17?
4. **Diphthong categorization**: Should oi, oy, au, aw, ou be in vowel teams or advanced?
5. **Exact 12 rare patterns**: Which 12 from the current 15?
6. **Voice-over scripts**: Exact wording and segmentation points
7. **"Why" explanations**: Exact pedagogical wording required

---

## File Location

This analysis is saved to: `e:\Desktop\PhonicsPal\PHONIC_DATA_ANALYSIS.md`

---

**Analysis Complete**
**Next Step:** Obtain curriculum document for precise card specifications and script requirements.
