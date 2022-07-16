import * as fs from "fs";

type Option = {
  name: string;
  description: string;
  shorthand?: string;
  transform?: string; // JS: str => str;
  reduce?: string; // JS: str[] => str;
};

type Variable = {
  name: string;
  expression: string; // JS: {[idx:str]:str} => str
};

type Template = {
  [file: string]: string | Option[] | Variable[];

  options: Option[];
  variables: Variable[];

  // Special files
  $description?: string;
  $stdout?: string;
  $stderr?: string;
};

type Config = {
  [template: string]: Template | Option[] | Variable[];

  // Global variables and options
  options: Option[];
  variables: Variable[];
};

export const defaultConfig: Config = {
  options: [
    {
      name: "color",
      shorthand: "c",
      description: `indicate intent to show color. Default = 'auto'
--color can be "always", "never", or "auto"`,
    },
    {
      name: "verbose",
      shorthand: "v",
      description: `indicate intent for more verbose output`,
    },
  ],
  variables: [],
};

export const getConfig = function (): Config {
  fs.existsSync("test");
  return defaultConfig;
};
