<template>
  <div class="user-page">
    <!-- 页面标题 -->
    <el-card class="user-card">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
        </div>
      </template>

      <!-- 个人信息卡片 -->
      <div class="user-info-section">
        <el-card shadow="hover" class="info-card">
          <div class="user-avatar-section">
            <el-avatar :size="120" class="user-avatar">
              <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" />
              <span v-else>{{ userInfo.nickname?.charAt(0) || '用' }}</span>
            </el-avatar>
            <el-button type="primary" size="small" @click="uploadAvatar"
              >更换头像</el-button
            >
            <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              style="display: none"
            >
              <el-button type="primary">上传</el-button>
            </el-upload>
          </div>

          <el-form :model="userInfo" class="user-form">
            <el-form-item label="昵称">
              <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="userInfo.phone" disabled />
            </el-form-item>
            <el-form-item label="环保宣言">
              <el-input
                v-model="userInfo.ecoDeclaration"
                type="textarea"
                placeholder="请输入你的环保宣言"
                :rows="3"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo"
                >保存修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <!-- 密码修改卡片 -->
      <div class="password-section">
        <el-card shadow="hover" class="info-card">
          <template #header>
            <div class="card-header">
              <span>修改密码</span>
            </div>
          </template>
          <el-form
            :model="passwordForm"
            :rules="passwordRules"
            ref="passwordFormRef"
            class="password-form"
          >
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input
                v-model="passwordForm.oldPassword"
                type="password"
                placeholder="请输入旧密码"
              />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="请确认新密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword"
                >修改密码</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <!-- 个人数据统计 -->
      <div class="stats-section">
        <el-card shadow="hover" class="info-card">
          <template #header>
            <div class="card-header">
              <span>个人数据统计</span>
            </div>
          </template>
          <div class="stats-grid">
            <div class="stat-item">
              <el-statistic
                :value="userStats.totalCheckIns"
                title="总打卡天数"
              />
            </div>
            <div class="stat-item">
              <el-statistic
                :value="userStats.continuousDays"
                title="连续打卡天数"
              />
            </div>
            <div class="stat-item">
              <el-statistic :value="userStats.totalPoints" title="总积分" />
            </div>
            <div class="stat-item">
              <el-statistic
                :value="userStats.totalCarbonReduction"
                title="累计减碳量(kg)"
              />
            </div>
          </div>
        </el-card>
      </div>

      <!-- 我的成就/勋章 -->
      <div class="achievements-section">
        <el-card shadow="hover" class="info-card">
          <template #header>
            <div class="card-header">
              <span>我的成就</span>
            </div>
          </template>
          <div class="achievements-list">
            <AchievementCard
              v-for="achievement in achievements"
              :key="achievement.id"
              :achievement="achievement"
            />
          </div>
        </el-card>
      </div>

      <!-- 积分兑换 -->
      <div class="points-exchange-section">
        <el-card shadow="hover" class="info-card">
          <template #header>
            <div class="card-header">
              <span>积分兑换</span>
              <el-badge :value="currentPoints" type="primary" />
            </div>
          </template>
          <div class="exchange-items">
            <div
              v-for="item in rewards"
              :key="item.id"
              class="exchange-item"
              :class="{ disabled: currentPoints < item.points }"
            >
              <div class="exchange-item-info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.description }}</p>
                <div class="exchange-item-price">
                  <span class="price">{{ item.points }} 积分</span>
                </div>
              </div>
              <el-button
                type="primary"
                size="small"
                @click="exchangeItem(item)"
                :disabled="currentPoints < item.points"
              >
                兑换
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { ElMessage, ElUpload } from 'element-plus';
import AchievementCard from '@/components/AchievementCard.vue';
import { achievements, rewards } from '@/mock';
import type { Reward } from '@/types';

// 用户信息
const userInfo = reactive({
  nickname: '管理员',
  phone: '18224510833',
  avatar: '',
  ecoDeclaration: '保护环境，从我做起！',
});

// 密码修改表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

// 密码验证规则
const passwordRules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, message: '确认密码至少6位', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: any) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};

// 表单引用
const passwordFormRef = ref();
const uploadRef = ref<InstanceType<typeof ElUpload>>();

// 个人数据统计
const userStats = reactive({
  totalCheckIns: 15,
  continuousDays: 7,
  totalPoints: computed(() => currentPoints.value),
  totalCarbonReduction: 12.5,
});

// 当前积分
const currentPoints = ref(200);

// 上传头像
const uploadAvatar = () => {
  uploadRef.value?.submit();
};

// 头像上传前验证
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    ElMessage.error('只能上传 JPG/PNG 图片!');
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};

// 头像上传成功
const handleAvatarSuccess = (response: any) => {
  userInfo.avatar = response.data.url;
  ElMessage.success('头像上传成功');
};

// 保存用户信息
const saveUserInfo = () => {
  // 调用保存用户信息的 API
  ElMessage.success('保存成功');
};

// 修改密码
const changePassword = async () => {
  if (!passwordFormRef.value) return;
  try {
    await passwordFormRef.value.validate();
    // 调用修改密码的 API
    ElMessage.success('密码修改成功');
    // 重置表单
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  } catch (error) {
    ElMessage.error('请检查输入');
  }
};

// 积分兑换
const exchangeItem = (item: Reward) => {
  if (currentPoints.value < item.points) {
    ElMessage.warning('积分不足');
    return;
  }

  // 调用积分兑换 API
  currentPoints.value -= item.points;
  ElMessage.success(`兑换${item.name}成功`);
};

// 页面加载时获取用户信息
onMounted(() => {
  // 调用获取用户信息的 API
  console.log('获取用户信息');
});
</script>

<style scoped>
@import './index.scss';
</style>
