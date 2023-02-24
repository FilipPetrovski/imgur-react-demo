import {Album} from '../../models/Album.model';
import classes from '../Albums/Albums.module.scss';
import React, {BaseSyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import NoItems from '../NoItems/NoItems';
import {useLocation} from 'react-router';
import {RoutesName} from '../../models/Routes';
import NoPhoto from '../../../assets/images/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpeg';

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
	}, [props.albums]);

	const onAlbumsScroll = useCallback((event) => {
		if (event.target.scrollTop + window.innerHeight > event.target.scrollHeight) {
			setPage((prevState) => prevState + 1);
			setAlbums(props.albums.slice(0, page * ALBUMS_PER_PAGE));
		}
	}, [page, props.albums])

	useEffect(() => {
		window.addEventListener('scroll', onAlbumsScroll);
		return () => window.removeEventListener('scroll', onAlbumsScroll);
	}, [onAlbumsScroll]);

	return <div className={`${classes.Albums} row`} onScroll={onAlbumsScroll}>
		{albums.length ?
			(albums.map((album: Album) => (
				<div key={album.id}
				     className={`${classes.Album} col-xl-3 col-lg-5 col-md-8 col-sm-10 col-10`}
				     onMouseOver={addHoverClass}
				     onMouseOut={removeHoverClass}
				     onClick={() => goToAlbumDetails(album.id)}>
					<div className={classes.ImageWrapper}>
						{(album.getCoverImage()?.isImage() || album.getCoverImage()?.isGif()) &&
							<>
								{album.getCoverImage()?.isGif() && <span className={classes.Gif}>GIF</span>}
								<img className="img-fluid"
								     src={album.getCoverImage()?.url}
								     alt={album.getCoverImage()?.description}/>
							</>
						}
						{album.getCoverImage()?.isVideo() &&
							<>
								<span className={classes.VideoMark}>VIDEO</span>
								<video width="100%"
								       height="270px"
								       onMouseOver={(event: any) => event.target.play()}
								       onMouseOut={(event: any) => event.target.pause()}
								       muted>
									<source
										src={album.getCoverImage()?.url}
										type="video/mp4"/>
								</video>
							</>
						}
						{
							!album.imagesCount && <img className="img-fluid"
							                           src={NoPhoto}
							                           alt='No Cover Provided'/>
						}
					</div>
					<div className={classes.TitleWrapper}>
						<p className={classes.Title}>{album.title}</p>
						<p className={classes.ImagesCount}>Number of images: {album.imagesCount}</p>
					</div>
				</div>
			)
			))
			:
			<NoItems text="No albums found !"/>
		}
	</div>;
};

export default Albums;
