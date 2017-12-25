let rewire = require("rewire");
let Auth = require("../model/auth");
let auth = rewire("./auth");

describe("service/auth unit test", () => {

  it("should list() without error", () => {
    const result = [{}];
    auth.__set__({
      Auth: {
        find: (options, cb) => {
          return cb(null, result);
        }
      }
    });
    auth.list().then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should list() with error", () => {
    const message = "ERROR";
    auth.__set__({
      Auth: {
        find: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    auth.list().catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should load() without error", () => {
    let result = new Auth({
      local: {
        username: 'abc123',
        password: '$2a$10$QkDjn.Jn0FojgBj0IItM/uFCL6JM8SrstBgzoSZzD1oHDlWm3627W'
      }
    });
    const username = 'abc123';
    const password = 'abc123';
    auth.__set__({
      Auth: {
        findOne: (options, cb) => {
          expect(username).toBe(options['local.username']);
          return cb(null, result);
        }
      }
    });
    auth.load(username, password).then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should load() with error", () => {
    const message = "ERROR";
    const username = 'abc123';
    const password = 'abc123';
    auth.__set__({
      Auth: {
        findOne: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    auth.load(username, password).catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should isValid() without error", () => {
    let result = new Auth({
      local: {
        username: 'abc123'
      }
    });
    const username = 'abc123';
    auth.__set__({
      Auth: {
        findOne: (options, cb) => {
          expect(username).toBe(options['local.username']);
          return cb(null, result);
        }
      }
    });
    auth.isValid(username).then((v) => {
      expect(v).toBe(result);
    });
  });

  it("should isValid() with error", () => {
    const message = "ERROR";
    const username = 'abc123';
    auth.__set__({
      Auth: {
        findOne: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    auth.isValid(username).catch((v) => {
      expect(v).toBe(message);
    });
  });

  it("should save() without error", () => {
    const object = {
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    }
    auth.__set__({
      Auth: {
        create: (options, cb) => {
          return cb(null, options);
        }
      }
    });
    auth.save(object).then((v) => {
      expect(v.local.username).toBe(object.local.username);
      // expect(v.local.password).not.toBe(object.local.password);
    });
  });

  it("should save() with error", () => {
    const message = "ERROR";
    const object = {
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    }
    auth.__set__({
      Auth: {
        create: (options, cb) => {
          return cb(message, null);
        }
      }
    });
    auth.save(object).catch((v) => {
      expect(v).toBe(message);
    });
  });

});
