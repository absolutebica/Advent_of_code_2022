"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var game = inputContent.split(/\r?\n/);
var O_ROCK = "B";
var O_PAPER = "C";
var O_SCISSORS = "A";
var YOU_ROCK = "X";
var YOU_SCISSORS = "Z";
var YOU_PAPER = "Z";
var win = 6;
var loss = 0;
var tie = 3;
var rock = 1;
var paper = 2;
var scissors = 3;
var totalScore = 0;
for (var i = 0; i < game.length; i++) {
    var choices = game[i].split(" ");
    var opponent = choices[0];
    var you = choices[1];
    var youScore = generateScore(you);
    var score = battle(opponent, you);
    totalScore = totalScore + youScore + score;
}
console.log(totalScore);
function battle(oChoice, youChoice) {
    if (youChoice === YOU_ROCK) {
        if (oChoice === O_PAPER) {
            return loss;
        }
        else if (oChoice === O_SCISSORS) {
            return win;
        }
        else {
            return tie;
        }
    }
    if (youChoice === YOU_PAPER) {
        if (oChoice === O_SCISSORS) {
            return loss;
        }
        else if (oChoice === O_ROCK) {
            return win;
        }
        else {
            return tie;
        }
    }
    if (youChoice === YOU_SCISSORS) {
        if (oChoice === O_ROCK) {
            return loss;
        }
        else if (oChoice === O_PAPER) {
            return win;
        }
        else {
            return tie;
        }
    }
    return 0;
}
function generateScore(choice) {
    switch (choice) {
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
