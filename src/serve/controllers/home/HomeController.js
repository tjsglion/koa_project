// const Controller = require('../Controller');
import Controller from '../Controller';
import homeDao from '../../modules/home/HomeDao';

class HomeController extends Controller {
  /**
   * 继承基类控制器
   */
  constructor() {
    super();
  }

  async actionHome (ctx) {
    console.log('调用了homeControll ===>>>>');
    ctx.body = await ctx.render('index', {
      locals: {
        activeKey: 'home',
        data: {
          arrs: ['aa', 'bb', 'cc']
        }
      }
    })
  }
}

// module.exports = new HomeController();
export default new HomeController();