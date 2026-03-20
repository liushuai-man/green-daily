<template>
  <!-- Element Plus 官方标准后台布局 -->
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width="200px" class="aside">
      <!-- 项目 Logo -->
      <div class="logo">环保打卡</div>

      <!-- 侧边菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#2f4050"
        text-color="#fff"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-house"></i>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/check-in">
          <i class="el-icon-calendar"></i>
          <span>环保打卡</span>
        </el-menu-item>

        <el-menu-item index="/data">
          <i class="el-icon-pie-chart"></i>
          <span>数据统计</span>
        </el-menu-item>

        <el-menu-item index="/community">
          <i class="el-icon-user"></i>
          <span>环保社区</span>
        </el-menu-item>

        <el-menu-item index="/user">
          <i class="el-icon-user-solid"></i>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主体 -->
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="header">
        <div class="title">环保打卡管理系统</div>
        <div class="user-info">
          <el-dropdown>
            <span class="user-name">管理员</span>
            <template #dropdown>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 → 页面自动渲染在这里 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const activeMenu = ref('')

// 设置当前激活菜单
onMounted(() => {
  activeMenu.value = router.currentRoute.value.path
})

// 监听路由变化
router.afterEach((to) => {
  activeMenu.value = to.path
})

// 退出登录
const logout = () => {
  userStore.logout()
  ElMessage.success('退出成功')
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  border: 1px solid #eee;
}
.aside {
  background-color: #2f4050;
  color: #fff;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #1f2d3d;
}
.header {
  background-color: #fff;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.title {
  font-size: 18px;
  font-weight: 500;
}
.user-name {
  cursor: pointer;
  font-size: 14px;
}
.main {
  background-color: #f3f3f4;
  padding: 20px;
}
</style>