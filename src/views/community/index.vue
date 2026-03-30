<template>
  <div class="community-page">
    <!-- 页面标题 -->
    <el-card class="community-card">
      <template #header>
        <div class="card-header">
          <span>环保社区</span>
          <el-button type="primary" @click="showPostDialog = true"
            >发布动态</el-button
          >
        </div>
      </template>

      <!-- 筛选和排序 -->
      <div class="filter-section">
        <el-tabs v-model="activeTab" class="community-tabs">
          <el-tab-pane label="最新" name="latest" />
          <el-tab-pane label="热门" name="hot" />
        </el-tabs>
      </div>

      <!-- 动态列表 -->
      <div class="posts-section">
        <div v-for="post in posts" :key="post.id" class="post-item">
          <el-card shadow="hover" class="post-card">
            <div class="post-header">
              <el-avatar :size="48" class="user-avatar">
                <img
                  v-if="post.user.avatar"
                  :src="post.user.avatar"
                  alt="头像"
                />
                <span v-else>{{ post.user.nickname.charAt(0) }}</span>
              </el-avatar>
              <div class="user-info">
                <h4>{{ post.user.nickname }}</h4>
                <p>{{ post.createdAt }}</p>
              </div>
            </div>
            <div class="post-content">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
              <div v-if="post.images.length > 0" class="post-images">
                <el-image
                  v-for="(image, index) in post.images"
                  :key="index"
                  :src="image"
                  :preview-src-list="post.images"
                  class="post-image"
                />
              </div>
            </div>
            <div class="post-footer">
              <div class="post-stats">
                <el-button
                  type="text"
                  @click="toggleLike(post)"
                  :class="{ liked: post.liked }"
                >
                  <i class="el-icon-thumb" :class="{ liked: post.liked }"></i>
                  {{ post.likes }}
                </el-button>
                <el-button type="text" @click="showComments(post)">
                  <i class="el-icon-chat-line-round"></i>
                  {{ post.comments.length }}
                </el-button>
                <el-button type="text">
                  <i class="el-icon-share"></i>
                  分享
                </el-button>
              </div>
              <div class="post-actions">
                <el-button size="small" type="text" @click="reportPost(post)"
                  >举报</el-button
                >
              </div>
            </div>
            <!-- 评论区 -->
            <div v-if="post.showComments" class="comments-section">
              <div
                v-for="comment in post.comments"
                :key="comment.id"
                class="comment-item"
              >
                <el-avatar :size="32" class="comment-avatar">
                  <img
                    v-if="comment.user.avatar"
                    :src="comment.user.avatar"
                    alt="头像"
                  />
                  <span v-else>{{ comment.user.nickname.charAt(0) }}</span>
                </el-avatar>
                <div class="comment-content">
                  <div class="comment-header">
                    <h5>{{ comment.user.nickname }}</h5>
                    <p>{{ comment.createdAt }}</p>
                  </div>
                  <p>{{ comment.content }}</p>
                  <div class="comment-actions">
                    <el-button
                      size="small"
                      type="text"
                      @click="replyComment(comment)"
                      >回复</el-button
                    >
                    <el-button
                      size="small"
                      type="text"
                      @click="likeComment(comment)"
                    >
                      <i
                        class="el-icon-thumb"
                        :class="{ liked: comment.liked }"
                      ></i>
                      {{ comment.likes }}
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="comment-form">
                <el-input
                  v-model="commentForm.content"
                  type="textarea"
                  placeholder="写下你的评论"
                  :rows="2"
                />
                <el-button
                  type="primary"
                  size="small"
                  @click="submitComment(post)"
                  >发布评论</el-button
                >
              </div>
            </div>
          </el-card>
        </div>

        <!-- 加载更多 -->
        <div class="load-more">
          <el-button type="primary" @click="loadMore">加载更多</el-button>
        </div>
      </div>
    </el-card>

    <!-- 发布动态对话框 -->
    <el-dialog v-model="showPostDialog" title="发布动态" width="600px">
      <el-form :model="postForm" class="post-form">
        <el-form-item label="标题">
          <el-input v-model="postForm.title" placeholder="请输入动态标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="postForm.content"
            type="textarea"
            placeholder="请描述你的环保行为或分享环保经验"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="'/api/upload'"
            :on-success="handlePostImageSuccess"
            :on-remove="handlePostImageRemove"
            :file-list="postForm.images"
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
        <el-form-item label="隐私设置">
          <el-radio-group v-model="postForm.privacy">
            <el-radio label="public">公开</el-radio>
            <el-radio label="private">私密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPostDialog = false">取消</el-button>
          <el-button type="primary" @click="submitPost">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 活跃标签
const activeTab = ref('latest');

// 动态列表
const posts = ref<
  Array<{
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
    comments: Array<{
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
    }>;
    showComments: boolean;
  }>
>([
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
        likes: 5,
        liked: false,
      },
    ],
    showComments: false,
  },
  {
    id: 2,
    title: '绿色出行第一天',
    content: '今天骑自行车上班，感觉非常好，既环保又锻炼了身体！',
    images: [],
    user: {
      id: 2,
      nickname: '绿色生活',
      avatar: '',
    },
    createdAt: '2026-03-28 09:00',
    likes: 20,
    liked: true,
    comments: [],
    showComments: false,
  },
  {
    id: 3,
    title: '自制环保酵素',
    content: '尝试制作环保酵素，用来浇花和清洁，效果不错！',
    images: [],
    user: {
      id: 3,
      nickname: '自然达人',
      avatar: '',
    },
    createdAt: '2026-03-27 14:00',
    likes: 25,
    liked: false,
    comments: [],
    showComments: false,
  },
]);

// 发布动态表单
const showPostDialog = ref(false);
const postForm = reactive({
  title: '',
  content: '',
  images: [] as Array<{ name: string; url: string }>,
  privacy: 'public',
});

// 评论表单
const commentForm = reactive({
  content: '',
});

// 切换点赞状态
const toggleLike = (post: any) => {
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
};

// 显示评论
const showComments = (post: any) => {
  post.showComments = !post.showComments;
};

// 回复评论
const replyComment = (_comment: any) => {
  ElMessage.info('回复评论功能开发中');
};

// 点赞评论
const likeComment = (comment: any) => {
  comment.liked = !comment.liked;
  comment.likes += comment.liked ? 1 : -1;
};

// 提交评论
const submitComment = (post: any) => {
  if (!commentForm.content) {
    ElMessage.warning('请输入评论内容');
    return;
  }

  post.comments.push({
    id: post.comments.length + 1,
    user: {
      id: 1,
      nickname: '管理员',
      avatar: '',
    },
    content: commentForm.content,
    createdAt: new Date().toLocaleString(),
    likes: 0,
    liked: false,
  });

  commentForm.content = '';
  ElMessage.success('评论发布成功');
};

// 举报动态
const reportPost = (_post: any) => {
  ElMessage.info('举报功能开发中');
};

// 图片上传成功
const handlePostImageSuccess = (response: any, file: any) => {
  postForm.images.push({
    name: file.name,
    url: response.data.url,
  });
};

// 图片移除
const handlePostImageRemove = (_file: any, fileList: any) => {
  postForm.images = fileList;
};

// 提交动态
const submitPost = () => {
  if (!postForm.title || !postForm.content) {
    ElMessage.warning('请填写标题和内容');
    return;
  }

  // 调用发布动态 API
  posts.value.unshift({
    id: posts.value.length + 1,
    title: postForm.title,
    content: postForm.content,
    images: postForm.images.map((img: any) => img.url),
    user: {
      id: 1,
      nickname: '管理员',
      avatar: '',
    },
    createdAt: new Date().toLocaleString(),
    likes: 0,
    liked: false,
    comments: [],
    showComments: false,
  });

  // 重置表单
  postForm.title = '';
  postForm.content = '';
  postForm.images = [];
  postForm.privacy = 'public';

  // 关闭对话框
  showPostDialog.value = false;
  ElMessage.success('动态发布成功');
};

// 加载更多
const loadMore = () => {
  ElMessage.info('加载更多功能开发中');
};
</script>

<style scoped>
@import './index.scss';
</style>
