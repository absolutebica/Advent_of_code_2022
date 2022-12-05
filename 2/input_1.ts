import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const game = inputContent.split(/\r?\n/);

const O_ROCK = "B";
const O_PAPER = "C";
const O_SCISSORS = "A";
const YOU_ROCK = "X";
const YOU_SCISSORS = "Z";
const YOU_PAPER = "Z";

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
    const youScore = generateScore(you);
    
    let score = battle(opponent, you);
    totalScore = totalScore + youScore + score;
}

console.log(totalScore);

function battle(oChoice, youChoice) {
    if (youChoice === YOU_ROCK) {
        if (oChoice === O_PAPER) {
            return loss;
        } else if (oChoice === O_SCISSORS) {
            return win;
        } else {
            return tie;
        }
    }

    if (youChoice === YOU_PAPER) {
        if (oChoice === O_SCISSORS) {
            return loss;
        } else if (oChoice === O_ROCK) {
            return win;
        } else {
            return tie;
        }
    }

    if (youChoice === YOU_SCISSORS) {
        if (oChoice === O_ROCK) {
            return loss;
        } else if (oChoice === O_PAPER) {
            return win;
        } else {
            return tie;
        }
    }

    return 0;

}

function generateScore(choice) {
    switch(choice) {
        case O_ROCK:
        case YOU_ROCK:
            return rock;
        case O_PAPER:
        case YOU_PAPER:
            return paper;
        case O_SCISSORS:
        case YOU_SCISSORS:
            return scissors;
    }

    return 0;
}