const manager = require("../lib/manager");

test("Load all plugins function", async () => {

    manager.load();

    console.log(manager.plugins);

    expect(manager.plugins).not.toHaveLength(0);

});
