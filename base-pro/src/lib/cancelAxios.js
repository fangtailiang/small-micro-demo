/**
 * 取消重复请求
 */
const pendingMap = new Map();

export const getPendingUrl = (config)=>{
    return JSON.stringify({
        method:config.method,
        url:config.url
    })
}
export const addPending = (config)=>{
    removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!pendingMap.has(url)) {
      // 如果当前请求不在等待中，将其添加到等待中
      pendingMap.set(url, controller);
    }
}
export const removePending = (config)=>{
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = pendingMap.get(url);
      if (abortController) {
        abortController.abort(url);
      }
      pendingMap.delete(url);
    }
}