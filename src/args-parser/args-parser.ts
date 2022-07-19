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

export const parseArgs = (args: string[], i = 0): Args => {
  const l = args.length - i;
  let m: RegExpMatchArray;

  if (l < 1) return {};

  // parse cli arguments not starting with - as argumens
  if ((m = args[i].match(/^([^-].*)$/)))
    return mergeArgs({ $arguments: [args[i]] }, parseArgs(args, i + 1));

  // parse any cli arguments after '--' as
  if (l === 1 && args[i].match(/^--$/)) return {};
  if (l > 1 && args[i].match(/^--$/)) return { $arguments: args.slice(i + 1) };

  // parse options with specified value. E.g. --option=value
  if ((m = args[i].match(/^--([a-z0-9]+)=(.*)$/i)))
    return mergeArgs({ [m[1]]: [m[2]] }, parseArgs(args, i + 1));

  // parse shorthand options with specified value, E.g. -vc=auto, -c=auto
  if ((m = args[i].match(/^-([a-z]*)([a-z])=(.*)$/i)))
    return mergeArgs(
      expandFlags(m[1]),
      { [m[2]]: [m[3]] },
      parseArgs(args, i + 1)
    );

  // parse options not followed by a value
  if (l === 1 && (m = args[i].match(/^--([a-z0-9]+)$/i)))
    return { [m[1]]: [""] };
  if (l === 1 && (m = args[i].match(/^-([a-z]*)([a-z])$/i)))
    return mergeArgs(expandFlags(m[1]), { [m[2]]: [""] });

  // parse options that are followed by another options as having no value
  if ((m = args[i].match(/^--([a-z0-9]+)$/i)) && args[i + 1].match(/^-.*$/))
    return mergeArgs({ [m[1]]: [""] }, parseArgs(args, i + 1));
  if ((m = args[i].match(/^-([a-z]*)([a-z])$/i)) && args[i + 1].match(/^-.*$/))
    return mergeArgs(
      expandFlags(m[1]),
      { [m[2]]: [""] },
      parseArgs(args, i + 1)
    );

  // parse options with values
  if ((m = args[i].match(/^--([a-z0-9]+)$/i)))
    return mergeArgs({ [m[1]]: [args[i + 1]] }, parseArgs(args, i + 2));
  if ((m = args[i].match(/^-([a-z]*)([a-z])$/i)))
    return mergeArgs(
      expandFlags(m[1]),
      { [m[2]]: [args[i + 1]] },
      parseArgs(args, i + 2)
    );

  return {};
};
