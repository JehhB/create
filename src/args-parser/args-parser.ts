// With null prototype
export type Args = { [option: string]: string[]; $arguments?: string[] };

export const mergeArgs = (...argsList: Args[]): Args => ({});

export const expandFlags = (flags: string): Args => ({});

export const parseArgs = (
  args: string[],
  start?: number,
  length?: number
): Args => {
  if (start === undefined) start = 0;
  if (length === undefined) length = args.length - start;

  return {};
};
