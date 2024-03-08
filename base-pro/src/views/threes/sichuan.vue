<template>
    <ShichuanMap></ShichuanMap>
</template>

<script setup>
    import { reactive, nextTick, watchEffect, onMounted,onActivated } from "vue";
    import ShichuanMap from '@/components/threes/ShichuanMap.vue';
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';  
    onMounted(()=>{
        console.log(543)
    })
    onBeforeRouteUpdate((to,from) => {
        console.log(to)
    })


</script>

<style lang="scss" scoped>

</style>