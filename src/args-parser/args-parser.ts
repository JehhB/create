// With null prototype
export type Args = { [option: string]: string[]; $arguments?: string[] };

export const mergeArgs = (...argsList: Args[]): Args => {
  let args = {};
  argsList.forEach((val) => {
    for (const key in val)
      if (args[key] === undefined) args[key] = val[key];
      else args[key] = args[key].concat(val[key]);
  });
  return args;
};

export const expandFlags = (flags: string): Args =>
  flags.split("").reduce((prev, curr) => mergeArgs(prev, { [curr]: [""] }), {});

export const parseArgs = (
  args: string[],
  start?: number,
  length?: number
): Args => {
  if (start === undefined) start = 0;
  if (length === undefined) length = args.length - start;

  return {};
};
