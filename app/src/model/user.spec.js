var User = require("./user");

describe("model/user unit test", () => {

  it("should get new model without error", (done) => {
    const user = new User({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    user.validate((err) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("should get new model with errors", (done) => {
    const user = new User({});
    user.validate((err) => {
      expect(err.errors['local.username']).toBeDefined();
      expect(err.errors['local.password']).toBeDefined();
      done();
    });
  });

  it("should generateHash() with success", () => {
    const user = new User({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    const passwordHash = user.generateHash(user.local.password);

    expect(passwordHash.length).toBe(60);
  });

  it("should validPassword() with success", () => {
    const passwordHash = "$2a$10$QkDjn.Jn0FojgBj0IItM/uFCL6JM8SrstBgzoSZzD1oHDlWm3627W";
    const user = new User({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    const isValid = user.validPassword(user.local.password, passwordHash);

    expect(isValid).toBe(true);
  });

});
