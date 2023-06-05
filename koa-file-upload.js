const Koa = require("koa");
const KoaRuter = require("@koa/router");
const multer = require("@koa/multer");
const uploadRouter = new KoaRuter({
  prefix: "/upload",
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 注意这个地方得有对应的文件夹
      cb(null, "./uploads");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
const app = new Koa();

uploadRouter.post("/", upload.single("photo"), (ctx, next) => {
  console.log(ctx.request.file);
  ctx.body = "avator upload  sucess";
});

app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());

app.listen(3000, () => {
  console.log("server is runing");
});
