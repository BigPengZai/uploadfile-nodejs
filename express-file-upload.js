const express = require("express");

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./uploads");
    },
    filename(req, file, callback) {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

const app = express();
// 单文件上传
app.post("/upload", upload.single("photo"), (req, res, next) => {
  console.log(req.file);
  res.end("upload file sucess");
});

app.listen(3000, () => {
  console.log("server is runing");
});
