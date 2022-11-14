import {useDropzone} from 'react-dropzone';
import classes from './Dropzone.module.scss';
import {useMemo} from 'react';

export const MAX_FILE_SIZE = 1024 * 1024 * 25; // File size is in bytes, so this means the max file size should be 25MB

// @ts-ignore
const DropBox = ({onDrop}) => {
	const {
		getRootProps,
		getInputProps,
		open,
		isDragAccept,
		isDragReject
	} = useDropzone({
		accept: {
			'image/*': ['.jpeg', '.png', '.jpg']
		},
		onDrop,
		noClick: true,
		noKeyboard: true,
		maxSize: MAX_FILE_SIZE
	});

	const dropzoneClasses = useMemo(() => {
		return {className: classes.Container + ` ${isDragAccept ? classes.Accepted : ''} ${isDragReject ? classes.Rejected : ''}`};
	}, [isDragAccept, isDragReject]);

	return <div{...getRootProps(dropzoneClasses)}>
		<input {...getInputProps()} />
		<p>Drag and drop some images here</p>
		<button type="button"
		        className={classes.AddImageButton}
		        onClick={open}>
			Click to select images
		</button>
	</div>;
};

export default DropBox;
