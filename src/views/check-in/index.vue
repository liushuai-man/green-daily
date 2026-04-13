<template>
  <div class="check-in-page">
    <!-- 顶部Banner -->
    <div class="banner">
      <div class="banner-content">
        <h1>环保打卡，绿色生活</h1>
        <p>记录每一次环保行为，为地球贡献一份力量</p>
        <el-button
          v-if="!hasCheckedToday"
          type="primary"
          size="large"
          @click="showCheckInDialog = true"
        >立即打卡</el-button>
        <el-button v-else type="info" size="large" disabled>今日已打卡</el-button>
      </div>
      <!-- 右上角打卡提示 -->
      <div v-if="!hasCheckedToday" class="check-in-tip">
        <el-tooltip
          effect="dark"
          content="今日未打卡，点击立即打卡"
          placement="left"
        >
          <div class="check-in-icon-container">
            <el-icon class="check-in-icon"><Warning /></el-icon>
            <span class="check-in-badge-text">未打卡</span>
          </div>
        </el-tooltip>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧边栏 -->
      <div class="sidebar left-sidebar">
        <FeatureCard />
        <EcoActionLibrary @select="selectAction" />
        <EcoTipCard />
        <CheckInRules />
      </div>

      <!-- 中间内容 -->
      <div class="content-center">
        <!-- 打卡日历 -->
        <CheckInCalendar :checkIns="checkIns" />

        <!-- 打卡历史 -->
        <CheckInHistory :history="checkInHistory" />

        <!-- 减碳量趋势 -->
        <CarbonTrend :initialTrend="carbonTrend" />
      </div>

      <!-- 右侧边栏 -->
      <div class="sidebar right-sidebar">
        <UserStatsCard :stats="userStats" />
        <RecentCheckins :checkins="recentCheckins" />
        <ActionStats :stats="actionStats" />
      </div>
    </div>

    <!-- 打卡对话框 -->
    <el-dialog v-model="showCheckInDialog" title="环保打卡" width="500px">
      <el-form :model="checkInForm" class="check-in-form">
        <el-form-item label="选择环保行为">
          <el-select
            v-model="checkInForm.actionId"
            placeholder="请选择环保行为"
            style="width: 100%"
          >
            <el-option
              v-for="action in ecoActions"
              :key="action.id"
              :label="action.name"
              :value="action.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="打卡备注">
          <el-input
            v-model="checkInForm.remark"
            type="textarea"
            placeholder="请描述你的环保行为细节"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="'/api/upload'"
            :on-success="handleImageSuccess"
            :on-remove="handleImageRemove"
            :file-list="checkInForm.images"
            :limit="3"
            multiple
            :auto-upload="false"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">最多上传3张图片</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCheckInDialog = false">取消</el-button>
          <el-button type="primary" @click="submitCheckIn">确认打卡</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { ecoActions } from '@/mock';
import type { EcoAction } from '@/types';

// 导入组件
import FeatureCard from '@/components/FeatureCard.vue';
import EcoActionLibrary from '@/components/EcoActionLibrary.vue';
import EcoTipCard from '@/components/EcoTipCard.vue';
import CheckInCalendar from '@/components/CheckInCalendar.vue';
import UserStatsCard from '@/components/UserStatsCard.vue';
import CheckInRules from '@/components/CheckInRules.vue';
import RecentCheckins from '@/components/RecentCheckins.vue';
import CheckInHistory from '@/components/CheckInHistory.vue';
import ActionStats from '@/components/ActionStats.vue';
import CarbonTrend from '@/components/CarbonTrend.vue';

// 打卡状态
const hasCheckedToday = ref(false);
const continuousDays = ref(7);
const totalCheckIns = ref(15);
const currentPoints = ref(200);

// 个人数据统计
const userStats = reactive({
  totalCheckIns: 15,
  continuousDays: 7,
  totalPoints: 200,
  totalCarbonReduction: 12.5,
});

// 打卡表单
const checkInForm = reactive({
  actionId: '',
  remark: '',
  images: [] as Array<{ name: string; url: string }>,
});

// 打卡历史
const checkInHistory = ref([
  { date: '2026-03-29', action: '垃圾分类投放', remark: '今天认真分类了垃圾', points: 10 },
  { date: '2026-03-28', action: '绿色出行', remark: '骑自行车上班', points: 10 },
  { date: '2026-03-27', action: '节约用电', remark: '随手关灯', points: 10 },
  { date: '2026-03-26', action: '节约用水', remark: '缩短洗澡时间', points: 10 },
  { date: '2026-03-25', action: '减少使用一次性用品', remark: '使用自带水杯', points: 10 },
]);

// 最近打卡记录
const recentCheckins = ref([
  { date: '2026-03-29', action: '垃圾分类投放', remark: '今天认真分类了垃圾', points: 10 },
  { date: '2026-03-28', action: '绿色出行', remark: '骑自行车上班', points: 10 },
  { date: '2026-03-27', action: '节约用电', remark: '随手关灯', points: 10 },
]);

// 行为统计数据
const actionStats = ref([
  { name: '垃圾分类投放', count: 5, percentage: 33, type: 'primary' },
  { name: '绿色出行', count: 3, percentage: 20, type: 'success' },
  { name: '节约用电', count: 2, percentage: 13, type: 'warning' },
  { name: '节约用水', count: 2, percentage: 13, type: 'info' },
  { name: '减少使用一次性用品', count: 1, percentage: 7, type: 'danger' },
  { name: '旧物回收/二手利用', count: 1, percentage: 7, type: 'primary' },
  { name: '植树/绿植养护', count: 1, percentage: 7, type: 'success' },
]);

// 减碳量趋势
const carbonTrend = ref([
  { date: '3-19', value: 0.5 },
  { date: '3-20', value: 0.8 },
  { date: '3-21', value: 0.3 },
  { date: '3-22', value: 1.0 },
  { date: '3-23', value: 0.6 },
  { date: '3-24', value: 0.4 },
  { date: '3-25', value: 0.7 },
]);

// 打卡对话框
const showCheckInDialog = ref(false);

// 选择环保行为
const selectAction = (action: EcoAction) => {
  checkInForm.actionId = action.id.toString();
  showCheckInDialog.value = true;
};

// 图片上传成功
const handleImageSuccess = (response: any, file: any) => {
  checkInForm.images.push({
    name: file.name,
    url: response.data.url,
  });
};

// 图片移除
const handleImageRemove = (_file: any, fileList: any) => {
  checkInForm.images = fileList;
};

// 提交打卡
const submitCheckIn = async () => {
  if (!checkInForm.actionId) {
    ElMessage.warning('请选择环保行为');
    return;
  }

  ElMessage.success('打卡成功');

  // 更新状态
  hasCheckedToday.value = true;
  continuousDays.value += 1;
  totalCheckIns.value += 1;
  currentPoints.value += 10;
  userStats.totalCheckIns += 1;
  userStats.continuousDays += 1;
  userStats.totalPoints += 10;

  // 添加到历史记录
  const selectedAction = ecoActions.find(
    (action) => action.id === Number(checkInForm.actionId)
  );
  const newCheckin = {
    date: new Date().toISOString().split('T')[0],
    action: selectedAction?.name || '',
    remark: checkInForm.remark,
    points: 10,
  };
  checkInHistory.value.unshift(newCheckin);
  recentCheckins.value.unshift(newCheckin);

  // 限制历史记录长度
  if (checkInHistory.value.length > 10) {
    checkInHistory.value.pop();
  }
  if (recentCheckins.value.length > 3) {
    recentCheckins.value.pop();
  }

  // 重置表单
  checkInForm.actionId = '';
  checkInForm.remark = '';
  checkInForm.images = [];

  // 关闭对话框
  showCheckInDialog.value = false;

  // 检查连续打卡奖励
  checkContinuousReward();
};

// 检查连续打卡奖励
const checkContinuousReward = () => {
  const days = continuousDays.value;
  if (days === 7) {
    ElMessage.success('恭喜！连续打卡7天，获得额外50积分奖励');
    currentPoints.value += 50;
    userStats.totalPoints += 50;
  } else if (days === 30) {
    ElMessage.success('恭喜！连续打卡30天，获得额外150积分奖励');
    currentPoints.value += 150;
    userStats.totalPoints += 150;
  } else if (days === 90) {
    ElMessage.success('恭喜！连续打卡90天，获得额外300积分奖励');
    currentPoints.value += 300;
    userStats.totalPoints += 300;
  }
};

// 模拟打卡数据
const checkIns = ref<string[]>([
  '2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04', '2026-03-05',
  '2026-03-06', '2026-03-07', '2026-03-08', '2026-03-09', '2026-03-10',
  '2026-03-11', '2026-03-12', '2026-03-13', '2026-03-14', '2026-03-15',
]);
</script>

<style scoped>
@import './index.scss';
</style>