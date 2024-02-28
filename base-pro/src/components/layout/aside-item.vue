<template>
    <div v-for="(item,index) in props.menu" :key="index" >
        <el-menu-item :index='item.path' v-if="!item.childrens">
            <!-- <el-icon><icon-menu /></el-icon> -->
            <span>{{item.name}}</span>
        </el-menu-item>
        <el-sub-menu :index='item.path' v-else>
            <template #title>
                <!-- <el-icon><location /></el-icon> -->
                <span>{{ item.name }}</span>
            </template>
            <AsideItem
            :menu='item.childrens'
            />
        </el-sub-menu>
    </div>

  </template>


  <script setup>
    defineOptions({ 
        name: 'AsideItem',
    })


  const props = defineProps(["menu"]);


  </script>
  
  <style>

  </style>
  