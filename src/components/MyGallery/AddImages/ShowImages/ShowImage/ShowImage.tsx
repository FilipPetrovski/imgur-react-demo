import React, {useState} from 'react';
import classes from './ShowImage.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {NewlyAddedImage} from '../../models/NewlyAddedImage.model';
import {NumberOfWords} from '../../../../../utils/NumberOfWords';

function ShowImage(props: { image: NewlyAddedImage, removeImage: Function }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	return (
		<div className={`${classes.Container} row`}>
			<img alt=""
			     src={props.image.src}
			     className="col-xl-1 col-lg-1 col-md-10  col-sm-12 col-12"/>
			<div className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12">
				<input placeholder="Title"
				       required
				       onChange={(event) => setTitle(event.target.value)}/>
				{title.trim().length < 1 && <p className={classes.FieldError}>This field is required !</p>}
			</div>
			<div className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12">
				<input placeholder="Description"
				       required
				       onChange={(event) => setDescription(event.target.value)}/>
				{NumberOfWords(description) < 10 &&
					<p className={classes.FieldError}>There should be at least 10 words for the description</p>}
			</div>
			<FontAwesomeIcon icon={faXmark}
			                 className={`${classes.RemoveImage} col-xl-1 col-lg-1 col-md-2 col-sm-3 col-12`}
			                 onClick={() => props.removeImage()}/>
		</div>
	);
}

export default ShowImage;
