export const ConvertToBase64ForUpload = (base64url: string): string => {
	return base64url.split(',')[1];
};
