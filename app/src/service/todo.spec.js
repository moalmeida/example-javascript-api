var rewire = require("rewire");
var todo = rewire("./todo");

describe("service/todo unit test", () => {

  it("should get() without error", () => {
    const result = [{}];
    todo.__set__({
      Todo: {
        find: (options, cb) => {
          return cb(null, result);
        }
      }
    });
    todo.get().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should get() with error", () => {
    const message = "ERROR";
    todo.__set__({
      Todo: {
        find: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    todo.get().catch((v) => {
      expect(v).toBe(message);
    });
  });

});
