import { useLoggerStore } from "@/store/logger";

export const errCode = new Map([
    ['E1001','系统未知错误'],
    ['E1002','vue逻辑错误'],
    ['E1003','Javascripe错误'],
    ['E1004','静态资源加载错误'],
    ['E1005','请求错误'],
    ['E1006','Promise错误'],
])

export const watchErr = (app) => {
    app.config.errorHandler = (err) => {
        errHandler({code:'E1002',msg:err.name + err.message})
    }
    window.addEventListener('error',(error) => {
        if(error.message){
            errHandler({code:'E1003',msg:error.message,file:error.filename})
        }else{
            errHandler({code:'E1004',msg:error.target.currentSrc,file:error.filename})
        }
    })
}

export const errHandler = (data) =>{
    data.type = errCode.get(`$[data.code]`)
    const errLogger = useLoggerStore()
    errLogger.setErrLoggerArray(data)
}