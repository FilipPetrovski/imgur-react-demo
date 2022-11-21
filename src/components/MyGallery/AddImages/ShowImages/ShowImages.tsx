import ShowImage from './ShowImage/ShowImage';
import {NewlyAddedImage} from '../models/NewlyAddedImage.model';

const ShowImages = (props: {images: Array<NewlyAddedImage>, removeImage: Function}) => {

	const show = (image: any) => {
		return <ShowImage image={image}
		                  key={image.id}
		                  removeImage={() => props.removeImage(image.id)}/>;
	};
	return <div className="container">{props.images.map(show)}</div>;
};
export default ShowImages;
