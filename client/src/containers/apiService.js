import axios from 'axios';

export class ApiService {

  fileUpload = (file) => {
    try {
      const data = new FormData();
      data.append('file', file);
      return axios
        .post(`${process.env.REACT_APP_TO_DO_ITEMS_API}/upload`, data ,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => res)
    } catch (err) {
      console.log('File upload failed...', err);
    }
  }

  fileUploadToSelectColumn = (file) => {
    try {
      const data = new FormData();
      data.append('file', file);
      return axios
        .post(`${process.env.REACT_APP_TO_DO_ITEMS_API}/getColumnTypes`, data ,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => res.data)
    } catch (err) {
      console.log('File upload failed...', err);
    }
  }

  fileUploadToBuildIndex = (fileName, column, columnIndex) => {
    try {
      const data = {
        fileName,
        column,
        columnIndex,
      };
      return axios
        .post(`${process.env.REACT_APP_TO_DO_ITEMS_API}/buildIndex`, data)
        .then(res => res.data)
    } catch (err) {
      console.log('File upload failed...', err);
    }
  }

  // function uploadfile(file) {
  //   try {
  //     const data = yield axios
  //     .get(`${process.env.REACT_APP_TO_DO_ITEMS_API}/upload`)
  //     .then(res => res.data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  // async checkasyncupload1 (file) {
  //     try {
  //       const res = await axios
  //       .get(`${process.env.REACT_APP_TO_DO_ITEMS_API}/upload`);
  //       const data = await res.data;
  //       return data;
  //     } catch (err) {
  //       console.log('Connection Failed, Retrying...', err);
  //     }
  // }
}

export default new ApiService();


