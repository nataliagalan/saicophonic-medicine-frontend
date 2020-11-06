import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom";

//TODO delete this files
// import logo from './logo.svg';
// import './App.css';


import MyNavbar from './MyNavbar';
import VideoDashboard from '../pages/VideoDashboard';
import Login from '../pages/Login';
import New from '../pages/New';
import Show from '../pages/Show';
import Edit from '../pages/Edit';
import SearchResults from '../pages/SearchResults';



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
            <Route exact path="/videos/search/:query" component={SearchResults} />  
          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default App




