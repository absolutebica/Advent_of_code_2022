import * as fs from 'fs';
let inputContent = fs.readFileSync("./input.txt", 'utf8');
const content = inputContent.split(/\r?\n/);

const cd = "cd ";
const dir = "dir ";
const list = " ls";
const back = "cd ..";
const totalFileSizeMax = 100000;
const totalFS = 70000000;
let updateSize = 30000000;

let pwd:string[] = [];
let filePaths:any[] = [];

content.forEach(line => {
    const numberMatches = line.match(/\d+/g);
    const hasBack = line.includes(back);
    const isFwd = line.includes(cd) && !hasBack && !numberMatches;
    const isBack = line.includes(cd) && hasBack;
    
    const hasDir = line.includes(dir);
    const hasList = line.includes(list);

    if (hasList && line.length === 4) {
        return;
    }

    if (isFwd) {
        const dir = line.split(cd)[1];
        pwd.push(dir);
    }

    if (isBack) {
        pwd.pop();
    }

    if (numberMatches?.length) {
        setFilePaths(parseInt(numberMatches[0]));
    }

});

function setFilePaths(value) {
    if (!pwd.length) {
        return;
    }

    let newPwd:string[] = [];
    for (let p = 0; p < pwd.length; p++) {
        newPwd.push(pwd[p]);
        const filePath = newPwd.join(".");
        const filePathMatch = filePaths.find(fileSizePath => fileSizePath.path === filePath);
        if (filePathMatch) {
            filePathMatch.size = filePathMatch.size + value;
        } else {
            filePaths.push({path: filePath, size: value });
        }
    }
}

const directoriesUnderSizeLimit = filePaths.filter(path => {
    return path.size <= totalFileSizeMax;
});

const part1TotalFileSizeUnderLimit = filePaths.reduce((acc, current) => {
    acc = acc + (current.size <= totalFileSizeMax ? current.size : 0);
    return acc;
}, 0);

const calculateNeededSpaceDeletion = () => {
    return totalFS - filePaths[0].size;
}


const part2MinSizeDirectoryToDelete = filePaths.filter(path => {
    const fsDiff = calculateNeededSpaceDeletion();
    return path.size >= (updateSize - fsDiff);
}).reduce((prev, curr) => {
    return prev.size < curr.size ? prev : curr;
}).size;

// const part2MinSizeDirectoryToDelete = part2AvailableDirectoriesToDelete.reduce((prev, curr) => {
//     return prev.size < curr.size ? prev : curr;
// });


console.log("PART1", part1TotalFileSizeUnderLimit);
console.log("PART2", part2MinSizeDirectoryToDelete);

//console.log(directoriesUnderSizeLimit);
//console.log(filePaths);
//console.log(part1FileSizesUnderLimit); //1762286
