import ShowImage from './ShowImage/ShowImage';
import {NewlyAddedImage} from '../models/NewlyAddedImage.model';

const ShowImages = (props: {
	images: Array<NewlyAddedImage>,
	removeImage: Function,
	changeImageTitle: Function,
	changeImageDescription: Function
}) => {
	return <div className="container">
		{props.images.map((image: NewlyAddedImage) =>
			<ShowImage image={image}
			           key={image.id}
			           changeImageTitle={(title: string) => props.changeImageTitle(image.id, title)}
			           changeImageDescription={(description: string) => props.changeImageDescription(image.id, description)}
			           removeImage={() => props.removeImage(image.id)}/>)}</div>;
};
export default ShowImages;
