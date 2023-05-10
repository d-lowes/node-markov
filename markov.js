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
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains[currentWord]) {
        chains[currentWord].push(nextWord);
      } else {
        chains[currentWord] = [nextWord];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice.
   * */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let randomText = [this.words[0]];
    let currentWord = this.words[0];

    // console.log("current word =", currentWord);
    // console.log("word array =", this.words);

    while (currentWord != null) {
      currentWord = MarkovMachine.randomWord(this.chains[currentWord])

      if (currentWord != null) {
        randomText.push(currentWord);
      }
    }

    // console.log("random text =", randomText);
    return randomText.join(" ");
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