const fs = require('fs');
const path = require('path');

async function copyFileToSubdirectories(sourceFilePath, targetDir) {
  try {
    if (!fs.existsSync(sourceFilePath)) {
      console.error(`Source file does not exist: ${sourceFilePath}`);
      return;
    }

    const directories = await getDirectories(targetDir);

    for (const dir of directories) {
      const newFileName = `${path.basename(dir)}.type.ts`;
      const destinationPath = path.join(dir, newFileName);

      copyFileSync(sourceFilePath, destinationPath);
      console.log(`Copied to ${destinationPath}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function copyFileSync(src, dest) {
  try {
    fs.copyFileSync(src, dest);
  } catch (err) {
    console.error(`Error copying file from ${src} to ${dest}:`, err);
  }
}

async function getDirectories(dirPath) {
  const result = [];

  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      if (item.isDirectory()) {
        result.push(fullPath);
        const subDirs = await getDirectories(fullPath);
        result.push(...subDirs);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }

  return result;
}

const sourceFilePath = path.join(__dirname, "../../experiments/copy-type-file-to-all-module/unit.type.ts");
const targetDir = path.join(__dirname, "../../../modules")

copyFileToSubdirectories(sourceFilePath, targetDir);
