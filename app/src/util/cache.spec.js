var rewire = require("rewire");
var cache = rewire("./cache");

describe("util/cache unit test", () => {

  it("should incremental() without error", () => {
    const host = 'abc';
    const port = 123;
    const options = {};
    cache.__set__({
      cache_host: host,
      cache_port: port,
      cache_options: options,
      redis: {
        createClient: (_port, _host, _options) => {
          expect(_port).toBe(port);
          expect(_host).toBe(host);
          expect(_options).toBe(options);
          return() => {};
        }
      }
    });

    expect(cache.instance()).toBeDefined();
  });

});
