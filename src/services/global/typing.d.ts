declare namespace API {
  type currentUserProps = Record<string, any>;
  type systemInfoProps = Record<string, any>;
  interface useQiankunStateForSlaveReturnProps<T> {
    masterState: T;
    masterLoading: boolean;
    masterError?: Error;
    /** 重新执行 getInitialState 方法，并获取新数据。 */
    masterRefresh: () => Promise<void>;
    setMasterState: React.Dispatch<React.SetStateAction<T>>;
  }
}

declare namespace LOGIN_API {
  interface LoginParams {
    username: string;
    password: string;
  }
}
