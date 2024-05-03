const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      const pathStorage = `${__dirname}/../storage`;
      callback(null, pathStorage);
    },
    filename: function (request, file, callback) {
      //Get file extension.
      const fileExtension = file.originalname.split(".").pop();
      // new file name will be "file-UNIXTimeStamp.fileExtension"
      const fileName = `file-${Date.now()}.${fileExtension}`;
      callback(null, fileName);
    },
  });
  
  const uploadMiddleware = multer({
    storage: storage
  });

  module.exports = uploadMiddleware;