var Promise = require("bluebird");
var rewire = require("rewire");
var todo = rewire("./todo");

describe("routes/todo unit test", () => {

  it("should list() without error", () => {
    const result = [{}];
    const req = {};
    const next = () => {};
    var res = {
      json: (data) => {
        expect(data).toBe(result);
        return;
      }
    };
    todo.__set__({
      Todo: {
        list: () => {
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.list(req, res, next);
  });

  it("should list() with exception", () => {
    const message = "ERROR";
    const req = {};
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
        list: () => {
          return new Promise((resolve, reject) => {
            reject(message);
          });
        }
      }
    });
    todo.list(req, res, next);
  });

  it("should preload() without error", () => {
    const result = [{}];
    const req = {
      params: {
        todoId: 1
      }
    };
    const next = () => {
      expect(req.todo).toBe(result);
      return;
    };
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
        findById: () => {
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.preload(req, res, next);
  });

  it("should preload() error without params", () => {
    const result = [{}];
    const req = {
      params: {}
    };
    const next = () => {
      return;
    };
    var res = {
      json: (status) => {
        expect(status).toBe(400);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        findById: () => {
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.preload(req, res, next);
  });

  it("should get() without error", () => {
    const req = {};
    var res = {
      todo: {},
      json: (status, data) => {
        expect(status).toBe(200);
        expect(data).toBe(res.todo);
        return;
      }
    };
    todo.get(req, res);
  });

  it("should get() error without params", () => {
    const req = {
      params: {}
    };
    var res = {
      json: (status) => {
        expect(status).toBe(400);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.get(req, res);
  });

  it("should put() without error", () => {
    const result = {};
    const req = {
      body: {}
    };
    const next = () => {};
    var res = {
      todo: {},
      json: (status, data) => {
        expect(status).toBe(204);
        expect(data).toBe(result);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        update: (id, body) => {
          expect(id).toBe(res.todo);
          expect(body).toBe(req.body);
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.put(req, res, next);
  });

  it("should put() error without params", () => {
    const req = {
      params: {}
    };
    var res = {
      json: (status) => {
        expect(status).toBe(400);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.put(req, res);
  });


  it("should post() without error", () => {
    const result = {};
    const req = {
      body: {}
    };
    const next = () => {};
    var res = {
      json: (status, data) => {
        expect(status).toBe(201);
        expect(data).toBe(result);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        save: (body) => {
          expect(body).toBe(req.body);
          return new Promise((resolve) => {
            resolve(result);
          });
        }
      }
    });
    todo.post(req, res, next);
  });

  it("should del() without error", () => {
    const req = {};
    const next = () => {};
    var res = {
      todo: {},
      status: (status) => {
        expect(status).toBe(204);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.__set__({
      Todo: {
        remove: (id) => {
          expect(id).toBe(res.todo);
          return new Promise((resolve) => {
            resolve();
          });
        }
      }
    });
    todo.del(req, res, next);
  });

  it("should del() error without params", () => {
    const req = {
      params: {}
    };
    var res = {
      json: (status) => {
        expect(status).toBe(400);
        return;
      },
      end: () => {
        return;
      }
    };
    todo.del(req, res);
  });


});
