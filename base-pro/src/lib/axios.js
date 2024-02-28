import axios from "axios"
import { baseURL } from "@/lib/config"  //引入lib/config.js
import router from "@/router/router";
import encryptApi from "@/util/encryptApiConfig.js"
import excludeApi from "@/util/excludeApiConfig.js"
import errorCode from "@/util/errorCode.js"
import { encryption,decryption } from "@/util/AESUtil.js"
import { TimeoutSpecialApis } from "./specialApiConstant.js";
import { addPending , removePending} from "./cancelAxios";
import { getStore } from '@/util/storeUtil';
import { useLoggerStore } from "@/store/logger";

const service = axios.create({
  baseURL: baseURL,
  timeout: 20000
})

const env = import.meta.env.VITE_PROJECT_ENV
let resNum = 0

function startLoading(timeout) {
  if (resNum === 0) {
    // Toast.loading("Loading...", {
    //   id: 'loading',
    //   cover: true,
    //   duration: timeout
    // });
  }
  resNum++
}
function endLoading() {
  if (resNum < 0) return
  resNum--
  if (resNum === 0) {
    // Toast.hide("loading");
  }
}
service.interceptors.request.use(config => {
    addPending(config)
    if(encryptApi.includes(config.url)){
        (config.headers || {})['X-H-Request-Encrypt'] = "3.0";
    }
    const isExist = TimeoutSpecialApis.findIndex(v=>config.url.indexOf(v)>-1);
    if (isExist>-1) {
        config.timeout = 60000;
    }
    if (config.headers && config.headers.defHeader && config.headers['TENANT-ID']) {
        //不处理租户ID
    } else {
        let tenantId = getStore({name:'tenantId'});
        if (tenantId) {
        config.headers['TENANT-ID'] = tenantId
        }
    }
    let token = getStore({name:'token'})
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    //有请求则添加全局的请求loading
    if (!config.hideLoading && !config.data?.noLoading) {
        startLoading(config.timeout)
    }
    // 参数加密
    if((config.headers || {})['X-H-Request-Encrypt'] === '3.0'){
        if(config.method.toLocaleLowerCase() === 'post' && config.data){
            config.data = encryption(config.data);
        }
        if(config.method.toLocaleLowerCase() === 'get' && config.params){
            config.params = encryption(config.params);
        }
    }
    const behaviorLog = useLoggerStore();
    behaviorLog.setBehaviorLoggerArray({
        title:'接口请求',
        ...config
    })
    return config;
}, error => {
//   Toast.hide();
//   Toast.warn(`温馨提示:${error}`);
//   return Promise.reject(error)
})

service.interceptors.response.use(res => {
    endLoading()
    //删除队列请求
    removePending(res.config)
    localStorage.setItem('lastTime', new Date().getTime())
    const status = Number(res.status) || 200
    let message = res.data.msg || errorCode(status) || errorCode('default')
    if (status === 401) {
        // Dialog({
        //   title: "温馨提示",
        //   content: message,
        //   noCancelBtn: true,
        //   onOk
        // });
        return
    }
    let ignoreError = false
    try {
        const data = JSON.parse(res.config.data || '{}')
        ignoreError = data.ignoreError
    } catch (error) {
        ignoreError = false
    }
    if ((status !== 200 || res.data.code === 1) && !excludeApi.includes(res.config.url)) {
        //增加不弹出Toast参数
        !ignoreError ;
        return Promise.reject(new Error(message))
    }
    //返回成功即code为0且data不为空时，解密返回参数
    if(res.data && res.status === 200){
        let contentEncrypt = res.headers['X-H-Content-Encrypt'] || res.headers['x-h-content-encrypt'];
        if(contentEncrypt === '3.0'){
        if(res.data.code === 0 && res.data.data){
            res.data.data = decryption(res.data.data);
        }
        if(!res.data.code && !res.data.data){
            res.data = decryption(res.data);
        }
        }
    }
    const behaviorLog = useLoggerStore();
    behaviorLog.setBehaviorLoggerArray({
        title:'接口响应',
        ...res.data
    })
    return res.data;
}, error => {
    removePending(error.config)
    const status = Number(error?.response?.status) || 200
    let message = error?.response?.data?.msg || errorCode(status) || errorCode('default')
    if ([400, 401].includes(status)) {
        // Toast.warn(`温馨提示:${message}`);
    }
    if (status === 500) {
        // Toast.warn(message, {
        //   duration: 1000
        // });
    }
    return Promise.reject(error);
})
//导出类
export default service
