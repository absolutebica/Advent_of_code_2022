"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputContent = fs.readFileSync("./input.txt", 'utf8');
var content = inputContent.split(/\r?\n/);
var cd = "cd ";
var dir = "dir ";
var list = " ls";
var back = "cd ..";
var totalFileSizeMax = 100000;
var totalFS = 70000000;
var updateSize = 30000000;
var pwd = [];
var filePaths = [];
content.forEach(function (line) {
    var numberMatches = line.match(/\d+/g);
    var hasBack = line.includes(back);
    var isFwd = line.includes(cd) && !hasBack && !numberMatches;
    var isBack = line.includes(cd) && hasBack;
    var hasDir = line.includes(dir);
    var hasList = line.includes(list);
    if (hasList && line.length === 4) {
        return;
    }
    if (isFwd) {
        var dir_1 = line.split(cd)[1];
        pwd.push(dir_1);
    }
    if (isBack) {
        pwd.pop();
    }
    if (numberMatches === null || numberMatches === void 0 ? void 0 : numberMatches.length) {
        setFilePaths(parseInt(numberMatches[0]));
    }
});
function setFilePaths(value) {
    if (!pwd.length) {
        return;
    }
    var newPwd = [];
    var _loop_1 = function (p) {
        newPwd.push(pwd[p]);
        var filePath = newPwd.join(".");
        var filePathMatch = filePaths.find(function (fileSizePath) { return fileSizePath.path === filePath; });
        if (filePathMatch) {
            filePathMatch.size = filePathMatch.size + value;
        }
        else {
            filePaths.push({ path: filePath, size: value });
        }
    };
    for (var p = 0; p < pwd.length; p++) {
        _loop_1(p);
    }
}
var directoriesUnderSizeLimit = filePaths.filter(function (path) {
    return path.size <= totalFileSizeMax;
});
var part1TotalFileSizeUnderLimit = filePaths.reduce(function (acc, current) {
    acc = acc + (current.size <= totalFileSizeMax ? current.size : 0);
    return acc;
}, 0);
var calculateNeededSpaceDeletion = function () {
    return totalFS - filePaths[0].size;
};
var part2MinSizeDirectoryToDelete = filePaths.filter(function (path) {
    var fsDiff = calculateNeededSpaceDeletion();
    return path.size >= (updateSize - fsDiff);
}).reduce(function (prev, curr) {
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
