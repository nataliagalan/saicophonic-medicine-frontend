import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import MyNavbar from './components/MyNavbar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        {/* <Sidebar /> */}
        <Switch>
          {/* <Route exact path="/videos" component={Sidebar}/> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
