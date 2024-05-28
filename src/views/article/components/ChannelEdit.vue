<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'

const formRef = ref()
//获取用户在form中输入的内容 <el-form :model="formModel" :rules="rules">
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称需为1-10位非空字符组成',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名需为1-16位字母或数字组成',
      trigger: 'blur'
    }
  ]
}

const emit = defineEmits(['success']) //子传父,通知父组件刷新页面getChannelList()
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success') //子传父,通知父组件刷新页面getChannelList()
}

const dialogVisible = ref(false)
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({
  open
})
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="formModel.id ? '编辑分类' : '添加分类'"
      width="500"
    >
      <el-form :model="formModel" :rules="rules" ref="formRef">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="formModel.cate_name"
            placeholder="分类名称是..."
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="formModel.cate_alias"
            placeholder="分类别名是..."
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
