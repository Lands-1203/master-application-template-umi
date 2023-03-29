import { GLOBAL_EVENT } from '@/event';
import {
  AppstoreOutlined,
  CloseOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from '@umijs/max';
import type { MenuDataItem } from '@umijs/route-utils';
import { getMatchMenu, transformRoute } from '@umijs/route-utils';
import { Route } from '@umijs/route-utils/dist/types';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import cs from 'classnames';
import { ComponentProps, FC, useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './style.less';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type List = MenuDataItem & {
  path: string;
};

export interface TableLayoutProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  menuData: MenuDataItem;
}
const TabsLayout: FC<TableLayoutProps> = ({
  menuData: initMenuRawData,
  ...divProps
}) => {
  let location = useLocation();

  let navigate = useNavigate();
  // 记录列表
  const [list, setList] = useState<List[]>([]);
  // 当前的key
  const [activeKey, setActiveKey] = useState<string>();
  const [show, setShow] = useState<boolean>(true);

  const currentPathConfig = useMemo(() => {
    const { menuData } = transformRoute(
      (initMenuRawData as Route[]) || [],
      undefined,
      undefined,
      true,
    );
    // 动态路由匹配
    return getMatchMenu(location.pathname as string, menuData).pop();
  }, [location.pathname, initMenuRawData]);

  useEffect(() => {
    let path: string = location.pathname || '';
    path = path.substring(path.length - 1) === '/' ? path : `${path}/`;
    if (
      !currentPathConfig ||
      (currentPathConfig.children && currentPathConfig.children?.length > 0)
    ) {
      return;
    }

    if (!currentPathConfig.name) {
      return;
    }
    setList((draft) => {
      if (
        !draft.some((v) => {
          return [`${v.path}/`.toLowerCase(), v.path.toLowerCase()].includes(
            path.toLowerCase(),
          );
        })
      ) {
        return draft.concat({
          ...currentPathConfig,
        } as any);
      }

      return draft;
    });

    setActiveKey(path);
  }, [currentPathConfig, location.pathname]);

  useEffect(() => {
    if (!list.length || !activeKey) {
      return;
    }

    const findIndex = list.findIndex((v) => v.path === activeKey);

    if (findIndex > -1) {
      document
        .querySelectorAll('.global-tabs-layout-item')
        [findIndex]?.scrollIntoView();
    }
  }, [list, activeKey]);

  const handleOnDragEnd: ComponentProps<typeof DragDropContext>['onDragEnd'] = (
    result: any,
  ) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index,
    );

    setList(newList);
  };

  // 水平滚动条监听滑动事件
  useEffect(() => {
    GLOBAL_EVENT.once('showGlobalTabBar', (data) => {
      setShow(data);
    });
    GLOBAL_EVENT.once('clearGlobalTabBarList', () => {
      setList([]);
    });
    // 初始化菜单数据
    const $list = document.querySelector('.global-tabs-layout-list') as
      | HTMLDivElement
      | undefined;

    function scrollHorizontally(event: any) {
      const e = window.event || event;
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      if ($list) {
        $list.scrollLeft -= delta * 50;
      }
      e.preventDefault();
    }

    if ($list) {
      $list.addEventListener('mousewheel', scrollHorizontally, false);
      $list.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    }

    return () => {
      $list?.addEventListener('mousewheel', scrollHorizontally, false);
      $list?.addEventListener('DOMMouseScroll', scrollHorizontally, false);
    };
  }, []);

  const closeSelf = (targetKey: string | undefined) => {
    setList((draft) => {
      const findIndex = draft.findIndex((v) => v.path === targetKey);

      if (findIndex <= -1) {
        return draft;
      }

      if (draft[findIndex].path === activeKey) {
        const offsetActiveKey =
          findIndex + 1 < draft.length
            ? draft[findIndex + 1].path
            : findIndex - 1 >= 0
            ? draft[findIndex - 1].path
            : draft[0].path;

        setActiveKey(offsetActiveKey);
        navigate(offsetActiveKey);
      }

      return draft.filter((_, i) => i !== findIndex);
    });
  };

  const getDropMenu = (targetKey: string | undefined) => {
    const resultMenuArr: ItemType[] = [
      {
        key: '关闭其他',
        label: '关闭其他',
        icon: <CloseOutlined />,
        onClick: () => {
          setList((draft) => {
            const newList = draft.filter((v) => v.path === targetKey);

            setActiveKey(newList[0].path);
            navigate(newList[0].path);

            return newList;
          });
        },
      },
      {
        key: '关闭右侧',
        label: '关闭右侧',
        icon: <RightOutlined />,
        onClick: () => {
          setList((draft) => {
            const findIndex = draft.findIndex((v) => v.path === targetKey);
            if (findIndex <= -1) {
              return draft;
            }
            return draft.filter((_, i) => i <= findIndex);
          });
        },
      },
      {
        key: '关闭左侧',
        label: '关闭左侧',
        icon: <RightOutlined />,
        onClick: () => {
          setList((draft) => {
            const findIndex = draft.findIndex((v) => v.path === targetKey);
            if (findIndex <= -1) {
              return draft;
            }
            return draft.filter((_, i) => i >= findIndex);
          });
        },
      },
    ];
    if (list.length > 1) {
      resultMenuArr.push({
        key: '关闭',
        icon: <CloseOutlined />,
        onClick: closeSelf.bind(null, targetKey),
        label: '关闭',
      });
    }
    return resultMenuArr;
  };

  return show ? (
    <div
      className={`global-tabs-layout-container-div ${divProps.className || ''}`}
      {...divProps}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="global-tabs-layout">
          <Droppable direction="horizontal" droppableId="droppable">
            {(wrapProvided: any, wrapSnapshot: any) => {
              return (
                <div
                  className={cs('global-tabs-layout-list', {
                    'is-draging': wrapSnapshot.isUsingPlaceholder,
                  })}
                  {...wrapProvided.droppableProps}
                  ref={wrapProvided.innerRef}
                >
                  {list.map((item, index) => {
                    return (
                      <Draggable
                        key={item.path}
                        draggableId={item.path}
                        index={index}
                      >
                        {(provided: any) => (
                          <Dropdown
                            menu={{ items: getDropMenu(item.path) }}
                            trigger={['contextMenu']}
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cs('global-tabs-layout-item', {
                                active: item.path === activeKey,
                              })}
                              onClick={() => {
                                if (item.path === activeKey) {
                                  return;
                                }

                                setActiveKey(item.path);
                                navigate(item.path);
                              }}
                            >
                              <div className="global-tabs-layout-item-label">
                                {item.name}
                              </div>

                              {list.length > 1 && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    closeSelf(item.path);
                                  }}
                                  className="global-tabs-layout-item-close"
                                >
                                  <CloseOutlined />
                                </div>
                              )}
                            </div>
                          </Dropdown>
                        )}
                      </Draggable>
                    );
                  })}
                  {wrapProvided.placeholder}
                </div>
              );
            }}
          </Droppable>

          <div className="global-tabs-layout-extra">
            <Dropdown
              menu={{ items: getDropMenu(activeKey) }}
              trigger={['hover']}
            >
              <AppstoreOutlined />
            </Dropdown>
          </div>
        </div>
      </DragDropContext>
    </div>
  ) : (
    <></>
  );
};

export default TabsLayout;
