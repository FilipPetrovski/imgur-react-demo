import {Image} from './Image.model';

export class Album {
	readonly id: string | undefined;
	readonly coverImageId: string | undefined;
	readonly title: string | undefined;
	readonly imagesCount: number | undefined;
	readonly images: Array<Image> | undefined;

	constructor(params?: {
		id: string,
		coverImageId: string,
		title: string,
		imagesCount: number,
		images: Array<Image>
	}) {
		Object.assign(this, params);
	}

	static deserialize(response: any): Album {
		return new Album({
			id: response.id,
			coverImageId: response.cover,
			title: response.title.length > 55 ? response.title.slice(0, 55) + '...' : response.title,
			imagesCount: response.images_count || 0,
			images: response.images?.map((image: any) => Image.deserialize(image)) || []
		});
	}

	getCoverImage(): Image | undefined {
		return this.images?.find((image: Image) => image.id === this.coverImageId);
	}
}
