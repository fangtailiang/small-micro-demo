<template>
    <div>
        <!-- <micro-app name='app1' url='http://localhost:4000/child/vue3/' baseroute='/main-vite/'></micro-app> -->
        <micro-app 
            :name='name'
            :url='url'
            baseroute='/child-react'
            :data='microAppData'
            @created='handleCreate'
            @beforemount='handleBeforeMount'
            @mounted='handleMount'
            @unmount='handleUnmount'
            @error='handleError'
            @datachange='handleDataChange'>
        </micro-app>
    </div>
</template>

<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import config from '@/config'
    
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';   

    const data = ref({name: '初始化数据'})
    const name = ref('react')
    const url = ref('http://localhost:5000/')

    const microAppData = reactive({
        msg: '来自基座的新数据'
    })


    onMounted(() => {
        console.log('dddd')
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