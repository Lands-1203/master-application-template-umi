import EventEmitter from 'eventemitter3';

export type GlobalEventType = {
  ['showGlobalTabBar']: boolean;
  ['clearGlobalTabBarList']: boolean;
};

/**
 * 全局事件监听器
 *
 * 1. api请求回调
 */
export const GLOBAL_EVENT = new EventEmitter<GlobalEventType>();
