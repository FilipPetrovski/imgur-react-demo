import {Album} from '../../../models/Album.model';
import classes from '../Albums.module.scss';
import NoPhoto from '../../../../assets/images/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpeg';
import React, {BaseSyntheticEvent, useContext, useEffect, useState} from 'react';
import {RoutesName} from '../../../models/Routes';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router';
import httpClient from '../../../../interceptors/Interceptor';
import LoadingContext from '../../../../stores/LoadingContext';
import {Image} from '../../../models/Image.model';

type Props = {
	album: Album;
}

const ShowAlbum = (props: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isMyGallery = location.pathname.includes(RoutesName.MyGallery);
	const {setLoading} = useContext(LoadingContext);
	const [album, setAlbum] = useState(props.album);

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
		if (isMyGallery && props.album.imagesCount) {
			setLoading(true);
			httpClient.get(`https://api.imgur.com/3/album/${props.album.id}/image/${props.album.coverImageId}`)
				.then((data) => {
					const image: Image = Image.deserialize(data.data.data);
					const updatedAlbum = Album.update(props.album, {images: [image]});
					setAlbum(updatedAlbum);
					setLoading(false);
				}).catch(error => setLoading(false));
		}
	}, [setLoading, isMyGallery, props.album]);

	return <>
		<div className={`${classes.Album} col-xl-3 col-lg-5 col-md-8 col-sm-10 col-10`}
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
					                           alt="No Cover Provided"/>
				}
			</div>
			<div className={classes.TitleWrapper}>
				<p className={classes.Title}>{album.title}</p>
				<p className={classes.ImagesCount}>Number of images: {album.imagesCount}</p>
			</div>
		</div>
	</>;
};

export default ShowAlbum;