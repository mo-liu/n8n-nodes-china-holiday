import { NodeConnectionTypes } from 'n8n-workflow';
import type { INodeTypeDescription } from 'n8n-workflow';
import { subtitle } from './properties';


export const baseNodeDescription: Omit<INodeTypeDescription, 'properties'> = {
	displayName: 'China Holiday',
	name: 'chinaHoliday',
	icon: 'file:../../icons/weather.svg',
	group: ['transform'],
	version: 1,
	subtitle: subtitle,
	description: 'Query Chinese public holidays and workday adjustments via timor.tech API',
	defaults: {
		name: 'China Holiday',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
	usableAsTool: true,
};
