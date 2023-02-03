import {useEffect, useState} from 'react';

const useDeviceScreenSize = () => {
	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return {deviceScreenWidth: windowSize[0], deviceScreenHeight: windowSize[1]}
};

export default useDeviceScreenSize;