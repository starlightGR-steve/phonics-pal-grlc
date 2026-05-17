import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Volume2, Settings, X, Mic, Play, Square, Trash2, Zap, GraduationCap, LayoutGrid, Layers, ChevronLeft, ChevronRight, ChevronDown, Wand2, Loader2, Lock } from 'lucide-react';
import { uploadAudioToFirebase, getAudioURLFromFirebase, deleteAudioFromFirebase, listAllAudioFiles } from './firebaseStorage';

// --- DATA CONSTANTS ---
const PHONIC_DATA = [
  // 🔤 SECTION 1 — Single Consonant Sounds (A–Z)
  { id: 'b', letter: 'b', word: 'ball', image: '⚽', type: 'consonant', voiceOver: "B says b. Ball. B—all. B." },
  { id: 'c_hard', letter: 'c', word: 'cat', image: '🐱', type: 'consonant', why: 'C says /k/ before a, o, u.', voiceOver: "C says k. Cat. C—at. K." },
  { id: 'c_soft', letter: 'c', word: 'cent', image: '💰', type: 'consonant', why: 'C says /s/ before e, i, y.', voiceOver: "C says s. Cent. C—ent. S." },
  { id: 'd', letter: 'd', word: 'dog', image: '🐶', type: 'consonant', voiceOver: "D says d. Dog. D—og. D." },
  { id: 'f', letter: 'f', word: 'fish', image: '🐟', type: 'consonant', voiceOver: "F says f. Fish. F—ish. F." },
  {
    id: 'g_hard', letter: 'g', word: 'goat', image: '🐐', type: 'consonant',
    why: 'G usually says /g/ before a, o, and u. Sometimes you may see /g/ before e or i too, like get.',
    voiceOver: "G says g. Goat. G—oat. G."
  },
  {
    id: 'g_soft', letter: 'g', word: 'gem', image: '💎', type: 'consonant',
    why: 'G can say /j/ like j in jam before e, i, and y. Some words like get and girl are tricky and still say /g/.',
    voiceOver: "G says j. Gem. G—em. J."
  },
  { id: 'h', letter: 'h', word: 'hat', image: '🎩', type: 'consonant', voiceOver: "H says h. Hat. H—at. H." },
  { id: 'j', letter: 'j', word: 'jet', image: '✈️', type: 'consonant', voiceOver: "J says j. Jet. J—et. J." },
  { id: 'k', letter: 'k', word: 'kite', image: '🪁', type: 'consonant', voiceOver: "K says k. Kite. K—ite. K." },
  { id: 'l', letter: 'l', word: 'leaf', image: '🍃', type: 'consonant', voiceOver: "L says l. Leaf. L—eaf. L." },
  { id: 'm', letter: 'm', word: 'moon', image: '🌙', type: 'consonant', voiceOver: "M says m. Moon. M—oon. M." },
  { id: 'n', letter: 'n', word: 'net', image: '🥅', type: 'consonant', voiceOver: "N says n. Net. N—et. N." },
  { id: 'p', letter: 'p', word: 'pig', image: '🐷', type: 'consonant', voiceOver: "P says p. Pig. P—ig. P." },
  {
    id: 'qu', letter: 'q', word: 'queen', image: '👑', type: 'consonant',
    why: 'Q usually comes before the letter u to say /kw/.',
    voiceOver: "Qu says kw. Queen. Kw—een. Kw."
  },
  { id: 'r', letter: 'r', word: 'rain', image: '🌧️', type: 'consonant', voiceOver: "R says r. Rain. R—ain. R." },
  { id: 's_sound', letter: 's', word: 'sun', image: '☀️', type: 'consonant', voiceOver: "S says s. Sun. S—un. S." },
  {
    id: 's_zsound', letter: 's', word: 'rose', image: '🌹', type: 'consonant',
    why: 'S can say /z/ in many words, especially in the middle or at the end, like nose and easy.',
    voiceOver: "S says z. Rose. Ro—se. Z."
  },
  { id: 't', letter: 't', word: 'turtle', image: '🐢', type: 'consonant', voiceOver: "T says t. Turtle. T—urtle. T." },
  { id: 'v', letter: 'v', word: 'van', image: '🚐', type: 'consonant', voiceOver: "V says v. Van. V—an. V." },
  { id: 'w', letter: 'w', word: 'web', image: '🕸️', type: 'consonant', voiceOver: "W says w. Web. W—eb. W." },
  { id: 'x_end', letter: 'x', word: 'box', image: '📦', type: 'consonant', voiceOver: "X says ks. Box. B—ox. Ks." },
  {
    id: 'y_con', letter: 'y', word: 'yarn', image: '🧶', type: 'consonant',
    why: 'Sometimes Y acts like a vowel at the ends of words. Go to the "Y as a vowel" cards for examples.',
    voiceOver: "Y says y. Yarn. Y—arn. Y."
  },
  { id: 'z', letter: 'z', word: 'zebra', image: '🦓', type: 'consonant', voiceOver: "Z says z. Zebra. Z—ebra. Z." },

  // 🔠 SECTION 2 — Short Vowel Sounds
  { id: 'short_a', letter: 'a', word: 'apple', image: '🍎', type: 'short_vowel', voiceOver: "A says ă. Apple. A—pple. Ă." },
  { id: 'short_e', letter: 'e', word: 'egg', image: '🥚', type: 'short_vowel', voiceOver: "E says ĕ. Egg. E—gg. Ĕ." },
  { id: 'short_i', letter: 'i', word: 'insect', image: '🐛', type: 'short_vowel', voiceOver: "I says ĭ. Insect. In—sect. Ĭ." },
  { id: 'short_o', letter: 'o', word: 'octopus', image: '🐙', type: 'short_vowel', voiceOver: "O says ŏ. Octopus. O—cto—pus. Ŏ." },
  { id: 'short_u', letter: 'u', word: 'umbrella', image: '☔', type: 'short_vowel', voiceOver: "U says ŭ. Umbrella. U—mbrel—la. Ŭ." },

  // 🔤 SECTION 3 — Consonant Digraphs
  { id: 'sh', letter: 'sh', word: 'ship', image: '🚢', type: 'digraph', voiceOver: "Sh says sh. Ship. Sh—ip. Sh." },
  { id: 'ch', letter: 'ch', word: 'chicken', image: '🐔', type: 'digraph', voiceOver: "Ch says ch. Chicken. Ch—ick—en. Ch." },
  { id: 'th_quiet', letter: 'th', word: 'thumb', image: '👍', type: 'digraph', why: 'This th is soft with no voice.', voiceOver: "Th says th. Thumb. Th—umb. Th." },
  { id: 'th_noisy', letter: 'th', word: 'this', image: '👉', type: 'digraph', why: 'This th uses your voice.', voiceOver: "Th says th. This. Th—is. Th." },
  { id: 'wh', letter: 'wh', word: 'whale', image: '🐋', type: 'digraph', voiceOver: "Wh says wh. Whale. Wh—ale. Wh." },
  { id: 'ph', letter: 'ph', word: 'phone', image: '📞', type: 'digraph', why: 'P and h together say /f/.', voiceOver: "Ph says f. Phone. F—one. F." },
  { id: 'ck', letter: 'ck', word: 'duck', image: '🦆', type: 'digraph', why: 'We use ck after a short vowel to say /k/.', voiceOver: "Ck says k. Duck. D—uck. K." },
  { id: 'ng', letter: 'ng', word: 'ring', image: '💍', type: 'digraph', voiceOver: "Ng says ng. Ring. R—ing. Ng." },
  {
    id: 'ch_hard', letter: 'ch', word: 'school', image: '🏫', type: 'digraph',
    why: 'ch says /k/ in some words',
    voiceOver: "Ch says k. School. Sch—ool. K."
  },

  // 🎧 SECTION 4 — Consonant Blends
  // L-Blends
  { id: 'bl', letter: 'bl', word: 'blue', image: '🔵', type: 'blend', voiceOver: "Bl says bl. Blue. Bl—ue. Bl." },
  { id: 'cl', letter: 'cl', word: 'clock', image: '⏰', type: 'blend', voiceOver: "Cl says cl. Clock. Cl—ock. Cl." },
  { id: 'fl', letter: 'fl', word: 'flag', image: '🚩', type: 'blend', voiceOver: "Fl says fl. Flag. Fl—ag. Fl." },
  { id: 'gl', letter: 'gl', word: 'glue', image: '🧴', type: 'blend', voiceOver: "Gl says gl. Glue. Gl—ue. Gl." },
  { id: 'pl', letter: 'pl', word: 'plane', image: '✈️', type: 'blend', voiceOver: "Pl says pl. Plane. Pl—ane. Pl." },
  { id: 'sl', letter: 'sl', word: 'slide', image: '🛝', type: 'blend', voiceOver: "Sl says sl. Slide. Sl—ide. Sl." },
  // R-Blends
  { id: 'br', letter: 'br', word: 'bread', image: '🍞', type: 'blend', voiceOver: "Br says br. Bread. Br—ead. Br." },
  { id: 'cr', letter: 'cr', word: 'crab', image: '🦀', type: 'blend', voiceOver: "Cr says cr. Crab. Cr—ab. Cr." },
  { id: 'dr', letter: 'dr', word: 'drum', image: '🥁', type: 'blend', voiceOver: "Dr says dr. Drum. Dr—um. Dr." },
  { id: 'fr', letter: 'fr', word: 'frog', image: '🐸', type: 'blend', voiceOver: "Fr says fr. Frog. Fr—og. Fr." },
  { id: 'gr', letter: 'gr', word: 'grapes', image: '🍇', type: 'blend', voiceOver: "Gr says gr. Grapes. Gr—apes. Gr." },
  { id: 'pr', letter: 'pr', word: 'prize', image: '🏆', type: 'blend', voiceOver: "Pr says pr. Prize. Pr—ize. Pr." },
  { id: 'tr', letter: 'tr', word: 'tree', image: '🌳', type: 'blend', voiceOver: "Tr says tr. Tree. Tr—ee. Tr." },
  // S-Blends
  { id: 'sc', letter: 'sc', word: 'scarf', image: '🧣', type: 'blend', voiceOver: "Sc says sk. Scarf. Sk—arf. Sk." },
  { id: 'sk', letter: 'sk', word: 'skate', image: '⛸️', type: 'blend', voiceOver: "Sk says sk. Skate. Sk—ate. Sk." },
  { id: 'sm', letter: 'sm', word: 'smile', image: '😊', type: 'blend', voiceOver: "Sm says sm. Smile. Sm—ile. Sm." },
  { id: 'sn', letter: 'sn', word: 'snail', image: '🐌', type: 'blend', voiceOver: "Sn says sn. Snail. Sn—ail. Sn." },
  { id: 'sp', letter: 'sp', word: 'spoon', image: '🥄', type: 'blend', voiceOver: "Sp says sp. Spoon. Sp—oon. Sp." },
  { id: 'st', letter: 'st', word: 'star', image: '⭐', type: 'blend', voiceOver: "St says st. Star. St—ar. St." },
  { id: 'sw', letter: 'sw', word: 'swing', image: '🛝', type: 'blend', voiceOver: "Sw says sw. Swing. Sw—ing. Sw." },
  // T-Blend
  { id: 'tw', letter: 'tw', word: 'twin', image: '👯‍♂️', type: 'blend', voiceOver: "Tw says tw. Twin. Tw—in. Tw." },

  // 🟦 SECTION 5 — Long Vowels & Silent-E
  { id: 'a_e', letter: 'a_e', word: 'cake', image: '🎂', type: 'silent_e', why: 'Silent e makes a say /ā/.', voiceOver: "A-e says ā. Cake. C—ake. Ā." },
  { id: 'e_e', letter: 'e_e', word: 'these', image: '👉', type: 'silent_e', why: 'Silent e makes e say /ē/.', voiceOver: "E-e says ē. These. Th—ese. Ē." },
  { id: 'i_e', letter: 'i_e', word: 'kite', image: '🪁', type: 'silent_e', why: 'Silent e makes i say /ī/.', voiceOver: "I-e says ī. Kite. K—ite. Ī." },
  { id: 'o_e', letter: 'o_e', word: 'nose', image: '👃', type: 'silent_e', why: 'Silent e makes o say /ō/.', voiceOver: "O-e says ō. Nose. N—ose. Ō." },
  { id: 'u_e', letter: 'u_e', word: 'cube', image: '🧊', type: 'silent_e', why: 'Sometimes u starts with a /y/ sound and says /yoo/.', voiceOver: "U-e says ū. Cube. C—ube. Ū." },
  {
    id: 'u_yoo', letter: 'u_e', word: 'tune', image: '🎵', type: 'silent_e',
    why: 'Silent e makes u say /ū/.',
    voiceOver: "U says yoo. Tune. T—une. Yoo."
  },

  // 🟨 SECTION 10 — Y as a Vowel
  { id: 'y_happy', letter: 'y', word: 'happy', image: '😊', type: 'y_vowel', why: 'Y at the end of a two-syllable word says /ē/.', voiceOver: "Y says ē. Happy. Hap—py. Ē." },
  { id: 'y_fly', letter: 'y', word: 'fly', image: '🪰', type: 'y_vowel', why: 'Y at the end of a one-syllable word says /ī/.', voiceOver: "Y says ī. Fly. Fl—y. Ī." },

  // 💛 SECTION 6 — Vowel Teams
  { id: 'ai', letter: 'ai', word: 'rain', image: '🌧️', type: 'vowel_team', voiceOver: "Ai says ā. Rain. R—ain. Ā." },
  { id: 'ay', letter: 'ay', word: 'play', image: '🎮', type: 'vowel_team', voiceOver: "Ay says ā. Play. Pl—ay. Ā." },
  { id: 'ee', letter: 'ee', word: 'tree', image: '🌳', type: 'vowel_team', voiceOver: "Ee says ē. Tree. Tr—ee. Ē." },
  { id: 'ea_leaf', letter: 'ea', word: 'leaf', image: '🍃', type: 'vowel_team', voiceOver: "Ea says ē. Leaf. L—eaf. Ē." },
  { id: 'ea_bread', letter: 'ea', word: 'bread', image: '🍞', type: 'vowel_team', why: 'Ea can also say /ĕ/.', voiceOver: "Ea says ĕ. Bread. Br—ead. Ĕ." },
  { id: 'ea_steak', letter: 'ea', word: 'steak', image: '🥩', type: 'vowel_team', why: 'Ea can sometimes say /ā/.', voiceOver: "Ea says ā. Steak. St—eak. Ā." },
  { id: 'oa', letter: 'oa', word: 'boat', image: '⛵', type: 'vowel_team', voiceOver: "Oa says ō. Boat. B—oat. Ō." },
  { id: 'oe', letter: 'oe', word: 'toe', image: '🦶', type: 'vowel_team', voiceOver: "Oe says ō. Toe. T—oe. Ō." },
  { id: 'ow_snow', letter: 'ow', word: 'snow', image: '❄️', type: 'vowel_team', voiceOver: "Ow says ō. Snow. Sn—ow. Ō." },
  { id: 'ow_cow', letter: 'ow', word: 'cow', image: '🐄', type: 'vowel_team', voiceOver: "Ow says ow. Cow. C—ow. Ow." },
  { id: 'ie_pie', letter: 'ie', word: 'pie', image: '🥧', type: 'vowel_team', voiceOver: "Ie says ī. Pie. P—ie. Ī." },
  { id: 'ie_field', letter: 'ie', word: 'field', image: '🌱', type: 'vowel_team', why: 'Ie can also say /ē/.', voiceOver: "Ie says ē. Field. F—ield. Ē." },
  { id: 'igh', letter: 'igh', word: 'light', image: '💡', type: 'vowel_team', voiceOver: "Igh says ī. Light. L—ight. Ī." },
  { id: 'ue', letter: 'ue', word: 'blue', image: '🔵', type: 'vowel_team', voiceOver: "Ue says ū. Blue. Bl—ue. Ū." },
  { id: 'ui', letter: 'ui', word: 'fruit', image: '🍇', type: 'vowel_team', voiceOver: "Ui says ū. Fruit. Fr—uit. Ū." },
  { id: 'oo_moon', letter: 'oo', word: 'moon', image: '🌙', type: 'vowel_team', voiceOver: "Oo says oo. Moon. M—oon. Oo." },
  { id: 'oo_book', letter: 'oo', word: 'book', image: '📘', type: 'vowel_team', voiceOver: "Oo says ŭ. Book. B—ook. Ŭ." },
  { id: 'oi', letter: 'oi', word: 'coin', image: '🪙', type: 'vowel_team', voiceOver: "Oi says oi. Coin. C—oin. Oi." },
  { id: 'oy', letter: 'oy', word: 'boy', image: '👦', type: 'vowel_team', voiceOver: "Oy says oi. Boy. B—oy. Oi." },
  { id: 'ou_house', letter: 'ou', word: 'house', image: '🏠', type: 'vowel_team', why: 'Ou can say different sounds; this card is for /ow/.', voiceOver: "Ou says ow. House. H—ouse. Ow." },
  { id: 'ou_soup', letter: 'ou', word: 'soup', image: '🍲', type: 'vowel_team', why: 'Ou can also say /oo/.', voiceOver: "Ou says oo. Soup. S—oup. Oo." },
  { id: 'au', letter: 'au', word: 'autumn', image: '🍂', type: 'vowel_team', voiceOver: "Au says aw. Autumn. Au—tumn. Aw." },
  { id: 'aw', letter: 'aw', word: 'draw', image: '✏️', type: 'vowel_team', voiceOver: "Aw says aw. Draw. Dr—aw. Aw." },

  // 🟥 SECTION 7 — R-Controlled Vowels
  { id: 'ar', letter: 'ar', word: 'car', image: '🚗', type: 'r_controlled', voiceOver: "Ar says ar. Car. C—ar. Ar." },
  { id: 'er', letter: 'er', word: 'her', image: '👩', type: 'r_controlled', voiceOver: "Er says er. Her. H—er. Er." },
  { id: 'ir', letter: 'ir', word: 'bird', image: '🐦', type: 'r_controlled', why: 'Ir, er, and ur all say the same sound.', voiceOver: "Ir says er. Bird. B—ird. Er." },
  {
    id: 'or', letter: 'or', word: 'corn', image: '🌽', type: 'r_controlled',
    why: 'Sometimes or can sound different. See the Rare & Advanced Patterns cards like wor in word.',
    voiceOver: "Or says or. Corn. C—orn. Or."
  },
  { id: 'ur', letter: 'ur', word: 'fur', image: '🐾', type: 'r_controlled', why: 'Ur, er, and ir say the same sound.', voiceOver: "Ur says er. Fur. F—ur. Er." },

  // 🔕 SECTION 9 — Silent Letters & Special Patterns
  { id: 'kn', letter: 'kn', word: 'knee', image: '🦵', type: 'silent', why: 'The k is silent. Kn says /n/.', voiceOver: "Kn says n. Knee. N—ee. N." },
  { id: 'wr', letter: 'wr', word: 'write', image: '✍️', type: 'silent', why: 'The w is silent. Wr says /r/.', voiceOver: "Wr says r. Write. R—ite. R." },
  { id: 'gn', letter: 'gn', word: 'gnome', image: '🧙‍♂️', type: 'silent', why: 'The g is silent. Gn says /n/.', voiceOver: "Gn says n. Gnome. N—ome. N." },
  { id: 'mb', letter: 'mb', word: 'lamb', image: '🐑', type: 'silent', why: 'The b is silent at the end. Mb says /m/.', voiceOver: "Mb says m. Lamb. L—am. M." },
  { id: 'tch', letter: 'tch', word: 'watch', image: '⌚', type: 'silent', why: 'Tch says /ch/ after a short vowel.', voiceOver: "Tch says ch. Watch. Wa—tch. Ch." },
  { id: 'dge', letter: 'dge', word: 'bridge', image: '🌉', type: 'silent', why: 'Dge says /j/ at the end after a short vowel.', voiceOver: "Dge says j. Bridge. Br—idge. J." },

  // 💎 SECTION 11 — Advanced Vowel Teams
  { id: 'ei_reindeer', letter: 'ei', word: 'reindeer', image: '🦌', type: 'adv_vowel', voiceOver: "Ei says ā. Reindeer. R—ein—deer. Ā." },
  { id: 'ei_ceiling', letter: 'ei', word: 'ceiling', image: '🏠', type: 'adv_vowel', why: 'Ei can also say ē.', voiceOver: "Ei says ē. Ceiling. C—eiling. Ē." },
  { id: 'eigh', letter: 'eigh', word: 'eight', image: '8️⃣', type: 'adv_vowel', voiceOver: "Eigh says ā. Eight. Ā—t. Ā." },
  { id: 'ey_they', letter: 'ey', word: 'they', image: '👫', type: 'adv_vowel', voiceOver: "Ey says ā. They. Th—ey. Ā." },
  { id: 'ey_key', letter: 'ey', word: 'key', image: '🔑', type: 'adv_vowel', voiceOver: "Ey says ē. Key. K—ey. Ē." },
  { id: 'ew', letter: 'ew', word: 'stew', image: '🍲', type: 'adv_vowel', why: 'Ew usually says /yoo/.', voiceOver: "Ew says yoo. Stew. St—ew. Yoo." },
  { id: 'eau', letter: 'eau', word: 'beau', image: '💐', type: 'adv_vowel', voiceOver: "Eau says ō. Beau. B—eau. Ō." },
  { id: 'ui_build', letter: 'ui', word: 'build', image: '🧱', type: 'adv_vowel', why: 'Ui sometimes says /ĭ/.', voiceOver: "Ui says ĭ. Build. B—uild. Ĭ." },
  {
    id: 'oe_shoe_adv', letter: 'oe', word: 'shoe', image: '👟', type: 'adv_vowel',
    why: 'In some words, oe says /oo/.',
    voiceOver: "Oe says oo. Shoe. Sh—oe. Oo."
  },
  { id: 'ough_though', letter: 'ough', word: 'though', image: '🤔', type: 'adv_vowel', voiceOver: "Ough says ō. Though. Th—ough. Ō." },
  { id: 'ough_tough', letter: 'ough', word: 'tough', image: '💪', type: 'adv_vowel', voiceOver: "Ough says uff. Tough. T—ough. Uff." },
  { id: 'ough_bought', letter: 'ough', word: 'bought', image: '🛒', type: 'adv_vowel', voiceOver: "Ough says aw. Bought. B—ought. Aw." },
  { id: 'ough_through', letter: 'ough', word: 'through', image: '➡️', type: 'adv_vowel', voiceOver: "Ough says oo. Through. Thr—ough. Oo." },
  { id: 'ough_cough', letter: 'ough', word: 'cough', image: '🤧', type: 'adv_vowel', voiceOver: "Ough says off. Cough. C—ough. Off." },

  // 🔚 SECTION 12 — Common Endings & Suffixes
  { id: 'ing', letter: 'ing', word: 'running', image: '🏃‍♂️', type: 'suffix', voiceOver: "Ing says ing. Running. Runn—ing. Ing." },
  { id: 'ed_t', letter: 'ed', word: 'jumped', image: '🦘', type: 'suffix', why: '-ed can say /t/ after quiet sounds.', voiceOver: "Ed says t. Jumped. Jump—t. T." },
  { id: 'ed_d', letter: 'ed', word: 'played', image: '🎮', type: 'suffix', why: '-ed can say /d/ after voiced sounds.', voiceOver: "Ed says d. Played. Play—d. D." },
  { id: 'ed_id', letter: 'ed', word: 'wanted', image: '🤠', type: 'suffix', why: '-ed says ĭd after t or d.', voiceOver: "Ed says id. Wanted. Want—ed. Ĭd." },
  { id: 'er_suffix', letter: 'er', word: 'baker', image: '🧁', type: 'suffix', why: '-er means "a person who."', voiceOver: "Er says er. Baker. Bak—er. Er." },
  { id: 'est', letter: 'est', word: 'biggest', image: '🐘', type: 'suffix', why: '-est means "the most."', voiceOver: "Est says est. Biggest. Bigg—est. Est." },
  { id: 'ful', letter: 'ful', word: 'joyful', image: '😀', type: 'suffix', voiceOver: "Ful says ful. Joyful. Joy—ful. Ful." },
  { id: 'less', letter: 'less', word: 'fearless', image: '🦁', type: 'suffix', voiceOver: "Less says less. Fearless. Fear—less. Less." },
  { id: 'ness', letter: 'ness', word: 'kindness', image: '💗', type: 'suffix', voiceOver: "Ness says ness. Kindness. Kind—ness. Ness." },

  // 📘 SECTION 13 — Common Word Endings
  { id: 'tion', letter: 'tion', word: 'station', image: '🚉', type: 'ending', why: 'Tion says "shun."', voiceOver: "Tion says shun. Station. Sta—tion. Shun." },
  { id: 'sion_vision', letter: 'sion', word: 'vision', image: '👁️', type: 'ending', why: 'Sion often says /zhun/.', voiceOver: "Sion says zhun. Vision. Vi—sion. Zhun." },
  { id: 'sion_mission', letter: 'sion', word: 'mission', image: '🎯', type: 'ending', why: 'Sometimes -sion says /shun/.', voiceOver: "Sion says shun. Mission. Mi—ssion. Shun." },
  { id: 'ture', letter: 'ture', word: 'picture', image: '🖼️', type: 'ending', why: 'Ture says "cher."', voiceOver: "Ture says cher. Picture. Pic—ture. Cher." },
  { id: 'sure', letter: 'sure', word: 'measure', image: '📏', type: 'ending', why: 'Sure usually says /zhur/.', voiceOver: "Sure says zhur. Measure. Mea—sure. Zhur." },
  { id: 'ous', letter: 'ous', word: 'famous', image: '⭐', type: 'ending', why: 'Ous says /us/.', voiceOver: "Ous says us. Famous. Fam—ous. Us." },
  { id: 'age', letter: 'age', word: 'village', image: '🏘️', type: 'ending', why: 'Age often says /ij/.', voiceOver: "Age says ij. Village. Vill—age. Ij." },
  { id: 'ary', letter: 'ary', word: 'library', image: '📚', type: 'ending', why: 'Ary says "air-ee."', voiceOver: "Ary says air-ee. Library. Libr—ary. Air-ee." },

  // 🟪 SECTION 14 — Rare & Advanced Patterns
  { id: 'tle', letter: 'tle', word: 'little', image: '🧒', type: 'rare', voiceOver: "Tle says tul. Little. Lit—tle. Tul." },
  { id: 'dle', letter: 'dle', word: 'middle', image: '⚖️', type: 'rare', voiceOver: "Dle says dul. Middle. Mid—dle. Dul." },
  { id: 'gle', letter: 'gle', word: 'wiggle', image: '🐛', type: 'rare', voiceOver: "Gle says gul. Wiggle. Wig—gle. Gul." },
  { id: 'ple', letter: 'ple', word: 'apple', image: '🍎', type: 'rare', voiceOver: "Ple says pul. Apple. Ap—ple. Pul." },
  { id: 'wa', letter: 'wa', word: 'water', image: '💧', type: 'rare', why: 'A after w can sound like /ŏ/ as in water and watch.', voiceOver: "Wa says wŏ. Water. Wa—ter. Wŏ." },
  { id: 'war', letter: 'war', word: 'warm', image: '🔥', type: 'rare', voiceOver: "War says wor. Warm. W—arm. Wor." },
  { id: 'wor', letter: 'wor', word: 'word', image: '✏️', type: 'rare', voiceOver: "Wor says wer. Word. Wer—d. Wer." },
  {
    id: 'que', letter: 'que', word: 'antique', image: '🪑', type: 'rare',
    why: 'Que often says /k/.',
    voiceOver: "Que says k. Antique. An—tique. K."
  },
  { id: 'x_start', letter: 'x', word: 'xylophone', image: '🎼', type: 'rare', why: 'This is a rare sound for x at the start', voiceOver: "X says z at the start. Xylophone. Zy—lo—phone. Z." },
];

const apiKey = ""; // Injected by environment

// --- UTILS FOR WAV CONVERSION ---
const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const createWavBlob = (pcm16Buffer, sampleRate = 24000) => {
    const buffer = new ArrayBuffer(44 + pcm16Buffer.byteLength);
    const view = new DataView(buffer);
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcm16Buffer.byteLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); 
    view.setUint16(20, 1, true); 
    view.setUint16(22, 1, true); 
    view.setUint32(24, sampleRate, true); 
    view.setUint32(28, sampleRate * 2, true); 
    view.setUint16(32, 2, true); 
    view.setUint16(34, 16, true); 
    writeString(view, 36, 'data');
    view.setUint32(40, pcm16Buffer.byteLength, true);
    const dest = new Uint8Array(buffer, 44);
    dest.set(new Uint8Array(pcm16Buffer));
    return new Blob([view], { type: 'audio/wav' });
};

const App = () => {
  // -- State --
  const [isPlaying, setIsPlaying] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState('stack'); // 'grid' or 'stack'
  const [stackIndex, setStackIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // Teacher mode
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // Category menu
  const [useFirebase, setUseFirebase] = useState(true); // Cloud storage toggle

  // Audio Recording State - Now supporting string IDs
  const [recordingActiveId, setRecordingActiveId] = useState(null);
  const [generatingActiveId, setGeneratingActiveId] = useState(null); 
  const [recordingTime, setRecordingTime] = useState(0);
  const [customRecordings, setCustomRecordings] = useState({}); 
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const currentAudioRef = useRef(null);
  const [audioLoading, setAudioLoading] = useState(true); // true until Firebase recordings are loaded
  const audioLoadingRef = useRef(true); // ref version so playAudioGeneric can read without re-render
  const pendingPlayRef = useRef(null); // { id, voiceOver } queued while loading

  // -- Check for Teacher Mode --
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'teacher') {
      setIsAdmin(true);
    }
  }, []);

  // -- Init Voices --
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const defaultVoiceIndex = availableVoices.findIndex(v => v.lang.includes('en-US') || v.lang.includes('en-GB'));
      if (defaultVoiceIndex !== -1) setSelectedVoiceIndex(defaultVoiceIndex);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // -- Init Custom Audio from Firebase --
  useEffect(() => {
    const loadCustomAudio = async () => {
      // Declare outside try so it's accessible in finally
      const recordings = {};
      try {
        const fileIds = await listAllAudioFiles();
        // Fetch all URLs in parallel instead of sequentially
        const results = await Promise.all(
          fileIds.map(async (id) => {
            const url = await getAudioURLFromFirebase(id);
            return { id, url };
          })
        );
        for (const { id, url } of results) {
          if (url) recordings[id] = url;
        }
        setCustomRecordings(recordings);
        console.log("✅ Loaded", Object.keys(recordings).length, "custom audio files from Firebase");
      } catch (err) {
        console.error("❌ Error loading audio from Firebase:", err);
      } finally {
        audioLoadingRef.current = false;
        setAudioLoading(false);

        // Fire any queued play using `recordings` directly — avoids stale React state closure
        if (pendingPlayRef.current) {
          const { id } = pendingPlayRef.current;
          pendingPlayRef.current = null;
          if (recordings[id]) {
            if (currentAudioRef.current) {
              currentAudioRef.current.pause();
              currentAudioRef.current = null;
            }
            window.speechSynthesis.cancel();
            const audio = new Audio(recordings[id]);
            currentAudioRef.current = audio;
            setIsPlaying(id);
            audio.onended = () => { setIsPlaying(null); currentAudioRef.current = null; };
            audio.play().catch(() => { setIsPlaying(null); currentAudioRef.current = null; });
          }
          // No recording for this card → user can tap Play Sound for TTS
        }
      }
    };
    loadCustomAudio();
  }, []);

  // -- Refresh URLs every 6 hours to prevent token expiry --
  useEffect(() => {
    const refreshUrls = async () => {
      try {
        const fileIds = await listAllAudioFiles();
        const results = await Promise.all(
          fileIds.map(async (id) => {
            const url = await getAudioURLFromFirebase(id);
            return { id, url };
          })
        );
        const newRecordings = {};
        for (const { id, url } of results) {
          if (url) newRecordings[id] = url;
        }
        setCustomRecordings(newRecordings);
        console.log("🔄 Audio URLs refreshed at", new Date().toLocaleTimeString());
      } catch (err) {
        console.error("❌ Error refreshing audio URLs:", err);
      }
    };

    // Refresh every 6 hours (21600000 ms)
    const interval = setInterval(refreshUrls, 21600000);
    return () => clearInterval(interval);
  }, []);

  // -- Filter Logic --
  const filteredData = useMemo(() => {
    if (selectedCategory === 'all') return PHONIC_DATA;
    return PHONIC_DATA.filter(item => item.type === selectedCategory);
  }, [selectedCategory]);

  // -- Safe Category Switching --
  const handleCategoryChange = (catId) => {
    stopAllAudio();
    setSelectedCategory(catId);
    setStackIndex(0); // Reset to prevent out-of-bounds errors
  };

  useEffect(() => {
    setStackIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'stack') return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, stackIndex, filteredData.length]);


  // -- AI Generation Logic --
  const generateAIAudio = async (targetId, textToSpeak) => {
    if (!targetId || !textToSpeak) return;
    setGeneratingActiveId(targetId);

    try {
        let promptText = textToSpeak.replace(/\//g, '').replace(/—/g, ', ');
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Kore" } 
                        }
                    }
                }
            })
        });

        if (!response.ok) throw new Error("AI Generation Failed");

        const result = await response.json();
        const base64Audio = result.candidates[0].content.parts[0].inlineData.data;
        
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const wavBlob = createWavBlob(bytes.buffer, 24000);

        // Upload to Firebase Storage
        const url = await uploadAudioToFirebase(targetId, wavBlob);
        setCustomRecordings(prev => ({ ...prev, [targetId]: url }));

        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current = null;
        }
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsPlaying(null);
          currentAudioRef.current = null;
        };
        setIsPlaying(targetId);
        audio.play();

    } catch (error) {
        console.error(error);
        alert("Failed to generate AI audio. Please try again.");
    } finally {
        setGeneratingActiveId(null);
    }
  };


  // -- Recording Logic --
  const startRecording = async (targetId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });

        // Upload to Firebase Storage
        try {
          const url = await uploadAudioToFirebase(targetId, blob);
          setCustomRecordings(prev => ({ ...prev, [targetId]: url }));
        } catch (error) {
          console.error("Failed to upload to Firebase:", error);
          alert("Failed to save recording to cloud. Please try again.");
        }

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecordingActiveId(targetId);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);

    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingActiveId) {
      mediaRecorderRef.current.stop();
      setRecordingActiveId(null);
      clearInterval(timerRef.current);
    }
  };

  const deleteRecording = async (id) => {
    try {
      // Delete from Firebase Storage
      await deleteAudioFromFirebase(id);

      setCustomRecordings(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (error) {
      console.error("Failed to delete recording:", error);
      alert("Failed to delete recording. Please try again.");
    }
  };

  // -- Stop all audio (centralized helper) --
  const stopAllAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(null);
  }, []);

  // -- Playback Logic --
  const handleCardClick = (item) => {
    // If clicking the same card that's already open and playing, just stop the sound
    if (activeCard?.id === item.id && isPlaying === item.id) {
      stopAllAudio();
      return; // Keep the modal open, just stop playing
    }

    // Otherwise, open the card and play its sound
    setActiveCard(item);
    stopAllAudio();
    playAudioGeneric(item.id, item.voiceOver); // Auto-play main sound
  };

  // Generic Player (Handles both Main Card and "Why" sections)
  const playAudioGeneric = useCallback(async (targetId, textFallback) => {
    // If Firebase recordings haven't loaded yet, queue this request and wait
    if (audioLoadingRef.current) {
      pendingPlayRef.current = { id: targetId, voiceOver: textFallback };
      console.log("⏳ Recordings still loading — queued play for", targetId);
      return;
    }

    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    setIsPlaying(null);

    // 1. Custom/AI Recording Exists?
    if (customRecordings[targetId]) {
      setIsPlaying(targetId);
      const audio = new Audio(customRecordings[targetId]);
      currentAudioRef.current = audio;
      audio.onended = () => {
        setIsPlaying(null);
        currentAudioRef.current = null;
      };

      audio.play().catch(async (e) => {
        console.warn("⚠️ Audio URL failed, refreshing URL for", targetId, e);
        currentAudioRef.current = null;

        // Try to fetch a fresh URL
        try {
          const freshUrl = await getAudioURLFromFirebase(targetId);
          if (freshUrl) {
            setCustomRecordings(prev => ({ ...prev, [targetId]: freshUrl }));
            const retryAudio = new Audio(freshUrl);
            currentAudioRef.current = retryAudio;
            retryAudio.onended = () => {
              setIsPlaying(null);
              currentAudioRef.current = null;
            };
            retryAudio.play().catch(() => {
              console.error("❌ Retry failed, falling back to TTS");
              setIsPlaying(null);
              currentAudioRef.current = null;
            });
          } else {
            console.error("❌ No fresh URL available, audio might be deleted");
            setIsPlaying(null);
          }
        } catch (refreshErr) {
          console.error("❌ Failed to refresh URL:", refreshErr);
          setIsPlaying(null);
        }
      });
      return;
    }

    // 2. Fallback to Browser TTS
    setIsPlaying(targetId);
    let textToSpeak = textFallback;

    if (textToSpeak) {
        textToSpeak = textToSpeak.replace(/\//g, '').replace(/—/g, '... ');
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = rate;
        utterance.pitch = pitch;
        if (voices[selectedVoiceIndex]) utterance.voice = voices[selectedVoiceIndex];
        utterance.onend = () => setIsPlaying(null);
        utterance.onerror = () => setIsPlaying(null);
        window.speechSynthesis.speak(utterance);
    } else {
        setIsPlaying(null);
    }
  }, [rate, pitch, voices, selectedVoiceIndex, customRecordings]);

  const closeCard = () => {
    stopAllAudio();
    setActiveCard(null);
    if (recordingActiveId) stopRecording();
  };

  const handleNext = () => {
    if (stackIndex < filteredData.length - 1) {
      stopAllAudio();
      const newIndex = stackIndex + 1;
      setStackIndex(newIndex);
      const card = filteredData[newIndex];
      if (card) playAudioGeneric(card.id, card.voiceOver);
    }
  };

  const handlePrev = () => {
    if (stackIndex > 0) {
      stopAllAudio();
      const newIndex = stackIndex - 1;
      setStackIndex(newIndex);
      const card = filteredData[newIndex];
      if (card) playAudioGeneric(card.id, card.voiceOver);
    }
  };

  const categories = [
    { id: 'all', label: 'All Cards' },
    { id: 'consonant', label: 'Consonants' },
    { id: 'short_vowel', label: 'Short Vowels' },
    { id: 'digraph', label: 'Digraphs' },
    { id: 'blend', label: 'Blends' },
    { id: 'silent_e', label: 'Silent E' },
    { id: 'vowel_team', label: 'Vowel Teams' },
    { id: 'r_controlled', label: 'R-Controlled' },
    { id: 'silent', label: 'Silent Letters' },
    { id: 'y_vowel', label: 'Y as Vowel' },
    { id: 'adv_vowel', label: 'Advanced' },
    { id: 'suffix', label: 'Suffixes' },
    { id: 'ending', label: 'Endings' },
    { id: 'rare', label: 'Rare Patterns' },
  ];

  const renderHighlightedWord = (item) => {
    const { word, letter, type } = item;
    if (type === 'silent_e' && letter.includes('_')) {
        const [startChar, endChar] = letter.split('_');
        const parts = word.split('');
        return (
            <span className="tracking-wide">
                {parts.map((char, idx) => {
                    const isFirst = char === startChar && idx === word.indexOf(startChar);
                    const isLast = char === endChar && idx === word.lastIndexOf(endChar);
                    if (isFirst || isLast) {
                        return <span key={idx} className="font-black text-indigo-600 underline decoration-2 decoration-indigo-300 underline-offset-4">{char}</span>;
                    }
                    return <span key={idx}>{char}</span>;
                })}
            </span>
        );
    }
    const pattern = letter;
    const idx = word.indexOf(pattern);
    if (idx >= 0) {
        return (
            <span className="tracking-wide">
                {word.substring(0, idx)}
                <span className="font-black text-indigo-600 underline decoration-2 decoration-indigo-300 underline-offset-4">{word.substring(idx, idx + pattern.length)}</span>
                {word.substring(idx + pattern.length)}
            </span>
        );
    }
    return word;
  };

  const renderCardContent = (card) => {
    const whyId = `${card.id}_why`;
    return (
    <>
        {/* Main Audio Control - ONLY SHOW IF ADMIN */}
        {isAdmin && (
        <div className="w-full mb-6 bg-slate-50 rounded-xl p-3 border border-slate-200 border-l-4 border-l-indigo-500">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1"><Lock className="w-3 h-3" /> Teacher Controls ({useFirebase ? 'Cloud' : 'Local'})</span>
                {customRecordings[card.id] && (
                    <button onClick={() => deleteRecording(card.id)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Clear
                    </button>
                )}
            </div>
            <div className="flex justify-center items-center gap-3">
                <button
                    onClick={() => generateAIAudio(card.id, card.voiceOver)}
                    disabled={!!recordingActiveId || !!generatingActiveId}
                    className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors ${generatingActiveId === card.id ? 'bg-indigo-100 text-indigo-400 cursor-wait' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'}`}
                >
                    {generatingActiveId === card.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    {generatingActiveId === card.id ? 'Generating...' : 'AI Voice'}
                </button>
                <div className="w-px h-6 bg-slate-300 mx-1"></div>
                {recordingActiveId !== card.id ? (
                    <button onClick={() => startRecording(card.id)} disabled={!!recordingActiveId} className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full transition-colors disabled:opacity-50">
                        <Mic className="w-4 h-4" /> Record
                    </button>
                ) : (
                    <button onClick={stopRecording} className="flex items-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full transition-colors animate-pulse">
                        <Square className="w-3 h-3 fill-current" /> Stop ({recordingTime}s)
                    </button>
                )}
            </div>
        </div>
        )}

        {/* Visual Anchor Area */}
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
            {/* Prominent Image */}
            <div className="text-[10rem] leading-none filter drop-shadow-sm select-none transition-transform hover:scale-105 cursor-pointer" onClick={() => playAudioGeneric(card.id, card.voiceOver)}>
                {card.image}
            </div>

            {/* Big Letter */}
            <div className="text-8xl font-black tracking-tighter leading-none text-indigo-600">
                {card.letter.replace('_', '-')}
            </div>
        </div>
        
        <div className="text-3xl text-slate-800 font-medium mb-8">
            {renderHighlightedWord(card)}
        </div>

        <div className="grid grid-cols-1 gap-4 w-full text-left">
            {card.trick && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1"><Zap className="w-4 h-4" /> TRICK</div>
                    <p className="text-slate-800">{card.trick}</p>
                </div>
            )}
            
            {/* Interactive "Why" Section */}
            {card.why && (
                <div className="bg-indigo-50 rounded-xl border border-indigo-100 overflow-hidden relative group">
                    {/* Text / Play Area */}
                    <button 
                        onClick={() => playAudioGeneric(whyId, card.why)}
                        className="w-full text-left p-4 hover:bg-indigo-100/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-1">
                            <GraduationCap className="w-4 h-4" /> WHY?
                            {isPlaying === whyId ? <Volume2 className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 opacity-50" />}
                        </div>
                        <p className="text-slate-800">{card.why}</p>
                    </button>

                    {/* Why Toolbar - ONLY SHOW IF ADMIN */}
                    {isAdmin && (
                    <div className="flex items-center justify-end gap-2 px-3 py-2 bg-indigo-100/50 border-t border-indigo-200/50">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase mr-auto"><Lock className="w-3 h-3 inline" /> Edit (Why)</span>
                        
                        {customRecordings[whyId] && (
                            <button onClick={(e) => {e.stopPropagation(); deleteRecording(whyId)}} className="p-1.5 text-red-500 hover:bg-red-100 rounded-md" title="Clear Recording">
                                <Trash2 className="w-3 h-3" />
                            </button>
                        )}

                        <button 
                            onClick={(e) => {e.stopPropagation(); generateAIAudio(whyId, card.why)}} 
                            disabled={!!recordingActiveId || !!generatingActiveId}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-200 rounded-md disabled:opacity-50" 
                            title="Generate AI Voice"
                        >
                            {generatingActiveId === whyId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                        </button>

                        {recordingActiveId === whyId ? (
                            <button onClick={(e) => {e.stopPropagation(); stopRecording()}} className="px-2 py-1 bg-red-500 text-white text-xs rounded-md animate-pulse flex items-center gap-1">
                                <Square className="w-3 h-3 fill-current" /> Stop
                            </button>
                        ) : (
                            <button onClick={(e) => {e.stopPropagation(); startRecording(whyId)}} disabled={!!recordingActiveId} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md disabled:opacity-50" title="Record Own Voice">
                                <Mic className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                    )}
                </div>
            )}
        </div>
    </>
  )};

  return (
    <div className="h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 overflow-hidden flex flex-col">

      {/* --- Header --- */}
      <header className="bg-white border-b border-slate-200 z-20 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-md">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight hidden sm:block">Phonics Pal</h1>
              <h1 className="text-xl font-bold text-slate-900 leading-tight sm:hidden">Phonics</h1>
              <p className="text-xs text-slate-500 font-medium">Master Flashcards ({PHONIC_DATA.length})</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                    <LayoutGrid className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode('stack')} className={`p-2 rounded-md transition-all ${viewMode === 'stack' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                    <Layers className="w-5 h-5" />
                </button>
            </div>

            <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-slate-100 rounded-full">
                <Settings className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

      </header>

      {/* Categories Button & Expandable Menu - Centered above cards */}
      <div className="w-full flex justify-center px-4 py-2 md:py-3 shrink-0">
        <div className="relative">
          {/* Main Category Button */}
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex items-center gap-3 px-6 py-3 bg-white rounded-full font-bold text-lg
              shadow-lg border-2 border-slate-200 transition-all duration-300 transform
              hover:scale-105 hover:shadow-xl hover:border-indigo-300 active:scale-95"
          >
            <span className="text-indigo-600">{categories.find(c => c.id === selectedCategory)?.label || 'All Cards'}</span>
            <div className={`
              w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center
              transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}
            `}>
              <ChevronDown className="w-5 h-5 text-indigo-600" />
            </div>
          </button>

          {/* Expandable Category Grid */}
          <div className={`
            absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50
            transition-all duration-300 ease-out origin-top
            ${showCategoryDropdown
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}>
            {/* Backdrop */}
            {showCategoryDropdown && (
              <div className="fixed inset-0 z-40" onClick={() => setShowCategoryDropdown(false)} />
            )}

            {/* Menu Panel */}
            <div className="relative z-50 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 p-4 w-[320px] sm:w-[380px]">
              {/* Arrow pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-slate-200 rotate-45" />

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCategoryChange(cat.id);
                      setShowCategoryDropdown(false);
                    }}
                    style={{ animationDelay: `${idx * 30}ms` }}
                    className={`
                      px-3 py-3 rounded-xl font-semibold text-sm
                      transition-all duration-200 transform hover:scale-105 active:scale-95
                      ${showCategoryDropdown ? 'animate-in fade-in zoom-in' : ''}
                      ${selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'
                      }
                    `}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Settings Modal --- */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Audio Settings</h2>
              <button onClick={() => setShowSettings(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Speed ({rate}x)</label>
                  <input type="range" min="0.5" max="1.5" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Pitch ({pitch})</label>
                <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"/>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Voice</label>
                <select value={selectedVoiceIndex} onChange={e => setSelectedVoiceIndex(parseInt(e.target.value))} className="w-full mt-2 p-2 border rounded-lg text-sm">
                  {voices.map((v, i) => <option key={i} value={i}>{v.name.slice(0,30)}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Content Area --- */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-4 w-full flex flex-col items-center overflow-hidden min-h-0">
        
        {/* GRID VIEW */}
        {viewMode === 'grid' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-h-[70vh] overflow-y-auto w-full p-2">
            {filteredData.map((item) => {
                let borderColor = 'border-slate-200';
                let textColor = 'text-slate-700';
                let badgeColor = 'bg-slate-100 text-slate-500';

                if (item.type.includes('vowel') || item.type === 'adv_vowel') {
                    borderColor = 'border-red-200'; textColor = 'text-red-600'; badgeColor = 'bg-red-100 text-red-600';
                } else if (item.type.includes('consonant')) {
                    borderColor = 'border-blue-200'; textColor = 'text-blue-600'; badgeColor = 'bg-blue-100 text-blue-600';
                } else if (item.type === 'digraph' || item.type === 'blend') {
                    borderColor = 'border-emerald-200'; textColor = 'text-emerald-600'; badgeColor = 'bg-emerald-100 text-emerald-600';
                } else if (item.type === 'suffix' || item.type === 'ending') {
                    borderColor = 'border-amber-200'; textColor = 'text-amber-600'; badgeColor = 'bg-amber-100 text-amber-600';
                }
                
                const hasCustom = !!customRecordings[item.id];

                return (
                <button
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`group relative flex flex-col items-center justify-center p-3 py-5 rounded-xl border-2 bg-white transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95 ${borderColor} ${isAdmin && hasCustom ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}
                >
                    {isAdmin && hasCustom && <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>}
                    <span className="text-2xl mb-2 opacity-50 grayscale group-hover:grayscale-0 transition-all">{item.image}</span>
                    <span className={`text-2xl font-black tracking-tight ${textColor}`}>{item.letter.replace('_', ' ')}</span>
                    <span className={`mt-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${badgeColor}`}>{item.word}</span>
                </button>
                );
            })}
            </div>
        )}

        {/* STACK VIEW */}
        {viewMode === 'stack' && filteredData.length > 0 && (
            <div className="flex flex-col items-center max-w-lg mx-auto w-full flex-1 min-h-0">
                <div className="bg-white rounded-3xl shadow-xl w-full text-center relative flex flex-col overflow-hidden flex-1 min-h-0">

                    <div className="p-6 md:p-8 flex-1 overflow-y-auto min-h-0">
                        {renderCardContent(filteredData[stackIndex])}
                    </div>

                    <div className="p-3 md:p-4 border-t border-slate-100 bg-slate-50 flex justify-center gap-4 shrink-0 rounded-b-3xl">
                        <button
                            onClick={() => playAudioGeneric(filteredData[stackIndex].id, filteredData[stackIndex].voiceOver)}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all active:scale-95 ${isAdmin && customRecordings[filteredData[stackIndex].id] ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
                        >
                            {audioLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Loading Audio...</> : isPlaying === filteredData[stackIndex].id ? <><Volume2 className="w-5 h-5 animate-pulse" /> Playing...</> : <><Play className="w-5 h-5" /> Play Sound</>}
                        </button>
                    </div>
                </div>

                {/* Stack Navigation Controls */}
                <div className="flex items-center justify-between w-full mt-4 md:mt-6 px-4 shrink-0">
                    <button
                        onClick={handlePrev}
                        disabled={stackIndex === 0}
                        className="p-4 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <span className="font-bold text-slate-400 text-sm tracking-widest uppercase">
                        Card {stackIndex + 1} of {filteredData.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={stackIndex === filteredData.length - 1}
                        className="p-4 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 md:mt-4 shrink-0">Tip: Use Left/Right arrow keys to flip</p>
            </div>
        )}
      </main>

      {/* --- Active Card Overlay --- */}
      {activeCard && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={closeCard} />
          <div className="pointer-events-auto relative w-full max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-end items-center bg-slate-50">
               <button onClick={closeCard} className="p-2 hover:bg-slate-200 rounded-full"><X className="w-6 h-6 text-slate-500" /></button>
            </div>
            <div className="p-6 flex flex-col items-center text-center overflow-y-auto">
                {renderCardContent(activeCard)}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center gap-4">
              <button
                onClick={() => playAudioGeneric(activeCard.id, activeCard.voiceOver)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all active:scale-95 ${isAdmin && customRecordings[activeCard.id] ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
              >
                {audioLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Loading Audio...</> : isPlaying === activeCard.id ? <><Volume2 className="w-5 h-5 animate-pulse" /> Playing...</> : <><Play className="w-5 h-5" /> {isAdmin && customRecordings[activeCard.id] ? 'Play Custom' : 'Play Sound'}</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;