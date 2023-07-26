import multer from "multer";

export const uploadPhoto = (photoField) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === photoField) {
        cb(null, "uploads/photo");
      } else {
        cb(new Error("Invalid fieldname"));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === photoField) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|git|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000; // 10Mb

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(photoField); // Use .single() to handle a single file for the "photo" field

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.file && !err) {
        return res.status(400).send({
          message: "Please select a photo to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size is 10Mb",
          });
        }
        console.log("Upload failed", err);
        return res.status(400).send({
          message: "File upload failed",
          status: err,
        });
      }
      return next();
    });
  };
};
