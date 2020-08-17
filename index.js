// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}
const counter1 = counterMaker();

// counter2 code
let count = 0;
function counter2() {
  return count++;
}

console.log(counter1());
console.log(counter2());

//1. They have the same result.  counter1 uses a callback function, while counter2 alters a global variable (count).
//2. counter2 uses a closure, because it references the variable count outside of its function.
//3. counter1 increments 'count' in a self-contained way.  Other functions (such as count2) can't accidentally modify it.  Use counter2 modifies 'count' outside of its function.  It is used when 'count' needs to be globally available (such as modified in another function).


/* Task 2: inning() 

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

inning = () => Math.floor(Math.random() * 3);

/* TEST CODE*/
console.log(inning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 


function finalScore(callInning, numInnings){
  let finScore;
  /* console.log('check '+finScore + ' '+ numInnings); TEST CODE */

  function calcScore() {
    finScore = 0;
    for (let i=0; i<numInnings; i++){      
      finScore = finScore + callInning(); 
      /* console.log(finScore+' at i = '+i); TEST CODE */
    };
    /* console.log('check2 '+finScore + ' '+ numInnings); TEST CODE */
    return finScore;
  };

  return {Home:(calcScore(numInnings)), Away: (calcScore(numInnings))};
};

console.log(finalScore(inning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */


function getInningScore(inning_cb, numInnings_param){
  scoreArr = [{awayScore: 0, homeScore: 0}]; /*initialize*/
  for (let i=1; i<numInnings_param+1; i++){
    scoreArr.push({
        awayScore: scoreArr[i-1].awayScore + inning_cb(), 
        homeScore: scoreArr[i-1].homeScore + inning_cb() });
  }
  scoreArr.shift(); /*remove initializing array*/
  return scoreArr; /*object of whole game scores*/
};

/*TEST CODE*/
console.log(getInningScore(inning,9));

function scoreboard(getInningScore_cb, inning_cb, numInnings_param) {
  let score = getInningScore_cb(inning_cb, numInnings_param);
  console.log(score);
  
  return `Inning ${numInnings_param}: ${score[numInnings_param-1].awayScore} - ${score[numInnings_param-1].homeScore}`;
  
};

/*TEST CODE*/
console.log(scoreboard(getInningScore,inning,4));
console.log(scoreboard(getInningScore,inning,9));




/* TEST CODE for Task 2b */
function personalDice(name){
  return function(){
      // generate random number between 1 and 6
    const newRoll = Math.floor(Math.random() * 6);
    console.log(`${name} rolled a ${newRoll}`)
  }
}

let dansRoll = personalDice("Dan");

const zoesRoll = personalDice("Zoe");


dansRoll();
zoesRoll();
dansRoll();
dansRoll();