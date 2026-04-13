// 用户类型
export interface User {
  id: number;
  nickname: string;
  phone: string;
  avatar: string;
  status: 'active' | 'disabled';
  createdAt: string;
  totalCheckIns?: number;
  totalPoints?: number;
}

// 环保行为类型
export interface EcoAction {
  id: number;
  name: string;
  type: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  icon: string;
  points?: number;
  carbonReduction?: number;
}

// 打卡记录类型
export interface CheckIn {
  id: number;
  userId: number;
  userNickname: string;
  action: string;
  remark: string;
  images: string[];
  createdAt: string;
}

// 社区动态类型
export interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  user: {
    id: number;
    nickname: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  showComments?: boolean;
}

// 评论类型
export interface Comment {
  id: number;
  user: {
    id: number;
    nickname: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

// 成就类型
export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

// 奖励类型
export interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  type: 'badge' | 'wallpaper' | 'certificate';
}

// 打卡日历类型
export interface CalendarDay {
  date: string;
  day: number;
  otherMonth: boolean;
  checked: boolean;
  today: boolean;
  action: string;
}

// 减碳趋势类型
export interface CarbonTrendItem {
  date: string;
  value: number;
}

// 行为统计类型
export interface ActionStat {
  name: string;
  count: number;
  percentage: number;
  type: 'primary' | 'success' | 'warning' | 'info' | 'danger';
}

// 平台统计类型
export interface PlatformStats {
  totalUsers: number;
  totalCheckins: number;
  activeUsers: number;
  totalCarbonReduction: number;
}

// 热门行为类型
export interface HotAction {
  name: string;
  count: number;
  percentage: number;
}

// 活跃度数据类型
export interface ActivityItem {
  date: string;
  value: number;
}