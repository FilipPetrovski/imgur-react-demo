import React, {useContext, useEffect, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import classes from './App.module.scss';
import httpClient from './interceptors/RequestInterceptor';
import AuthContext from './stores/AuthContext';
import Top from './components/Top/Top';
import Hot from './components/Hot/Hot';
import {Routes, useNavigate} from 'react-router-dom';
import {Route, useLocation} from 'react-router';
import AlbumDetails from './shared/components/Albums/AlbumDetails/AlbumDetails';
import Layout from './components/Layout/Layout';
import {RoutesName} from './shared/models/Routes';
import {User} from './components/Navbar/models/User.model';
import MyGallery from './components/MyGallery/MyGallery';
import Loading from './components/Loading/Loading';
import LoadingContext from './stores/LoadingContext';
import AddImages from './components/MyGallery/AddImages/AddImages';

export const USER_KEY = 'user';

function App() {
	const [user, setUser] = useState(new User());
	const authCtx = useContext(AuthContext);
	const loadingCtx = useContext(LoadingContext);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const url = location.hash;
		const loginParams = url.split('&');
		if (url && loginParams.length > 1 && !authCtx.isLoggedIn) {
			loadingCtx.setLoading(true);
			const accessToken = loginParams[0].slice(loginParams[0].indexOf('=') + 1, loginParams[0].length);
			const userName = loginParams[4].slice(loginParams[4].indexOf('=') + 1, loginParams[4].length);
			navigate('/');
			authCtx.onLogin(accessToken);
			httpClient.get(`https://api.imgur.com/3/account/${userName}/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
				(response) => {
					const newUser = new User({avatar: response.data.data.avatar, name: userName});
					setUser(newUser);
					window.localStorage.setItem(USER_KEY, JSON.stringify(newUser));
					loadingCtx.setLoading(false);
				}
			).catch((error: Error) => {
				// TODO handle errors
				console.log(error);
				loadingCtx.setLoading(false);
			});
		}
	}, [authCtx, navigate, location, loadingCtx]);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem(USER_KEY);
		if (userFromLocalStorage) {
			setUser(new User(JSON.parse(userFromLocalStorage)));
		}
	}, []);

	return (
		<div className={`${classes.AppContainer} ${loadingCtx.isLoading && 'pointer-events-none'}`}>
			{loadingCtx.isLoading && <Loading />}
			<Navbar user={user}/>
			<main>
				<Routes>
					<Route path="/" element={<Layout/>}>
						{!authCtx.isLoggedIn && <Route path={RoutesName.Login} element={<Login/>}/>}
						{authCtx.isLoggedIn && <Route path={RoutesName.MyGallery} element={<MyGallery/>}/>}
						{authCtx.isLoggedIn && <Route path={RoutesName.AddImages} element={<AddImages/>}/>}
						{authCtx.isLoggedIn && <Route path={`${RoutesName.AddImages}/:albumId`} element={<AddImages/>}/>}
						<Route path={RoutesName.Hot} element={<Hot/>}/>
						<Route path={RoutesName.Top} element={<Top/>}/>
						<Route path={`:gallery/${RoutesName.Album}/:albumId`} element={<AlbumDetails/>}/>
					</Route>
				</Routes>
			</main>
		</div>
	);
}

export default App;
