export const IMAGE_DESCRIPTION_MINIMUM_WORDS_NUMBER = 10;

export enum ImageType {
	URL = 'URL',
	base64 = 'base64'
}

export interface NewlyAddedImage {
	id: string;
	src: string;
	title: string;
	description: string;
}
