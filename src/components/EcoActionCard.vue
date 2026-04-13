<template>
  <div class="eco-action-card" @click="$emit('click', action)">
    <el-avatar :size="size" :class="action.type">
      <i :class="action.icon"></i>
    </el-avatar>
    <p class="action-name">{{ action.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { EcoAction } from '@/types';

const props = defineProps<{
  action: EcoAction;
  size?: number;
}>();

const emit = defineEmits<{
  (e: 'click', action: EcoAction): void;
}>();
</script>

<style scoped>
.eco-action-card {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 6px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.eco-action-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.action-name {
  margin-top: 4px;
  font-size: 10px;
  color: #303133;
  font-weight: 500;
  margin: 4px 0 0 0;
}
</style>