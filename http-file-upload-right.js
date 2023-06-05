const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const boundary = req.headers["content-type"]
    .split("; ")[1]
    .replace("boundary=", "");

  console.log(boundary);

  req.setEncoding("binary");
  let formData = "";
  req.on("data", (data) => {
    formData += data;
  });

  req.on("end", () => {
    // 统一对文件进行处理
    // 这里预设的文件类型是 png类型
    const imageType = "image/png";
    const imageTypePosition = formData.indexOf(imageType) + imageType.length;
    let imageData = formData.substring(imageTypePosition);

    // 过滤空格
    imageData = imageData.replace(/^\s\s*/, "");
    // 替换boundary 风格符号, 会添加 --***--
    imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));

    fs.writeFile("./foo.png", imageData, "binary", () => {
      res.end("file upload end");
    });
  });
});

server.listen(3000, () => {
  console.log("server is runing");
});
