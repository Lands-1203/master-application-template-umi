
export default [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    // 或者使用在线的版本
    schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
    // schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath:
      'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    projectName: 'swagger',
  },
];
