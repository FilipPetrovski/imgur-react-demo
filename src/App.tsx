import React, {useContext, useEffect, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import classes from './App.module.scss';
import httpClient from './interceptors/RequestInterceptor';
import AuthContext from './stores/AuthContext';
import {User} from './shared/models/User.model';
import Top from './components/Top/Top';
import Hot from './components/Hot/Hot';

export const USER_KEY = 'user';

function App() {
	const [user, setUser] = useState(new User());
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const url = window.location.href;
		const loginParams = url.split('&');
		if (loginParams.length > 1 && !authCtx.isLoggedIn) {
			const accessToken = loginParams[0].slice(loginParams[0].indexOf('=') + 1, loginParams[0].length);
			const userName = loginParams[4].slice(loginParams[4].indexOf('=') + 1, loginParams[4].length);
			window.history.pushState({}, '', process.env.REACT_APP_API_URL);
			authCtx.onLogin(accessToken);
			httpClient.get(`https://api.imgur.com/3/account/${userName}/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
				(response) => {
					const newUser = new User({avatar: response.data.data.avatar, name: userName});
					setUser(newUser);
					window.localStorage.setItem(USER_KEY, JSON.stringify(newUser));
				}
			);
		}
	}, [authCtx]);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem(USER_KEY);
		if (userFromLocalStorage) {
			setUser(new User(JSON.parse(userFromLocalStorage)));
		}
	}, []);

	return (
		<div className={classes.AppContainer}>
			<Navbar user={user}/>
			{!authCtx.isLoggedIn && <Login/>}
			<Top/>
			<Hot/>
		</div>
	);
}

export default App;
