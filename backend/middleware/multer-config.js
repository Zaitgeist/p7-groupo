const multer = require("multer"); // on importe multer pour generer les fichiers images

const MIME_TYPES = { // on specifie les extensions de fichier acceptés
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif:": "gif",
};

const storage = multer.diskStorage({ // configuration de multer
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => { // on genere un nouveau nom à l'image recupéré 
    const fileFormat = file.mimetype.split('/');
    callback(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  },
});
// et on exporte le middleware
module.exports = multer({ storage: storage }).single("file");
