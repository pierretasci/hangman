const MAX_GUESSES = 6;
const ABC_KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const QWERTY_KEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const getRandomWord = function() {
  return fetch('http://www.setgetgo.com/randomword/get.php', {
    cors: 'no-cors'
  }).then((res) => {
    return res.text();
  }).then((word) => {
    return word.toUpperCase().split('');
  });
}

// == APP ==
// Get the first random word before starting.
getRandomWord().then((random_word) => {
  const app = new Vue({
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
}).catch((err) => {
  alert(err);
});