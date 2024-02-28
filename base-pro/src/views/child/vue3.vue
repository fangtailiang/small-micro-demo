<template>
    <div>
        <micro-app name='app1' url='http://localhost:4000/child/vue3/' baseroute='/main-vite/'></micro-app>
        <!-- <micro-app 
            name='appname-vue3'
            :url='url'
            baseroute='/main-vite/'
            :data='microAppData'
            @created='handleCreate'
            @beforemount='handleBeforeMount'
            @mounted='handleMount'
            @unmount='handleUnmount'
            @error='handleError'
            @datachange='handleDataChange'>
        </micro-app> -->
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import config from '@/config'
    const url = ref(`${config.vue3}/child/vue3/`);

    const microAppData = reactive({
        msg: '来自基座的新数据'
    })
    

    const handleCreate = ()=>{

    }
    const handleBeforeMount = ()=>{

    }
    const handleMount = ()=>{

    }
    const handleUnmount = ()=>{

    }
    const handleError = ()=>{

    }
    const handleDataChange = (e)=>{

    }


</script>

<style lang="scss" scoped>

</style>