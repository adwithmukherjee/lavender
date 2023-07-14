const Fs = require("fs");
const Path = require("path");
// -------------- end imports ----------------

class FileUtils {
  
  /**
   * Recursively steps through a directory in a synchronous, depth-first manner. Executes callback at leaf nodes.
   * @param {string} directory 
   * @param {(filePath: string) => void} callback 
   */
  static recursiveWalkDir(directory, callback) {
    Fs.readdirSync(directory).forEach((file) => {
      const path = Path.join(directory, file);
      if (Fs.lstatSync(path).isDirectory()) {
        this.recursiveWalkDir(path, callback);
      } else {
        callback(path);
      }
    });
  }

  static walkDir(directory, callback) {
    Fs.readdirSync(directory).forEach((file) => {
      const path = Path.join(directory, file);
      callback(path);
    });
  }
}

export default FileUtils;