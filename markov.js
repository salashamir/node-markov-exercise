/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const markovChainObject = this.words.reduce((acc, curr, i, arr) => {
      const nextWord = arr[i + 1] ? arr[i + 1] : null;

      if (!(curr in acc)) {
        acc[curr] = [nextWord];
      }

      if(!acc[curr].includes(nextWord)){
        acc[curr].push(nextWord);
      }

      return acc;

    }, {});
    
    this.chains = markovChainObject;
  }

  // make a random word choice
  static randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const chain = this.chains;
    const keys = Object.keys(chain)
    let word = MarkovMachine.randomChoice(keys);
    const result = [];
    while(result.length < numWords && word !== null){
      result.push(word);
      word = MarkovMachine.randomChoice(chain[word])
    }
    return result.join(" ");
  }
}

module.exports = {
  MarkovMachine
}