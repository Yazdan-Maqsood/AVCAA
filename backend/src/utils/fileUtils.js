import fs from 'fs';

export const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const readFileContent = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};