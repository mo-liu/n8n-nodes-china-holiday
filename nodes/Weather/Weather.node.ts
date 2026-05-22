import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
} from 'n8n-workflow';
import { ApplicationError, NodeOperationError } from 'n8n-workflow';

import { operationMap } from './resources/router';
import { weatherNodeDescription } from './descriptions/index';

export class Weather implements INodeType {
	description = weatherNodeDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const key = `${resource}/${operation}`;

				const handler = operationMap[key];
				if (!handler) {
					throw new ApplicationError(`Unsupported operation: ${key}`);
				}

				const result = await handler({
					context: this,
					itemIndex: i,
				});

				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							success: false,
							error: error instanceof Error ? error.message : String(error),
						},
					});
					continue;
				}

				throw new NodeOperationError(
					this.getNode(),
					error instanceof Error ? error.message : String(error),
				);
			}
		}

		return [returnData];
	}
}
