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
			type: response.type
		});
	}
}
