import './App.css';
import 'antd/dist/antd.css';
import Main from "./Pages/Main";

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      {<Main />}
    </div >
  );
}

export default App;
