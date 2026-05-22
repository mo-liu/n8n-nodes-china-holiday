import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { executeGetYear } from './holiday/getYear';

export interface NodeExecuteContext {
	context: IExecuteFunctions;
	itemIndex: number;
}

export type NodeHandler = (ctx: NodeExecuteContext) => Promise<INodeExecutionData>;

export const operationMap: Record<string, NodeHandler> = {
	'holiday/getYear': executeGetYear,
};
