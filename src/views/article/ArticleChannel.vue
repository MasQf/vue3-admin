<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const loading = ref(false)
const channelList = ref([])
// 创建了一个响应式引用 dialog。这个引用本身是一个对象，
//它有一个 value 属性，你可以通过这个 value 属性来访问或修改引用的值。
//在这里，dialog 引用将被用来存储对 <channel-edit> 子组件的引用。
//(下面的<channel-edit ref="dialog"></channel-edit>)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  loading.value = false
  channelList.value = res.data.data
}
getChannelList()

const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('确认删除改分类吗?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  await artDelChannelService(row.id)
  getChannelList()
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <div>
    <!-- components文件夹下的PageContainer.vue -->
    <page-container title="文章分类">
      <template #extra>
        <el-button @click="onAddChannel()" type="primary">添加分类</el-button>
      </template>
      <!-- 通过默认插槽,表格渲染数据 -->
      <el-table
        :data="channelList"
        style="width: 100%"
        height="100%"
        v-loading="loading"
        stripe
      >
        <el-table-column type="index" label="序号" width="150px" />
        <el-table-column prop="cate_name" label="分类名称" width="200px" />
        <el-table-column prop="cate_alias" label="分类别名" />
        <el-table-column label="Operations">
          <!-- 自定义列表 -->
          <template #default="{ row, $index }">
            <el-button
              size="small"
              @click="onEditChannel(row, $index)"
              type="primary"
              :icon="Edit"
              circle
            >
            </el-button>

            <el-button
              size="small"
              type="danger"
              @click="onDeleteChannel(row, $index)"
              :icon="Delete"
              circle
            >
            </el-button>
          </template>
        </el-table-column>

        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>
      <!-- 
        通过 ref="dialog" 将这个组件的引用绑定到上面创建的 dialog 响应式引用上.
        dialog.value 来访问 <channel-edit> 组件的实例，
        从而调用其方法、访问其属性等。 -->
      <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </page-container>
  </div>
</template>

<style scoped></style>
