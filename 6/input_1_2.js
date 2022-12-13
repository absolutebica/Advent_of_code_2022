"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var content = inputContent.split(/\r?\n/)[0];
//const test = 'djhjvjggdzznllvvrvggscgscsrrffgvfvllfclcrchhwzhzqqlhqhffsdsmmcffng';
var markerPositionDay1 = findPacketMarker(content, 4);
var markerPositionDay2 = findPacketMarker(content, 14);
console.log("Day1", markerPositionDay1);
console.log("Day2", markerPositionDay2);
function findPacketMarker(input, size) {
    if (size === void 0) { size = 4; }
    for (var index = size; index < input.length; index++) {
        var segments = input.slice(index - size, index).split("");
        var segmentSet = new Set(segments); // filter out duplicates
        if (size === segmentSet.size) { // if no duplicates, size should match size, unique marker
            return index;
        }
    }
}
