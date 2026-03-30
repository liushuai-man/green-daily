import { defineStore } from 'pinia';

interface userInfo {
  id: number;
  phone: string;
  nickname: string;
}

interface UserState {
  token: string;
  userInfo: userInfo;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: {
      id: 0,
      phone: '',
      nickname: '',
    },
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = '';
      this.userInfo = {
        id: 0,
        phone: '',
        nickname: '',
      };
      localStorage.removeItem('token');
    },
  },
});
