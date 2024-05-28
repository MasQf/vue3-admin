<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { ref } from 'vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'

// 请求获取文章列表的对象参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const artList = ref([])
const total = ref(0) //总条数
const loading = ref(false)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  artList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

const handleSizeChange = (size) => {
  params.value.pagesize = size
  getArticleList()
}
const handleCurrentChange = (current) => {
  params.value.pagenum = current
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleRef = ref()
// 添加\编辑\删除文章
const onAddArticle = () => {
  articleRef.value.open({})
}
const onEditArticle = (row) => {
  articleRef.value.open(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}

//type=[edit,add],编辑或添加成功
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <div>
    <page-container title="文章管理">
      <template #extra>
        <el-button @click="onAddArticle" type="primary">添加文章</el-button>
      </template>
      <!-- 表单 -->
      <el-form inline>
        <el-form-item label="文章分类">
          <channel-select
            v-model="params.cate_id"
            style="width: 240px"
          ></channel-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="params.state" style="width: 240px">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSearch" type="primary">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="artList" v-loading="loading" stripe>
        <el-table-column label="文章标题" prop="title">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发布时间" prop="pub_date">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              :icon="Edit"
              circle
              type="primary"
              @click="onEditArticle(row)"
            ></el-button>
            <el-button
              :icon="Delete"
              circle
              type="danger"
              @click="onDeleteArticle(row)"
            ></el-button>
          </template>
        </el-table-column>

        <!-- 没有数据的情况 -->
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>

      <!-- 分页 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="params.pagenum"
          v-model:page-size="params.pagesize"
          :page-sizes="[3, 4, 5]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="justify-content: flex-end; margin-top: 50px"
        />
      </div>

      <!-- 抽屉 -->
      <article-edit ref="articleRef" @success="onSuccess"></article-edit>
    </page-container>
  </div>
</template>

<style scoped></style>
