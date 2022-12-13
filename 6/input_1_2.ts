import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const content = inputContent.split(/\r?\n/)[0];
//const test = 'djhjvjggdzznllvvrvggscgscsrrffgvfvllfclcrchhwzhzqqlhqhffsdsmmcffng';

const markerPositionDay1 = findPacketMarker(content, 4);
const markerPositionDay2 = findPacketMarker(content, 14);
console.log("Day1", markerPositionDay1);
console.log("Day2", markerPositionDay2);

function findPacketMarker(input:string, size:number = 4) {
    for (let index = size; index < input.length; index++) {
        const segments = input.slice(index - size, index).split("");
        const segmentSet = new Set(segments); // filter out duplicates
        if (size === segmentSet.size) { // if no duplicates, size should match size, unique marker
            return index;
        }
    }
}