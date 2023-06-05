const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  req.setEncoding("binary");
  const fileSize = req.headers["content-length"];
  //   console.log(fileSize);

  const ws = fs.createWriteStream("./就是干.png", { flags: "a+" });

  let currentSize = 0;
  req.on("data", (data) => {
    console.log(data);
    currentSize += data.length;
    res.write(`文件上传进度:${(currentSize / fileSize) * 100}%\n`);
    ws.write(data);
  });
  req.on("end", () => {
    ws.close();
    res.end(JSON.stringify({ code: 0, message: "upload file sucess" }));
  });
});

server.listen(3000, () => {
  console.log("server is running");
});
