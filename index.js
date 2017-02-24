const MAX_GUESSES = 6;
const ABC_KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const QWERTY_KEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const WORDS = ["jazz", "buzz", "jazzed", "hajj", "jazzy", "buzzed", "buzzing", "jinx", "fuzzy", "razz", "puff", "jazzes", "quiz", "fizzy", "huff", "dizzy", "buff", "buzzer", "jiff", "junk", "fizzed", "duff", "armen", "matt", "abject", "aberration", "abjure", "abnegation", "abrogate", "abscond", "abstruse", "accede", "accost", "accretion", "acumen", "adamant", "admonish", "adumbrate", "adverse", "advocate", "affluent", "aggrandize", "alacrity", "alias", "ambivalent", "amenable", "amorphous", "anachronistic", "anathema", "annex", "antediluvian", "antiseptic", "apathetic", "antithesis", "apocryphal", "approbation", "arbitrary", "arboreal", "arcane", "archetypal", "arrogate", "ascetic", "aspersion", "assiduous", "atrophy", "bane", "bashful", "beguile", "bereft", "blandishment", "bilk", "bombastic", "cajole", "callous", "calumny", "camaraderie", "candor", "capitulate", "carouse", "carp", "caucus", "cavort", "circumlocution", "circumscribe", "circumvent", "clamor", "cleave", "cobbler", "cogent", "cognizant", "commensurate", "complement", "compunction", "concomitant", "conduit", "conflagration", "congruity", "connive", "consign", "constituent", "construe", "contusion", "contrite", "contentious", "contravene", "convivial", "corpulence", "covet", "cupidity", "dearth", "debacle", "debauch", "debunk", "defunct", "demagogue", "denigrate", "derivative", "despot", "diaphanous", "didactic", "dirge", "disaffected", "discomfit", "disparate", "dispel", "disrepute", "divisive", "dogmatic", "dour", "duplicity", "duress", "eclectic", "edict", "ebullient", "egregious", "elegy", "elicit", "embezzlement", "emend", "emollient", "empirical", "emulate", "enervate", "enfranchise", "engender", "ephemeral", "epistolary", "equanimity", "equivocal", "espouse", "evanescent", "evince", "exacerbate", "exhort", "execrable", "exigent", "expedient", "expiate", "expunge", "extraneous", "extol", "extant", "expurgate", "fallacious", "fatuous", "fetter", "flagrant", "foil", "forbearance", "fortuitous", "fractious", "garrulous", "gourmand", "grandiloquent", "gratuitous", "hapless", "hegemony", "heterogenous", "iconoclast", "idiosyncratic", "impecunious", "impetuous", "impinge", "impute", "inane", "inchoate", "incontrovertible", "incumbent", "inexorable", "inimical", "injunction", "inoculate", "insidious", "instigate", "insurgent", "interlocutor", "intimation", "inure", "invective", "intransigent", "inveterate", "habitual", 
"irreverence", "knell", "laconic", "largesse", "legerdemain", "libertarian", "licentious", "linchpin", "litigant", "maelstrom", "maudlin", "maverick", "mawkish", "maxim", "mendacious", "modicum", "morass", "mores", "munificent", "multifarious", "nadir", "negligent", "neophyte", "noisome", "noxious", "obdurate", "obfuscate", "obstreperous", "officious", "onerous", "ostensible", "ostracism", "palliate", "panacea", "paradigm", "pariah", "partisan", "paucity", "pejorative", "pellucid", "penchant", "penurious", "pert", "pernicious", "pertinacious", "phlegmatic", "philanthropic", "pithy", "platitude", "plaudit", "plenitude", "plethora", "portent", "potentate", "preclude", "predilection", "preponderance", "presage", "probity", "proclivity", "profligate", "promulgate", "proscribe", "protean", "prurient", "puerile", "pugnacious", "pulchritude", "punctilious", "quaint", "quixotic", "quandary", "recalcitrant", "redoubtable", "relegate", "remiss", "reprieve", "reprobate", "rescind", "requisition", "rife", "sanctimonious", "sanguine", "scurrilous", "semaphore", "serendipity", "sobriety", "solicitous", "solipsism", "spurious", "staid", "stolid", "subjugate", "surfeit", "surreptitious", "swarthy", "tangential", "tome", "toady", "torpid", "travesty", "trenchant", "trite", "truculent", "turpitude", "ubiquitous", "umbrage", "upbraid", "utilitarian", "veracity", "vestige", "vicissitude", "vilify", "virtuoso", "vitriolic", "vituperate", "vociferous", "wanton", "winsome", "yoke", "zephyr", "wily", "tirade"];
const getRandomWord = function() {
  return WORDS[Math.round(Math.random() * WORDS.length) - 1]
    .toUpperCase()
    .split('');
}

// == APP ==
const app = new Vue({
  el: '#app',
  data: {
    word: getRandomWord(),
    guesses_left: MAX_GUESSES,
    wins: 0,
    losses: 0,
    guessed_letters: {},
    keyboard_keys: ABC_KEYS,
  },
  computed: {
    hangmanWord: function() {
      return this.word.map((letter) => {
        if (this.guessed_letters.hasOwnProperty(letter)) {
          return letter;
        }
        return '_';
      });
    }
  }
});