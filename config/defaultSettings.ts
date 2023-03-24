import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
export default {
  title: '主应用',
  colorPrimary: '#1890ff',
  // 导航模式
  layout: 'mix',
  splitMenus: true,
  // 内容区域宽度
  contentWidth: 'Fluid',
  // 头部固定
  fixedHeader: false,
  // 固定侧边栏
  fixSiderbar: true,
  pwa: true,
  headerHeight: 48,
  // 侧边菜单类型
  // siderMenuType: 'group',
  // 侧边菜单为空时不显示 侧边栏
  // suppressSiderWhenMenuEmpty: false,
  // 色弱模式
  colorWeak: false,
  // 不显示头部
  // headerRender: false,
  // 不显示页脚
  // footerRender: false,
  // 不显示菜单
  // menuRender: false,
  // 不显示菜单头
  // menuHeaderRender: false,
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
} as ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
};
