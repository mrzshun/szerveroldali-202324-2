const {readdir:pReadDir,readFile:pReadFile,writeFile:pWriteFile} = require('fs/promises');

pReadDir('./input')
    .then(files => {
        return Promise.all(
            files.map(file => pReadFile('./input/'.concat(file),'utf-8'))
        )
    })
    .then((contents) => {
        let output = contents.join('\n');
        return pWriteFile('./output/promise.txt',output);
    })
    .then(() => {console.log('end')})
    .catch((error) => {
        throw error;
    })


// const {readdir,readFile,writeFile} = require('fs');
// const {join} = require('path');
// readdir('./input', (error,files) => {
//     if(error) throw error;
//     const contents = [];
//     files.forEach(file => {
//         readFile('./input/'.concat(file),'utf-8',(error,content) => {
//             if(error) throw error;
//             contents.push(content);
//             if(contents.length == files.length) {
//                 let output = contents.join('\n');
//                 writeFile('./output/callback.txt',output,(error)=> {
//                     if(error) throw error;
//                     console.log('file created')
//                     console.log('end');
//                 })
//             }
//         })
//     })
// });