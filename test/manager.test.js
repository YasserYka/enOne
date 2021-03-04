const manager = require("../lib/manager");

test("Load all plugins function", async () => {

    manager.load();

    manager.plugins.forEach(plugin => {
        
        expect(plugin).toMatchSnapshot({
            name: expect.any(String),
            config: expect.any(Object),
            object: expect.any(Object)
        });
    });
});

test("List local plugins", () => {

    const pluginNames = manager.listLocal();

    expect(pluginNames).not.toHaveLength(0);
});

test("List remote plugins", () => {

    const pluginNames = manager.listRemote();

    expect(pluginNames).not.toHaveLength(0);
});