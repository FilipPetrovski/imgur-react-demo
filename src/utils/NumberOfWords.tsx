export const NumberOfWords = (text: string): number => {
	return text.trim().split(' ').length;
}
