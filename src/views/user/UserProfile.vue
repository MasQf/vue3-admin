<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })
const formRef = ref()

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const onUpdate = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(userInfo.value)
  //只更新了后端数据,还要通过user仓库的getUser()重新获取最新的数据来更新pinia前端数据
  // const getUser = async () => {
  //   const res = await userGetInfoService()
  //   user.value = res.data.data
  // }
  await getUser()
  ElMessage.success('提交修改成功!')
}
</script>

<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onUpdate" type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
