import {MediaType} from './MediaType.model';

export class Image {
	readonly id: string | undefined;
	readonly url: string | undefined;
	readonly description: string | undefined;
	readonly title: string | undefined;
	readonly type: MediaType | undefined;

	constructor(params?: {
		id: string;
		url: string;
		description: string;
		title: string;
		type: MediaType;
	}) {
		Object.assign(this, params);
	}

	static deserialize(response: any): Image {
		return new Image({
			id: response.id,
			url: response.link,
			description: response.description,
			title: response.title,
			type: this.getMediaType(response.type)
		});
	}

	private static getMediaType(type: string): MediaType {
		if (type.startsWith('video')) {
			return MediaType.video
		}
		if (type.endsWith('gif')) {
			return MediaType.gif;
		}
		return MediaType.image;
	}

	isVideo(): boolean {
		return this.type === MediaType.video;
	}

	isImage(): boolean {
		return this.type === MediaType.image;
	}

	isGif(): boolean {
		return this.type === MediaType.gif;
	}
}
