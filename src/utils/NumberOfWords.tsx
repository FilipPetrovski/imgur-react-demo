export const CountWords = (text: string): number => {
	return text.trim().split(' ').length;
}
