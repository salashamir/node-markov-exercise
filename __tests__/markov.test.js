const {MarkovMachine} = require('../markov');

describe('MarkovMachine class attribute and method tests', function() {
    let markovMachine;

    beforeAll(function() {
        markovMachine = new MarkovMachine("the cat in the hat sat on the mat to eat the rat")
    })

    test("instance attributes are correct", function(){
        expect(markovMachine.words).toEqual(["the", "cat", "in", "the", "hat", "sat", "on", "the", "mat", "to", "eat", "the", "rat"]);
    })

    test("makeChains class instance method makes correct chains", function(){
        markovMachine.makeChains();

        expect(markovMachine.chains).toEqual(
            {
                "the": ["cat","hat","mat","rat"],
                "cat": ["in"],
                "in": ["the"],
                "hat": ["sat"],
                "sat": ["on"],
                "on": ["the"],
                "mat": ["to"],
                "to": ["eat"],
                "eat": ["the"],
                "rat": [null],
            }
        )
    })

    test("makeText produces string with valid number of words", function(){
        const textWords = markovMachine.makeText(8).split(" ");
        expect(textWords.length).toBeLessThanOrEqual(8);
        expect(textWords.length).toBeGreaterThan(0);

    })

    test("makeText returns a string containing at least some of the chains", function(){
        const textWords = markovMachine.makeText().split(" ");
        for (const word of textWords){
            expect(markovMachine.words).toContain(word);
        }
    })
})