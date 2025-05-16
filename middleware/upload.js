const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname;
    cb(null, safe);
  }
});
module.exports = multer({ storage });
