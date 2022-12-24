function set(object, path, value, hasSetFile = false) {
    if (!path.length) {
        return object
    }
    let target = object
    for (const key of path.slice(0, -1)) {
        const type = typeof target[key]
        if (!target[key] || (type !== "object" && type !== "function")) {
            target[key] = {}
        }
        target = target[key]
    }
    if (!hasSetFile) {
        target[path.at(-1)] = value
    } else {
        const filePath = path.join(".");
        const filePathMatch = filePaths.find(fileSizePath => fileSizePath.path === filePath);
        if (filePathMatch) {
            filePathMatch.size = filePathMatch.size + value;
        } else {
            filePaths.push({path: filePath, size: value});
        }
    }
    
    return object
}