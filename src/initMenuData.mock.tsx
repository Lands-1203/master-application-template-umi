import { LaptopOutlined, SmileOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';

export default [
  {
    name: '业务系统',
    icon: <LaptopOutlined />,
    path: '/businessPlatform',
    children: [
      { name: '欢迎页', icon: <LaptopOutlined />, path: '/businessPlatform' },
    ],
  },
  {
    name: '主系统',
    icon: <LaptopOutlined />,
    path: '/',
    children: [
      {
        name: '欢迎页',
        icon: <SmileOutlined />,
        path: '/Welcome',
      },
      {
        name: '欢迎页',
        icon: <SmileOutlined />,
        path: '/Welcome1',
      },
    ],
  },
] as MenuDataItem[];
