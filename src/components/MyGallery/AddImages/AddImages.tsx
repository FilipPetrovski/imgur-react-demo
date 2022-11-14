import {useParams} from 'react-router';
import classes from './AddImages.module.scss';
import {useCallback, useEffect, useState} from 'react';
import DropBox from './Dropzone/Dropzone';
import ShowImages from './ShowImages/ShowImages';

const AddImages = () => {
	const {albumId} = useParams();

	useEffect(() => {

	}, []);

	const [images, setImages] = useState([]);
	const onDrop = useCallback((acceptedFiles: Array<any>) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();
			reader.readAsDataURL(file as Blob);
			reader.onload = function(e) {
				// @ts-ignore
				setImages((prevState) => [
					...prevState,
					{id: index, src: e.target!.result},
				]);
			};
			return file;
		});
	}, []);


	return <div className={classes.AddImagesWrapper}>
		<section className={classes.DragAndDropArea}>
			<DropBox onDrop={onDrop}/>
		</section>
		<main className={`${classes.AddImagesFormWrapper} row`}>
			<form className="col-xl-12 col-lg-12 col-md-12 col-12">
				<section className={classes.AlbumNameAndButtonWrapper}>
					<label htmlFor="album" className="col-xl-12 col-lg-12 offset-lg-0 col-md-10 offset-md-1 col-12">Select an album</label>
					<select id="album"
					        className="col-xl-2 col-lg-4 offset-lg-0 col-md-10 offset-md-1 col-12">
						<option>Other</option>
					</select>
					<p className="col-xl-2 col-lg-2 offset-lg-0 col-md-10 offset-md-1 col-12">Or Create New Album</p>
					<input type="text"
					       placeholder="Album name"
					       className="col-xl-2 col-lg-4 offset-lg-0 col-md-10 offset-md-1 col-12"/>
					<button type="submit"
					        className="col-xl-2 offset-xl-4 col-lg-2 offset-lg-0 col-md-10 offset-md-1 col-12">
						UPLOAD
					</button>
				</section>
				<ShowImages images={images}/>
			</form>
		</main>
	</div>;
};

export default AddImages;
