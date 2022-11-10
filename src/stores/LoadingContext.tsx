import React, {useState} from 'react';

const LoadingContext = React.createContext({
	isLoading: false,
	setLoading: (value: boolean) => {
	}
});

export const LoadingContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (<LoadingContext.Provider value={{isLoading: isLoading, setLoading: setIsLoading}}>
		{props.children}
	</LoadingContext.Provider>);
};

export default LoadingContext;
