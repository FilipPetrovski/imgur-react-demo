import {useParams} from 'react-router';
import classes from './AddImages.module.scss';
import {useCallback, useEffect, useState} from 'react';
import DropBox from './Dropzone/Dropzone';
import ShowImages from './ShowImages/ShowImages';
import {NewlyAddedImage} from './models/NewlyAddedImage.model';

const AddImages = () => {
	const {albumId} = useParams();

	useEffect(() => {

	}, []);

	const [images, setImages] = useState<Array<NewlyAddedImage>>([]);
	const onDrop = useCallback((acceptedFiles: Array<any>) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();
			reader.readAsDataURL(file as Blob);
			reader.onload = function(e) {
				const image: NewlyAddedImage = {id: new Date().toISOString() + index, src: e.target!.result.toString()};
				setImages((prevState: Array<NewlyAddedImage>) => [
					...prevState,
					image
				]);
			};
			return file;
		});
	}, []);

	const removeImageFromQueue: Function = (imageId: string) => {
		setImages((prevState: Array<NewlyAddedImage>) => {
			return prevState.filter((image: NewlyAddedImage) => image.id !== imageId);
		});
	};

	const uploadImages = (event) => {
		event.preventDefault();
	}

	return <div className={classes.AddImagesWrapper}>
		<section className={classes.DragAndDropArea}>
			<DropBox onDrop={onDrop}/>
		</section>
		<main className={`${classes.AddImagesFormWrapper} row`}>
			<form className="col-xl-12 col-lg-12 col-md-12 col-12" onSubmit={uploadImages}>
				<section className={classes.AlbumNameAndButtonWrapper}>
					<label htmlFor="album" className="col-xl-12 col-lg-12 offset-lg-0 col-md-10 offset-md-1 col-12">Select an album</label>
					<select id="album"
					        className="col-xl-2 col-lg-4 offset-lg-0 col-md-10 offset-md-1 col-12">
						<option>Other</option>
					</select>
					<p className="col-xl-2 col-lg-2 offset-lg-0 col-md-10 offset-md-1 col-12">Or Create New Album</p>
					<input type="text"
					       placeholder="Album name"
					       className={`col-xl-2 col-lg-4 offset-lg-0 col-md-10 offset-md-1 col-12 ${classes.AlbumName}`}/>
					<button type="submit"
					        className={`col-xl-2 offset-xl-4 col-lg-2 offset-lg-0 col-md-10 offset-md-1 col-12 ${images.length < 1 && 'disabled'}`}>
						UPLOAD
					</button>
				</section>
				<ShowImages images={images}
				            removeImage={(imageId: string) => removeImageFromQueue(imageId)}/>
			</form>
		</main>
	</div>;
};

export default AddImages;
