import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const game = inputContent.split(/\r?\n/);
const O_ROCK = "A";
const O_PAPER = "B";
const O_SCISSORS = "C";
const toWin = "Z";
const toTie = "Y";
const toLose = "X";
const win = 6;
const loss = 0;
const tie = 3;
const rock = 1;
const paper = 2;
const scissors = 3;
let totalScore = 0;


for (let i = 0; i < game.length; i++) {
    const choices = game[i].split(" ");
    const opponent = choices[0];
    const you = choices[1];

    let score = battle2(opponent, you);
    totalScore = totalScore + score;
}
console.log(totalScore);

function battle2(oChoice, youChoice) {
    if (youChoice === toWin) { // z
        let score = 0;
        if (oChoice === O_ROCK) {
            score = paper;
        }
        if (oChoice === O_PAPER) {
            score = scissors;
        }
        if (oChoice === O_SCISSORS) {
            score = rock;
        }
        return score + win;
    }
    if (youChoice === toTie) { // y
        let score = 0;
        if (oChoice === O_ROCK) {
            score = rock;
        }
        if (oChoice === O_PAPER) {
            score = paper;
        }
        if (oChoice === O_SCISSORS) {
            score = scissors;
        }
        return score + tie;
    }
    if (youChoice === toLose) { // x
        let score = 0;
        if (oChoice === O_ROCK) {
            score = scissors;
        }
        if (oChoice === O_PAPER) {
            score = rock;
        }
        if (oChoice === O_SCISSORS) {
            score = paper;
        }
        return score + loss;
    }
    return 0;
}