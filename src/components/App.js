import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
// import logo from './logo.svg';
// import './App.css';

// added after watching this video but didn't have it before and styles where still working
// TODO look into this https://www.youtube.com/watch?v=8pKjULHzs0s&feature=youtu.be
import 'bootstrap/dist/css/bootstrap.min.css'

import MyNavbar from './MyNavbar';
import VideoDashboard from '../pages/VideoDashboard';
import Login from '../pages/Login';
import New from '../pages/New';
import Show from '../pages/Show';
import Edit from '../pages/Edit';



const App = () => {

    return (
      <BrowserRouter>
        <div className="App">
          <MyNavbar />
          <Switch>
            <Route exact path="/admin" component={Login} />
            <Route exact path="/videos" component={VideoDashboard} />
            <Route exact path="/videos/new" component={New} />
            <Route exact path="/videos/:id" component={Show} />
            <Route exact path="/videos/edit/:id" component={Edit} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default App




