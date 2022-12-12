"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var pairLines = inputContent.split(/\r?\n/);
var groups = {
    crate1: [],
    crate2: [],
    crate3: [],
    crate4: [],
    crate5: [],
    crate6: [],
    crate7: [],
    crate8: [],
    crate9: []
};
for (var i = 7; i >= 0; i--) {
    createCrate(pairLines[i]);
}
for (var i = 10; i < pairLines.length; i++) {
    var numbersExtracted = pairLines[i].match(/\d+/g);
    if (numbersExtracted === null || numbersExtracted === void 0 ? void 0 : numbersExtracted.length) {
        var instructionCratesToMove = parseInt(numbersExtracted[0]);
        var instructionFrom = parseInt(numbersExtracted[1]);
        var instructionTo = parseInt(numbersExtracted[2]);
        moveCrate(instructionCratesToMove, instructionFrom, instructionTo);
    }
}
console.log(calculateTopCrateString());
function calculateTopCrateString() {
    var finalCrates = "";
    for (var i = 1; i < 10; i++) {
        finalCrates += groups["crate".concat(i)].at(-1);
    }
    return finalCrates;
}
function moveCrate(cratesToMove, from, to) {
    var fromCrate = groups["crate".concat(from)];
    var originalCrates = groups["crate".concat(to)];
    var startIndex = fromCrate.length - cratesToMove;
    var movedCrates = fromCrate.splice(startIndex, cratesToMove);
    groups["crate".concat(to)] = __spreadArray(__spreadArray([], originalCrates, true), movedCrates, true);
}
function createCrate(crates) {
    var spaceStart = 0;
    var spaceStop = 3;
    for (var i = 1; i < 10; i++) {
        var crate = "crate".concat(i);
        var crateLetter = crates.substring(spaceStart, spaceStop);
        if (crateLetter.includes("[")) {
            var letter = crateLetter.substring(1, crateLetter.length - 1).trim();
            groups[crate].push(letter);
        }
        spaceStart = spaceStart + 4;
        spaceStop = spaceStop + 4;
    }
}
