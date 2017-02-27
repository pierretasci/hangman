const MAX_GUESSES = 8;
const ABC_KEYS = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
];
const QWERTY_KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
];
const getRandomWord = function() {
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  return new Promise((resolve, reject) => {
    if (protocol === 'http:') {
      return resolve(fetch(protocol + '//www.setgetgo.com/randomword/get.php', {
        cors: 'no-cors'
      }));
    } else {
      reject(new Error('Cannot fetch words api over https. Violates security policy'));
    }
  }).then((res) => {
    return res.text();
  }).then((word) => {
    return word.toUpperCase().split('');
  }).catch((err) => {
    console.error(err);
    console.error('Could not fetch from remote. Fetching local.');
    return fetch('words.json');
  }).then((res) => {
    // If we got a response, that means it loaded correctly.
    return res.json();
  }).then((raw) => {
    console.log(raw);
    const STATIC_WORDS = raw.words;
    if (Array.isArray(STATIC_WORDS) && STATIC_WORDS.length > 0) {
      return STATIC_WORDS[Math.round(Math.random() * STATIC_WORDS.length) - 1]
        .toUpperCase()
        .split('');
    } else {
      throw new Error("Could not load static words.");
    }
  });
}

// == APP ==
// Get the first random word before starting.
let app = null;
getRandomWord().then((random_word) => {
  app = new Vue({
    el: '#app',
    data: {
      word: random_word || [],
      guesses_left: MAX_GUESSES,
      wins: 0,
      losses: 0,
      guessed_letters: {},
      keyboard_keys: ABC_KEYS,
    },
    computed: {
      hangmanClass: function() {
        const classes = {};
        for (let i = 0; i < MAX_GUESSES; ++i) {
          classes['sprite' + i] = MAX_GUESSES - this.guesses_left == i;
        }
        return classes;
      },
      hangmanWord: function() {
        return this.word.map((letter) => {
          if (this.guessed_letters.hasOwnProperty(letter)) {
            return letter;
          }
          return '_';
        });
      }
    },
    methods: {
      press: function(e) {
        e.preventDefault();
        const letter = e.target.dataset.letter;
        const tmp = {};
        tmp[letter] = 1;
        this.guessed_letters = Object.assign({}, this.guessed_letters, tmp);
        if (this.word.indexOf(letter) < 0) {
          --this.guesses_left;
        }
      },

      switchAbc: function() {
        this.keyboard_keys = ABC_KEYS;
      },

      switchQwerty: function() {
        this.keyboard_keys = QWERTY_KEYS;
      }
    }
  });
}).catch((err) => {
  alert(err);
});