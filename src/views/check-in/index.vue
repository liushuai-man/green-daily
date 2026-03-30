<template>
  <div class="check-in-page">
    <!-- 页面标题 -->
    <el-card class="check-in-card">
      <template #header>
        <div class="card-header">
          <span>环保打卡</span>
          <el-button
            v-if="!hasCheckedToday"
            type="primary"
            @click="showCheckInDialog = true"
            >立即打卡</el-button
          >
          <el-button v-else type="info" disabled>今日已打卡</el-button>
        </div>
      </template>

      <!-- 打卡状态 -->
      <div class="check-in-status">
        <el-alert
          :title="hasCheckedToday ? '今日已打卡' : '今日未打卡'"
          :type="hasCheckedToday ? 'success' : 'warning'"
          show-icon
        />
        <div class="check-in-info">
          <p>连续打卡：{{ continuousDays }} 天</p>
          <p>累计打卡：{{ totalCheckIns }} 天</p>
          <p>当前积分：{{ currentPoints }} 分</p>
        </div>
      </div>

      <!-- 环保行为库 -->
      <div class="eco-actions-section">
        <h3>环保行为库</h3>
        <div class="eco-actions-grid">
          <div
            v-for="action in ecoActions"
            :key="action.id"
            class="eco-action-item"
            @click="selectAction(action)"
          >
            <el-avatar :size="60" :class="action.type">
              <i :class="action.icon"></i>
            </el-avatar>
            <p>{{ action.name }}</p>
          </div>
        </div>
      </div>

      <!-- 打卡历史 -->
      <div class="check-in-history">
        <h3>打卡历史</h3>
        <el-table :data="checkInHistory" style="width: 100%">
          <el-table-column prop="date" label="打卡日期" width="180" />
          <el-table-column prop="action" label="环保行为" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="points" label="获得积分" width="100" />
        </el-table>
      </div>
    </el-card>

    <!-- 打卡对话框 -->
    <el-dialog v-model="showCheckInDialog" title="环保打卡" width="500px">
      <el-form :model="checkInForm" class="check-in-form">
        <el-form-item label="选择环保行为">
          <el-select
            v-model="checkInForm.actionId"
            placeholder="请选择环保行为"
            style="width: 100%"
          >
            <el-option
              v-for="action in ecoActions"
              :key="action.id"
              :label="action.name"
              :value="action.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="打卡备注">
          <el-input
            v-model="checkInForm.remark"
            type="textarea"
            placeholder="请描述你的环保行为细节"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="'/api/upload'"
            :on-success="handleImageSuccess"
            :on-remove="handleImageRemove"
            :file-list="checkInForm.images"
            :limit="3"
            multiple
            :auto-upload="false"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">最多上传3张图片</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCheckInDialog = false">取消</el-button>
          <el-button type="primary" @click="submitCheckIn">确认打卡</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// 打卡状态
const hasCheckedToday = ref(false);
const continuousDays = ref(7);
const totalCheckIns = ref(15);
const currentPoints = ref(200);

// 环保行为库
const ecoActions = reactive([
  {
    id: 1,
    name: '垃圾分类投放',
    type: 'primary',
    icon: 'el-icon-s-grid',
    points: 10,
    carbonReduction: 0.1,
  },
  {
    id: 2,
    name: '绿色出行',
    type: 'success',
    icon: 'el-icon-bicycle',
    points: 10,
    carbonReduction: 0.5,
  },
  {
    id: 3,
    name: '节约用电',
    type: 'warning',
    icon: 'el-icon-lightning',
    points: 10,
    carbonReduction: 0.2,
  },
  {
    id: 4,
    name: '节约用水',
    type: 'info',
    icon: 'el-icon-watermelon',
    points: 10,
    carbonReduction: 0.1,
  },
  {
    id: 5,
    name: '减少使用一次性用品',
    type: 'danger',
    icon: 'el-icon-s-finance',
    points: 10,
    carbonReduction: 0.3,
  },
  {
    id: 6,
    name: '旧物回收/二手利用',
    type: 'primary',
    icon: 'el-icon-s-opportunity',
    points: 10,
    carbonReduction: 0.4,
  },
  {
    id: 7,
    name: '植树/绿植养护',
    type: 'success',
    icon: 'el-icon-sunny',
    points: 10,
    carbonReduction: 1.0,
  },
  {
    id: 8,
    name: '环保知识学习',
    type: 'warning',
    icon: 'el-icon-notebook-2',
    points: 10,
    carbonReduction: 0.1,
  },
  {
    id: 9,
    name: '自带水杯/餐具',
    type: 'info',
    icon: 'el-icon-cup',
    points: 10,
    carbonReduction: 0.2,
  },
]);

// 打卡表单
const checkInForm = reactive({
  actionId: '',
  remark: '',
  images: [] as Array<{ name: string; url: string }>,
});

// 打卡历史
const checkInHistory = ref([
  {
    date: '2026-03-29',
    action: '垃圾分类投放',
    remark: '今天认真分类了垃圾',
    points: 10,
  },
  {
    date: '2026-03-28',
    action: '绿色出行',
    remark: '骑自行车上班',
    points: 10,
  },
  {
    date: '2026-03-27',
    action: '节约用电',
    remark: '随手关灯',
    points: 10,
  },
]);

// 打卡对话框
const showCheckInDialog = ref(false);

// 选择环保行为
const selectAction = (action: any) => {
  checkInForm.actionId = action.id;
  showCheckInDialog.value = true;
};

// 图片上传成功
const handleImageSuccess = (response: any, file: any) => {
  checkInForm.images.push({
    name: file.name,
    url: response.data.url,
  });
};

// 图片移除
const handleImageRemove = (_file: any, fileList: any) => {
  checkInForm.images = fileList;
};

// 提交打卡
const submitCheckIn = async () => {
  if (!checkInForm.actionId) {
    ElMessage.warning('请选择环保行为');
    return;
  }

  // 调用打卡 API
  ElMessage.success('打卡成功');

  // 更新状态
  hasCheckedToday.value = true;
  continuousDays.value += 1;
  totalCheckIns.value += 1;
  currentPoints.value += 10;

  // 添加到历史记录
  const selectedAction = ecoActions.find(
    (action) => action.id === Number(checkInForm.actionId)
  );
  checkInHistory.value.unshift({
    date: new Date().toISOString().split('T')[0],
    action: selectedAction?.name || '',
    remark: checkInForm.remark,
    points: 10,
  });

  // 重置表单
  checkInForm.actionId = '';
  checkInForm.remark = '';
  checkInForm.images = [];

  // 关闭对话框
  showCheckInDialog.value = false;

  // 检查连续打卡奖励
  checkContinuousReward();
};

// 检查连续打卡奖励
const checkContinuousReward = () => {
  const days = continuousDays.value;
  if (days === 7) {
    ElMessage.success('恭喜！连续打卡7天，获得额外50积分奖励');
    currentPoints.value += 50;
  } else if (days === 30) {
    ElMessage.success('恭喜！连续打卡30天，获得额外150积分奖励');
    currentPoints.value += 150;
  } else if (days === 90) {
    ElMessage.success('恭喜！连续打卡90天，获得额外300积分奖励');
    currentPoints.value += 300;
  }
};

// 页面加载时获取打卡状态
onMounted(() => {
  // 调用获取打卡状态的 API
  console.log('获取打卡状态');
});
</script>

<style scoped>
@import './index.scss';
</style>
