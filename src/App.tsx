import React, {Suspense, useContext, useEffect, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import classes from './App.module.scss';
import AuthContext from './stores/AuthContext';
import {useLocation} from 'react-router';
import {User} from './components/Navbar/models/User.model';
import Loading from './components/Loading/Loading';
import LoadingContext from './stores/LoadingContext';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from './interceptors/Interceptor';
import Home from './components/Home/Home';


export const USER_KEY = 'user';

function App() {
	const [user, setUser] = useState(new User());
	const authCtx = useContext(AuthContext);
	const loadingCtx = useContext(LoadingContext);
	const location = useLocation();

	useEffect(() => {
		const url = location.hash;
		const loginParams = url.split('&');
		if (url && loginParams.length > 1 && !authCtx.isLoggedIn) {
			loadingCtx.setLoading(true);
			const accessToken = loginParams[0].slice(loginParams[0].indexOf('=') + 1, loginParams[0].length);
			const userName = loginParams[4].slice(loginParams[4].indexOf('=') + 1, loginParams[4].length);
			authCtx.onLogin(accessToken);
			httpClient.get(`https://api.imgur.com/3/account/${userName}/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
				(response) => {
					const newUser = new User({avatar: response.data.data.avatar, name: userName});
					setUser(newUser);
					window.localStorage.setItem(USER_KEY, JSON.stringify(newUser));
					toast.success('Login successful');
					loadingCtx.setLoading(false);
				}
			).catch((error: Error) => {
				loadingCtx.setLoading(false);
			});
		}
	}, [authCtx, location, loadingCtx]);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem(USER_KEY);
		if (userFromLocalStorage) {
			setUser(new User(JSON.parse(userFromLocalStorage)));
		}
	}, []);

	return (
		<div className={`${classes.AppContainer} ${loadingCtx.isLoading && 'pointer-events-none'}`}>
			{loadingCtx.isLoading && <Loading />}
			<Navbar user={user} logoutClick={() => setUser(null)}/>
			<Suspense fallback={<Loading />}>
				<main>
					<ToastContainer autoClose={5000} closeOnClick={true} pauseOnHover={false} position={'top-right'} />
					<Home />
				</main>
			</Suspense>
		</div>
	);
}

export default App;
