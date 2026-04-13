<template>
  <div class="admin-page">
    <!-- 页面标题 -->
    <el-card class="admin-card">
      <template #header>
        <div class="card-header">
          <span>管理后台</span>
        </div>
      </template>

      <!-- 管理员导航 -->
      <el-menu :default-active="activeTab" class="admin-menu" mode="horizontal">
        <el-menu-item index="user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="checkin">
          <el-icon><Check /></el-icon>
          <span>打卡审核</span>
        </el-menu-item>
        <el-menu-item index="action">
          <el-icon><List /></el-icon>
          <span>行为库管理</span>
        </el-menu-item>
        <el-menu-item index="stats">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据统计</span>
        </el-menu-item>
      </el-menu>

      <!-- 内容区域 -->
      <div class="admin-content">
        <!-- 用户管理 -->
        <div v-if="activeTab === 'user'" class="tab-content">
          <el-card shadow="hover" class="content-card">
            <template #header>
              <div class="content-header">
                <span>用户管理</span>
                <el-input
                  v-model="userSearch"
                  placeholder="搜索用户"
                  style="width: 300px"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
            </template>
            <el-table :data="users" style="width: 100%">
              <el-table-column prop="id" label="用户ID" width="80" />
              <el-table-column prop="nickname" label="昵称" />
              <el-table-column prop="phone" label="手机号" />
              <el-table-column
                prop="totalCheckIns"
                label="总打卡天数"
                width="120"
              />
              <el-table-column prop="totalPoints" label="总积分" width="100" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag
                    :type="scope.row.status === 'active' ? 'success' : 'danger'"
                  >
                    {{ scope.row.status === 'active' ? '正常' : '禁用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createdAt" label="注册时间" width="180" />
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="toggleUserStatus(scope.row)"
                  >
                    {{ scope.row.status === 'active' ? '禁用' : '启用' }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalUsers"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </div>

        <!-- 打卡审核 -->
        <div v-if="activeTab === 'checkin'" class="tab-content">
          <el-card shadow="hover" class="content-card">
            <template #header>
              <div class="content-header">
                <span>打卡审核</span>
                <el-input
                  v-model="checkinSearch"
                  placeholder="搜索打卡记录"
                  style="width: 300px"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </div>
            </template>
            <el-table :data="checkins" style="width: 100%">
              <el-table-column prop="id" label="打卡ID" width="80" />
              <el-table-column prop="userId" label="用户ID" width="80" />
              <el-table-column prop="userNickname" label="用户昵称" />
              <el-table-column prop="action" label="打卡行为" />
              <el-table-column
                prop="remark"
                label="备注"
                show-overflow-tooltip
              />
              <el-table-column prop="images" label="图片" width="100">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="previewImage(scope.row.images)"
                  >
                    查看
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="createdAt" label="打卡时间" width="180" />
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteCheckin(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                v-model:current-page="checkinCurrentPage"
                v-model:page-size="checkinPageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCheckins"
                @size-change="handleCheckinSizeChange"
                @current-change="handleCheckinCurrentChange"
              />
            </div>
          </el-card>
        </div>

        <!-- 行为库管理 -->
        <div v-if="activeTab === 'action'" class="tab-content">
          <el-card shadow="hover" class="content-card">
            <template #header>
              <div class="content-header">
                <span>环保行为库管理</span>
                <el-button type="primary" @click="openActionDialog">
                  <el-icon><Plus /></el-icon>
                  新增行为
                </el-button>
              </div>
            </template>
            <el-table :data="actions" style="width: 100%">
              <el-table-column prop="id" label="行为ID" width="80" />
              <el-table-column prop="name" label="行为名称" />
              <el-table-column prop="type" label="行为类型" width="100">
                <template #default="scope">
                  <el-tag
                    :type="scope.row.type === 'basic' ? 'primary' : 'success'"
                  >
                    {{ scope.row.type === 'basic' ? '基础' : '拓展' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="points" label="积分" width="80" />
              <el-table-column
                prop="carbonReduction"
                label="减碳量(kg)"
                width="120"
              />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="editAction(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteAction(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>

        <!-- 数据统计 -->
        <div v-if="activeTab === 'stats'" class="tab-content">
          <el-card shadow="hover" class="content-card">
            <template #header>
              <div class="content-header">
                <span>平台数据统计</span>
              </div>
            </template>

            <!-- 数据概览 -->
            <div class="stats-overview">
              <el-card shadow="hover" class="stat-card">
                <el-statistic
                  :value="platformStats.totalUsers"
                  title="总用户数"
                />
              </el-card>
              <el-card shadow="hover" class="stat-card">
                <el-statistic
                  :value="platformStats.totalCheckins"
                  title="总打卡次数"
                />
              </el-card>
              <el-card shadow="hover" class="stat-card">
                <el-statistic
                  :value="platformStats.activeUsers"
                  title="活跃用户数"
                />
              </el-card>
              <el-card shadow="hover" class="stat-card">
                <el-statistic
                  :value="platformStats.totalCarbonReduction"
                  title="总减碳量(kg)"
                />
              </el-card>
            </div>

            <!-- 热门行为 -->
            <div class="stats-section">
              <h3>热门环保行为</h3>
              <el-table :data="hotActions" style="width: 100%">
                <el-table-column prop="name" label="行为名称" />
                <el-table-column prop="count" label="打卡次数" width="120" />
                <el-table-column prop="percentage" label="占比" width="100">
                  <template #default="scope">
                    {{ scope.row.percentage }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 用户活跃度 -->
            <div class="stats-section">
              <h3>用户活跃度</h3>
              <div class="activity-chart">
                <div
                  v-for="(item, index) in activityData"
                  :key="index"
                  class="activity-item"
                >
                  <div class="activity-date">{{ item.date }}</div>
                  <div class="activity-bar">
                    <div
                      class="activity-bar-fill"
                      :style="{
                        width: (item.value / maxActivityValue) * 100 + '%',
                      }"
                    ></div>
                  </div>
                  <div class="activity-value">{{ item.value }}人</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>

    <!-- 行为编辑对话框 -->
    <el-dialog
      v-model="actionDialogVisible"
      :title="actionDialogTitle"
      width="500px"
    >
      <el-form :model="actionForm" label-width="120px">
        <el-form-item label="行为名称">
          <el-input v-model="actionForm.name" />
        </el-form-item>
        <el-form-item label="行为类型">
          <el-select v-model="actionForm.type">
            <el-option label="主要" value="primary" />
            <el-option label="成功" value="success" />
            <el-option label="警告" value="warning" />
            <el-option label="信息" value="info" />
            <el-option label="危险" value="danger" />
          </el-select>
        </el-form-item>
        <el-form-item label="图标">
          <el-input
            v-model="actionForm.icon"
            placeholder="例如: el-icon-s-grid"
          />
        </el-form-item>
        <el-form-item label="积分">
          <el-input v-model.number="actionForm.points" type="number" />
        </el-form-item>
        <el-form-item label="减碳量(kg)">
          <el-input
            v-model.number="actionForm.carbonReduction"
            type="number"
            step="0.1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="actionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveAction">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="imageDialogVisible" title="图片预览" width="800px">
      <div class="image-preview">
        <img
          v-for="(image, index) in previewImages"
          :key="index"
          :src="image"
          alt="打卡图片"
          class="preview-image"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  User,
  Check,
  List,
  DataAnalysis,
  Search,
  Plus,
} from '@element-plus/icons-vue';
import {
  users as mockUsers,
  checkins as mockCheckins,
  ecoActions,
  platformStats as mockPlatformStats,
  hotActions as mockHotActions,
  activityData as mockActivityData,
} from '@/mock';

// 导航标签
const activeTab = ref('user');

// 用户管理
const userSearch = ref('');
const users = ref([...mockUsers]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalUsers = ref(users.value.length);

// 打卡审核
const checkinSearch = ref('');
const checkins = ref([...mockCheckins]);
const checkinCurrentPage = ref(1);
const checkinPageSize = ref(10);
const totalCheckins = ref(checkins.value.length);

// 行为库管理
const actions = ref([...ecoActions]);

// 行为编辑对话框
const actionDialogVisible = ref(false);
const actionDialogTitle = ref('新增行为');
const actionForm = ref<{
  id: string | number;
  name: string;
  type: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  icon: string;
  points: number;
  carbonReduction: number;
}>({
  id: '',
  name: '',
  type: 'primary',
  icon: 'el-icon-s-grid',
  points: 10,
  carbonReduction: 0.1,
});

// 图片预览
const imageDialogVisible = ref(false);
const previewImages = ref<string[]>([]);

// 平台数据统计
const platformStats = ref({ ...mockPlatformStats });

// 热门行为
const hotActions = ref([...mockHotActions]);

// 用户活跃度
const activityData = ref([...mockActivityData]);

// 最大活跃度值
const maxActivityValue = computed(() => {
  return Math.max(...activityData.value.map((item) => item.value)) * 1.2;
});

// 切换用户状态
const toggleUserStatus = (user: any) => {
  user.status = user.status === 'active' ? 'disabled' : 'active';
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
};

const handleCheckinSizeChange = (size: number) => {
  checkinPageSize.value = size;
};

const handleCheckinCurrentChange = (current: number) => {
  checkinCurrentPage.value = current;
};

// 打开行为编辑对话框
const openActionDialog = () => {
  actionDialogTitle.value = '新增行为';
  actionForm.value = {
    id: '',
    name: '',
    type: 'primary',
    icon: 'el-icon-s-grid',
    points: 10,
    carbonReduction: 0.1,
  };
  actionDialogVisible.value = true;
};

// 编辑行为
const editAction = (action: any) => {
  actionDialogTitle.value = '编辑行为';
  actionForm.value = { ...action };
  actionDialogVisible.value = true;
};

// 保存行为
const saveAction = () => {
  if (actionForm.value.id) {
    // 编辑现有行为
    const index = actions.value.findIndex(
      (a) => a.id === Number(actionForm.value.id)
    );
    if (index !== -1) {
      actions.value[index] = {
        ...actionForm.value,
        id: Number(actionForm.value.id),
      };
    }
  } else {
    // 新增行为
    const newAction = {
      ...actionForm.value,
      id: actions.value.length + 1,
    };
    actions.value.push(newAction);
  }
  actionDialogVisible.value = false;
};

// 删除行为
const deleteAction = (id: number) => {
  actions.value = actions.value.filter((a) => a.id !== id);
};

// 删除打卡记录
const deleteCheckin = (id: number) => {
  checkins.value = checkins.value.filter((c) => c.id !== id);
  totalCheckins.value--;
};

// 预览图片
const previewImage = (images: string[]) => {
  previewImages.value = images;
  imageDialogVisible.value = true;
};

// 页面加载
onMounted(() => {
  // 初始化数据
});
</script>

<style scoped>
@import './index.scss';
</style>
