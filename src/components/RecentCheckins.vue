<template>
  <el-card class="recent-checkins-card">
    <template #header>
      <div class="card-header">
        <span>最近打卡记录</span>
      </div>
    </template>
    <div class="recent-checkins">
      <el-timeline>
        <el-timeline-item 
          v-for="(checkin, index) in checkins" 
          :key="index"
          :timestamp="checkin.date"
          type="success"
          placement="top"
        >
          <div class="checkin-item">
            <div class="checkin-action">{{ checkin.action }}</div>
            <div class="checkin-remark">{{ checkin.remark }}</div>
            <div class="checkin-points">+{{ checkin.points }} 积分</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  checkins: Array<{
    date: string;
    action: string;
    remark: string;
    points: number;
  }>;
}>();
</script>

<style scoped>
.recent-checkins-card {
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

.recent-checkins {
  padding: 6px 10px;
}

.checkin-item {
  background-color: #f9f9f9;
  padding: 6px;
  border-radius: 4px;
}

.checkin-action {
  font-size: 11px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.checkin-remark {
  font-size: 10px;
  color: #606266;
  margin-bottom: 2px;
}

.checkin-points {
  font-size: 9px;
  color: #67c23a;
  font-weight: 500;
}
</style>