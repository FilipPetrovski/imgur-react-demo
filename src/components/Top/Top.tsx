import classes from '../Top/Top.module.scss';
import {useEffect} from 'react';
import httpClient from '../../interceptors/RequestInterceptor';
import {Album} from '../../shared/models/Album.model';

const Top = () => {
	useEffect(() => {
		httpClient.get(`https://api.imgur.com/3/gallery/top/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
			(data) => {
				data.data.data.map((album: any) => Album.deserialize(album));
			}
		);
	}, []);
	return <div>

	</div>;
}

export default Top;
