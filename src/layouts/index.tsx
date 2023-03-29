import LayouTabs from '@/components/LayouTabs';
import initMenuDataMock from '@/initMenuData.mock';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { theme } from 'antd';
import styles from './style.less';
export default function Layout() {
  const token = theme.useToken();
  // 通过css变量设置全局颜色
  document.body.style.setProperty('--primary-color', token.token.colorPrimary);

  return (
    <>
      <LayouTabs
        className={styles['global-layout-layouTabs']}
        menuData={initMenuDataMock}
      />
      <PageContainer header={{ style: { display: 'none' } }}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </PageContainer>
    </>
  );
}
