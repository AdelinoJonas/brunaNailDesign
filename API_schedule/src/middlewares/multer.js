const multerModule = require('multer');
const { randomBytes } = require("crypto");

const diskStorageConfig = {
  destination: function (req, file, destinationCallback) {
    destinationCallback(null, 'uploadFiles/');
  },
  filename: function (req, file, filenameCallback) {
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = randomBytes(64).toString('hex');
    filenameCallback(null, `${newFileName}.${fileExtension}`);
  }
};

function fileFilterFunction(req, file, filterCallback) {
  const allowedExtensions = ['png', 'jpg', 'gif', 'jpeg'];
  const fileExtension = file.originalname.split('.').pop();
  if (!allowedExtensions.includes(fileExtension)) {
    return filterCallback(new Error('Apenas imagens são permitidas!'));
  }
  filterCallback(null, true);
}

const multerUploader = multerModule({ storage: diskStorageConfig, fileFilter: fileFilterFunction });

module.exports = { multerUploader };