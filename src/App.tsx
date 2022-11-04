import React, {useContext, useEffect, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import classes from './App.module.scss';
import httpClient from './interceptors/RequestInterceptor';
import AuthContext from './stores/AuthContext';
import {User} from './shared/models/User.model';
import Top from './components/Top/Top';
import Hot from './components/Hot/Hot';
import {Routes, useNavigate} from 'react-router-dom';
import {Route, useLocation} from 'react-router';
import AlbumDetails from './shared/components/Albums/AlbumDetails/AlbumDetails';
import Layout from './components/Layout/Layout';

export const USER_KEY = 'user';

function App() {
	const [user, setUser] = useState(new User());
	const authCtx = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const url = location.hash;
		const loginParams = url.split('&');
		if (url && loginParams.length > 1 && !authCtx.isLoggedIn) {
			const accessToken = loginParams[0].slice(loginParams[0].indexOf('=') + 1, loginParams[0].length);
			const userName = loginParams[4].slice(loginParams[4].indexOf('=') + 1, loginParams[4].length);
			navigate('/');
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
			<main>
				<Routes>
					<Route path='/' element={<Layout />}>
						{!authCtx.isLoggedIn && <Route path='login' element={<Login />} />}
						<Route path='hot' element={<Hot />} />
						<Route path='top' element={<Top />} />
						<Route path='album/:albumId' element={<AlbumDetails />} />
					</Route>
				</Routes>
			</main>
		</div>
	);
}

export default App;
