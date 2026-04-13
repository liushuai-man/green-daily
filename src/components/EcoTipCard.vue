<template>
  <el-card class="tips-card">
    <template #header>
      <div class="card-header">
        <span>环保小贴士</span>
      </div>
    </template>
    <div class="tips-list">
      <div class="tip-item">
        <h4>减少一次性用品使用</h4>
        <p>自带水杯、餐具和购物袋，减少塑料垃圾的产生</p>
      </div>
      <div class="tip-item">
        <h4>绿色出行</h4>
        <p>尽量选择步行、骑行或公共交通工具，减少碳排放</p>
      </div>
      <div class="tip-item">
        <h4>节约能源</h4>
        <p>随手关灯、关闭电器，使用节能产品，降低能源消耗</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
</script>

<style scoped>
.tips-card {
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

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 10px;
}

.tip-item {
  background-color: #f9f9f9;
  padding: 6px;
  border-radius: 4px;
}

.tip-item h4 {
  font-size: 11px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.tip-item p {
  font-size: 9px;
  color: #606266;
  margin: 0;
  line-height: 1.2;
}
</style>