<template>
  <el-card class="feature-card">
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
        <el-icon class="feature-icon"><DataAnalysis /></el-icon>
        <h3>数据可视化</h3>
        <p>直观查看打卡数据和减碳成果，感受环保带来的变化</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Check, Medal, DataAnalysis } from '@element-plus/icons-vue';
</script>

<style scoped>
.feature-card {
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

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
  padding: 6px 10px;
}

.feature-item {
  text-align: center;
  padding: 8px 6px;
  background-color: #f9f9f9;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 20px;
  margin-bottom: 4px;
  color: #409eff;
}

.feature-item h3 {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
  color: #303133;
}

.feature-item p {
  color: #606266;
  font-size: 9px;
  line-height: 1.2;
  margin: 0;
}
</style>