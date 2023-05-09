"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like ["The", "cat", "cat."].
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let current = this.words[i];
      let next = this.words[i + 1] || null;

      if (chains[current]) {
        chains[current].push(next);
      } else {
        chains[current] = [next];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    const chains = this.chains;

    let randomText = `${this.words[0]} `;
    let currentWord = this.words[0];

    console.log("current word =", currentWord);
    console.log("word array =", this.words);

    while (currentWord != null) {
      currentWord = MarkovMachine.randomWord(chains[currentWord])

      if (currentWord != null) {
        randomText += `${currentWord} `;
      }
    }

    console.log("random text =", randomText);
    return randomText.slice(0, -1);
  }
  /** Return a random word from the array of words */
  static randomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }
}


/** Export the class */

module.exports = {
  MarkovMachine,
};

let machine = new MarkovMachine("The cat is in the hat. The cat is the cat. The hat is a cat.");

machine.getText();