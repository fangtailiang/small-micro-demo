<template>
    <div class="login-wrap">
        <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号：" prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { login } from '@/api/login/login';
  import router from "@/router/router";
  import { setStore } from '@/util/storeUtil'
 
    const ruleFormRef = ref(null)
    const ruleForm = reactive({
        username: "",
        password: "",
    });
    
    const rules = reactive({
        username: [
        { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
        { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    });
    
    const submitForm = async () => {
        if (!ruleFormRef) return;
        ruleFormRef.value.validate((valid) => {
            if (valid) {
                loginHandle();
            } else {
            return false;
            }
        });
    };

  const loginHandle = ()=>{
    login(ruleFormRef.value).then(res=>{
        if(res.code == 200){
            setStore({name:'token',content:res.data.token,type:'session'});
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            router.push({name:'home'})
        }
        
        
    })
  }
  
</script>

<style lang="scss" scoped>
    .login-wrap{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .demo-ruleForm{
        width: 400px;
    }
</style>