<template>
  <div class="login-page">
    <div class="login-card">
      <!-- 标题区 -->
      <div class="login-header">
        <h1 class="login-title">🌍 环保打卡</h1>
        <p class="login-subtitle">
          {{
            isRegister ? '欢迎注册，加入绿色生活' : '欢迎登录，记录你的绿色生活'
          }}
        </p>
      </div>

      <!-- 登录表单 -->
      <div v-if="!isRegister">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              size="large"
              prefix-icon="Phone"
              clearable
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              @click="handleLogin"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <!-- 底部链接 -->
        <div class="login-footer">
          <el-button text @click="isRegister = true">
            还没有账号？去注册
          </el-button>
        </div>
      </div>

      <!-- 注册表单 -->
      <div v-else>
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
          label-width="80px"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入手机号"
              size="large"
              prefix-icon="Phone"
              clearable
            />
          </el-form-item>
          <el-form-item prop="code">
            <div class="code-box">
              <el-input
                v-model="registerForm.code"
                placeholder="请输入验证码"
                size="large"
                prefix-icon="Lock"
                clearable
              />
              <el-button
                size="large"
                :disabled="codeDisabled"
                @click="handleGetCode"
                class="code-btn"
              >
                {{ codeDisabled ? `${codeTime}s` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item prop="nickname">
            <el-input
              v-model="registerForm.nickname"
              placeholder="请输入昵称"
              size="large"
              prefix-icon="User"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请确认密码"
              size="large"
              prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="register-btn"
              @click="handleRegister"
              :loading="loading"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
        <!-- 底部链接 -->
        <div class="login-footer">
          <el-button text @click="isRegister = false">
            已有账号？去登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { login, register, getCode } from '@/api/user';

const router = useRouter();
const userStore = useUserStore();
const loginFormRef = ref();
const registerFormRef = ref();
const loading = ref(false);
const isRegister = ref(false);

const loginForm = reactive({
  phone: '',
  password: '',
});

const registerForm = reactive({
  phone: '',
  code: '', // 验证码
  nickname: '',
  password: '',
  confirmPassword: '',
});
// 登录表单验证规则
const loginRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' },
  ],
};
// 注册表单验证规则
const registerRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为2-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, message: '确认密码至少6位', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};
// 验证码倒计时
const codeDisabled = ref(false);
const codeTime = ref(60);
let timer: any = null;
// 获取验证码
const handleGetCode = async () => {
  // 先校验手机号
  if (!/^1[3-9]\d{9}$/.test(registerForm.phone)) {
    ElMessage.warning('请输入正确的手机号');
    return;
  }
  // 调用后端接口
  await getCode(registerForm.phone);
  ElMessage.success('验证码已发送，控制台查看');

  // 倒计时
  codeDisabled.value = true;
  timer = setInterval(() => {
    codeTime.value--;
    if (codeTime.value <= 0) {
      clearInterval(timer);
      codeDisabled.value = false;
      codeTime.value = 60;
    }
  }, 1000);
};
// 注册
const handleRegister = async () => {
  try {
    await registerFormRef.value.validate();
    const res = await register({
      phone: registerForm.phone,
      password: registerForm.password,
      nickname: registerForm.nickname,
    });
    if (res.data.code === 200) {
      ElMessage.success('注册成功');
      userStore.setToken(res.data.data);
    }
  } catch (error: any) {
    ElMessage.error(error.message);
  } finally {
    router.push('/login');
  }
};
// 登录
const handleLogin = async () => {
  try {
    await loginFormRef.value.validate();
    const res = await login(loginForm);
    console.log(res);
    if (res.data.code === 200) {
      ElMessage.success('登录成功');
      userStore.setToken(res.data.data);
    }
  } catch  {
    ElMessage.error('登录失败');
  } finally {
    router.push('/');
  }
};
</script>

<style scoped>
@import './index.scss';
</style>
