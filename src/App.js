import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from './actions/videos';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

// added after watching this video but didn't have it before and styles where still working
// TODO look into this https://www.youtube.com/watch?v=8pKjULHzs0s&feature=youtu.be
import 'bootstrap/dist/css/bootstrap.min.css'

import MyNavbar from './components/MyNavbar';
import VideoDashboard from './pages/VideoDashboard';
import Login from './pages/Login';




const App = () => {

    return (
      <BrowserRouter>
        <div className="App">
          <MyNavbar />
          <Switch>
            <Route exact path="/admin" component={Login} />
            <Route exact path="/videos" component={VideoDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default App




