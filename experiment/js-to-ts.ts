const fs = require('fs');
const path = require('path');

function convertJSToTS(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dirPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively check subdirectories
          convertJSToTS(filePath);
        } else if (path.extname(file) === '.js') {
          const newFilePath = filePath.replace(/\.js$/, '.ts');
          fs.rename(filePath, newFilePath, err => {
            if (err) {
              console.error(`Error renaming file: ${err}`);
            } else {
              console.log(`Converted ${filePath} to ${newFilePath}`);
            }
          });
        }
      });
    });
  });
}

// Example usage:
const startDirectory = './'; // Replace with the path to the root directory
convertJSToTS(startDirectory);