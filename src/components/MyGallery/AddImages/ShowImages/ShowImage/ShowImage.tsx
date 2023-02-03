import React from 'react';
import classes from './ShowImage.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {IMAGE_DESCRIPTION_MINIMUM_WORDS_NUMBER, NewlyAddedImage} from '../../models/NewlyAddedImage.model';
import {CountWords} from '../../../../../utils/NumberOfWords';
import useDeviceScreenSize from '../../../../../shared/hooks/UseDeviceScreenSize';

function ShowImage(props: {
	image: NewlyAddedImage,
	removeImage: Function
	changeImageTitle: Function,
	changeImageDescription: Function
}) {
	const {deviceScreenWidth} = useDeviceScreenSize();

	return (
		<div className={`${classes.Container} row`}>
			<img alt=""
			     src={props.image.src}
			     className="col-xl-1 col-lg-1"/>
			{deviceScreenWidth < 1000 && <FontAwesomeIcon icon={faXmark}
			                                              className={classes.RemoveImage}
			                                              onClick={() => props.removeImage()}/>}
			<div className="col-xl-4 col-lg-4">
				<input placeholder="Title"
				       required
				       onChange={(event) => props.changeImageTitle(event.target.value)}/>
				{props.image.title.trim().length < 1 && <p className={classes.FieldError}>This field is required !</p>}
			</div>
			<div className="col-xl-4 col-lg-4">
				<input placeholder="Description"
				       required
				       onChange={(event) => props.changeImageDescription(event.target.value)}/>
				{CountWords(props.image.description) < IMAGE_DESCRIPTION_MINIMUM_WORDS_NUMBER &&
					<p className={classes.FieldError}>There should be at least 10 words for the description</p>}
			</div>
			{deviceScreenWidth >= 1000 && <FontAwesomeIcon icon={faXmark}
			                                               className={`${classes.RemoveImage} col-xl-1 col-lg-1`}
			                                               onClick={() => props.removeImage()}/>}
		</div>
	);
}

export default ShowImage;
