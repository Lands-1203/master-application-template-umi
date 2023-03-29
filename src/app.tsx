import { InitialStateType } from '@@/plugin-initialState/@@initialState';
import { MasterOptions } from '@@/plugin-qiankun-master/types';
import {
  PageLoading,
  SettingDrawer,
  Settings as LayoutSettings
} from '@ant-design/pro-components';
import DynamicTheme from '@c/DynamicTheme';
import Footer from '@c/Footer';
import { AvatarDropdown, AvatarName } from '@c/RightContent/AvatarDropdown';
import { dynamicNavTheme } from '@u/index';
import { RunTimeLayoutConfig, useModel } from '@umijs/max';
import { Route } from '@umijs/route-utils/dist/types';
import { cloneDeep } from 'lodash';
import defaultSettings from '../config/defaultSettings';
import { default as initMenuData } from './initMenuData.mock';
import UnAccessible from './pages/exception/404';
import { errorConfig } from './requestErrorConfig';
import { getCacheNavTheme, navThemeKey } from './storageManagement';

// const loginPath = '/user/login';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 *
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.currentUserProps;
  systemInfo?: API.systemInfoProps;
  loading?: boolean;
  initMenuData?: Record<string, any>;
  headerRenderPropsData?: Route[];
}> {
  const navTheme = getCacheNavTheme();
  return {
    currentUser: {
      name: 'lantao',
    },
    initMenuData,
    settings: {
      ...defaultSettings,
      navTheme: navTheme === 'auto' ? dynamicNavTheme() : navTheme,
    } as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    waterMarkProps: {
      content: '水印',
    },
    actionsRender: () => [
      <DynamicTheme
        key="navTheme"
        initialState={initialState}
        setInitialState={setInitialState}
        dynamicNavTheme={dynamicNavTheme}
        localStorageKey={navThemeKey}
      />,
    ],
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },

    headerRender: (props, defaultDom) => {
      setInitialState({
        ...initialState,
        headerRenderPropsData: (props as any)?.route?.routes,
      });
      console.log(props, 'lands');
      return defaultDom;
    },
    menu: {
      params: { initMenuData },
      request: async ({ initMenuData }) => {
        return cloneDeep(initMenuData) || []; //为什么这儿要用深拷贝？因为不同的uim版本会导致我丢给他的对象内部属性children变成router 所以用深度拷贝单独给他一个对象
      },
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const navTheme = dynamicNavTheme();
      if (
        localStorage.getItem(navThemeKey) === 'auto' &&
        navTheme !== initialState?.settings?.navTheme
      ) {
        setInitialState({
          ...initialState,
          settings: {
            ...initialState?.settings,
            navTheme: navTheme,
          },
        });
      }
    },
    unAccessible: <UnAccessible />,
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* 动态主题设置 */}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};

export const qiankun: MasterOptions = {
  apps: [
    {
      name: 'businessPlatform',
      entry: '//localhost:8880/',
    },
  ],
  lifeCycles: {
    // 所有子应用在挂载完成时，打印 props 信息
    async afterMount(props: any) {
      console.log('%c 所有子应用加载完毕', 'color: green', props);
    },
  },
};
export function useQiankunStateForSlave(): API.useQiankunStateForSlaveReturnProps<InitialStateType> {
  const {
    initialState: masterState,
    loading: masterLoading,
    error: masterError,
    refresh: masterRefresh,
    setInitialState: setMasterState,
  } = useModel('@@initialState');
  return {
    masterState,
    masterLoading,
    masterError,
    masterRefresh,
    setMasterState,
  };
}
