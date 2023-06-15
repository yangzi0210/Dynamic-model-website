import { request } from 'umi';
import { API_PREFIX } from './settings';

export const currentMenu = async (options?: { [key: string]: any }) =>
  request(`${API_PREFIX}/menus/backend`, {
    method: 'GET',
    ...(options || {}),
  });
