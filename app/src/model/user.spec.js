var User = require("./user");

describe("model/user unit test", () => {

  it("should instanciate without error", (done) => {
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

  it("should instanciate with errors", (done) => {
    const user = new User({});
    user.validate((err) => {
      expect(err.errors['local.username']).toBeDefined();
      expect(err.errors['local.password']).toBeDefined();
      done();
    });
  });

  it("should generateHash()", () => {
    const user = new User({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    expect(user.generateHash(user.local.password).length).toBe(60);
  });

  it("should validPassword()", () => {
    const passwordHash = "$2a$10$QkDjn.Jn0FojgBj0IItM/uFCL6JM8SrstBgzoSZzD1oHDlWm3627W";
    const user = new User({
      local: {
        username: 'abc123',
        password: 'abc123'
      }
    });
    expect(user.validPassword(user.local.password, passwordHash)).toBe(true);
  });

});

// userSchema.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// userSchema.methods.validPassword = (arg0, arg1) => {
//   return bcrypt.compareSync(arg0, arg1);
// };

// describe("model/user unit test", () => {
// });
