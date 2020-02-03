import React from 'react';
import { Provider } from 'react-redux';


import AppNavbar from './components/AppNavbar';
import FileUploadContainer from './containers/FileUploadContainer';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <FileUploadContainer />
        </Container>

      </div>
    </Provider>
  );
}

export default App;
