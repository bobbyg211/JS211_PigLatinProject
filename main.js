"use strict";

// brings in the assert module for unit testing
const assert = require("assert");
// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// MY CODE
const pigLatin = (word) => {
  const vowel = ["a", "e", "i", "o", "u"];
  word = word.toLowerCase().trim();
  let vowelFound = false;
  let inputArray = word.split(" ");

  // Loop over array of every word entered
  for (let i = 0; i < inputArray.length; i++) {
    // Check of first letter of word is NOT a vowel
    if (!vowel.includes(inputArray[i][0])) {
      // Loop over individual letters in a word to find first vowel
      for (let j = 0; j < inputArray[i].length; j++) {
        // Run if vowel is found at particular letter index, if one has not been found already
        if (vowel.includes(inputArray[i][j]) && vowelFound === false) {
          let firstHalf = inputArray[i].substring(0, j);
          let secondHalf = inputArray[i].substring(j);
          inputArray[i] = secondHalf + firstHalf + "ay";

          vowelFound = true;
        }
      }
      // Run if word has NO vowels
      if (vowelFound === false) {
        inputArray[i] = inputArray[i] + "yay";
      }
      vowelFound = false;
      // Run if word starts with a vowel
    } else {
      inputArray[i] = inputArray[i] + "yay";
    }
  }

  // SOMEHOW MOVE PUNCTUATION TO THE END

  return inputArray.join(" ");
};

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question("word ", (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
};

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === "function") {
  describe("#pigLatin()", () => {
    it("should translate a simple word", () => {
      assert.equal(pigLatin("car"), "arcay");
      assert.equal(pigLatin("dog"), "ogday");
    });
    it("should translate a complex word", () => {
      assert.equal(pigLatin("create"), "eatecray");
      assert.equal(pigLatin("valley"), "alleyvay");
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin("egg"), "eggyay");
      assert.equal(pigLatin("emission"), "emissionyay");
    });
    it("should lowercase and trim word before translation", () => {
      assert.equal(pigLatin("HeLlO "), "ellohay");
      assert.equal(pigLatin(" RoCkEt"), "ocketray");
    });
  });
} else {
  getPrompt();
}

// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins in with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.
