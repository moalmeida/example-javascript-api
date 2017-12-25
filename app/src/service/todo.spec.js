var rewire = require("rewire");
var Todo = require("../model/todo");
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
          return cb(message);
        }
      }
    });
    todo.list().catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should findById() without error", () => {
    const result = [{}];
    const id = 1;
    todo.__set__({
      Todo: {
        findById: (id, cb) => {
          return cb(null, result);
        }
      }
    });
    todo.findById(id).then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should findById() with error", () => {
    const message = "ERROR";
    const id = 1;
    todo.__set__({
      Todo: {
        findById: (id, cb) => {
          return cb(message, null);
        }
      }
    });
    todo.findById(id).catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should update() without error", () => {
    const older = new Todo({name: 'abc123'});
    const body = {
      name: 'qaz123'
    }
    todo.__set__({
      Todo: {
        set: (arg0, arg1) => {
          arg0.name = arg1.name;
        },
        save: (options, cb) => {
          return cb(null, options);
        }
      }
    });
    todo.update(older, body).then((v) => {
      expect(v.name).toBe(body.name);
    });
  });

  it("should update() with error", () => {
    const message = "ERROR";
    const older = new Todo({name: 'abc123'});
    const body = {
      name: 'qaz123'
    }
    todo.__set__({
      Todo: {
        set: (arg0, arg1) => {
          arg0.name = arg1.name;
        },
        save: (options, cb) => {
          return cb(message);
        }
      }
    });
    todo.update(older, body).catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should save() without error", () => {
    const body = {
      name: 'qaz123'
    }
    todo.__set__({
      Todo: {
        create: (options, cb) => {
          return cb(null, body);
        }
      }
    });
    todo.save(body).then((v) => {
      expect(v.name).toBe(body.name);
    });
  });

  it("should save() with error", () => {
    const message = "ERROR";
    const body = {
      name: 'qaz123'
    }
    todo.__set__({
      Todo: {
        create: (options, cb) => {
          return cb(message);
        }
      }
    });
    todo.save(body).catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should remove() without error", () => {
    const object = new Todo({name: 'abc123'});
    todo.__set__({
      Todo: {
        remove: (options, cb) => {
          expect(options).toBe(object);
          return cb();
        }
      }
    });
    todo.remove(object).then((v) => {
      expect(v).not.toBeDefined();
    });
  });

  it("should remove() with error", () => {
    const message = "ERROR";
    const object = new Todo({name: 'abc123'});
    todo.__set__({
      Todo: {
        remove: (options, cb) => {
          expect(options).toBe(object);
          return cb(message);
        }
      }
    });
    todo.remove(object).catch((v) => {
      expect(v).toBe(message);
    });
  });

});
