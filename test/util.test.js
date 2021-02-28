const { checkLatestUpdate } = require("../lib/util");

test("Check latest version function", async () => {

    const log = jest.spyOn(global.console, 'log');

    await checkLatestUpdate('0.9');
    
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/A new version is avaliable, your current version is (.*?) lates version is (.*?)/));
    
});

