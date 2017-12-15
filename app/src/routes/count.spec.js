var Promise = require("bluebird");
var rewire = require("rewire");
var count = rewire("./count");

describe("routes/count unit test", () => {

  it("should incremental() without error", () => {
    var req = () => {};
    var res = {
      json: (data) => {
        expect(data).toBe(0);
        return;
      },
      end: () => {
        return;
      }
    };
    count.__set__({
      Count: {
        cache: {
          instance: () => {
            return {
              get: (name, cb) => {
                return cb(null, 0);
              },
              set: (name, value, cb) => {
                return cb(null);
              }
            }
          }
        },
        incremental: () => {
          return new Promise((resolve) => {
            resolve(0);
          })
        }
      }
    });
    count.incremental(req, res);
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
    count.__set__({
      Count: {
        cache: {
          instance: () => {
            return {
              get: (name, cb) => {
                return cb();
              },
              set: (name, value, cb) => {
                return cb();
              }
            }
          }
        },
        incremental: () => {
          return new Promise((resolve, reject) => {
            reject(message);
          })
        }
      }
    });
    count.incremental(req, res, next);
  });

});
