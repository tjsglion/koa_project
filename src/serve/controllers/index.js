// const Router = require('@koa/router');
// const homeController = require('./home/HomeController');
import Router from '@koa/router';
import homeController from './home/HomeController';

const router = new Router();

function initRouter (app) {

  router.get('/', homeController.actionHome);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

// module.exports = initRouter;
export default initRouter;