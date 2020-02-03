import React from 'react';
import { Provider } from 'react-redux';


import AppNavbar from './components/AppNavbar';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
      </div>
    </Provider>
  );
}

export default App;
