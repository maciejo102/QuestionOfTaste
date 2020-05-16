
export interface IDish {
	id: number;
	name: string;
	link: string;
	ingredientDetails: Array<string>;
}

export interface IDishes {
	dishes: Array<IDish>;
}