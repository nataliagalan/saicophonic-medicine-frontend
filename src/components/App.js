import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyNavbar from './MyNavbar';
import VideoDashboard from '../pages/VideoDashboard';
import Login from '../pages/Login';
import New from '../pages/New';
import Show from '../pages/Show';
import Edit from '../pages/Edit';
import Random from '../pages/Random';
import TaggedResults from '../pages/TaggedResults';
import MyFooter from './MyFooter';
import Container from 'react-bootstrap/Container';

const App = () => {
	return (
		<BrowserRouter>
			{/* <div className='App'> */}
				<MyNavbar />
				<Switch>
					<Route exact path='/admin' component={Login} />
					<Route exact path='/videos' component={VideoDashboard} />
					<Route exact path='/videos/new' component={New} />
					<Route exact path='/videos/:id' component={Show} />
					<Route exact path='/videos/edit/:id' component={Edit} />
					<Route exact path='/videos/tagged/:tag' component={TaggedResults} />
					<Route exact path='/random' component={Random} />
				</Switch>
				<MyFooter />
			{/* </div> */}
		</BrowserRouter>
	);
};

export default App;
