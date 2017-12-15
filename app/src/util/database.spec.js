var rewire = require("rewire");
var database = rewire("./database");

describe("util/database unit test", () => {

  it("expect exist", () => {
    expect(database).toBeDefined();
  });

  it("should incremental() without error", () => {
    const host = 'abc';
    const port = 123;
    const db = 'test';
    const options = {};
    database.__set__({
      nosql_host: host,
      nosql_port: port,
      nosql_db: db,
      nosql_options: options,
      mongoose: {
        connect: (_url, _options) => {
          expect(_url).toBe('mongodb://' + host + ':' + port + '/' + db);
          expect(_options).toBe(options);
          return() => {};
        }
      }
    });

    expect(database.instance()).toBeDefined();
  });

});
