"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var rucksacks = inputContent.split(/\r?\n/);
var lowPriorityString = "abcdefghijklmnopqrstuvwxyz";
var highPriorityString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var sum = 0;
for (var i = 0; i < rucksacks.length; i++) {
    var rucksack = rucksacks[i];
    var c1 = rucksack.slice(0, rucksack.length / 2);
    var c2 = rucksack.slice(rucksack.length / 2);
    for (var letter = 0; letter < lowPriorityString.length; letter++) {
        var stringLetter = lowPriorityString[letter];
        var hasC1LowMatch = c1.includes(stringLetter);
        var hasC2LowMatch = c2.includes(stringLetter);
        if ((hasC1LowMatch && hasC2LowMatch)) {
            //console.log("LOW", stringLetter);
            sum = sum + findLowLetterPosition(stringLetter);
        }
    }
    for (var letter = 0; letter < highPriorityString.length; letter++) {
        var stringLetter = highPriorityString[letter];
        var hasC1HighMatch = c1.includes(stringLetter);
        var hasC2HighMatch = c2.includes(stringLetter);
        if ((hasC1HighMatch && hasC2HighMatch)) {
            //console.log("HIGH", stringLetter);
            sum = sum + findHighLetterPosition(stringLetter);
        }
    }
}
console.log(sum);
function findLowLetterPosition(letter) {
    var pos = lowPriorityString.indexOf(letter);
    var value = pos > -1 ? pos : 0;
    return value + 1;
}
function findHighLetterPosition(letter) {
    var pos = highPriorityString.indexOf(letter);
    var value = pos > -1 ? pos : 0;
    return value + 27;
}
