import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

// added after watching this video but didn't have it before and styles where still working
// TODO look into this https://www.youtube.com/watch?v=8pKjULHzs0s&feature=youtu.be
import 'bootstrap/dist/css/bootstrap.min.css'

import MyNavbar from './components/MyNavbar';
import New from './pages/New';
import VideoDashboard from './components/VideoDashboard';
import Edit from './pages/Edit';
import Show from './pages/Show';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Switch>
          <Route exact path="/admin" component={Login} />
          <Route exact path="/videos/search/:query" component={SearchResults} />
          <Route exact path="/videos" component={VideoDashboard} />
          <Route exact path="/videos/new" component={New} />
          <Route exact path="/videos/:id" component={Show} />
          <Route exact path="/videos/edit/:id" component={Edit} />
        </Switch>
      </div>
      {/* <!-- /.App --> */}
    </BrowserRouter>
  );
}

export default App;


