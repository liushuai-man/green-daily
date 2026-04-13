<template>
  <el-card class="action-stats-card">
    <template #header>
      <div class="card-header">
        <span>环保行为统计</span>
      </div>
    </template>
    <div class="action-stats">
      <div v-for="action in stats" :key="action.name" class="action-stat-item">
        <div class="action-name">{{ action.name }}</div>
        <div class="action-bar">
          <div
            class="action-bar-fill"
            :style="{ width: action.percentage + '%' }"
            :class="action.type"
          ></div>
        </div>
        <div class="action-count">{{ action.count }}次</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  stats: Array<{
    name: string;
    count: number;
    percentage: number;
    type: string;
  }>;
}>();
</script>

<style scoped>
.action-stats-card {
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

.action-stats {
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.action-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-name {
  width: 100px;
  font-size: 10px;
  color: #303133;
  flex-shrink: 0;
}

.action-bar {
  flex: 1;
  height: 10px;
  background-color: #e4e7ed;
  border-radius: 5px;
  overflow: hidden;
}

.action-bar-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease;
}

.action-bar-fill.primary {
  background-color: #409eff;
}

.action-bar-fill.success {
  background-color: #67c23a;
}

.action-bar-fill.warning {
  background-color: #e6a23c;
}

.action-bar-fill.info {
  background-color: #909399;
}

.action-bar-fill.danger {
  background-color: #f56c6c;
}

.action-count {
  width: 35px;
  text-align: right;
  font-size: 10px;
  color: #606266;
  flex-shrink: 0;
}
</style>