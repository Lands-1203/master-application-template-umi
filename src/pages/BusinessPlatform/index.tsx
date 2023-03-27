import CustomErrorBoundary from '@/pages/exception/500';
import { MicroApp } from '@umijs/max';
import styles from './style.less';
export default () => {
  return (
    <div className={styles.microApp}>
      <MicroApp
        name="businessPlatform"
        base="/businessPlatform"
        // autoSetLoading
        errorBoundary={() => <CustomErrorBoundary />}
      />
    </div>
  );
};
