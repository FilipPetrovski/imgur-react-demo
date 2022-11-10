import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from './stores/AuthContext';
import {Provider} from 'react-redux';
import globalStore from './stores/globalStore';
import {BrowserRouter} from 'react-router-dom';
import {LoadingContextProvider} from './stores/LoadingContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={globalStore}>
				<AuthContextProvider>
					<LoadingContextProvider>
						<App/>
					</LoadingContextProvider>
				</AuthContextProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
