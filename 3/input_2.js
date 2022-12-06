"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var rucksacks = inputContent.split(/\r?\n/);
var lowPriorityString = "abcdefghijklmnopqrstuvwxyz";
var highPriorityString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var sum = 0;
var groups = [];
var group = [];
var count = 0;
for (var i = 0; i < rucksacks.length; i++) {
    var rucksack = rucksacks[i];
    var modu = i % 3;
    if (modu <= 2) {
        group.push(rucksack);
        count++;
    }
    if (count == 3) {
        groups.push(group);
        count = 0;
        group = [];
    }
}
var _loop_1 = function (letter) {
    var stringLetter = lowPriorityString[letter];
    for (var g = 0; g < groups.length; g++) {
        var hasMatch = !!(groups[g].filter(function (sackGroup) {
            return sackGroup.includes(stringLetter);
        }).length === 3);
        //console.log(stringLetter, hasMatch);
        if (hasMatch) {
            sum = sum + findLowLetterPosition(stringLetter);
        }
    }
};
for (var letter = 0; letter < lowPriorityString.length; letter++) {
    _loop_1(letter);
}
var _loop_2 = function (letter) {
    var stringLetter = highPriorityString[letter];
    for (var g = 0; g < groups.length; g++) {
        //console.log(groups[g]);
        var hasMatch = !!(groups[g].filter(function (sackGroup) {
            return sackGroup.includes(stringLetter);
        }).length === 3);
        //console.log(stringLetter, hasMatch);
        if (hasMatch) {
            //console.log("match", stringLetter);
            sum = sum + findHighLetterPosition(stringLetter);
        }
    }
};
for (var letter = 0; letter < highPriorityString.length; letter++) {
    _loop_2(letter);
}
//console.log(groups);
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
