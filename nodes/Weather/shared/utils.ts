import type { NodeExecuteContext } from '../resources/router';

type TransformFn = (value: unknown, raw: Record<string, unknown>) => unknown;



export function parseTime(val: string): number {
  if (!val) return 0;
  const num = Number(val);
  if (!isNaN(num) && num > 1e12) return num;
  if (!isNaN(num) && num > 1e9) return num * 1000;
  const parsed = new Date(val).getTime();
  return isNaN(parsed) ? 0 : parsed;
}


export function getParams<T extends Record<string, TransformFn>>(
	ctx: NodeExecuteContext,
	schema: T,
): { [K in keyof T]: ReturnType<T[K]> } {
	const raw: Record<string, unknown> = {};
	for (const name of Object.keys(schema)) {
		raw[name] = ctx.context.getNodeParameter(name, ctx.itemIndex);
	}
	const result = {} as Record<string, unknown>;
	for (const [name, transform] of Object.entries(schema)) {
		result[name] = transform(raw[name], raw);
	}
	return result as { [K in keyof T]: ReturnType<T[K]> };
}