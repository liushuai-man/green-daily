<template>
  <div class="data-page">
    <!-- 页面标题 -->
    <el-card class="data-card">
      <template #header>
        <div class="card-header">
          <span>数据统计</span>
        </div>
      </template>

      <!-- 总体数据概览 -->
      <div class="data-overview">
        <el-card shadow="hover" class="overview-card">
          <div class="overview-item">
            <el-statistic :value="totalCheckIns" title="总打卡天数" />
          </div>
          <div class="overview-item">
            <el-statistic :value="continuousDays" title="连续打卡天数" />
          </div>
          <div class="overview-item">
            <el-statistic :value="totalPoints" title="总积分" />
          </div>
          <div class="overview-item">
            <el-statistic
              :value="totalCarbonReduction"
              title="累计减碳量(kg)"
            />
          </div>
        </el-card>
      </div>

      <!-- 打卡日历 -->
      <div class="calendar-section">
        <el-card shadow="hover" class="section-card">
          <template #header>
            <div class="section-header">
              <span>打卡日历</span>
              <el-select
                v-model="currentMonth"
                @change="updateCalendar"
                placeholder="选择月份"
              >
                <el-option
                  v-for="month in months"
                  :key="month.value"
                  :label="month.label"
                  :value="month.value"
                />
              </el-select>
            </div>
          </template>
          <div class="calendar-grid">
            <div class="calendar-header">
              <div v-for="day in weekDays" :key="day" class="calendar-weekday">
                {{ day }}
              </div>
            </div>
            <div class="calendar-body">
              <div
                v-for="day in calendarDays"
                :key="day.date"
                class="calendar-day"
                :class="{
                  'other-month': day.otherMonth,
                  checked: day.checked,
                  today: day.today,
                }"
                @click="selectDay(day)"
              >
                <span>{{ day.day }}</span>
                <div v-if="day.checked" class="check-mark">✓</div>
              </div>
            </div>
          </div>
          <div v-if="selectedDay" class="day-detail">
            <h4>{{ selectedDay.date }} 打卡详情</h4>
            <p v-if="selectedDay.checked">打卡行为：{{ selectedDay.action }}</p>
            <p v-else>未打卡</p>
          </div>
        </el-card>
      </div>

      <!-- 行为统计 -->
      <div class="action-stats-section">
        <el-card shadow="hover" class="section-card">
          <template #header>
            <div class="section-header">
              <span>环保行为统计</span>
            </div>
          </template>
          <div class="action-stats">
            <div
              v-for="action in actionStats"
              :key="action.name"
              class="action-stat-item"
            >
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
      </div>

      <!-- 减碳量趋势 -->
      <div class="carbon-trend-section">
        <el-card shadow="hover" class="section-card">
          <template #header>
            <div class="section-header">
              <span>减碳量趋势</span>
              <el-select
                v-model="trendPeriod"
                @change="updateTrend"
                placeholder="选择周期"
              >
                <el-option label="近7天" value="7" />
                <el-option label="近30天" value="30" />
                <el-option label="近90天" value="90" />
              </el-select>
            </div>
          </template>
          <div class="carbon-trend">
            <div
              v-for="(item, index) in carbonTrend"
              :key="index"
              class="trend-item"
            >
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
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 总体数据
const totalCheckIns = ref(15);
const continuousDays = ref(7);
const totalPoints = ref(200);
const totalCarbonReduction = ref(12.5);

// 打卡日历
const currentMonth = ref(new Date().toISOString().slice(0, 7)); // 格式：YYYY-MM
const selectedDay = ref<{
  date: string;
  day: number;
  otherMonth: boolean;
  checked: boolean;
  today: boolean;
  action: string;
} | null>(null);
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 月份选项
const months = ref<Array<{ label: string; value: string }>>([]);

// 生成月份选项
const generateMonths = () => {
  const monthsList = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsList.push({
      label: date.toLocaleString('zh-CN', { year: 'numeric', month: 'long' }),
      value: date.toISOString().slice(0, 7),
    });
  }
  months.value = monthsList;
};

// 生成日历数据
const calendarDays = computed(() => {
  const [year, month] = currentMonth.value.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      day: date.getDate(),
      otherMonth: date.getMonth() !== month - 1,
      checked: checkIns.value.includes(dateStr),
      today: dateStr === new Date().toISOString().split('T')[0],
      action: getCheckInAction(dateStr),
    });
  }
  return days;
});

// 模拟打卡数据
const checkIns = ref<string[]>([
  '2026-03-01',
  '2026-03-02',
  '2026-03-03',
  '2026-03-04',
  '2026-03-05',
  '2026-03-06',
  '2026-03-07',
  '2026-03-08',
  '2026-03-09',
  '2026-03-10',
  '2026-03-11',
  '2026-03-12',
  '2026-03-13',
  '2026-03-14',
  '2026-03-15',
]);

// 打卡行为数据
const checkInActions = ref<Record<string, string>>({
  '2026-03-01': '垃圾分类投放',
  '2026-03-02': '绿色出行',
  '2026-03-03': '节约用电',
  '2026-03-04': '节约用水',
  '2026-03-05': '减少使用一次性用品',
  '2026-03-06': '旧物回收/二手利用',
  '2026-03-07': '植树/绿植养护',
  '2026-03-08': '环保知识学习',
  '2026-03-09': '自带水杯/餐具',
  '2026-03-10': '垃圾分类投放',
  '2026-03-11': '绿色出行',
  '2026-03-12': '节约用电',
  '2026-03-13': '节约用水',
  '2026-03-14': '减少使用一次性用品',
  '2026-03-15': '旧物回收/二手利用',
});

// 获取打卡行为
const getCheckInAction = (date: string) => {
  return checkInActions.value[date] || '';
};

// 更新日历
const updateCalendar = () => {
  selectedDay.value = null;
};

// 选择日期
const selectDay = (day: any) => {
  if (day.otherMonth) return;
  selectedDay.value = day;
};

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
const trendPeriod = ref('7');
const carbonTrend = ref([
  { date: '3-19', value: 0.5 },
  { date: '3-20', value: 0.8 },
  { date: '3-21', value: 0.3 },
  { date: '3-22', value: 1.0 },
  { date: '3-23', value: 0.6 },
  { date: '3-24', value: 0.4 },
  { date: '3-25', value: 0.7 },
]);

// 最大减碳量值（用于计算高度）
const maxCarbonValue = computed(() => {
  return Math.max(...carbonTrend.value.map((item) => item.value)) * 1.2;
});

// 更新趋势
const updateTrend = () => {
  // 模拟不同周期的数据
  const days = Number(trendPeriod.value);
  const trend = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    trend.push({
      date: `${date.getMonth() + 1}-${date.getDate()}`,
      value: Math.random() * 1.5,
    });
  }
  carbonTrend.value = trend;
};

// 页面加载
onMounted(() => {
  generateMonths();
});
</script>

<style scoped>
@import './index.scss';
</style>
