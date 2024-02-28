
export const debounceFn = (fn, limit = 300) => {
    let timer= null
    let result = null
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = window.setTimeout(() => {
        result = fn(...args)
      }, limit)
      return result
    }
  }