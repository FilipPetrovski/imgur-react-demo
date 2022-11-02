import {Album} from '../../models/Album.model';
import classes from '../Albums/Albums.module.scss';

const Albums = (props: { albums: Album[] }) => {
	return <div className={`${classes.Albums} row`}>
		{props.albums.map((album: Album) => (
			<div key={album.id} className={`${classes.Album} col-xl-3 col-lg-5 col-md-8 col-sm-10 col-10`}>
				<div className={classes.ImageWrapper}>
					<img className="img-fluid"
					     src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
					     alt="cover-image"/>
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
