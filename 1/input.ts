import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const calories = inputContent.split(/\r?\n/);

const calorieGroups = calories.map(calorieAmount => {
    return calorieAmount !== "" ? parseInt(calorieAmount) : 0;
});

const reduced = calorieGroups.reduce((acc, cur) => {
    if (cur == 0) {
        acc.push(0);
    } else {
        acc[acc.length - 1] += cur;
    }

    return acc;
}, [0]);



// const findElves = reduced.filter(elves => {
//     return elves === 24000 || elves === 11000 || elves === 10000;
// });
// console.log(findElves);
reduced.sort((a,b) => {
    return b - a;
});

const topThree = reduced.reduce((acc, cur, index) => {
    return index < 3 ? acc + cur : acc + 0;
}, 0);

console.log(topThree);



// const arr = [1,2,3,4].reduce((acc, cur) => {
//     return acc + cur;
// }, 0);

// console.log(arr);


//console.log(topThree)

// console.log(calorieGroups);
// console.log(reduced);

///console.log(Math.max(...reduced));