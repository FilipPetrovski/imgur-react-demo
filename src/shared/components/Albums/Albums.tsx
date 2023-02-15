import {Album} from '../../models/Album.model';
import classes from '../Albums/Albums.module.scss';
import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NoItems from '../NoItems/NoItems';
import {useLocation} from 'react-router';
import {RoutesName} from '../../models/Routes';

type Props = {
	albums: Array<Album>
}

const ALBUMS_PER_PAGE = 18;
const Albums: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [page, setPage] = useState(1);
	const [albums, setAlbums] = useState<Array<Album>>([]); // This is just to demonstrate how an infinite scroll will work

	const addHoverClass = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.add(classes.HoverAlbum);
	};

	const removeHoverClass = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.remove(classes.HoverAlbum);
	};

	const goToAlbumDetails = (albumId: string | undefined) => {
		navigate(`${location.pathname}/${RoutesName.Album}/${albumId}`);
	};

	useEffect(() => {
		setAlbums(props.albums.slice(0, ALBUMS_PER_PAGE));
	}, [props.albums])

	useEffect(() => {
		window.addEventListener('scroll', onAlbumsScroll);
		return () => window.removeEventListener('scroll', onAlbumsScroll);
	}, []);

	const onAlbumsScroll = (event) => {
		if (event.target.scrollTop + window.innerHeight > event.target.scrollHeight) {
			setPage((prevState) => prevState +1);
			setAlbums(props.albums.slice(0, page * ALBUMS_PER_PAGE));
		};
	};

	return <div className={`${classes.Albums} row`} onScroll={onAlbumsScroll}>
		{albums.length ?
			(albums.map((album: Album) => (
				<div key={album.id}
				     className={`${classes.Album} col-xl-3 col-lg-5 col-md-8 col-sm-10 col-10`}
				     onMouseOver={addHoverClass}
				     onMouseOut={removeHoverClass}
				     onClick={() => goToAlbumDetails(album.id)}>
					<div className={classes.ImageWrapper}>
						<img className="img-fluid"
							// TODO Replace the src with the actual album cover image
							// TODO Add Gif/video playing possibility and functionality
							// TODO Add No found page
							 src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
							 alt={album.getCoverImage()?.description}/>
					</div>
					<div className={classes.TitleWrapper}>
						<p className={classes.Title}>{album.title}</p>
						<p className={classes.ImagesCount}>Number of images: {album.imagesCount}</p>
					</div>
				</div>
			)))
			:
			<NoItems text="No albums found !"/>
		}
	</div>;
};

export default Albums;
