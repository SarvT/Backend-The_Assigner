import multer from "multer";

const capitalize = (str) => {
  if (!str) {
    return "NA";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const size = 1 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      capitalize(req.body.firstName) +
        capitalize(req.body.lastName) +
        "_" +
        Date.now()+".pdf"
    );
  },
});

export const upload = multer({ storage: storage, limits: { fileSize: size } });
