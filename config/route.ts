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
    name: '管理页面',
    icon: 'TableOutlined',
    path: '/basic-list/*',
    component: './BasicList',
  },
  {
    name: '单页编辑',
    icon: 'TableOutlined',
    path: '/basic-list/api/:name/:id',
    component: './BasicList/components/EditPage',
    hideInMenu: true,
  },
  {
    name: '模型设计',
    icon: 'ControlFilled',
    path: '/model-design/*',
    component: './ModelDesign',
  },
];
