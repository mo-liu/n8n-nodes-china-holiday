export type HolidayDay = {
	holiday: boolean;
	name: string;
	wage: 1 | 2 | 3;
	date: string;
	rest: number;
	after?: boolean;
	target?: string;
};

export type HolidayResponse = {
	code: number;
	holiday: Record<string, HolidayDay>;
};
