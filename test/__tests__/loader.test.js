const { loadAllPlugins, loadPlugin } = require("../../lib/loader");
const { resolve } = require("path");

jest.mock('fs');

test("loadAll plugins function", async () => {

    const plugins = loadAllPlugins();

    expect(plugins).not.toHaveLength(0); 

});

describe("Load plugin function", () => {

    test("Successfully load existing plugin", () => {

        jest.mock(resolve(__dirname + '/../../enOne-plugins/plugins/testPlugin/config.json'), () => ({author:"AuthorName", verion:"1.0"}), { virtual: true });

        jest.mock(resolve(__dirname + '/../../output/compiled/testPlugin.js'), () => {

            return class testPlugin {
                async initialize() {}
                async render() {return "<div class=\"card text-center\" style=\"padding: 2rem;\"><h1 id=\"clock\">11:43 PM</h1><h4 id=\"day\">Tuesday</h4><h6 id=\"date\">Mar 25</h6></div>"}
                async script() {}   
            }
        }, { virtual: true });

        // for mocking existsSync purpose
        require('fs').__setMockedFiles({
            [resolve(__dirname + '/../../output/compiled/testPlugin.js')]: true,
            [resolve(__dirname + '/../../enOne-plugins/plugins/testPlugin/config.json')]: true,
        });
       
        const plugin = loadPlugin("testPlugin");
        
        expect(plugin.constructor.name).toBe("Plugin");
        expect(plugin.object.constructor.name).toBe("testPlugin");
        expect(plugin.name).toBe("testPlugin");
        expect(plugin.config).toMatchObject({author:"AuthorName", verion:"1.0"});

    });
    
});