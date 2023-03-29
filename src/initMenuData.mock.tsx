import { LaptopOutlined, SmileOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';

export default [
  {
    name: '业务系统',
    icon: <LaptopOutlined />,
    path: '/businessPlatform',
    children: [
      {
        name: '欢迎页3',
        icon: <LaptopOutlined />,
        path: '/businessPlatform/welcome',
      },
    ],
  },
  {
    name: '主系统',
    icon: <LaptopOutlined />,
    path: '/system',
    children: [
      {
        name: '欢迎页1',
        icon: <SmileOutlined />,
        path: 'welcome',
      },
      {
        name: '欢迎页2',
        icon: <SmileOutlined />,
        path: 'welcome1',
      },
    ],
  },
] as MenuDataItem[];
