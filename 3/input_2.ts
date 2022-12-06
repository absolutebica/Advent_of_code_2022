import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const rucksacks = inputContent.split(/\r?\n/);
const lowPriorityString = "abcdefghijklmnopqrstuvwxyz"
const highPriorityString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0;
const groups:any = [];
let group:string[] = [];
let count = 0;
for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];

    const modu = i % 3;
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

for (let letter = 0; letter < lowPriorityString.length; letter++ ) {
    const stringLetter = lowPriorityString[letter];

    for (let g = 0; g < groups.length; g++) {
        const hasMatch = !!(groups[g].filter(sackGroup => {
            return sackGroup.includes(stringLetter);
        }).length === 3);

        //console.log(stringLetter, hasMatch);

        if (hasMatch) {
            sum = sum + findLowLetterPosition(stringLetter);
        }
    }
}

for (let letter = 0; letter < highPriorityString.length; letter++ ) {
    const stringLetter = highPriorityString[letter];
    for (let g = 0; g < groups.length; g++) {
        //console.log(groups[g]);
        const hasMatch = !!(groups[g].filter(sackGroup => {
            return sackGroup.includes(stringLetter);
        }).length === 3);

        //console.log(stringLetter, hasMatch);

        if (hasMatch) {
            //console.log("match", stringLetter);
            sum = sum + findHighLetterPosition(stringLetter);
        }
    }
}


//console.log(groups);
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