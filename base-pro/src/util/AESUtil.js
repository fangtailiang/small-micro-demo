import * as CryptoJS from 'crypto-js'
import { getMySecretKey } from "./util.js";
// const aesKey = "be671bcc48dcd91c";
const aesKey = getMySecretKey(process.env.MY_SECRET_KEY);

const cjsAesDept = (strs,key,option)=>{
  return CryptoJS.AES.decrypt(strs, key, option);
}

const cjsAesEcpt = (strs,key,option)=>{
  return CryptoJS.AES.encrypt(strs, key, option);
}
/**
 * 解密 指定key
 * @author shaochj
 * @DateTime 2023-03-09
 */
export const decryption = (strs) =>{
  // 返回的是一个解密后的对象
  const decrypted = cjsAesDept(strs, CryptoJS.enc.Utf8.parse(aesKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  // 将解密对象转换成 UTF8 的字符串
  let resultDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
  if((resultDecrypted.indexOf("{")>-1 && resultDecrypted.indexOf("}")>-1) 
    || (resultDecrypted.indexOf("[")>-1 && resultDecrypted.indexOf("]")>-1)){
    resultDecrypted = JSON.parse(resultDecrypted)
  }
  return resultDecrypted;
}

/**
 * 加密处理
 * @author shaochj
 * @DateTime 2023-03-09
 */
export const encryption = (data) => {
  const resultData = JSON.stringify(data);
  let result = {
  	"encData": ""
  };
  let key = aesKey;
	key = CryptoJS.enc.Utf8.parse(key);
	let iv = key;
	// 加密
	let encrypted = cjsAesEcpt(
      resultData,
      key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
  );
	result.encData = encrypted.toString();
  return result
}