const {readdir,readFile,writeFile} = require('fs');
const {join} = require('path');
readdir('./input', (error,files) => {
    if(error) throw error;
    const contents = [];
    files.forEach(file => {
        readFile('./input/'.concat(file),'utf-8',(error,content) => {
            if(error) throw error;
            contents.push(content);
            if(contents.length == files.length) {
                let output = contents.join('\n');
                writeFile('./output/callback.txt',output,(error)=> {
                    if(error) throw error;
                    console.log('file created')
                    console.log('end');
                })
            }
        })
    })
});

// console.log(0)
// for(let i=1;i<10;i++){
//     setTimeout(() => {
//         console.log(i)
//     },1)
// }