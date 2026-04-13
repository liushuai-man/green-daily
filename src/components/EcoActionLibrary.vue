<template>
  <el-card class="action-library-card">
    <template #header>
      <div class="card-header">
        <span>环保行为库</span>
      </div>
    </template>
    <div class="action-grid">
      <EcoActionCard
        v-for="action in ecoActions"
        :key="action.id"
        :action="action"
        :size="35"
        @click="selectAction"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ecoActions } from '@/mock';
import EcoActionCard from './EcoActionCard.vue';
import type { EcoAction } from '@/types';

const emit = defineEmits<{
  (e: 'select', action: EcoAction): void;
}>();

const selectAction = (action: EcoAction) => {
  emit('select', action);
};
</script>

<style scoped>
.action-library-card {
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

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 6px 10px;
}
</style>