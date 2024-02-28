<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="20">
                    
                </el-col>
                <el-col :span="2">
                    <el-dropdown>
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                            <el-icon class="el-icon--right" />
                        </el-avatar>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
              </el-row>
        </el-header>
        <el-container>
          <AsideIndex/>
          <el-main>
            <router-view v-slot="{ Component }">
                <keep-alive>
                  <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.name" />
                </keep-alive>
                <component v-if="!$route.meta?.keepAlive" :is="Component" :key="$route.name" />
              </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import router from "@/router/router";
import { logout } from '../../api/login/login';
import { removeStore } from "../../util/storeUtil"
import AsideIndex from './aside-index.vue';
defineOptions({
    name:'Layout'
})
 const userInfo = reactive({
    username:'测试'
 })
 const handleLogout = ()=>{
    logout().then(res=>{
        if(res.code == 200){
            removeStore({name:'token',type:'session'})
            ElMessage({
                message: '退出成功',
                type: 'success',
            })
            router.push({name:'login'})
        }
    })
 }


</script>

<style lang="scss" scoped>
.el-container,.el-aside{
    height: calc(100vh - 60px);
}
</style>