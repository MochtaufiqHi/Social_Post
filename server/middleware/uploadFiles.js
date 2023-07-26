import multer from 'multer';

export const uploadFile = (imageField, attachmentField, pictureField) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      switch (file.fieldname) {
        case imageField:
          cb(null, "uploads/products");
          break;
        case attachmentField:
          cb(null, "uploads/transaction");
          break;
        case pictureField:
          cb(null, "uploads/picture");
          break;
        default:
          cb(new Error("Invalid fieldname"));
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  // Function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (
      file.fieldname === imageField ||
      file.fieldname === attachmentField ||
      file.fieldname === pictureField
    ) {
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
  const maxSize = sizeInMb * 1000 * 1000; //10Mb

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageField,
      maxCount: 1,
    },
    {
      name: attachmentField,
      maxCount: 1,
    },
    {
      name: pictureField,
      maxCount: 1,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size is 10Mb",
          });
        }
        console.log("Saya Error Akhir", err);
        return res.status(400).send({
          message: "Failed Akhir",
          status: err,
        });
      }
      return next();
    });
  };
};
