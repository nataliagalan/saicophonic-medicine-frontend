import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

import MyNavbar from './components/MyNavbar';
import New from './pages/New';
import VideoDashboard from './components/VideoDashboard';
import Edit from './pages/Edit';
import Show from './pages/Show';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Switch>
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