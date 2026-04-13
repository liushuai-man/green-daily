<template>
  <el-card class="calendar-card">
    <template #header>
      <div class="card-header">
        <span>打卡日历</span>
      </div>
    </template>
    <el-calendar v-model="calendarDate">
      <template #date-cell="{ data }">
        <div class="calendar-cell">
          <p :class="{ 'is-today': data.isToday }">{{ data.day.split('-').pop() }}</p>
          <div v-if="checkIns.includes(data.date)" class="check-mark">✓</div>
        </div>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  checkIns: string[];
}>();

const calendarDate = ref(new Date());
</script>

<style scoped>
.calendar-card {
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

.calendar-card .el-calendar {
  font-size: 10px;
}

.calendar-card .el-calendar__header {
  padding: 0 10px 6px;
  font-size: 10px;
}

.calendar-card .el-calendar__body {
  padding: 0 10px;
}

.calendar-card .el-button {
  font-size: 9px;
  padding: 3px 6px;
}

.calendar-cell {
  position: relative;
  padding: 6px;
}

.calendar-cell p {
  margin: 0;
  text-align: center;
  font-size: 12px;
}

.is-today {
  font-weight: bold;
  color: #409eff;
}

.check-mark {
  position: absolute;
  top: 1px;
  right: 1px;
  font-size: 10px;
  color: #67c23a;
  font-weight: bold;
}
</style>