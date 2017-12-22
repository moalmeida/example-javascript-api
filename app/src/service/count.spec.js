var rewire = require("rewire");
var count = rewire("./count");

describe("service/count unit test", () => {

  it("should get() without error", () => {
    const result = 0;
    count.__set__({
      cache: {
        instance: () => {
          return {
            get: (name, cb) => {
              return cb(null, result);
            }
          }
        }
      }
    });
    count.get().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should get() with error", () => {
    const message = "ERROR";
    count.__set__({
      cache: {
        instance: () => {
          return {
            get: (name, cb) => {
              return cb(message, 0);
            }
          }
        }
      }
    });
    count.get().catch((e) => {
      expect(e).toBe(message);
    });
  });

  it("should set() without error", () => {
    const result = 0;
    count.__set__({
      cache: {
        instance: () => {
          return {
            set: (name, value, cb) => {
              return cb();
            }
          }
        }
      }
    });
    count.set().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should set() a number without error", () => {
    const result = 1;
    count.__set__({
      cache: {
        instance: () => {
          return {
            set: (name, value, cb) => {
              return cb(null, value);
            }
          }
        }
      }
    });
    count.set(result).then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should set() with error", () => {
    const message = "ERROR";
    count.__set__({
      cache: {
        instance: () => {
          return {
            set: (name, value, cb) => {
              return cb(message);
            }
          }
        }
      }
    });
    count.set().catch((e) => {
      expect(e).toBe(message);
    });
  });

  it("should incremental() initial without error", () => {
    const result = 0;
    count.__set__({
      cache: {
        instance: () => {
          return {
            get: (name, cb) => {
              return cb(null, result);
            },
            set: (name, value, cb) => {
              return cb();
            }
          }
        }
      }
    });
    count.incremental().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should incremental() without error", () => {
    const result = 1;
    count.__set__({
      cache: {
        instance: () => {
          return {
            get: (name, cb) => {
              return cb(null, result);
            },
            set: (name, value, cb) => {
              return cb();
            }
          }
        }
      }
    });
    count.incremental().then((v) => {
      expect(v).toBe(result + 1);
    });
  });

  it("should incremental() with error", () => {
    const message = "ERROR";
    count.__set__({
      cache: {
        instance: () => {
          return {
            get: (name, cb) => {
              return cb(message, 0);
            }
          }
        }
      }
    });
    count.incremental().catch((e) => {
      expect(e).toBe(message);
    });
  });

});
