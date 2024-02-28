import cryptoJs from 'crypto-js'

let keyOne = '4321ABCDWXYZ6789'
let ivOne = 'ABC1357924680XYZ';

//解密方法
export function Decrypt (word) {
  let key = cryptoJs.enc.Hex.parse(keyOne)
  let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
    vi: ivOne,
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  })
  return cryptoJs.enc.Utf8.stringify(dec)
}

//加密方法
export function Encrypt (word) {
  let key = cryptoJs.enc.Hex.parse(keyOne)
  let enc = ''
  if (typeof word === 'string') {
    enc = cryptoJs.AES.encrypt(word, key, {
      iv: ivOne,
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    })
  } else if (typeof word === 'object') {
    let data = JSON.stringify(word)
    enc = cryptoJs.AES.encrypt(data, key, {
      iv: ivOne,
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    })
  }
  return enc.ciphertext.toString()
}


/**
 *加密处理
 */
export const encryption = (params) => {
  let {data, type, param, key} = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = cryptoJs.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = cryptoJs.AES.encrypt(
          data,
          key, {
            iv: iv,
            mode: cryptoJs.mode.CBC,
            padding: cryptoJs.pad.ZeroPadding
          })
      result[ele] = encrypted.toString()
    })
  }
  return result
}
