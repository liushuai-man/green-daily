<template>
  <el-card class="user-stats-card">
    <template #header>
      <div class="card-header">
        <span>我的环保数据</span>
      </div>
    </template>
    <div class="stats-grid">
      <div class="stat-item">
        <el-statistic :value="stats.totalCheckIns" title="总打卡天数" />
      </div>
      <div class="stat-item">
        <el-statistic :value="stats.continuousDays" title="连续打卡天数" />
      </div>
      <div class="stat-item">
        <el-statistic :value="stats.totalPoints" title="总积分" />
      </div>
      <div class="stat-item">
        <el-statistic :value="stats.totalCarbonReduction" title="累计减碳量(kg)" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  stats: {
    totalCheckIns: number;
    continuousDays: number;
    totalPoints: number;
    totalCarbonReduction: number;
  };
}>();
</script>

<style scoped>
.user-stats-card {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.card-header {
  font-size: 11px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  padding: 6px 10px;
}

.stat-item {
  text-align: center;
  padding: 6px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.stat-item .el-statistic {
  font-size: 10px;
}

.stat-item .el-statistic__title {
  font-size: 9px !important;
  margin-bottom: 2px;
}

.stat-item .el-statistic__value {
  font-size: 12px !important;
}
</style>