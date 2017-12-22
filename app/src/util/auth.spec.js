var rewire = require("rewire");
var auth = rewire("./auth");

describe("util/auth unit test", () => {

  it("should initialize() without error", () => {
    expect(auth.initialize()).toBeDefined();
  });

  it("should session() without error", () => {
    expect(auth.session()).toBeDefined();
  });

  it("should authenticate() without error", () => {
    expect(auth.authenticate()).toBeDefined();
  });

});
