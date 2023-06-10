import { defineConfig } from '@umijs/max';
import { route } from './route';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '动态模型后台',
  },
  routes: route,
  npmClient: 'yarn',
});
