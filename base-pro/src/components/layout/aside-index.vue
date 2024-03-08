<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="handleSelect"
          >
          <AsideItem
            :menu='items'
          />
              
          </el-menu>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import router from "@/router/router";
  import AsideItem from './aside-item.vue';
  import {getMenus} from "@/api/home/home"

  defineOptions({
    name:'AsideIndex'
  })

  let keyId = 0;
  const items = ref([]);
  
  const isCollapse = ref(false)

  const handleSelect = (key) => {
    router.push({path:key})
  }
  
  onMounted(() => {
    getMenusfn()
  })
  const getMenusfn = () => {
    getMenus().then(res=>{
        items.value = res.data.list;

    })
  }
  </script>
  
  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  </style>
  