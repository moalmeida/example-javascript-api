var Promise = require("bluebird");
var rewire = require("rewire");
var healthcheck = rewire("./healthcheck");

describe("routes/healthcheck unit test", () => {

  it("should get() without error", () => {
    const todos = [{}];
    const incremental = 0;
    const req = () => {};
    var res = {
      json: (data) => {
        expect(data.todos).toBe(todos);
        expect(data.incremental).toBe(incremental);
        return;
      },
      end: () => {
        return;
      }
    };
    healthcheck.__set__({
      Todo: {
        get: () => {
          return new Promise((resolve) => {
            resolve(todos);
          });
        }
      },
      Count: {
        incremental: () => {
          return new Promise((resolve) => {
            resolve(incremental);
          });
        }
      }
    });
    healthcheck.get(req, res);
  });

});
