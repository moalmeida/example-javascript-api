var rewire = require("rewire");
var user = rewire("./user");

describe("service/user unit test", () => {

  it("should list() without error", () => {
    const result = [{}];
    user.__set__({
      User: {
        find: (options, cb) => {
          return cb(null, result);
        }
      }
    });
    user.list().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should list() with error", () => {
    const message = "ERROR";
    user.__set__({
      User: {
        find: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    user.list().catch((v) => {
      expect(v).toBe(message);
    });
  });

});
