import React, { Component } from 'react';
import FileUpload from '../components/FileUpload';
import fileReader from '../utils/csvFileReader';
const csvParser = require('csv-parser');
const fs = require('fs');

class FileUploadContainer extends Component {

  state = {
    file: null,
    loaded: false
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(event.target.value);
    this.setState({
      file,
      loaded: true
    })
  }

  uploadFile = () => {
    if (this.state.loaded) {
      const filePath = "./data/dsjVoxArticles.tsv";
      console.log("Uploading File");
      // fs.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
      //   fs.readFile('/test.txt', function(err, contents) {
      //     console.log(contents.toString());
      //   });
      // });
      // fs.createReadStream(filePath)
      //   .on('error',()=>{
      //     console.log("error in finding file");
      //   })
      //   .pipe(csvParser())
      //   .on('data',(row)=> {
      //     // use Row Data
      //     console.log(row);
      //   })
      //   .on('end',()=>{
      //     // handling end of csv
      //   })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <FileUpload 
          handleFileUpload={this.handleFileUpload}
          uploadFile={this.uploadFile}
        />
      </div>
    );
  }
}

export default FileUploadContainer;