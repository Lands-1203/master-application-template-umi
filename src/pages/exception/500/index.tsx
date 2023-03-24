// import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';

export default () => {
  // const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle="Sorry, the server is reporting an error."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
