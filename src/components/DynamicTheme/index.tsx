import { InitialStateType } from '@@/plugin-initialState/@@initialState';
import { Segmented } from 'antd';
interface IProps {
  initialState: InitialStateType;
  setInitialState: (
    initialState:
      | InitialStateType
      | ((initialState: InitialStateType) => InitialStateType),
  ) => Promise<void>;
  dynamicNavTheme: () => string;
  localStorageKey?: string;
}
export default (props: IProps) => {
  const {
    initialState,
    setInitialState,
    dynamicNavTheme,
    localStorageKey = '__navTheme',
  } = props;
  return (
    <Segmented
      key={'navTheme'}
      defaultValue={localStorage.getItem(localStorageKey) || 'light'}
      onChange={(v: any) => {
        localStorage.setItem(localStorageKey, v);
        setInitialState({
          ...initialState,
          settings: {
            ...initialState?.settings,
            navTheme: v === 'auto' ? dynamicNavTheme() : v,
          },
        });
      }}
      options={[
        {
          value: 'light',
          icon: '🌞',
        },
        {
          value: 'auto',
          icon: '🌓',
        },
        {
          value: 'realDark',
          icon: '🌜',
        },
      ]}
    />
  );
};
