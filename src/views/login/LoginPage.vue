<script setup>
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ref, reactive, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
// import { useRouter } from 'vue-router'
import router from '@/router'

const isRegister = ref(false)
//表单实例
const form = ref()
//注册数据
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const validateRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== formModel.value.password) {
    callback(new Error("inputs don't match!"))
  } else {
    callback()
  }
}
// 注册规则
const rules = reactive({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '密码需由6-10位非空字符组成',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '密码需由6-10位非空字符组成',
      trigger: 'blur'
    },
    {
      validator: validateRePassword,
      trigger: 'blur'
    }
  ]
})
//预校验
// 点击注册按钮后对整个注册表单内容进行验证,接收一个回调函数或返回Promise
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('Registered successfully! The login page is displayed')
  isRegister.value = false
}

const userStore = useUserStore()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token) //登录返回的token存入到pinia
  ElMessage.success('Login successfully')
  router.push('/')
}
//点击注册或登录按钮转换界面要重置formModel
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Key"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>

        <el-form-item class="flex">
          我有账号了&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link type="info" :underline="false" @click="isRegister = false">
            <el-button>登录</el-button>
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>

        <el-form-item class="flex">
          我还没账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link type="info" :underline="false" @click="isRegister = true">
            <el-button>注册</el-button>
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  // .bg {
  //   background:
  //     url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
  //     url('@/assets/login_bg.jpg') no-repeat center / cover;
  //   border-radius: 0 20px 20px 0;
  // }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
