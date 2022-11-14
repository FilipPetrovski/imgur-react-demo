import ShowImage from './ShowImage/ShowImage';

// @ts-ignore
const ShowImages = ({images}) => {
	const show = (image: any) => {
		console.log(image);
		return <ShowImage image={image} key={image.id}/>;
	};
	return <div className="container">{images.map(show)}</div>;
};
export default ShowImages;
