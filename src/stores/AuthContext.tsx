import React, {useEffect, useState} from 'react';
import {USER_KEY} from '../App';
import {useNavigate} from 'react-router-dom';

export const TOKEN_KEY = 'access_token';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {
	},
	onLogin: (accessToken: string) => {
	}
});

export const AuthContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = window.localStorage.getItem(TOKEN_KEY);
		if (accessToken) {
			setIsLoggedIn(true);
		}
	}, [])

	const logoutHandler = () => {
		window.localStorage.removeItem(TOKEN_KEY);
		window.localStorage.removeItem(USER_KEY);
		setIsLoggedIn(false);
		navigate('login');
	};
	const loginHandler = (accessToken: string) => {
		const accessTokenFromStorage = window.localStorage.getItem(TOKEN_KEY);
		if (!accessTokenFromStorage) {
			window.localStorage.setItem(TOKEN_KEY, accessToken);
		}
		setIsLoggedIn(true);

	};
	return (<AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
		{props.children}
	</AuthContext.Provider>);
};

export default AuthContext;