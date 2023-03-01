import {Album} from '../../models/Album.model';
import classes from '../Albums/Albums.module.scss';
import React, {useCallback, useEffect, useState} from 'react';
import NoItems from '../NoItems/NoItems';
import ShowAlbum from './ShowAlbum/ShowAlbum';

type Props = {
	albums: Array<Album>
}

const ALBUMS_PER_PAGE = 18;
const Albums: React.FC<Props> = (props: Props) => {
	const [page, setPage] = useState(1);
	const [albums, setAlbums] = useState<Array<Album>>([]); // This is just to demonstrate how an infinite scroll will work

	useEffect(() => {
		setAlbums(props.albums.slice(0, ALBUMS_PER_PAGE));
	}, [props.albums]);

	const onAlbumsScroll = useCallback((event) => {
		if (event.target.scrollTop + window.innerHeight > event.target.scrollHeight) {
			setPage((prevState) => prevState + 1);
			setAlbums(props.albums.slice(0, page * ALBUMS_PER_PAGE));
		}
	}, [page, props.albums]);

	useEffect(() => {
		window.addEventListener('scroll', onAlbumsScroll);
		return () => window.removeEventListener('scroll', onAlbumsScroll);
	}, [onAlbumsScroll]);

	return <div className={`${classes.Albums} row`} onScroll={onAlbumsScroll}>
		{albums.length ?
			(albums.map((album: Album) => (<ShowAlbum album={album} key={album.id}></ShowAlbum>)))
			: <NoItems text="No albums found !"/>
		}
	</div>;
};

export default Albums;
