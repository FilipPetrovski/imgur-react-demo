import {Album} from '../../models/Album.model';
import classes from '../Albums/Albums.module.scss';
import {BaseSyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {RoutesName} from '../../models/Routes';

const Albums = (props: { albums: Album[] }) => {
	const navigate = useNavigate();

	const addHoverClass = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.add(classes.HoverAlbum);
	};

	const removeHoverClass = (element: BaseSyntheticEvent) => {
		element.currentTarget.classList.remove(classes.HoverAlbum);
	};

	const goToAlbumDetails = (album: Album) => {
		if (album.imagesCount) {
			navigate(`/${RoutesName.Album}/${album.id}`);
		}
	};

	return <div className={`${classes.Albums} row`}>
		{props.albums.map((album: Album) => (
			<div key={album.id}
			     className={`${classes.Album} col-xl-3 col-lg-5 col-md-8 col-sm-10 col-10`}
			     onMouseOver={addHoverClass}
			     onMouseOut={removeHoverClass}
			     onClick={() => goToAlbumDetails(album)}>
				<div className={classes.ImageWrapper}>
					<img className="img-fluid"
						// TODO Replace the src with the actual album cover image
						 src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
						 alt={album.getCoverImage()?.description}/>
				</div>
				<div className={classes.TitleWrapper}>
					<p className={classes.Title}>{album.title}</p>
					<p className={classes.ImagesCount}>Number of images: {album.imagesCount}</p>
				</div>
			</div>
		))}
	</div>;
};

export default Albums;
