const { checkLatestUpdate, color } = require("../lib/util");

test("Check latest version function", async () => {

    const log = jest.spyOn(global.console, 'log');

    const currentVersion = '0.9';

    await checkLatestUpdate(currentVersion);
    
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/A new version is avaliable, your current version is (.*?) lates version is (.*?)/));
});

test("ANSI colors function", async () => {

    expect(color.blue('Message')).toBe('\x1b[34mMessage\x1b[0m');
});


