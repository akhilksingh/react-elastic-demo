import React, { Component } from 'react';
import FileUpload from '../components/FileUpload';
import ApiService from './apiService';
import Toaster from '../components/Toaster';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Container } from 'reactstrap';
import FileSelect from '../components/FileSelect';

class FileUploadContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loaded: false,
      message: '',
      columnList: [],
      selectedColumn: '',
      columnIndex: '',
    };
  }

  

  handleFileSelect = (event) => {
    // event.preventDefault();
    const file = event.target.files[0];
    this.setState({
      file,
      loaded: true
    })
  }

  uploadFile = async () => {
    try {
      if (this.state.loaded) {
        const res = await ApiService.fileUpload(this.state.file);
        console.log(res);
        if (res.status) {
          this.setState({
            message: "File Uploaded Successfully"
          })
          setTimeout(() =>{
            this.setState({
              message: '',
              loaded: false
            })
          }, 5000);
          };
      }
    } catch (error) {
      console.log(error);
    } 
  }

  uploadFileToSelectColumn = async () => {
    try {
      if (this.state.loaded) {
        const res = await ApiService.fileUploadToSelectColumn(this.state.file);
        console.log(res);
        if (res.status) {
          this.setState({
            message: "File Uploaded Successfully",
            columnList: res.headerList
          })
          setTimeout(() =>{
            this.setState({
              message: '',
              loaded: false,
            })
          }, 2000);
          };
      }
    } catch (error) {
      console.log(error);
    } 
  }

  onColumnSelect = (Column, ind) => () => {
    console.log(Column);
    console.log("Column selected");
    this.setState({
      selectedColumn: Column,
      columnIndex: ind
    })
  }

  buildIndex = async () => {
    try {
      if (this.state.selectedColumn) {
        console.log(this.state.file.name);
        const res = await ApiService.fileUploadToBuildIndex(this.state.file.name, this.state.selectedColumn, this.state.columnIndex);
        console.log(res);
        if (res.status) {
          this.setState({
            message: "Index built Successfully",
          })
          setTimeout(() =>{
            this.setState({
              message: '',
            })
          }, 2000);
          };
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.message && <Toaster message={this.state.message} />}
          <FileUpload
            handleFileSelect={this.handleFileSelect}
            uploadFileToSelectColumn={this.uploadFileToSelectColumn}
            loaded={this.state.loaded}
          />
          {this.state.columnList.length>0 && 
            <FileSelect 
              list={this.state.columnList} 
              onSelect={this.onColumnSelect}
              selectedColumn={this.state.selectedColumn}
              buildIndex={this.buildIndex}
            />}
      </div>
    );
  }
}

export default FileUploadContainer;