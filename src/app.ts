import { PageLoading } from '@ant-design/pro-layout';
import { RunTimeLayoutConfig } from '@umijs/max';
import { message } from 'antd';
import { currentMenu as queryCurrentMenu } from './services/api';
// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: PageLoading,
};

export const getInitialState = async (): Promise<{
  name?: string;
  currentMenu?: any;
}> => {
  const fetchMenu = async () => {
    try {
      const currentMenu = await queryCurrentMenu();
      return currentMenu;
    } catch (error) {
      message.error('Get menu data failed.', 10);
    }
    return undefined;
  };
  const currentMenu = await fetchMenu();
  return { currentMenu, name: 'yangzi' };
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    menuDataRender: () => {
      return initialState?.currentMenu;
    },
    iconfontUrl: '//at.alicdn.com/t/font_2112134_uyx998l7ji.js',
  };
};

const errorHandler = (error: any) => {
  switch (error.name) {
    case 'BizError':
      if (error.data.message) {
        message.error({
          content: error.data.message,
          key: 'process',
          duration: 20,
        });
      } else {
        message.error({
          content: 'Business Error, please try again.',
          key: 'process',
          duration: 20,
        });
      }
      break;
    case 'ResponseError':
      message.error({
        content: `${error.response.status} ${error.response.statusText}. Please try again.`,
        key: 'process',
        duration: 20,
      });
      break;
    case 'TypeError':
      message.error({
        content: `Network error. Please try again.`,
        key: 'process',
        duration: 20,
      });
      break;
    default:
      break;
  }
};

export const request: any = {
  errorHandler,
};
