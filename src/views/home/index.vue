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

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧边栏 -->
      <div class="sidebar">


        <!-- 环保行为库 -->
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>环保行为库</span>
            </div>
          </template>
          <div class="action-grid">
            <div v-for="action in ecoActions" :key="action.id" class="action-item" @click="selectAction(action)">
              <el-avatar :size="40" :class="action.type">
                <i :class="action.icon"></i>
              </el-avatar>
              <p class="action-name">{{ action.name }}</p>
            </div>
          </div>
        </el-card>

        <!-- 环保小贴士 -->
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>环保小贴士</span>
            </div>
          </template>
          <div class="tips-list">
            <div class="tip-item">
              <h4>减少一次性用品使用</h4>
              <p>自带水杯、餐具和购物袋，减少塑料垃圾的产生</p>
            </div>
            <div class="tip-item">
              <h4>绿色出行</h4>
              <p>尽量选择步行、骑行或公共交通工具，减少碳排放</p>
            </div>
            <div class="tip-item">
              <h4>节约能源</h4>
              <p>随手关灯、关闭电器，使用节能产品，降低能源消耗</p>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧主内容 -->
      <div class="content-area">
        <!-- 个人数据概览 -->
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

        <!-- 打卡日历 -->
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>打卡日历</span>
            </div>
          </template>
          <el-calendar v-model="calendarDate">
            <template #date-cell="{ data }">
              <div class="calendar-cell">
                <p :class="{ 'is-today': data.isToday }">{{ data.day }}</p>
                <div v-if="checkIns.includes(data.date)" class="check-mark">✓</div>
              </div>
            </template>
          </el-calendar>
        </el-card>

        <!-- 最近打卡记录 -->
        <el-card class="section-card">
          <template #header>
            <div class="card-header">
              <span>最近打卡记录</span>
            </div>
          </template>
          <div class="recent-checkins">
            <el-timeline>
              <el-timeline-item 
                v-for="(checkin, index) in recentCheckins" 
                :key="index"
                :timestamp="checkin.date"
                type="success"
                placement="top"
              >
                <div class="checkin-item">
                  <div class="checkin-action">{{ checkin.action }}</div>
                  <div class="checkin-remark">{{ checkin.remark }}</div>
                  <div class="checkin-points">+{{ checkin.points }} 积分</div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Check, Medal, DataAnalysis } from '@element-plus/icons-vue';

const router = useRouter();

// 跳转到打卡页面
const goToCheckIn = () => {
  router.push('/check-in');
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
  { id: 1, name: '垃圾分类投放', type: 'primary', icon: 'el-icon-s-grid' },
  { id: 2, name: '绿色出行', type: 'success', icon: 'el-icon-bicycle' },
  { id: 3, name: '节约用电', type: 'warning', icon: 'el-icon-lightning' },
  { id: 4, name: '节约用水', type: 'info', icon: 'el-icon-watermelon' },
  { id: 5, name: '减少使用一次性用品', type: 'danger', icon: 'el-icon-s-finance' },
  { id: 6, name: '旧物回收/二手利用', type: 'primary', icon: 'el-icon-s-opportunity' },
  { id: 7, name: '植树/绿植养护', type: 'success', icon: 'el-icon-sunny' },
  { id: 8, name: '环保知识学习', type: 'warning', icon: 'el-icon-notebook-2' },
  { id: 9, name: '自带水杯/餐具', type: 'info', icon: 'el-icon-cup' },
]);

// 选择环保行为
const selectAction = (action: any) => {
  router.push({
    path: '/check-in',
    query: { actionId: action.id },
  });
};

// 打卡日历
const calendarDate = ref(new Date());

// 模拟打卡数据
const checkIns = ref<string[]>([
  '2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04', '2026-03-05',
  '2026-03-06', '2026-03-07', '2026-03-08', '2026-03-09', '2026-03-10',
  '2026-03-11', '2026-03-12', '2026-03-13', '2026-03-14', '2026-03-15',
]);

// 最近打卡记录
const recentCheckins = reactive([
  { date: '2026-03-29', action: '垃圾分类投放', remark: '今天认真分类了垃圾', points: 10 },
  { date: '2026-03-28', action: '绿色出行', remark: '骑自行车上班', points: 10 },
  { date: '2026-03-27', action: '节约用电', remark: '随手关灯', points: 10 },
]);
</script>

<style scoped>
@import './index.scss';
</style>