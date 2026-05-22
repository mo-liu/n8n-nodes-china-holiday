import type { INodeTypeDescription } from 'n8n-workflow';

import { baseNodeDescription } from './base';
import { properties } from './properties';

export const weatherNodeDescription: INodeTypeDescription = {
	...baseNodeDescription,
	properties,
};
