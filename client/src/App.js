import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import AppNavbar from './components/AppNavbar';
import FileUploadContainer from './containers/FileUploadContainer';
import HomeContainer from "./containers/HomeContainer";
import SearchContainer from "./containers/SearchContainer";
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
          <Router>
            <Switch>
              <Route exact path="/">
                <HomeContainer />
              </Route>
              <Route path="/upload">
              <FileUploadContainer />
              </Route>
              <Route path="/search">
                <SearchContainer />
              </Route>
            </Switch>
          </Router>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
