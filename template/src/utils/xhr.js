import { request } from './tools';

export const login = (params) => request({ ...params, path: '/login', type: 'POST' });
