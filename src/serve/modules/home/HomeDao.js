import safeRequest from '../../utils/SafeRequest';

class HomeDao {

  async login (params) {
    console.log('提交的参数==>>>', params)
    const data = await safeRequest.fetch('/api/opUser/login', {
      method: 'POST',
      data: params
    });
    console.log('获取的data=>>>', data)
    return data;
  }
};

export default new HomeDao();