import type { INodeProperties } from 'n8n-workflow';

export function yearProperty(
	showCondition: Record<string, string[]>,
): INodeProperties {
	return {
		displayName: 'Year',
		name: 'year',
		type: 'number',
		default: new Date().getFullYear(),
		description: 'Year to query holidays for (e.g. 2026)',
		displayOptions: {
			show: showCondition,
		},
	};
}
