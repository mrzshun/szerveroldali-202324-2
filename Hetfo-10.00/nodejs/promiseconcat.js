const { readdir:pReadDir, readFile:pReadFile, writeFile:pWriteFile } = require('fs/promises');

// const pReadDir = promisify(readdir);
// const pReadFile = promisify(readFile);
// const pWriteFile = promisify(writeFile);
pReadDir('./input')
    .then(files => {
        return Promise.all(
            files.map(file => pReadFile('./input/'.concat(file), 'utf-8'))
        )
    })
    .then(contents => {
        let output = contents.join('\n');
        return pWriteFile('./output/promise.txt', output);
    })
    .then(() => {
        console.log("end");
    })
    .catch(error => {
        throw error;
    }) 