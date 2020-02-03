const csvParser = require('csv-parser');
const fs = require('fs');

function fileReader(filepath) {
  fs.createReadStream(filepath)
  .on('error',()=>{
    console.log("error in finding file");
  })
  .pipe(csvParser())
  .on('data',(row)=> {
    // use Row Data
    console.log(row);
  })
  .on('end',()=>{
    // handling end of csv
  })
}

function createFileReaderPromise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = () => {
      reject();
    };
    reader.readAsText(file);
  });
}

module.exports = {
  fileReader, createFileReaderPromise
}