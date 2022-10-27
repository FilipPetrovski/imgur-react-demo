import React, {useContext, useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import classes from './App.module.scss';
import {TOKEN_KEY} from './interceptors/request-interceptor';
import AuthContext from './stores/auth-context';

function App() {
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const url = window.location.href;
		const separatedUrlStrings = url.split('&');
		const accessToken = window.localStorage.getItem(TOKEN_KEY);
		if (accessToken) {
			authCtx.onLogin(accessToken);
		}
		if (separatedUrlStrings.length > 1) {
			const accessToken = separatedUrlStrings[0].slice(separatedUrlStrings[0].indexOf('=') + 1, separatedUrlStrings[0].length);
			const userName = separatedUrlStrings[4].slice(separatedUrlStrings[4].indexOf('=') + 1, separatedUrlStrings[4].length);
			window.history.pushState({}, '', process.env.REACT_APP_API_URL);
			authCtx.onLogin(accessToken);
		}
	}, [authCtx]);

	return (
		<div className={classes.AppContainer}>
			<Navbar/>
			{!authCtx.isLoggedIn && <Login/>}
		</div>
	);
}

export default App;
