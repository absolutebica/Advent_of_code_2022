import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const pairLines = inputContent.split(/\r?\n/);
let pairOverlaps = 0;

const pairGroups = pairLines.map(pair => {
    const pairs = pair.split(",");
    const pairRange1 = pairs[0].split("-");
    const pairRange2 = pairs[1].split("-");
    const pair1Min = parseInt(pairRange1[0]);
    const pair1Max = parseInt(pairRange1[1]);
    const pair2Min = parseInt(pairRange2[0]);
    const pair2Max = parseInt(pairRange2[1]);

    return [range(pair1Min, pair1Max), range(pair2Min, pair2Max)];
});

function range(min:number, max:number) {
    const length = (max - min) + 1;
    return Array.from({length: length}, (value, index) => index + min);
}

findOverlaps(pairGroups);
console.log(pairOverlaps);

function findOverlaps(pairs) {
    for (let i = 0; i < pairs.length; i++) {
        const pairGroup = pairs[i];
        const smallestPair = pairGroup[0].length < pairGroup[1].length ? pairGroup[0] : pairGroup[1];
        const largestPair = pairGroup[0].length < pairGroup[1].length ? pairGroup[1] : pairGroup[0];
        const containsAllPairs = smallestPair.every(value => largestPair.includes(value));

        if (containsAllPairs) {
            pairOverlaps++;
        }
    }
}