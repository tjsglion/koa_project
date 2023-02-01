class ErrorHandler {

  static error (app, logger) {

    console.log('logger=>>>', logger);
    // 500 异常处理
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.body = '500错误页~~'
      }
    })

    app.use(async (ctx, next) => {

      await next();
      
      if (ctx.status === 404) {
        ctx.body = `<script src="https://volunteer.cdn-go.cn/404/latest/404.js"></script>`;
      }
    })
  }
}

// module.exports = ErrorHandler;
export default ErrorHandler;