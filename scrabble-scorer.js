// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue); 
      //= `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
 
 let simpleScorer = {
  1 : ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
};
function simpleScore(word) {
  word = word.toUpperCase();
  let wordPoints = 0;
  for (let i = 0; i < word.length; i++) {
    if(simpleScorer[1].includes(word[i])) {
      wordPoints ++; 
    }
  }
  return wordPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(prompt) {
   let scrabbleWord = input.question("Let's play some scrabble! Enter a word to score:");
   console.log(scorerPrompt(scrabbleWord));
   //console.log("Let's play some scrabble! Enter a word:");
   //console.log(oldScrabbleScorer(scrabbleWord));

   //console.log("Word points for: " + simpleScore(scrabbleWord));

   //console.log(vowelBonusScore(scrabbleWord));
};

let vowelBonusScorer = {
  3 : ['A','E','I','O','U'],
  1 : ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z']
};

function vowelBonusScore(word) {
  word = word.toUpperCase();
  let vowelConsonantValue = 0;
  for (i = 0; i < word.length; i++) {
    for (const letterValue in vowelBonusScorer) {
      if(vowelBonusScorer[letterValue].includes(word[i])){
        vowelConsonantValue += Number(letterValue);
      //= `Points for '${word[i]}': ${letterValue}\n`; 
      }
    }
  }
  return vowelConsonantValue;
}

function scrabbleScore(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
  
	for (let i = 0; i < word.length; i++) {
			letterPoints += Number(newPointStructure[word[i]]);
	}
	
	return letterPoints;
}

const scoringAlgorithms = [
  {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScore
  },
  {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScore
  },
  {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  console.log('Which scoring algorithm would you like to use?');

    for (let i = 0; i < scoringAlgorithms.length; i++){
       console.log(`${i} - ${scoringAlgorithms[i].description}`);
    }
    
     let methodNumber = input.question('Enter 0, 1, or 2: ');
     while (isNaN(methodNumber) || methodNumber < 0 || methodNumber > 2 ){
      methodNumber = input.question('Please enter a valid number: ');
     } 

     console.log(`Score for ${word}: ${scoringAlgorithms[Number(methodNumber)].scorerFunction(word)}`);

}

function transform(oldPointStructure) {
  let newStructure = {};
  for (const keyValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[keyValue].length; i++) {
       newStructure[oldPointStructure[keyValue][i].toLowerCase()] = Number(keyValue);
    }
}
  // newStructure[' '] = 0; 
  return newStructure;

};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   initialPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

