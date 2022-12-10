"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var pairLines = inputContent.split(/\r?\n/);
var pairOverlaps = 0;
var pairGroups = pairLines.map(function (pair) {
    var pairs = pair.split(",");
    var pairRange1 = pairs[0].split("-");
    var pairRange2 = pairs[1].split("-");
    var pair1Min = parseInt(pairRange1[0]);
    var pair1Max = parseInt(pairRange1[1]);
    var pair2Min = parseInt(pairRange2[0]);
    var pair2Max = parseInt(pairRange2[1]);
    return [range(pair1Min, pair1Max), range(pair2Min, pair2Max)];
});
function range(min, max) {
    var length = (max - min) + 1;
    return Array.from({ length: length }, function (value, index) { return index + min; });
}
findOverlaps(pairGroups);
console.log(pairOverlaps);
function findOverlaps(pairs) {
    var _loop_1 = function (i) {
        var pairGroup = pairs[i];
        var smallestPair = pairGroup[0].length < pairGroup[1].length ? pairGroup[0] : pairGroup[1];
        var largestPair = pairGroup[0].length < pairGroup[1].length ? pairGroup[1] : pairGroup[0];
        var hasMatch = largestPair.some(function (value) { return smallestPair.includes(value); });
        if (hasMatch) {
            pairOverlaps++;
        }
    };
    for (var i = 0; i < pairs.length; i++) {
        _loop_1(i);
    }
}
