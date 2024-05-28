<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores'

const languageStore = useLanguageStore()

const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  userStore.getUser()
})
const handleCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确认退出登录吗?', '提示', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(() => {
        //退出后清空本地数据(token + user信息)
        userStore.removeToken()
        userStore.setUser({})
        router.push('/login')
        ElMessage({
          type: 'success',
          message: '退出登录成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled'
        })
      })
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏el-aside -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!-- 菜单 -->
      <!-- :default-active="$route.path"默认高亮的菜单项 -->
      <!-- router选项开启,el-menu-item的index就是点击后的跳转路径 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- 多级菜单 -->
        <el-sub-menu index="/user">
          <!-- 多级菜单标题 - 具名插槽title -->
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>

          <!-- 展开内容 - 默认插槽 -->
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- el-header -->
      <el-header>
        <div>
          User：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>

        <!-- 切换语言按钮 -->
        <el-button @click="languageStore.toggle" round size="large">{{
          languageStore.display
        }}</el-button>

        <!-- 下拉菜单默认展示部分 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar
              shape="square"
              :src="userStore.user.user_pic || avatar"
            />
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <!-- 下拉菜单隐藏部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 主要内容区main放置子路由组件 -->
      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer>footer</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      cursor: pointer;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    background: rgba(153, 153, 153, 0.41); /* 使用 rgba 以确保背景半透明 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #666;
    backdrop-filter: blur(20px);
  }
}
</style>
