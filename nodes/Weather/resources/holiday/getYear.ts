import type {
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

import type { NodeExecuteContext } from '../router';
import type { HolidayResponse } from '../../shared/types';
import { yearProperty } from '../../shared/descriptions';

const showOnlyForGetYear = {
	resource: ['holiday'],
	operation: ['getYear'],
};

export const getYearDescription: INodeProperties[] = [
	yearProperty(showOnlyForGetYear),
];

async function fetchYearHolidays(
	context: NodeExecuteContext['context'],
	year: number,
): Promise<HolidayResponse> {
	const options = {
		method: 'GET' as const,
		url: `https://timor.tech/api/holiday/year/${year}/`,
		json: true,
	};

	return (await context.helpers.httpRequest(options)) as HolidayResponse;
}

export async function executeGetYear(
	ctx: NodeExecuteContext,
): Promise<INodeExecutionData> {
	const { context } = ctx;

	const year = context.getNodeParameter('year', ctx.itemIndex) as number;

	const result = await fetchYearHolidays(context, year);

	return {
		json: result as INodeExecutionData['json'],
	};
}
