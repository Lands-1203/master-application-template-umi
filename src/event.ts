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
/** 全局系统级监听时间 可用于系统之间的及时通信 */
export const registerGlobalEvent = () => {
  (window as any).__GlobalSystemEvent = new EventEmitter<GlobalEventType>();
};
