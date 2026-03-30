<template>
  <div class="home-page">

    <!-- 顶部Banner -->
    <div class="banner">
      <div class="banner-content">
        <h1>环保打卡，绿色生活</h1>
        <p>记录每一次环保行为，为地球贡献一份力量</p>
        <el-button type="primary" size="large" @click="goToCheckIn">立即打卡</el-button>
      </div>
    </div>

    <!-- 核心功能模块 -->
    <div class="features">
      <div class="container">
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>核心功能</span>
            </div>
          </template>
          <div class="feature-grid">
            <div class="feature-item">
              <el-icon class="feature-icon"><Check /></el-icon>
              <h3>环保打卡</h3>
              <p>快速记录日常环保行为，支持多种预设行为和自定义打卡</p>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Medal /></el-icon>
              <h3>积分激励</h3>
              <p>通过打卡获得积分，连续打卡有额外奖励，可兑换虚拟奖励</p>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><ChatLineRound /></el-icon>
              <h3>社区分享</h3>
              <p>与其他环保爱好者分享经验，互相激励，共同进步</p>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><DataAnalysis /></el-icon>
              <h3>数据可视化</h3>
              <p>直观查看打卡数据和减碳成果，感受环保带来的变化</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 个人数据概览 -->
    <div class="user-stats">
      <div class="container">
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>我的环保数据</span>
            </div>
          </template>
          <div class="stats-grid">
            <div class="stat-item">
              <el-statistic :value="userStats.totalCheckIns" title="总打卡天数" />
            </div>
            <div class="stat-item">
              <el-statistic :value="userStats.continuousDays" title="连续打卡天数" />
            </div>
            <div class="stat-item">
              <el-statistic :value="userStats.totalPoints" title="总积分" />
            </div>
            <div class="stat-item">
              <el-statistic :value="userStats.totalCarbonReduction" title="累计减碳量(kg)" />
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 环保行为库 -->
    <div class="action-library">
      <div class="container">
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>环保行为库</span>
            </div>
          </template>
          <div class="action-grid">
            <div
              v-for="action in ecoActions"
              :key="action.id"
              class="action-item"
              @click="selectAction(action)"
            >
              <el-avatar :size="60" :class="action.type">
                <i :class="action.icon"></i>
              </el-avatar>
              <p class="action-name">{{ action.name }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 社区动态 -->
    <div class="community-section">
      <div class="container">
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>社区动态</span>
              <el-button type="primary" size="small" @click="goToCommunity">查看更多</el-button>
            </div>
          </template>
          <div class="post-list">
            <el-card
              v-for="post in recentPosts"
              :key="post.id"
              shadow="hover"
              class="post-card"
            >
              <div class="post-header">
                <div class="user-info">
                  <el-avatar>{{ post.user.nickname.charAt(0) }}</el-avatar>
                  <div class="user-details">
                    <div class="nickname">{{ post.user.nickname }}</div>
                    <div class="post-time">{{ post.createdAt }}</div>
                  </div>
                </div>
                <div class="post-actions">
                  <el-button size="small" @click="likePost(post)">
                    <el-icon><Star /></el-icon>
                    {{ post.likes }}
                  </el-button>
                </div>
              </div>
              <div class="post-content">
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-text">{{ post.content }}</p>
                <div v-if="post.images.length > 0" class="post-images">
                  <img
                    v-for="(image, index) in post.images"
                    :key="index"
                    :src="image"
                    alt="动态图片"
                    class="post-image"
                  />
                </div>
              </div>
              <div class="post-footer">
                <el-button size="small" @click="viewPost(post)">
                  <el-icon><ChatDotRound /></el-icon>
                  查看评论
                </el-button>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 环保小贴士 -->
    <div class="tips-section">
      <div class="container">
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>环保小贴士</span>
            </div>
          </template>
          <div class="tips-list">
            <div class="tip-item">
              <h3>减少一次性用品使用</h3>
              <p>自带水杯、餐具和购物袋，减少塑料垃圾的产生</p>
            </div>
            <div class="tip-item">
              <h3>绿色出行</h3>
              <p>尽量选择步行、骑行或公共交通工具，减少碳排放</p>
            </div>
            <div class="tip-item">
              <h3>节约能源</h3>
              <p>随手关灯、关闭电器，使用节能产品，降低能源消耗</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Check, Medal, ChatLineRound, DataAnalysis, Star, ChatDotRound } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const router = useRouter();

// 跳转到打卡页面
const goToCheckIn = () => {
  router.push('/check-in');
};

// 跳转到社区页面
const goToCommunity = () => {
  router.push('/community');
};

// 个人数据统计
const userStats = reactive({
  totalCheckIns: 15,
  continuousDays: 7,
  totalPoints: 200,
  totalCarbonReduction: 12.5,
});

// 环保行为库
const ecoActions = reactive([
  {
    id: 1,
    name: '垃圾分类投放',
    type: 'primary',
    icon: 'el-icon-s-grid',
  },
  {
    id: 2,
    name: '绿色出行',
    type: 'success',
    icon: 'el-icon-bicycle',
  },
  {
    id: 3,
    name: '节约用电',
    type: 'warning',
    icon: 'el-icon-lightning',
  },
  {
    id: 4,
    name: '节约用水',
    type: 'info',
    icon: 'el-icon-watermelon',
  },
  {
    id: 5,
    name: '减少使用一次性用品',
    type: 'danger',
    icon: 'el-icon-s-finance',
  },
  {
    id: 6,
    name: '旧物回收/二手利用',
    type: 'primary',
    icon: 'el-icon-s-opportunity',
  },
  {
    id: 7,
    name: '植树/绿植养护',
    type: 'success',
    icon: 'el-icon-sunny',
  },
  {
    id: 8,
    name: '环保知识学习',
    type: 'warning',
    icon: 'el-icon-notebook-2',
  },
  {
    id: 9,
    name: '自带水杯/餐具',
    type: 'info',
    icon: 'el-icon-cup',
  },
]);

// 选择环保行为
const selectAction = (action: any) => {
  // 跳转到打卡页面并传递选中的行为
  router.push({
    path: '/check-in',
    query: { actionId: action.id },
  });
};

// 社区动态数据
const recentPosts = ref([
  {
    id: 1,
    title: '今天开始垃圾分类',
    content: '今天开始认真垃圾分类，希望能为环保做出一点贡献！',
    images: [],
    user: {
      id: 1,
      nickname: '环保小卫士',
      avatar: '',
    },
    createdAt: '2026-03-29 10:00',
    likes: 15,
    liked: false,
  },
  {
    id: 2,
    title: '绿色出行的一天',
    content: '今天全程骑自行车上班，感觉很健康，也为环保出了一份力！',
    images: [],
    user: {
      id: 2,
      nickname: '绿色生活',
      avatar: '',
    },
    createdAt: '2026-03-28 14:30',
    likes: 23,
    liked: true,
  },
  {
    id: 3,
    title: '旧物改造小技巧',
    content: '把旧衣服改造成环保袋，既实用又环保，大家可以试试！',
    images: [],
    user: {
      id: 3,
      nickname: '创意环保',
      avatar: '',
    },
    createdAt: '2026-03-27 09:15',
    likes: 18,
    liked: false,
  },
]);

// 点赞动态
const likePost = (post: any) => {
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  ElMessage.success(post.liked ? '点赞成功' : '取消点赞');
};

// 查看动态详情
const viewPost = (post: any) => {
  router.push({
    path: '/community',
    query: { postId: post.id },
  });
};
</script>

<style scoped>
@import './index.scss';
</style>