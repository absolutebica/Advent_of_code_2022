"use strict";
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
        var instructionMove = parseInt(numbersExtracted[0]);
        var instructionFrom = parseInt(numbersExtracted[1]);
        var instructionTo = parseInt(numbersExtracted[2]);
        for (var m = 1; m <= instructionMove; m++) {
            moveCrate(instructionFrom, instructionTo);
        }
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
function moveCrate(from, to) {
    var fromCrate = groups["crate".concat(from)];
    var toCrate = groups["crate".concat(to)];
    var startIndex = fromCrate.length - 1;
    var movedCrate = fromCrate.splice(startIndex, 1);
    toCrate.push(movedCrate);
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
