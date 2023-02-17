import ShowImage from './ShowImage/ShowImage';
import {NewlyAddedImage} from '../models/NewlyAddedImage.model';
import React from 'react';

type Props = {
	images: Array<NewlyAddedImage>,
	removeImage: Function,
	changeImageTitle: Function,
	changeImageDescription: Function
}
const ShowImages: React.FC<Props> = (props: Props) => {
	return <div className="container">
		{props.images.map((image: NewlyAddedImage) =>
			<ShowImage image={image}
			           key={image.id}
			           changeImageTitle={(title: string) => props.changeImageTitle(image.id, title)}
			           changeImageDescription={(description: string) => props.changeImageDescription(image.id, description)}
			           removeImage={() => props.removeImage(image.id)}/>)}</div>;
};
export default ShowImages;
