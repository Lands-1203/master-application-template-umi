import dayjs from 'dayjs';

// 动态主题;
export const dynamicNavTheme = () => {
  const isBetween630and1930 =
    dayjs().isBefore(dayjs().hour(19).minute(30).second(0)) &&
    dayjs().isAfter(dayjs().hour(6).minute(30).second(0));
  return isBetween630and1930 ? 'light' : 'realDark';
};
