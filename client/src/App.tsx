import React, {useEffect, useState} from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  const[data, setData] = useState({posts: [{id: 1}]});

  useEffect(() => {
    fetch('hello').then(
        res => res.json()
    ).then(
        data => {
          setData(data)
          console.log(data)
        }
    )
  }, [])
  return (
        <div className="App">
        </div>
  );
}

export default App;
