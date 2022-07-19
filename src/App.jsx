import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import Routes from './main/Routes'
import Menu from "./common/template/Menu";

function App() {
  const [theme, setTheme] = useState(localStorage.theme);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Menu setTheme={setTheme} />
        <Routes />
        <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
      </Router>
    </div>
  )
}

export default App
