import {Routes} from 'react-router-dom';
import {Route} from 'react-router';
import {RoutesName} from '../../shared/models/Routes';
import React, {useContext} from 'react';
import {Navigate} from 'react-router';
import AuthContext from '../../stores/AuthContext';

const MyGallery = React.lazy(() => import('../../components/MyGallery/MyGallery'));
const AddImages = React.lazy(() => import('../../components/MyGallery/AddImages/AddImages'));
const AlbumDetails = React.lazy(() => import('../../shared/components/Albums/AlbumDetails/AlbumDetails'));
const Login = React.lazy(() => import('../../components/Login/Login'));
const Top = React.lazy(() => import('../../components/Top/Top'));
const Hot = React.lazy(() => import('../../components/Hot/Hot'));

const Home = () => {
	const authCtx = useContext(AuthContext);

	return <>
		<Routes>
			{!authCtx.isLoggedIn && <Route path={RoutesName.Login} element={<Login/>}/>}
			{authCtx.isLoggedIn && <Route path={RoutesName.MyGallery} element={<MyGallery/>}/>}
			{authCtx.isLoggedIn && <Route path={RoutesName.AddImages} element={<AddImages/>}/>}
			{authCtx.isLoggedIn && <Route path={`${RoutesName.AddImages}/:albumId`} element={<AddImages/>}/>}
			{authCtx.isLoggedIn && <Route path={RoutesName.Hot} element={<Hot/>}/>}
			{authCtx.isLoggedIn && <Route path={RoutesName.Top} element={<Top/>}/>}
			{authCtx.isLoggedIn && <Route path={`:gallery/${RoutesName.Album}/:albumId`} element={<AlbumDetails/>}/>}
			<Route path="*"
			       element={authCtx.isLoggedIn ? <Navigate to={RoutesName.MyGallery}/> : <Navigate to={RoutesName.Login}/>}></Route>
		</Routes>
	</>;
};

export default Home;
