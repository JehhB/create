import { msg } from "./index";

describe("msg", () => {
  it("should be hello world", () => {
    expect(msg).toMatch("Hello world");
  });
});
