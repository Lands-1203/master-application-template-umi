import Footer from '@/components/Footer';
import {
  AvatarDropdown,
  AvatarName
} from '@/components/RightContent/AvatarDropdown';
import { InitialStateType } from '@@/plugin-initialState/@@initialState';
import { MasterOptions } from '@@/plugin-qiankun-master/types';
import {
  PageLoading,
  SettingDrawer,
  Settings as LayoutSettings
} from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { useModel } from '@umijs/max';
import { Switch } from 'antd';
import EventEmitter from 'eventemitter3';
import { cloneDeep } from 'lodash';
import defaultSettings from '../config/defaultSettings';
import initMenuData from './initMenuData.mock';
import UnAccessible from './pages/exception/404';
import { errorConfig } from './requestErrorConfig';
// const loginPath = '/user/login';

(window as any).APPEvent = new EventEmitter<string>();

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.currentUserProps;
  systemInfo?: API.systemInfoProps;
  loading?: boolean;
}> {
  return {
    currentUser: {
      name: 'lantao',
    },
    settings: { ...defaultSettings } as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    // loading: true,
    waterMarkProps: {
      content: '水印',
    },
    actionsRender: () => [
      <Switch
        key={''}
        unCheckedChildren="🌞"
        checkedChildren="🌜"
        defaultChecked={initialState?.settings?.navTheme === 'realDark'}
        onChange={(v) => {
          setInitialState({
            ...initialState,
            settings: {
              ...initialState?.settings,
              navTheme: v ? 'realDark' : 'light',
            },
          });
        }}
      />,
    ],
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    menu: {
      params: { initMenuData },
      request: async ({ initMenuData }) => {
        return cloneDeep(initMenuData) || []; //为什么这儿要用深拷贝？因为不同的uim版本会导致我丢给他的对象内部属性children变成router 所以用深度拷贝单独给他一个对象
      },
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
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
