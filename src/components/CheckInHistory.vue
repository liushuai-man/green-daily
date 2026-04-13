<template>
  <el-card class="history-card">
    <template #header>
      <div class="card-header">
        <span>打卡历史</span>
      </div>
    </template>
    <div class="check-in-history">
      <el-table :data="history" style="width: 100%">
        <el-table-column prop="date" label="打卡日期" width="150" />
        <el-table-column prop="action" label="环保行为" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="points" label="获得积分" width="100" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  history: Array<{
    date: string;
    action: string;
    remark: string;
    points: number;
  }>;
}>();
</script>

<style scoped>
.history-card {
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

.check-in-history {
  padding: 6px 10px;
}

.check-in-history .el-table {
  font-size: 11px;
}

.check-in-history .el-table th {
  font-size: 11px;
  padding: 6px;
}

.check-in-history .el-table td {
  font-size: 11px;
  padding: 6px;
}
</style>