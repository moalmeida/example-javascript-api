var rewire = require("rewire");
var logger = rewire("./logger");

describe("util/logger unit test", () => {

  it("expect exist", () => {
    expect(logger).toBeDefined();
  });

});
