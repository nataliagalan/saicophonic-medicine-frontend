import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import MyNavbar from './components/MyNavbar';
import New from './pages/New';
import VideoDashboard from './components/VideoDashboard';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
          <MyNavbar />

        <div className="wrapper">
          <Sidebar />

          <Route exact path="/videos">
            <VideoDashboard />
          </Route>

        </div>

        <Route exact path="/videos/new">
            <New />
        </Route>


      </div>
    </BrowserRouter>
  );
}

export default App;


        // {/* <MyNavbar /> */}
        // {/* <Sidebar /> */}
        // <Route exact path="/videos/">
        //   <MyNavbar />
        // </Route>
        // <Route path="/videos/new">
        //   <New />
        // </Route>
        // <Switch>
        //   {/* <Route exact path="/videos/new" component={New}/> */}
        // </Switch>