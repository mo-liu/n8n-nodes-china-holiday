import type { INodeProperties } from 'n8n-workflow';

import { getYearDescription } from './getYear';

export const holidayDescription: INodeProperties[] = [...getYearDescription];
