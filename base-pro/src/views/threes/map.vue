<template>
    <div>
        <div @click='handleClick'>
            地图
        </div>
        <router-view v-slot="{ Component }">
            <keep-alive v-if="$route.meta.keepAlive">
                <component :is="Component" />
            </keep-alive>
            <component v-else :is="Component" />
        </router-view>
    </div>
</template>

<script setup>
    import { reactive, nextTick, watchEffect, onMounted,onActivated } from "vue";
    import { onBeforeRouteLeave, onBeforeRouteUpdate,useRouter } from 'vue-router';  
    const router = useRouter();
    let keyId = 1;
    const handleClick = () => {
        keyId++;
        router.push("/threeMap/map/"+ keyId)
    }
    onBeforeRouteUpdate((to,from) => {
        console.log(to,from)
    })


</script>

<style lang="scss" scoped>

</style>