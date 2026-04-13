import type {
  User,
  EcoAction,
  CheckIn,
  Post,
  Achievement,
  Reward,
  PlatformStats,
  HotAction,
  ActivityItem,
} from '../types';

// 环保行为数据
export const ecoActions: EcoAction[] = [
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
    points: 15,
    carbonReduction: 0.3,
  },
  {
    id: 6,
    name: '旧物回收/二手利用',
    type: 'primary',
    icon: 'el-icon-s-opportunity',
    points: 15,
    carbonReduction: 0.4,
  },
  {
    id: 7,
    name: '植树/绿植养护',
    type: 'success',
    icon: 'el-icon-sunny',
    points: 20,
    carbonReduction: 1.0,
  },
  {
    id: 8,
    name: '环保知识学习',
    type: 'warning',
    icon: 'el-icon-notebook-2',
    points: 10,
    carbonReduction: 0,
  },
  {
    id: 9,
    name: '自带水杯/餐具',
    type: 'info',
    icon: 'el-icon-cup',
    points: 15,
    carbonReduction: 0.2,
  },
];

// 用户数据
export const users: User[] = [
  {
    id: 1,
    nickname: '环保达人',
    phone: '13800138001',
    avatar: '',
    totalCheckIns: 120,
    totalPoints: 1200,
    status: 'active',
    createdAt: '2026-01-01 10:00:00',
  },
  {
    id: 2,
    nickname: '绿色生活',
    phone: '13800138002',
    avatar: '',
    totalCheckIns: 80,
    totalPoints: 800,
    status: 'active',
    createdAt: '2026-01-02 11:00:00',
  },
  {
    id: 3,
    nickname: '低碳出行',
    phone: '13800138003',
    avatar: '',
    totalCheckIns: 50,
    totalPoints: 500,
    status: 'disabled',
    createdAt: '2026-01-03 12:00:00',
  },
  {
    id: 4,
    nickname: '垃圾分类',
    phone: '13800138004',
    avatar: '',
    totalCheckIns: 30,
    totalPoints: 300,
    status: 'active',
    createdAt: '2026-01-04 13:00:00',
  },
  {
    id: 5,
    nickname: '节约用水',
    phone: '13800138005',
    avatar: '',
    totalCheckIns: 20,
    totalPoints: 200,
    status: 'active',
    createdAt: '2026-01-05 14:00:00',
  },
];

// 打卡记录数据
export const checkins: CheckIn[] = [
  {
    id: 1,
    userId: 1,
    userNickname: '环保达人',
    action: '垃圾分类投放',
    remark: '今天认真分类了垃圾',
    images: ['https://example.com/image1.jpg'],
    createdAt: '2026-03-25 08:00:00',
  },
  {
    id: 2,
    userId: 2,
    userNickname: '绿色生活',
    action: '绿色出行',
    remark: '骑自行车上班',
    images: ['https://example.com/image2.jpg'],
    createdAt: '2026-03-25 09:00:00',
  },
  {
    id: 3,
    userId: 3,
    userNickname: '低碳出行',
    action: '节约用电',
    remark: '随手关灯',
    images: [],
    createdAt: '2026-03-25 10:00:00',
  },
  {
    id: 4,
    userId: 4,
    userNickname: '垃圾分类',
    action: '旧物回收',
    remark: '回收了旧衣服',
    images: ['https://example.com/image3.jpg'],
    createdAt: '2026-03-25 11:00:00',
  },
  {
    id: 5,
    userId: 5,
    userNickname: '节约用水',
    action: '节约用水',
    remark: '关紧水龙头',
    images: [],
    createdAt: '2026-03-25 12:00:00',
  },
];

// 社区动态数据
export const posts: Post[] = [
  {
    id: 1,
    title: '今天开始垃圾分类',
    content: '今天开始认真垃圾分类，希望能为环保做出一点贡献！',
    images: [],
    user: {
      id: 1,
      nickname: '环保小卫士',
      avatar: '',
    },
    createdAt: '2026-03-29 10:00',
    likes: 15,
    liked: false,
    comments: [
      {
        id: 1,
        user: {
          id: 2,
          nickname: '绿色生活',
          avatar: '',
        },
        content: '很棒！一起加油',
        createdAt: '2026-03-29 10:30',
        likes: 3,
        liked: false,
      },
    ],
    showComments: false,
  },
  {
    id: 2,
    title: '绿色出行的一天',
    content: '今天全程骑自行车上班，感觉很健康，也为环保出了一份力！',
    images: [],
    user: {
      id: 2,
      nickname: '绿色生活',
      avatar: '',
    },
    createdAt: '2026-03-28 14:30',
    likes: 23,
    liked: true,
    comments: [],
    showComments: false,
  },
  {
    id: 3,
    title: '旧物改造小技巧',
    content: '把旧衣服改造成环保袋，既实用又环保，大家可以试试！',
    images: [],
    user: {
      id: 3,
      nickname: '创意环保',
      avatar: '',
    },
    createdAt: '2026-03-27 09:15',
    likes: 18,
    liked: false,
    comments: [],
    showComments: false,
  },
];

// 成就数据
export const achievements: Achievement[] = [
  {
    id: 1,
    name: '入门勋章',
    description: '累计打卡7天',
    icon: 'el-icon-medal',
    unlocked: true,
    progress: 15,
    target: 7,
  },
  {
    id: 2,
    name: '进阶勋章',
    description: '累计打卡30天，连续打卡7天',
    icon: 'el-icon-crown',
    unlocked: true,
    progress: 15,
    target: 30,
  },
  {
    id: 3,
    name: '高级勋章',
    description: '累计打卡100天，连续打卡30天',
    icon: 'el-icon-sunny',
    unlocked: false,
    progress: 15,
    target: 100,
  },
  {
    id: 4,
    name: '终极勋章',
    description: '累计打卡365天，连续打卡90天',
    icon: 'el-icon-star-on',
    unlocked: false,
    progress: 15,
    target: 365,
  },
];

// 奖励数据
export const rewards: Reward[] = [
  {
    id: 1,
    name: '环保先锋勋章',
    description: '象征环保先锋的荣誉勋章',
    points: 500,
    type: 'badge',
  },
  {
    id: 2,
    name: '绿色地球壁纸',
    description: '精美的绿色地球主题壁纸',
    points: 300,
    type: 'wallpaper',
  },
  {
    id: 3,
    name: '环保贡献证书',
    description: '电子环保贡献证书',
    points: 1000,
    type: 'certificate',
  },
];

// 平台统计数据
export const platformStats: PlatformStats = {
  totalUsers: 1000,
  totalCheckins: 5000,
  activeUsers: 800,
  totalCarbonReduction: 1250,
};

// 热门行为数据
export const hotActions: HotAction[] = [
  { name: '垃圾分类投放', count: 1200, percentage: 24 },
  { name: '绿色出行', count: 1000, percentage: 20 },
  { name: '节约用电', count: 800, percentage: 16 },
  { name: '节约用水', count: 700, percentage: 14 },
  { name: '减少使用一次性用品', count: 500, percentage: 10 },
  { name: '旧物回收/二手利用', count: 300, percentage: 6 },
  { name: '植树/绿植养护', count: 200, percentage: 4 },
  { name: '环保知识学习', count: 200, percentage: 4 },
  { name: '自带水杯/餐具', count: 100, percentage: 2 },
];

// 活跃度数据
export const activityData: ActivityItem[] = [
  { date: '3-19', value: 120 },
  { date: '3-20', value: 150 },
  { date: '3-21', value: 130 },
  { date: '3-22', value: 180 },
  { date: '3-23', value: 160 },
  { date: '3-24', value: 140 },
  { date: '3-25', value: 170 },
];

// 模拟打卡日期数据
export const checkInDates: string[] = [
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
];

// 打卡行为映射
export const checkInActions: Record<string, string> = {
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
};
