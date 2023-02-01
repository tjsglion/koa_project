import axios from 'axios';
import config from '../config';

// 创建实例时配置默认值
// const instance = axios.create({
//   baseUrl: config.baseUrl,
//   timeout: 1000,
//   header: {
//     lang: 'zh_CN'
//   }
// });
const responseInfo = {
  code: 0,
  message: '',
  data: null
}

// 全局axios默认值 start
// 指定请求的 url
axios.defaults.baseURL = config.baseUrl;

// 全局配置请求头信息
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
// TODO
// axios.defaults.headers.common['Authorization'] = ``;
axios.defaults.headers.common['lang'] = 'zh_CN';
// axios.defaults.headers.common['t']

// 全局axios默认值 end

// 响应拦截器
axios.interceptors.response.use(function (response) {
  const {data} = response;
  return Promise.resolve(Object.assign({}, responseInfo, {data: data.data}));
}, function (err) {
  return Promise.resolve(Object.assign({}, responseInfo, {
    code: -1,
    message: err?.info ?? ''
  }));
})
class SafeRequest {
  static fetch (url, opts) {
    console.log('url===>>>', url);
    console.log('opts ===>>>>', opts);
    return axios(url, opts).then(res => res);
  }
}

export default SafeRequest;