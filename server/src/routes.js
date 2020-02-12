const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const csvToJson = require('csvtojson');

const csvData = [];
let headersToRem;


// Setup Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname );
  }
});

// Upload Instance for single file
const upload = multer({ storage }).single('file');



// @route POST /upload
// @desc  upload a file
// @access Public
// router.post('/upload', (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//         return res.status(500).json(err)
//     } else if (err) {
//         return res.status(500).json(err)
//     }
//   return res.status(200).send(req.file)
// })
// });

// @route POST /getColumnTypes
// @desc  upload a file to get column types
// @access Public
router.post('/getColumnTypes', (req, res) => {
  upload(req, res, function (err) {
    let responseBody;
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }


    const filepath = path.join(__dirname, 'uploads/') + req.file.originalname ;
    fs.createReadStream(path.join(filepath))
    .pipe(csv({ separator: '\n'}))
    .on('headers', (headers) => {
      console.log(`First header:---- ${headers[0]}`)
      // responseBody = headers[0];
      res.json({
        status: "success",
        headerList: headers[0].split('\t')
      });
    })
  // .on('data', (row) => {
  //   csvData.push(row);

  // })
  // .on('end', () =>{
  //   for (a of csvData[1].split('\t')){
  //     console.log( typeof a);
  //   }
  //   console.log(csvData.length);
  // })
  })
})



// @route POST /getColumnTypes
// @desc  upload a file to get column types
// @access Public
router.post('/buildIndex', (req, res) => {
  const filename = req.body.fileName;
  const column = req.body.column;
  const columnIndex = req.body.columnIndex;
  const filepath = path.join(__dirname, 'uploads/') + filename ;
    fs.createReadStream(path.join(filepath))
    .on('error', () => {
      // handle error
      console.log("file not present")
    })
    .pipe(csv({ separator: '\n'}))
    .on('headers', (headers) => {
      console.log(`First header:---- ${headers[0]}`)
      headersToRem = headers[0];
      // res.json({
      //   status: "success",
      //   headerList: headers[0].split('\t')
      // });

    })
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', () =>{
      console.log(typeof csvData[1]);
      console.log(csvData[1]);
      // Removing headers from 1st row
      // csvData[0] = csvData[0].substring(headersToRem.length).trim();

      // // getting only the column required
      // const reqData = [];
      // for (row in csvdata) {
      //   reqData.push(row.split('\t')[columnIndex]);
      // }
      // // for (a of csvData[1].split('\t')){
      // //   console.log( typeof a);
      // // }
      // console.log(reqData);
    })

    res.status(200);
})

  // /**
//  * GET /search
//  * Search for a term in the library
//  */
// router.get('/search', validate({
//   query: {
//     term: joi.string().max(60).required(),
//     offset: joi.number().integer().min(0).default(0)
//   }
// }),async (ctx, next) => {
//   const { term, offset } = ctx.request.query
//   ctx.body = await search.queryTerm(term, offset)
// });

// /**
//  * GET /paragraphs
//  * Get a range of paragraphs from the specified book
//  * Query Params -
//  * bookTitle: string under 256 characters
//  * start: positive integer
//  * end: positive integer greater than start
//  */
// router.get('/paragraphs',
//   validate({
//     query: {
//       bookTitle: joi.string().max(256).required(),
//       start: joi.number().integer().min(0).default(0),
//       end: joi.number().integer().greater(joi.ref('start')).default(10)
//     }
//   }),
//   async (ctx, next) => {
//     const { bookTitle, start, end } = ctx.request.query
//     ctx.body = await search.getParagraphs(bookTitle, start, end)
//   }
// )



// function loadData(data1){
//   console.log(data1);
//    var dataPoints = data1.split(/\r\n|\n/);
//     //console.log(lines);
//   var headers = dataPoints[0].split(','); // if you have header
//  var lines = [];
//  console.log(headers);
//    console.log(dataPoints.length);
// for (var i = 1; i < dataPoints.length; i++) {
//    //console.log(i);
//      var point = dataPoints[i].split(',');
//    //console.log(point);
//     if (point.length == headers.length) {
//    var json= {};
//    for (var j = 0; j < headers.length; j++) {
//     if(headers[j]=='date'){
//     json[headers[j]] = new Date(point[j]);
//    }else if(headers[j]=='value'){
//       //console.log(point[j]);
//     json[headers[j]] = Number(point[j]);
//    }else{
//     json[headers[j]] = point[j];
//    }

// }
// lines.push(json);
// console.log(json);
// }
// }


module.exports = router;
