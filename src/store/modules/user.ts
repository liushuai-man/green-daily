import { defineStore } from 'pinia';

interface UserState {
  token: string;
  userInfo: Record<string, any>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: {},
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = '';
      this.userInfo = {};
      localStorage.removeItem('token');
    },
  },
});
