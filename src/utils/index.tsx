import dayjs from 'dayjs';

// 动态主题;
export const dynamicNavTheme = () => {
  const isBetween630and1930 =
    dayjs().isBefore(dayjs().hour(19).minute(30).second(0)) &&
    dayjs().isAfter(dayjs().hour(6).minute(30).second(0));
  return isBetween630and1930 ? 'light' : 'realDark';
};
/**
 * tree转map
 * @param data tree数据
 * @param key tree中用key值作为map的键
 * @returns
 */
export function treeToMap(data: any[], key: string) {
  const map: Record<string, any> = {};
  function recu(itemData: any[]) {
    itemData.forEach(async (item, i) => {
      if (item.children && item.children instanceof Array) {
        const children = item.children;
        recu(children);
        // 如果对象中有children则删除
        delete item.children;
      }
      // 通过每个对象中的ID生成一个key为ID的map数组
      map[item[key]] = item;
    });
  }
  recu(data);
  return map;
}