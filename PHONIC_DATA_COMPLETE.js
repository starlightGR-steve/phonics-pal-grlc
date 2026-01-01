// Complete PHONIC_DATA array matching the December 2025 curriculum
// Total: 149 cards organized into 14 sections

const PHONIC_DATA = [
  // 🔤 SECTION 1 — Single Consonant Sounds (26 cards)
  { id: 'b', letter: 'b', word: 'ball', image: '⚽', type: 'consonant', voiceOver: "B says b. Ball. B—all. B." },
  { id: 'c_hard', letter: 'c', word: 'cat', image: '🐱', type: 'consonant', why: 'C says /k/ before a, o, u.', voiceOver: "C says k. Cat. C—at. K." },
  { id: 'c_soft', letter: 'c', word: 'cent', image: '💰', type: 'consonant', why: 'C says /s/ before e, i, y.', voiceOver: "C says s. Cent. C—ent. S." },
  { id: 'd', letter: 'd', word: 'dog', image: '🐶', type: 'consonant', voiceOver: "D says d. Dog. D—og. D." },
  { id: 'f', letter: 'f', word: 'fish', image: '🐟', type: 'consonant', voiceOver: "F says f. Fish. F—ish. F." },
  { id: 'g_hard', letter: 'g', word: 'goat', image: '🐐', type: 'consonant', why: 'G usually says /g/ before a, o, and u. Sometimes you may see /g/ before e or i too, like get.', voiceOver: "G says g. Goat. G—oat. G." },
  { id: 'g_soft', letter: 'g', word: 'gem', image: '💎', type: 'consonant', why: 'G can say /j/ like j in jam before e, i, and y. Some words like get and girl are tricky and still say /g/.', voiceOver: "G says j. Gem. G—em. J." },
  { id: 'h', letter: 'h', word: 'hat', image: '🎩', type: 'consonant', voiceOver: "H says h. Hat. H—at. H." },
  { id: 'j', letter: 'j', word: 'jet', image: '✈️', type: 'consonant', voiceOver: "J says j. Jet. J—et. J." },
  { id: 'k', letter: 'k', word: 'kite', image: '🪁', type: 'consonant', voiceOver: "K says k. Kite. K—ite. K." },
  { id: 'l', letter: 'l', word: 'leaf', image: '🍃', type: 'consonant', voiceOver: "L says l. Leaf. L—eaf. L." },
  { id: 'm', letter: 'm', word: 'moon', image: '🌙', type: 'consonant', voiceOver: "M says m. Moon. M—oon. M." },
  { id: 'n', letter: 'n', word: 'net', image: '🥅', type: 'consonant', voiceOver: "N says n. Net. N—et. N." },
  { id: 'p', letter: 'p', word: 'pig', image: '🐷', type: 'consonant', voiceOver: "P says p. Pig. P—ig. P." },
  {
    id: 'qu', letter: 'qu', word: 'queen', image: '👑', type: 'consonant',
    why: 'Q usually comes before the letter u to say /kw/.',
    voiceOver: "Qu says kw. Queen. Kw—een. Kw."
  },
  { id: 'r', letter: 'r', word: 'rain', image: '🌧️', type: 'consonant', voiceOver: "R says r. Rain. R—ain. R." },
  { id: 's_sound', letter: 's', word: 'sun', image: '☀️', type: 'consonant', voiceOver: "S says s. Sun. S—un. S." },
  { id: 's_zsound', letter: 's', word: 'rose', image: '🌹', type: 'consonant', why: 'S can say /z/ in many words, especially in the middle or at the end, like nose and easy.', voiceOver: "S says z. Rose. Ro—se. Z." },
  { id: 't', letter: 't', word: 'turtle', image: '🐢', type: 'consonant', voiceOver: "T says t. Turtle. T—urtle. T." },
  { id: 'v', letter: 'v', word: 'van', image: '🚐', type: 'consonant', voiceOver: "V says v. Van. V—an. V." },
  { id: 'w', letter: 'w', word: 'web', image: '🕸️', type: 'consonant', voiceOver: "W says w. Web. W—eb. W." },
  { id: 'x_start', letter: 'x', word: 'xylophone', image: '🎼', type: 'consonant', why: 'X at the start says /z/.', voiceOver: "X says z at the start. Xylophone. Zy—lo—phone. Z." },
  { id: 'x_end', letter: 'x', word: 'box', image: '📦', type: 'consonant', voiceOver: "X says ks. Box. B—ox. Ks." },
  { id: 'y_con', letter: 'y', word: 'yarn', image: '🧶', type: 'consonant', why: 'Sometimes Y acts like a vowel at the ends of words. Go to the "Y as a vowel" cards for examples.', voiceOver: "Y says y. Yarn. Y—arn. Y." },
  { id: 'z', letter: 'z', word: 'zebra', image: '🦓', type: 'consonant', voiceOver: "Z says z. Zebra. Z—ebra. Z." },

  // 🔠 SECTION 2 — Short Vowel Sounds (5 cards)
  { id: 'short_a', letter: 'a', word: 'apple', image: '🍎', type: 'short_vowel', voiceOver: "A says ă. Apple. A—pple. Ă." },
  { id: 'short_e', letter: 'e', word: 'egg', image: '🥚', type: 'short_vowel', voiceOver: "E says ĕ. Egg. E—gg. Ĕ." },
  { id: 'short_i', letter: 'i', word: 'insect', image: '🐛', type: 'short_vowel', voiceOver: "I says ĭ. Insect. In—sect. Ĭ." },
  { id: 'short_o', letter: 'o', word: 'octopus', image: '🐙', type: 'short_vowel', voiceOver: "O says ŏ. Octopus. O—cto—pus. Ŏ." },
  { id: 'short_u', letter: 'u', word: 'umbrella', image: '☔', type: 'short_vowel', voiceOver: "U says ŭ. Umbrella. U—mbrel—la. Ŭ." },

  // 🔤 SECTION 3 — Consonant Digraphs (9 cards)
  { id: 'sh', letter: 'sh', word: 'ship', image: '🚢', type: 'digraph', voiceOver: "Sh says sh. Ship. Sh—ip. Sh." },
  { id: 'ch', letter: 'ch', word: 'chicken', image: '🐔', type: 'digraph', voiceOver: "Ch says ch. Chicken. Ch—ick—en. Ch." },
  {
    id: 'ch_hard', letter: 'ch', word: 'school', image: '🏫', type: 'digraph',
    why: 'ch says /k/ in some words.',
    voiceOver: "Ch says k. School. Sch—ool. K."
  },
  { id: 'th_quiet', letter: 'th', word: 'thumb', image: '👍', type: 'digraph', why: 'This th is soft with no voice.', voiceOver: "Th says th. Thumb. Th—umb. Th." },
  { id: 'th_noisy', letter: 'th', word: 'this', image: '👉', type: 'digraph', why: 'This th uses your voice.', voiceOver: "Th says th. This. Th—is. Th." },
  { id: 'wh', letter: 'wh', word: 'whale', image: '🐋', type: 'digraph', voiceOver: "Wh says wh. Whale. Wh—ale. Wh." },
  { id: 'ph', letter: 'ph', word: 'phone', image: '📞', type: 'digraph', why: 'P and h together say /f/.', voiceOver: "Ph says f. Phone. F—one. F." },
  { id: 'ck', letter: 'ck', word: 'duck', image: '🦆', type: 'digraph', why: 'We use ck after a short vowel to say /k/.', voiceOver: "Ck says k. Duck. D—uck. K." },
  { id: 'ng', letter: 'ng', word: 'ring', image: '💍', type: 'digraph', voiceOver: "Ng says ng. Ring. R—ing. Ng." },

  // 🎧 SECTION 4 — Consonant Blends (23 cards)
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
  { id: 'str', letter: 'str', word: 'string', image: '🧵', type: 'blend', voiceOver: "Str says str. String. Str—ing. Str." },
  { id: 'spl', letter: 'spl', word: 'splash', image: '💦', type: 'blend', voiceOver: "Spl says spl. Splash. Spl—ash. Spl." },
  // T-Blend
  { id: 'tw', letter: 'tw', word: 'twin', image: '👯‍♂️', type: 'blend', voiceOver: "Tw says tw. Twin. Tw—in. Tw." },

  // 🟦 SECTION 5 — Long Vowels & Silent-E (6 cards)
  { id: 'a_e', letter: 'a_e', word: 'cake', image: '🎂', type: 'silent_e', why: 'Silent e makes a say /ā/.', voiceOver: "A-e says ā. Cake. C—ake. Ā." },
  { id: 'e_e', letter: 'e_e', word: 'these', image: '👉', type: 'silent_e', why: 'Silent e makes e say /ē/.', voiceOver: "E-e says ē. These. Th—ese. Ē." },
  { id: 'i_e', letter: 'i_e', word: 'kite', image: '🪁', type: 'silent_e', why: 'Silent e makes i say /ī/.', voiceOver: "I-e says ī. Kite. K—ite. Ī." },
  { id: 'o_e', letter: 'o_e', word: 'nose', image: '👃', type: 'silent_e', why: 'Silent e makes o say /ō/.', voiceOver: "O-e says ō. Nose. N—ose. Ō." },
  { id: 'u_e', letter: 'u_e', word: 'cube', image: '🧊', type: 'silent_e', why: 'Silent e makes u say /ū/.', voiceOver: "U-e says ū. Cube. C—ube. Ū." },
  {
    id: 'u_yoo', letter: 'u_e', word: 'tune', image: '🎵', type: 'silent_e',
    why: 'Sometimes u starts with a /y/ sound and says /yoo/.',
    voiceOver: "U says yoo. Tune. T—une. Yoo."
  },
  { id: 'y_e', letter: 'y_e', word: 'type', image: '⌨️', type: 'silent_e', why: 'Silent e makes y say /ī/.', voiceOver: "Y-e says ī. Type. T—ype. Ī." },

  // 🟨 SECTION 6 — Y as a Vowel (2 cards)
  { id: 'y_happy', letter: 'y', word: 'happy', image: '😊', type: 'y_vowel', why: 'Y at the end of a two-syllable word says /ē/.', voiceOver: "Y says ē. Happy. Hap—py. Ē." },
  { id: 'y_fly', letter: 'y', word: 'fly', image: '🪰', type: 'y_vowel', why: 'Y at the end of a one-syllable word says /ī/.', voiceOver: "Y says ī. Fly. Fl—y. Ī." },

  // 💛 SECTION 7 — Vowel Teams (24 cards - including diphthongs from old section)
  { id: 'ai', letter: 'ai', word: 'rain', image: '🌧️', type: 'vowel_team', voiceOver: "Ai says ā. Rain. R—ain. Ā." },
  { id: 'ay', letter: 'ay', word: 'play', image: '🎮', type: 'vowel_team', voiceOver: "Ay says ā. Play. Pl—ay. Ā." },
  { id: 'ee', letter: 'ee', word: 'tree', image: '🌳', type: 'vowel_team', voiceOver: "Ee says ē. Tree. Tr—ee. Ē." },
  { id: 'ea_leaf', letter: 'ea', word: 'leaf', image: '🍃', type: 'vowel_team', voiceOver: "Ea says ē. Leaf. L—eaf. Ē." },
  { id: 'ea_bread', letter: 'ea', word: 'bread', image: '🍞', type: 'vowel_team', why: 'Ea can also say /ĕ/.', voiceOver: "Ea says ĕ. Bread. Br—ead. Ĕ." },
  { id: 'ea_steak', letter: 'ea', word: 'steak', image: '🥩', type: 'vowel_team', why: 'Ea can sometimes say /ā/.', voiceOver: "Ea says ā. Steak. St—eak. Ā." },
  { id: 'oa', letter: 'oa', word: 'boat', image: '⛵', type: 'vowel_team', voiceOver: "Oa says ō. Boat. B—oat. Ō." },
  { id: 'oe', letter: 'oe', word: 'toe', image: '🦶', type: 'vowel_team', voiceOver: "Oe says ō. Toe. T—oe. Ō." },
  { id: 'ow_snow', letter: 'ow', word: 'snow', image: '❄️', type: 'vowel_team', voiceOver: "Ow says ō. Snow. Sn—ow. Ō." },
  { id: 'ie_pie', letter: 'ie', word: 'pie', image: '🥧', type: 'vowel_team', voiceOver: "Ie says ī. Pie. P—ie. Ī." },
  { id: 'ie_field', letter: 'ie', word: 'field', image: '🌱', type: 'vowel_team', why: 'Ie can also say /ē/.', voiceOver: "Ie says ē. Field. F—ield. Ē." },
  { id: 'igh', letter: 'igh', word: 'light', image: '💡', type: 'vowel_team', voiceOver: "Igh says ī. Light. L—ight. Ī." },
  { id: 'ue', letter: 'ue', word: 'blue', image: '🔵', type: 'vowel_team', voiceOver: "Ue says ū. Blue. Bl—ue. Ū." },
  { id: 'ui', letter: 'ui', word: 'fruit', image: '🍇', type: 'vowel_team', voiceOver: "Ui says ū. Fruit. Fr—uit. Ū." },
  { id: 'oo_moon', letter: 'oo', word: 'moon', image: '🌙', type: 'vowel_team', voiceOver: "Oo says oo. Moon. M—oon. Oo." },
  { id: 'oo_book', letter: 'oo', word: 'book', image: '📘', type: 'vowel_team', voiceOver: "Oo says ŭ. Book. B—ook. Ŭ." },
  { id: 'oo_foot', letter: 'oo', word: 'foot', image: '🦶', type: 'vowel_team', why: 'Oo can also make a short /u/ sound.', voiceOver: "Oo says ŭ. Foot. F—oot. Ŭ." },
  { id: 'oi', letter: 'oi', word: 'coin', image: '🪙', type: 'vowel_team', voiceOver: "Oi says oi. Coin. C—oin. Oi." },
  { id: 'oy', letter: 'oy', word: 'boy', image: '👦', type: 'vowel_team', voiceOver: "Oy says oi. Boy. B—oy. Oi." },
  { id: 'ou_house', letter: 'ou', word: 'house', image: '🏠', type: 'vowel_team', why: 'Ou can say different sounds; this card is for /ow/.', voiceOver: "Ou says ow. House. H—ouse. Ow." },
  { id: 'ou_soup', letter: 'ou', word: 'soup', image: '🍲', type: 'vowel_team', why: 'Ou can also say /oo/.', voiceOver: "Ou says oo. Soup. S—oup. Oo." },
  { id: 'ow_cow', letter: 'ow', word: 'cow', image: '🐄', type: 'vowel_team', voiceOver: "Ow says ow. Cow. C—ow. Ow." },
  { id: 'au', letter: 'au', word: 'autumn', image: '🍂', type: 'vowel_team', voiceOver: "Au says aw. Autumn. Au—tumn. Aw." },
  { id: 'aw', letter: 'aw', word: 'draw', image: '✏️', type: 'vowel_team', voiceOver: "Aw says aw. Draw. Dr—aw. Aw." },

  // 🟥 SECTION 8 — R-Controlled Vowels (5 cards)
  { id: 'ar', letter: 'ar', word: 'car', image: '🚗', type: 'r_controlled', voiceOver: "Ar says ar. Car. C—ar. Ar." },
  { id: 'er', letter: 'er', word: 'her', image: '👩', type: 'r_controlled', voiceOver: "Er says er. Her. H—er. Er." },
  { id: 'ir', letter: 'ir', word: 'bird', image: '🐦', type: 'r_controlled', why: 'Ir, er, and ur all say the same sound.', voiceOver: "Ir says er. Bird. B—ird. Er." },
  { id: 'or', letter: 'or', word: 'corn', image: '🌽', type: 'r_controlled', why: 'Sometimes or can sound different. See the Rare & Advanced Patterns cards like wor in word.', voiceOver: "Or says or. Corn. C—orn. Or." },
  { id: 'ur', letter: 'ur', word: 'fur', image: '🐾', type: 'r_controlled', why: 'Ur, er, and ir say the same sound.', voiceOver: "Ur says er. Fur. F—ur. Er." },

  // 🔕 SECTION 9 — Silent Letters & Special Patterns (7 cards)
  { id: 'kn', letter: 'kn', word: 'knee', image: '🦵', type: 'silent', why: 'The k is silent. Kn says /n/.', voiceOver: "Kn says n. Knee. N—ee. N." },
  { id: 'wr', letter: 'wr', word: 'write', image: '✍️', type: 'silent', why: 'The w is silent. Wr says /r/.', voiceOver: "Wr says r. Write. R—ite. R." },
  { id: 'gn', letter: 'gn', word: 'gnome', image: '🪆', type: 'silent', why: 'The g is silent. Gn says /n/.', voiceOver: "Gn says n. Gnome. N—ome. N." },
  { id: 'mb', letter: 'mb', word: 'lamb', image: '🐑', type: 'silent', why: 'The b is silent at the end. Mb says /m/.', voiceOver: "Mb says m. Lamb. L—am. M." },
  { id: 'gh', letter: 'gh', word: 'ghost', image: '👻', type: 'silent', why: 'Gh can be silent or say /f/. In ghost, g says /g/ and h is silent.', voiceOver: "Gh says g. Ghost. G—host. G." },
  { id: 'tch', letter: 'tch', word: 'match', image: '🕯️', type: 'silent', why: 'Tch says /ch/ after a short vowel.', voiceOver: "Tch says ch. Match. M—atch. Ch." },
  { id: 'dge', letter: 'dge', word: 'bridge', image: '🌉', type: 'silent', why: 'Dge says /j/ at the end after a short vowel.', voiceOver: "Dge says j. Bridge. Br—idge. J." },

  // 💎 SECTION 10 — Advanced Vowel Teams (13 cards)
  { id: 'ei_reindeer', letter: 'ei', word: 'reindeer', image: '🦌', type: 'adv_vowel', voiceOver: "Ei says ā. Reindeer. R—ein—deer. Ā." },
  { id: 'ei_ceiling', letter: 'ei', word: 'ceiling', image: '🏠', type: 'adv_vowel', why: 'Ei can also say /ē/.', voiceOver: "Ei says ē. Ceiling. C—eiling. Ē." },
  { id: 'eigh', letter: 'eigh', word: 'eight', image: '8️⃣', type: 'adv_vowel', voiceOver: "Eigh says ā. Eight. Ā—t. Ā." },
  { id: 'ey_they', letter: 'ey', word: 'they', image: '👫', type: 'adv_vowel', voiceOver: "Ey says ā. They. Th—ey. Ā." },
  { id: 'ey_key', letter: 'ey', word: 'key', image: '🔑', type: 'adv_vowel', voiceOver: "Ey says ē. Key. K—ey. Ē." },
  { id: 'eu', letter: 'eu', word: 'few', image: '🔢', type: 'adv_vowel', voiceOver: "Eu says yoo. Few. F—ew. Yoo." },
  { id: 'eau', letter: 'eau', word: 'beau', image: '💐', type: 'adv_vowel', voiceOver: "Eau says ō. Beau. B—eau. Ō." },
  { id: 'ui_build', letter: 'ui', word: 'build', image: '🧱', type: 'adv_vowel', why: 'Ui sometimes says /ĭ/.', voiceOver: "Ui says ĭ. Build. B—uild. Ĭ." },
  { id: 'oe_shoe_adv', letter: 'oe', word: 'shoe', image: '👟', type: 'adv_vowel', why: 'Oe can also say /oo/.', voiceOver: "Oe says oo. Shoe. Sh—oe. Oo." },
  { id: 'ough_though', letter: 'ough', word: 'though', image: '🤔', type: 'adv_vowel', voiceOver: "Ough says ō. Though. Th—ough. Ō." },
  { id: 'ough_tough', letter: 'ough', word: 'tough', image: '💪', type: 'adv_vowel', voiceOver: "Ough says uff. Tough. T—ough. Uff." },
  { id: 'ough_bought', letter: 'ough', word: 'bought', image: '🛒', type: 'adv_vowel', voiceOver: "Ough says aw. Bought. B—ought. Aw." },
  { id: 'ough_through', letter: 'ough', word: 'through', image: '➡️', type: 'adv_vowel', voiceOver: "Ough says oo. Through. Thr—ough. Oo." },
  { id: 'ough_cough', letter: 'ough', word: 'cough', image: '🤧', type: 'adv_vowel', voiceOver: "Ough says off. Cough. C—ough. Off." },

  // 🔚 SECTION 11 — Common Endings & Suffixes (9 cards)
  { id: 'ing', letter: 'ing', word: 'running', image: '🏃‍♂️', type: 'suffix', voiceOver: "Ing says ing. Running. Runn—ing. Ing." },
  { id: 'ed_t', letter: 'ed', word: 'jumped', image: '🦘', type: 'suffix', why: '-ed can say /t/ after quiet sounds.', voiceOver: "Ed says t. Jumped. Jump—t. T." },
  { id: 'ed_d', letter: 'ed', word: 'played', image: '🎮', type: 'suffix', why: '-ed can say /d/ after voiced sounds.', voiceOver: "Ed says d. Played. Play—d. D." },
  { id: 'ed_id', letter: 'ed', word: 'wanted', image: '🤠', type: 'suffix', why: '-ed says ĭd after t or d.', voiceOver: "Ed says id. Wanted. Want—ed. Ĭd." },
  { id: 'er_suffix', letter: 'er', word: 'baker', image: '🧁', type: 'suffix', why: '-er means "a person who."', voiceOver: "Er says er. Baker. Bak—er. Er." },
  { id: 'est', letter: 'est', word: 'biggest', image: '🐘', type: 'suffix', why: '-est means "the most."', voiceOver: "Est says est. Biggest. Bigg—est. Est." },
  { id: 'ful', letter: 'ful', word: 'joyful', image: '😀', type: 'suffix', voiceOver: "Ful says ful. Joyful. Joy—ful. Ful." },
  { id: 'less', letter: 'less', word: 'fearless', image: '🦁', type: 'suffix', voiceOver: "Less says less. Fearless. Fear—less. Less." },
  { id: 'ness', letter: 'ness', word: 'kindness', image: '💗', type: 'suffix', voiceOver: "Ness says ness. Kindness. Kind—ness. Ness." },

  // 📘 SECTION 12 — Common Word Endings (8 cards)
  { id: 'tion', letter: 'tion', word: 'station', image: '🚉', type: 'ending', why: 'Tion says "shun."', voiceOver: "Tion says shun. Station. Sta—tion. Shun." },
  { id: 'sion_vision', letter: 'sion', word: 'vision', image: '👁️', type: 'ending', why: 'Sion often says /zhun/.', voiceOver: "Sion says zhun. Vision. Vi—sion. Zhun." },
  { id: 'sion_mission', letter: 'sion', word: 'mission', image: '🎯', type: 'ending', why: 'Sometimes -sion says /shun/.', voiceOver: "Sion says shun. Mission. Mi—ssion. Shun." },
  { id: 'ture', letter: 'ture', word: 'picture', image: '🖼️', type: 'ending', why: 'Ture says "cher."', voiceOver: "Ture says cher. Picture. Pic—ture. Cher." },
  { id: 'sure', letter: 'sure', word: 'measure', image: '📏', type: 'ending', why: 'Sure usually says /zhur/.', voiceOver: "Sure says zhur. Measure. Mea—sure. Zhur." },
  { id: 'ous', letter: 'ous', word: 'famous', image: '⭐', type: 'ending', why: 'Ous says /us/.', voiceOver: "Ous says us. Famous. Fam—ous. Us." },
  { id: 'age', letter: 'age', word: 'village', image: '🏘️', type: 'ending', why: 'Age often says /ij/.', voiceOver: "Age says ij. Village. Vill—age. Ij." },
  { id: 'ary', letter: 'ary', word: 'library', image: '📚', type: 'ending', why: 'Ary says "air-ee."', voiceOver: "Ary says air-ee. Library. Libr—ary. Air-ee." },

  // 🟪 SECTION 13 — Rare & Advanced Patterns (12 cards)
  { id: 'ce', letter: 'ce', word: 'ice', image: '🧊', type: 'rare', why: 'C says /s/ before e.', voiceOver: "Ce says s. Ice. I—ce. S." },
  { id: 'ci', letter: 'ci', word: 'circle', image: '🔵', type: 'rare', voiceOver: "Ci says s. Circle. Cir—cle. S." },
  { id: 'cy', letter: 'cy', word: 'cycle', image: '🚴‍♂️', type: 'rare', voiceOver: "Cy says s. Cycle. Cy—cle. S." },
  { id: 'ge', letter: 'ge', word: 'gem', image: '💎', type: 'rare', why: 'G says /j/ before e.', voiceOver: "Ge says j. Gem. G—em. J." },
  { id: 'gi', letter: 'gi', word: 'giant', image: '🧌', type: 'rare', voiceOver: "Gi says j. Giant. Gi—ant. J." },
  { id: 'gy', letter: 'gy', word: 'gym', image: '🏋️‍♂️', type: 'rare', voiceOver: "Gy says j. Gym. Gy—m. J." },
  { id: 'tle', letter: 'tle', word: 'little', image: '🧒', type: 'rare', voiceOver: "Tle says tul. Little. Lit—tle. Tul." },
  { id: 'dle', letter: 'dle', word: 'middle', image: '⚖️', type: 'rare', voiceOver: "Dle says dul. Middle. Mid—dle. Dul." },
  { id: 'gle', letter: 'gle', word: 'wiggle', image: '🐛', type: 'rare', voiceOver: "Gle says gul. Wiggle. Wig—gle. Gul." },
  { id: 'ple', letter: 'ple', word: 'apple', image: '🍎', type: 'rare', voiceOver: "Ple says pul. Apple. Ap—ple. Pul." },
  { id: 'wa', letter: 'wa', word: 'water', image: '💧', type: 'rare', why: 'A after w can sound like /ŏ/ as in water and watch.', voiceOver: "Wa says wŏ. Water. Wa—ter. Wŏ." },
  { id: 'war', letter: 'war', word: 'warm', image: '🔥', type: 'rare', voiceOver: "War says wor. Warm. W—arm. Wor." },
  { id: 'wor', letter: 'wor', word: 'word', image: '✏️', type: 'rare', voiceOver: "Wor says wer. Word. Wer—d. Wer." },
  { id: 'que', letter: 'que', word: 'antique', image: '🪑', type: 'rare', why: 'Que often says /k/.', voiceOver: "Que says k. Antique. An—tique. K." },
];

// Export for use in App.jsx
export default PHONIC_DATA;
