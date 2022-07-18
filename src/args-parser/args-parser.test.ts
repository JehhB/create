import { Args, parseArgs, expandFlags, mergeArgs } from "./args-parser";

describe("expand flags", () => {
  it("should expand flags as single character with empty string as value", () => {
    expect(expandFlags("flags")).toEqual<Args>({
      f: [""],
      l: [""],
      a: [""],
      g: [""],
      s: [""],
    });
  });

  it("should expand repeated flags to array of empty string \
with length equal to number of time flag is repeated", () => {
    expect(expandFlags("vv")).toEqual<Args>({ v: ["", ""] });
  });

  it("should be case sensitive", () => {
    expect(expandFlags("vV")).toEqual<Args>({ v: [""], V: [""] });
  });
});

describe("merging args", () => {
  it("should merge args maintaining order for option value", () => {
    expect(mergeArgs({ v: ["1"] }, { v: ["2"], h: [""] })).toEqual<Args>({
      v: ["1", "2"],
      h: [""],
    });
    expect(
      mergeArgs({ v: ["2"], h: [""] }, { h: [""], v: ["1"] })
    ).toEqual<Args>({
      v: ["2", "1"],
      h: ["", ""],
    });
  });
});

describe("parse args", () => {
  it("should parse args to object with array of values for each option", () => {
    expect(
      parseArgs([
        "--help",
        "-haav",
        "-c",
        "-m",
        "create",
        "-lc=auto",
        "-c=always",
        "-c never",
        "test",
        "--",
        "-m",
        "test",
      ])
    ).toEqual<Args>({
      help: [""],
      h: [""],
      a: ["", ""],
      v: [""],
      c: ["", "auto", "always", "never"],
      m: [""],
      l: [""],
      $arguments: ["create", "test", "-m", "test"],
    });
  });

  it("should parse args after -- as arguments", () => {
    expect(parseArgs(["-h", "--", "-h"])).toEqual<Args>({
      h: [""],
      $arguments: ["-h"],
    });
    expect(parseArgs(["--"])).toEqual<Args>({});
  });

  it("should parse args after option as its values \
unless terminated with -- or folowed by another option", () => {
    expect(parseArgs(["-c"])).toEqual<Args>({ c: [""] });
    expect(parseArgs(["-c", "color", "never"])).toEqual<Args>({
      c: ["color"],
      $arguments: ["never"],
    });
    expect(parseArgs(["-c", "--color", "never"])).toEqual<Args>({
      c: [""],
      color: ["never"],
    });
    expect(parseArgs(["-c", "--"])).toEqual<Args>({ c: [""] });
  });

  it("should parse empty args as empty object", () => {
    expect(parseArgs([])).toEqual({});
  });
});
