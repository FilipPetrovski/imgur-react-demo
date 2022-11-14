import React from "react";
// @ts-ignore
function ShowImage({ image }) {
	return (
		<div>
			<img alt='' src={image.src} />
		</div>
	);
}
export default ShowImage;
