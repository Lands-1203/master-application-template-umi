import CustomErrorBoundary from '@/pages/exception/500';
import { MicroApp } from '@umijs/max';
export default () => {
  return (
    <MicroApp
      name="businessPlatform"
      base="/businessPlatform"
      // autoSetLoading
      errorBoundary={() => <CustomErrorBoundary />}
    />
  );
};
