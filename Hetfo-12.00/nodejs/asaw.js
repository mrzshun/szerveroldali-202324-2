const {readdir:pReadDir,readFile:pReadFile,writeFile:pWriteFile} = require('fs/promises');

const main = async () => {
    const files = await pReadDir('./input');
    const contents = await Promise.all(
        files.map(file => pReadFile('./input/'.concat(file),'utf-8'))
    );
    let output = contents.join('\n');
    await pWriteFile('./output/asaw.txt',output);
    console.log("end");
}
main();

// pReadDir('./input')
//     .then(files => {
//         return Promise.all(
//             files.map(file => pReadFile('./input/'.concat(file),'utf-8'))
//         )
//     })
//     .then((contents) => {
//         let output = contents.join('\n');
//         return pWriteFile('./output/promise.txt',output);
//     })
//     .then(() => {console.log('end')})
//     .catch((error) => {
//         throw error;
//     })