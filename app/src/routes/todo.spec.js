var Promise = require("bluebird");
var rewire = require("rewire");
var todo = rewire("./todo");

describe("routes/todo unit test", () => {

  it("should incremental() without error", () => {
    const result = [{}];
    const req = () => {};
    var res = {
      json: (data) => {
        expect(data).toBe(result);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        get: () => {
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.get(req, res);
  });

  it("should incremental() with exception", () => {
    const message = "ERROR";
    const req = () => {};
    const next = (err) => {
      expect(err).toBe(message);
      return;
    };
    const res = {
      json: () => {
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        get: () => {
          return new Promise((resolve, reject) => {
            reject(message);
          });
        }
      }
    });
    todo.get(req, res, next);
  });

});
