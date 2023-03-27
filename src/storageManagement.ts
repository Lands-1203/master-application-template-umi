/** 所有的缓存设置在此文件设置好 透出一个函数共外部调用 便于查看系统的所有缓存设置和管理 */
import defaultSettings from '../config/defaultSettings';

/** 用于系统的黑白模式 */
export const navThemeKey = '__navTheme';
type navThemeProps = 'light' | 'realDark' | 'auto';
/** 获取主应用缓存的黑白模式 */
export const getCacheNavTheme = (): navThemeProps => {
  return (localStorage.getItem(navThemeKey) ||
    defaultSettings.navTheme ||
    'light') as navThemeProps;
};
