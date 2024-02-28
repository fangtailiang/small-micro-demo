import { defineStore } from 'pinia';
import { dateFormat } from '@/util/timeUtils';
import { setStore, getStore } from "@/util/storeUtil"

export const useLoggerStore = defineStore('logger',{
    state: () => {
        return {
            errLoggerArray: getStore({name:'err-log'}) || [],
            behaviorLoggerArray: getStore({name:'behavior-log'}) || []
        }
    },
    getters: {},
    actions: {
        setErrLoggerArray(data){
            this.errLoggerArray.unshift({
                ...data,
                newPage: window.location.hash,            
                time: dateFormat(new Date())
            })
            if(this.errLoggerArray.length>50){
                this.errLoggerArray = this.errLoggerArray.slice(0,this.errLoggerArray.length - 1)
            }
            setStore({name: 'err-log',content: this.errLoggerArray})
        },
        setBehaviorLoggerArray(data){
            this.behaviorLoggerArray.unshift({
                ...data,
                newPage: window.location.hash || window.location.pathname,
                time: dateFormat(new Date())
            })
            if(this.behaviorLoggerArray.length>50){
                this.behaviorLoggerArray = this.behaviorLoggerArray.slice(0,this.behaviorLoggerArray.length - 1)
            }
            setStore({name: 'behavior-log',content: this.behaviorLoggerArray})
        }
    }
})