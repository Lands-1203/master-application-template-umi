import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = `${dayjs().year()}科技（重庆）有限公司`;

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={defaultMessage}
      links={[
        {
          key: 'Business platform',
          title: '业务平台',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'hz',
          title: <GithubOutlined />,
          href: '/',
          blankTarget: true,
        },
        {
          key: 'Financial gateway platform',
          title: '金融网关平台',
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
