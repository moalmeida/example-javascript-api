
let Auth = require("./auth");

describe("model/auth unit test", () => {

  it("should get new model without error", (done) => {
    const auth = new Auth({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    auth.validate((err) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("should get new model with errors", (done) => {
    const auth = new Auth({});
    auth.validate((err) => {
      expect(err.errors['local.username']).toBeDefined();
      expect(err.errors['local.password']).toBeDefined();
      done();
    });
  });

  // it("should generateHash() with success", () => {
  //   const auth = new Auth({
  //     local: {
  //       username: 'abc123',
  //       password: 'abc123'
  //     }
  //   });
  //   const passwordHash = auth.generateHash(auth.local.password);
  //
  //   expect(passwordHash.length).toBe(60);
  // });

  // it("should validPassword() with success", () => {
  //   const passwordHash = "$2a$10$QkDjn.Jn0FojgBj0IItM/uFCL6JM8SrstBgzoSZzD1oHDlWm3627W";
  //   const auth = new Auth({
  //     local: {
  //       username: 'abc123',
  //       password: 'abc123'
  //     }
  //   });
  //   const isValid = auth.validPassword(auth.local.password, passwordHash);
  //
  //   expect(isValid).toBe(true);
  // });

});
