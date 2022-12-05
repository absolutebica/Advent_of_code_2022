import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const rucksacks = inputContent.split(/\r?\n/);
const lowPriorityString = "abcdefghijklmnopqrstuvwxyz"
const highPriorityString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0;
for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];
    const c1 = rucksack.slice(0, rucksack.length / 2);
    const c2 = rucksack.slice(rucksack.length / 2);

    for (let letter = 0; letter < lowPriorityString.length; letter++ ) {
        const stringLetter = lowPriorityString[letter];
        const hasC1LowMatch = c1.includes(stringLetter);
        const hasC2LowMatch = c2.includes(stringLetter);

        if ( (hasC1LowMatch && hasC2LowMatch)) {
            //console.log("LOW", stringLetter);
            sum = sum + findLowLetterPosition(stringLetter);
        }

    }

    for (let letter = 0; letter < highPriorityString.length; letter++ ) {
        const stringLetter = highPriorityString[letter];
        const hasC1HighMatch = c1.includes(stringLetter);
        const hasC2HighMatch = c2.includes(stringLetter);

        if ( (hasC1HighMatch && hasC2HighMatch)) {
            //console.log("HIGH", stringLetter);
            sum = sum + findHighLetterPosition(stringLetter);
        }
    }
}

console.log(sum);

function findLowLetterPosition(letter) {
    const pos = lowPriorityString.indexOf(letter);
    const value = pos > -1 ? pos : 0;
    return value + 1;
}

function findHighLetterPosition(letter) {
    const pos = highPriorityString.indexOf(letter);
    const value = pos > -1 ? pos : 0;
    return value + 27;
}