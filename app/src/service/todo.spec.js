var rewire = require("rewire");
var todo = rewire("./todo");

describe("service/todo unit test", () => {

  it("should list() without error", () => {
    const result = [{}];
    todo.__set__({
      Todo: {
        find: (options, cb) => {
          return cb(null, result);
        }
      }
    });
    todo.list().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should list() with error", () => {
    const message = "ERROR";
    todo.__set__({
      Todo: {
        find: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    todo.list().catch((v) => {
      expect(v).toBe(message);
    });
  });

});
