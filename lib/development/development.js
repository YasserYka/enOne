const fs = require("fs");
const { resolve } = require("path");

(() => {
    const args = process.argv.slice(2);

    if (args == 0)
        throw new Error("Please enter filename as argument")

    const filename = args[0];
    const filepath = resolve(__dirname + `/../../output/${filename}`);

    if (!fs.existsSync(filepath))
        throw new Error(`Can't find file with name ${filename} at ${filepath}`)

})();