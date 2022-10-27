import React, {useState} from 'react';
import {TOKEN_KEY} from '../interceptors/request-interceptor';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {
	},
	onLogin: (accessToken: string) => {
	}
});

export const AuthContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logoutHandler = () => {
		window.localStorage.removeItem(TOKEN_KEY);
		setIsLoggedIn(false);
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