import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const pairLines = inputContent.split(/\r?\n/);
const groups = {
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

for (let i = 7; i >= 0; i--) {
    createCrate(pairLines[i]);
}

for (let i = 10; i < pairLines.length; i++) {
    const numbersExtracted = pairLines[i].match(/\d+/g);
    if (numbersExtracted?.length) {
        const instructionCratesToMove = parseInt(numbersExtracted[0]);
        const instructionFrom = parseInt(numbersExtracted[1]);
        const instructionTo = parseInt(numbersExtracted[2]);
        moveCrate(instructionCratesToMove, instructionFrom, instructionTo);
    }
}

console.log(calculateTopCrateString());

function calculateTopCrateString() {
    let finalCrates = "";
    
    for (let i = 1; i < 10; i++) {
        finalCrates += groups[`crate${i}`].at(-1);
    }

    return finalCrates;

}

function moveCrate(cratesToMove, from, to) {
    const fromCrate = groups[`crate${from}`];
    const originalCrates = groups[`crate${to}`];
    const startIndex = fromCrate.length - cratesToMove;
    const movedCrates = fromCrate.splice(startIndex, cratesToMove);
    groups[`crate${to}`] = [...originalCrates, ...movedCrates];
}

function createCrate(crates) {
    let spaceStart = 0;
    let spaceStop = 3;
    for (let i = 1; i < 10; i++) {
        const crate = `crate${i}`;
        const crateLetter = crates.substring(spaceStart, spaceStop);

        if (crateLetter.includes("[")) {
            const letter = crateLetter.substring(1, crateLetter.length - 1).trim();
            groups[crate].push(letter);
        }
        spaceStart = spaceStart + 4;
        spaceStop = spaceStop + 4;
    }
}