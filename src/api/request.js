import axios from "axios";
import { Toast } from "vant";

/* 防止重复提交，利用axios的cancelToken */
let pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;

const removePending = (config, f) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f("取消重复请求"); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl);
    }
  }
};

/* 创建axios实例 */
const service = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: process.env.VUE_APP_BATH_API_URL
});

/* request拦截器 */
service.interceptors.request.use(
  config => {
    // neverCancel 配置项，允许多个请求
    if (!config.cancelLoading) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
    }
    if (config.neverCancel) {
      // 生成cancelToken
      config.cancelToken = new CancelToken(c => {
        removePending(config, c);
      });
    }
    // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
    if (window.localStorage.getItem("storage_token")) {
      config.headers.token = window.localStorage.getItem("storage_token");
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
    Toast.clear();
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 500) {
        Toast.fail("服务端请求错误");
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    Toast.clear();
    pending = [];
    if (error.message === "取消重复请求") {
      return Promise.reject(error);
    }
    if (error.message === "Request failed with status code 401") {
      window.localStorage.removeItem("storage_userid");
      window.localStorage.removeItem("storage_phone");
      window.localStorage.removeItem("storage_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default service;
