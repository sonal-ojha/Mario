import React, { Component } from 'react';
import './App.css';
import Board from './Components/MarioBoard/board';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  render() {
    return (
      <div className="app_container">
          <div> Mario </div>
          <Board />
          <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;
