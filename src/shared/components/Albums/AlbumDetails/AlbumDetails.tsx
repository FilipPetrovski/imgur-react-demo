import {useEffect, useState} from 'react';
import httpClient from '../../../../interceptors/RequestInterceptor';
import {useParams} from 'react-router';
import {Album} from '../../../models/Album.model';
import classes from './AlbumDetails.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import noImage from '../../../../assets/images/No-Image-Placeholder.svg.png';

const AlbumDetails = () => {
	const [currentImageNumber, setCurrentImageNumber] = useState(1);
	const [album, setAlbum] = useState(new Album());
	const {albumId} = useParams();
	let loadedOnce: boolean; // TODO this loadedOnce is fix for development so that the use effect wont run twice and send two request -> https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e

	useEffect(() => {
		if (!loadedOnce) {
			httpClient.get(`https://api.imgur.com/3/album/${albumId}`).then(
				(data) => {
					setAlbum(Album.deserialize(data.data.data));
				}
			);
		}
		return () => {
			loadedOnce = true;
		};
	}, []);

	const goToNextImage = () => {
		// @ts-ignore
		if (currentImageNumber < album.imagesCount) {
			setCurrentImageNumber((prevState => prevState + 1));
		}
	};

	const goToPreviousImage = () => {
		if (currentImageNumber > 1) {
			setCurrentImageNumber((prevState => prevState - 1));
		}
	};

	return <div className="row">
		<div className={`${classes.AlbumWrapper} col-xl-12 col-lg-12 col-md-12 col-8`}>
			<p className={classes.CurrentImageText}>Current image:
				<span>{currentImageNumber} / {album.imagesCount}</span>
			</p>
			<div className={classes.ImageWrapper}>
				{album.imagesCount ?
					<img className="img-fluid"
					     src={album && album.images && album.images[currentImageNumber - 1].url}
					     alt={album && album.images && album.images[currentImageNumber - 1].description}/>
					:
					<img src={noImage} alt="no preview"/>
				}
			</div>
			<FontAwesomeIcon className={`${classes.PreviousImageIcon} ${currentImageNumber <= 1 && 'disabled'}`}
			                 icon={faChevronLeft}
			                 onClick={goToPreviousImage}/>
			<FontAwesomeIcon className={`${classes.NextImageIcon} ${currentImageNumber === album.imagesCount && 'disabled'}`}
			                 icon={faChevronRight}
			                 onClick={goToNextImage}/>
		</div>
	</div>;
};

export default AlbumDetails;
