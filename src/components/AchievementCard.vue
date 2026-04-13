<template>
  <div class="achievement-card" :class="{ unlocked: achievement.unlocked }">
    <div class="achievement-icon">
      <i :class="achievement.icon"></i>
    </div>
    <div class="achievement-info">
      <h3 class="achievement-name">{{ achievement.name }}</h3>
      <p class="achievement-description">{{ achievement.description }}</p>
      <div class="achievement-progress">
        <el-progress
          :percentage="Math.min((achievement.progress / achievement.target) * 100, 100)"
          :color="achievement.unlocked ? '#67c23a' : '#409eff'"
          :stroke-width="8"
        />
        <div class="progress-text">
          {{ achievement.progress }}/{{ achievement.target }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Achievement } from '../types';

const props = defineProps<{
  achievement: Achievement;
}>();
</script>

<style scoped>
.achievement-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.achievement-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.achievement-card.unlocked {
  border: 1px solid #e1f3d8;
  background-color: #f0f9eb;
}

.achievement-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.achievement-card.unlocked .achievement-icon {
  background-color: #67c23a;
}

.achievement-info {
  flex: 1;
}

.achievement-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #303133;
}

.achievement-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.achievement-progress {
  position: relative;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
  color: #909399;
}
</style>