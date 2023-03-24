import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';

export default () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle="对不起，你没有权限访问该页面"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      }
    />
  );
};
