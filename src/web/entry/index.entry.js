import banner from '../components/banner/banner.js';

class Index {

  constructor () {
    console.log('index pages js');

    banner.init();
  }
}

export default new Index();