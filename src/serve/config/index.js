// const path = require('path');
import path from "path";

let config = {
  viewDir: path.join(__dirname, "../../", "web/views"), // 视图的根路径
  staticDir: path.join(__dirname, "../../", "web"), // 静态资源根路径
  cache: false, // 是否需要缓存页面，开始环境需要实时更新， 生产环境需要缓存
  baseUrl: "", // 请求 url
};

if (false) {
  console.log("这段代码是不会执行的~~~~");
}

const env = process.env.NODE_ENV;

console.log("当前的环境===>>>", env);
if (env === "development") {
  config = Object.assign({}, config, {
    port: 3333,
    baseUrl: "http://school-abc.lianwuzizai.com/api/acc-campus-operation",
  });
} else {
  config = Object.assign({}, config, {
    port: 3333,
    cache: "memory",
    baseUrl: "http://campus.lianwuzizai.com/api/acc-campus-operation",
  });
}

export default config;
// module.exports = config;
