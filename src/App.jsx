import React from "react";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import Routes from './main/Routes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </div>
  )
}

export default App;
