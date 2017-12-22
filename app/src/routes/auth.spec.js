var Promise = require("bluebird");
var rewire = require("rewire");
var auth = rewire("./auth");

describe("routes/auth unit test", () => {

  it("should signup() without error", () => {
    const result = {
      usename: 'abc123'
    };
    const req = {
      body: {
        username: 'abc123',
        password: 'abc123'
      }
    };
    const res = {
      status: (res) => {
        expect(res).toBe(201);
        return;
      },
      json: (res) => {
        expect(res).toBe(result);
        return;
      }
    };
    const next = () => {};
    auth.__set__({
      User: {
        save: (username, password) => {
          expect(username).toBe(req.body.username);
          expect(password).toBe(req.body.password);
          return new Promise((resolve) => {
            resolve(result);
          })
        }
      }
    });
    auth.signup(req, res, next);
  });

  it("should authenticate() without error", () => {
    const result = {
      usename: 'abc123'
    };
    const req = {
      body: {
        username: 'abc123',
        password: 'abc123'
      }
    };
    const res = {
      status: (res) => {
        expect(res).toBe(201);
        return;
      },
      json: (res) => {
        expect(res).toBe(result);
        return;
      }
    };
    const next = () => {};
    auth.__set__({
      User: {
        load: (username, password) => {
          expect(username).toBe(req.body.username);
          expect(password).toBe(req.body.password);
          return new Promise((resolve) => {
            resolve(result);
          })
        }
      }
    });
    auth.authenticate(req, res, next);
  });

});
