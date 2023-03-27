// import { useNavigate } from '@umijs/max';
import { Result } from 'antd';

export default () => {
  // const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle="对不起，服务器出错了"
      // extra={<Button type="primary">Back Home</Button>}
    />
  );
};
