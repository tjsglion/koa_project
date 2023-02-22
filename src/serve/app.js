import Koa from "koa";
import co from "co";
import render from "koa-swig";
import staticServe from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import log4js from "log4js";
import config from "./config";
import initRouter from "./controllers";
import ErrorHandler from "./middlewares/errorHandler";

const app = new Koa();

// 整合swig模板引擎
app.context.render = co.wrap(
  render({
    root: config.viewDir,
    cache: config.cache,
  })
);

// 引入 log4js 日志记录
log4js.configure({
  appenders: { error: { type: "file", filename: "./logs/error.log" } },
  categories: { default: { appenders: ["error"], level: "error" } },
});

const logger = log4js.getLogger("error");
ErrorHandler.error(app, logger);

// 初始化中间件
app.use(staticServe(config.staticDir));
app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));

// 初始化路由, 处理请求
initRouter(app);

// 启动服务
app.listen(config.port, () => {
  console.log(`启动11 http://localhost:${config.port} 服务成功~~~`);
});
