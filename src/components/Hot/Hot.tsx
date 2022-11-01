import classes from '../Hot/Hot.module.scss';
import {useEffect} from 'react';
import httpClient from '../../interceptors/RequestInterceptor';
import {Album} from '../../shared/models/Album.model';

const Hot = () => {
	useEffect(() => {
		httpClient.get(`https://api.imgur.com/3/gallery/hot/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}`).then(
			(data) => {
				data.data.data.map((album: any) => Album.deserialize(album));
			}
		);
	}, []);
	return <div>

	</div>;
}

export default Hot;
