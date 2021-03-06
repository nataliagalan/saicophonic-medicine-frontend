import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history.js';
import MyNavbar from './MyNavbar';
import VideoDashboard from '../pages/VideoDashboard';
import Login from '../pages/Login';
import New from '../pages/New';
import Show from '../pages/Show';
import Edit from '../pages/Edit';
import Random from '../pages/Random';
import TaggedResults from '../pages/TaggedResults';
import MyFooter from './MyFooter';

const App = () => {
	return (
		<Router history={history}>
			<MyNavbar />
			<Switch>
				<Route exact path='/admin' component={Login} />
				<Route exact path='/new' component={New} />
				<Route exact path='/' component={VideoDashboard} />
				<Route exact path='/videos/:id' component={Show} />
				<Route exact path='/videos/edit/:id' component={Edit} />
				<Route exact path='/tagged/:tag' component={TaggedResults} />
				<Route exact path='/random' component={Random} />
			</Switch>
			<MyFooter />
		</Router>
	);
};

export default App;
