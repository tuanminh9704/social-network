const multer = require('multer');

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
          callback(null, './public/uploads/');
        },
        filename: function (req, file, callback) {
          callback(null, file.fieldname);
        }
      });

    return storage;
}