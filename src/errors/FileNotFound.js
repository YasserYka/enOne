module.exports = class FileNotFound extends Error {
    constructor(filepath) {

        super("file not found " + filepath);
    }
}