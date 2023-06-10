export const route = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    icon: 'HomeOutlined',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    icon: 'ControlOutlined',
    path: '/access',
    component: './Access',
  },
  {
    name: 'basic-list',
    icon: 'TableOutlined',
    path: '/basicList',
    component: './BasicList',
  },
];
