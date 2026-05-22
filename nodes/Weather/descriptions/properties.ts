import type { INodeProperties } from 'n8n-workflow';

import { holidayDescription } from '../resources/holiday';

const baseProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Holiday',
				value: 'holiday',
			},
		],
		default: 'holiday',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['holiday'],
			},
		},
		options: [
			{
				name: 'Get Year Holidays',
				value: 'getYear',
			},
		],
		default: 'getYear',
	},
];

const operationLabelMap = baseProperties
	.filter((p) => p.name === 'operation' && p.options)
	.flatMap((p) => p.options as { name: string; value: string }[])
	.map((opt) => `"${opt.value}": "${opt.name}"`)
	.join(', ');

export const subtitle = `={{ { ${operationLabelMap} }[$parameter.operation] }}`;

export const properties: INodeProperties[] = [
	...baseProperties,
	...holidayDescription,
];
