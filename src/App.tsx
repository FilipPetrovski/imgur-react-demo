import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import classes from './App.module.scss';

function App() {
	return (
		<div className={classes.AppContainer}>
			<Navbar/>
			<Login/>
		</div>
	);
}

export default App;
