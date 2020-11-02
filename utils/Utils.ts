export const removeKeyFromObject = (obj: { [key: string]: any }, key: string) => {
	const { [key]: _, ...rest } = obj;
	return rest;
};

export const uuid = () =>
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
