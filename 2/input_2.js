"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var game = inputContent.split(/\r?\n/);
var O_ROCK = "A";
var O_PAPER = "B";
var O_SCISSORS = "C";
var toWin = "Z";
var toTie = "Y";
var toLose = "X";
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
    var score = battle2(opponent, you);
    totalScore = totalScore + score;
}
console.log(totalScore);
function battle2(oChoice, youChoice) {
    if (youChoice === toWin) { // z
        var score = 0;
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
        var score = 0;
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
        var score = 0;
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
