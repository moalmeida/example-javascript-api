var Todo = require("./todo");

describe("model/todo unit test", () => {

  it("should instanciate without error", (done) => {
    const todo = new Todo({name: 'abc123'});
    todo.validate((err) => {
      expect(err).toBeNull();
      done();
    });
  });

  it("should instanciate with errors", (done) => {
    const todo = new Todo({});
    todo.validate((err) => {
      expect(err.errors['name']).toBeDefined();
      done();
    });
  });

});
