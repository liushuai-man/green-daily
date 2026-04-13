<template>
  <el-card class="carbon-trend-card">
    <template #header>
      <div class="card-header">
        <span>减碳量趋势</span>
        <el-select
          v-model="period"
          @change="updateTrend"
          placeholder="选择周期"
          style="width: 90px"
        >
          <el-option label="近7天" value="7" />
          <el-option label="近30天" value="30" />
          <el-option label="近90天" value="90" />
        </el-select>
      </div>
    </template>
    <div class="carbon-trend">
      <div v-for="(item, index) in trend" :key="index" class="trend-item">
        <div class="trend-date">{{ item.date }}</div>
        <div class="trend-bar">
          <div
            class="trend-bar-fill"
            :style="{ height: (item.value / maxCarbonValue) * 100 + '%' }"
          ></div>
        </div>
        <div class="trend-value">{{ item.value }}kg</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  initialTrend: Array<{
    date: string;
    value: number;
  }>;
}>();

const period = ref('7');
const trend = ref(props.initialTrend);

const maxCarbonValue = computed(() => {
  return Math.max(...trend.value.map((item) => item.value)) * 1.2;
});

const updateTrend = () => {
  const days = Number(period.value);
  const newTrend = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    newTrend.push({
      date: `${date.getMonth() + 1}-${date.getDate()}`,
      value: Math.random() * 1.5,
    });
  }
  trend.value = newTrend;
};

// 监听初始趋势变化
watch(() => props.initialTrend, (newTrend) => {
  trend.value = newTrend;
}, { deep: true });
</script>

<style scoped>
.carbon-trend-card {
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

.card-header .el-select {
  width: 90px;
  font-size: 11px;
}

.card-header .el-select .el-input__inner {
  font-size: 11px;
  height: 24px;
}

.carbon-trend {
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 100px;
}

.trend-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.trend-date {
  font-size: 9px;
  color: #606266;
}

.trend-bar {
  flex: 1;
  width: 20px;
  background-color: #e4e7ed;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.trend-bar-fill {
  width: 100%;
  background-color: #67c23a;
  transition: height 0.5s ease;
}

.trend-value {
  font-size: 9px;
  color: #606266;
}
</style>