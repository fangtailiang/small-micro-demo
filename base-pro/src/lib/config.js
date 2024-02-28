//请求地址路径
const env = import.meta.env.VITE_PROJECT_ENV
let resultUrl = ''
switch (env) {
  case 'uat':
    resultUrl = '/test'
    break
  case 'sit':
    resultUrl = '/sit'
    break
  default:
    resultUrl = '/'
}
export const baseURL = resultUrl;
export const baseURLYg = baseURL + '/yg'
