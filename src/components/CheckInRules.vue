<template>
  <el-card class="rules-card">
    <template #header>
      <div class="card-header">
        <span>打卡规则</span>
      </div>
    </template>
    <div class="rules-list">
      <div class="rule-item">
        <el-icon class="rule-icon"><Check /></el-icon>
        <span>每日打卡可获得10积分</span>
      </div>
      <div class="rule-item">
        <el-icon class="rule-icon"><Check /></el-icon>
        <span>连续打卡7天额外获得50积分</span>
      </div>
      <div class="rule-item">
        <el-icon class="rule-icon"><Check /></el-icon>
        <span>连续打卡30天额外获得150积分</span>
      </div>
      <div class="rule-item">
        <el-icon class="rule-icon"><Check /></el-icon>
        <span>连续打卡90天额外获得300积分</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
</script>

<style scoped>
.rules-card {
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

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 10px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #303133;
}

.rule-icon {
  font-size: 14px;
  color: #67c23a;
}
</style>