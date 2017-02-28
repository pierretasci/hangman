const MAX_GUESSES = 8;
const ABC_KEYS = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
];
const QWERTY_KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
];
const STATIC_WORDS = [];
const getRandomWord = function() {
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  return new Promise((resolve, reject) => {
    if (protocol === 'http:') {
      return resolve(fetch(protocol + '//www.setgetgo.com/randomword/get.php', {
        cors: 'no-cors'
      }).then((res) => res.text()));
    } else if (STATIC_WORDS.length > 0) {
      return resolve(STATIC_WORDS[Math.round(Math.random() * STATIC_WORDS.length) - 1]);
    } else {
      return resolve(fetch('words.json')
        .then((res) => res.json())
        .then((raw) => {
          console.log(raw);
          STATIC_WORDS.push(...raw.words);
          return STATIC_WORDS[Math.round(Math.random() * STATIC_WORDS.length) - 1];
        }));
    }
  }).then((word) => {
    return word.toUpperCase().split('');
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
      allLettersFound: function() {
        for (let i = 0; i < this.word.length; ++i) {
          if (!this.guessed_letters.hasOwnProperty(this.word[i])) {
            // Missing letter. Return false;
            return false;
          }
        }
        this.wins++;
        return true;
      },
      gameIsLost: function() {
        if (this.guesses_left === 0 && !this.allLettersFound) {
          this.losses++;
          return true;
        }
        return false;
      },
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

      startNewGame: function() {
        getRandomWord().then((new_word) => {
          this.guessed_letters = {};
          this.guesses_left = MAX_GUESSES;
          this.word = new_word;
        });
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