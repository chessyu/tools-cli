import React, { useEffect, useState } from 'react'
import SelectBlock, { ListType } from '@components/SelectBlock'
import {
  BorderOutlined,
  BoxPlotOutlined,
  HistoryOutlined,
  TableOutlined
} from '@ant-design/icons'
import {
  ABOUTLAYOUT,
  ABOUTLAYOUTTABS,
  PAGEALL,
  PAGEALLTABS,
  CONTROL
} from '../../types/table-design'

import CommonProTable from '@components/CommonProTable'
import { DrawerForm } from '@ant-design/pro-components'
import CommonAboutLayout from '@components/CommonAboutLayout'
import CommonTabs from '@components/CommonTabs'
import CommonTabsTreeTable from '@components/CommonTabsTreeTable'

/** 页面类型列表 */
export const typeList = {
  title: '页面布局',
  key: '1',
  children: [
    {
      title: '整页',
      key: '1-1',
      code: PAGEALL,
      hasComponents: [CONTROL.TABLE],
      icon: <BorderOutlined className=" relative -top-0.5 text-sm" />
    },
    {
      title: '左右布局',
      key: '1-2',
      code: ABOUTLAYOUT,
      hasComponents: [CONTROL.TREE, CONTROL.TABLE],
      icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
    },
    {
      title: '整页 tabs 布局',
      key: '1-3',
      code: PAGEALLTABS,
      hasComponents: [CONTROL.TABS, CONTROL.TABLE],
      icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
    },
    {
      title: '左右 tabs 布局',
      key: '1-4',
      code: ABOUTLAYOUTTABS,
      hasComponents: [CONTROL.TABS, CONTROL.TREE, CONTROL.TABLE],
      icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
    }
  ]
}

/** 页面明细类型列表 */
export const typeListChildren = {
  table: {
    title: 'Table 表格配置',
    key: '2',
    children: [
      {
        title: 'table 其它属性配置',
        key: '2-1',
        code: 'columns',
        hasComponents: [CONTROL.OTHERATTR],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      },
      {
        title: '配置 columns',
        key: '2-2',
        code: 'columns',
        hasComponents: [CONTROL.COLUMNS],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      },
      {
        title: '配置 request',
        key: '2-3',
        code: 'request',
        hasComponents: [CONTROL.REQUEST],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      },
      {
        title: '配置 toolBarRender',
        key: '2-4',
        code: 'toolBarRender',
        hasComponents: [CONTROL.TOOLBARRENDER],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      },
      {
        title: '配置 headerTitle',
        key: '2-5',
        code: 'headerTitle',
        hasComponents: [CONTROL.TOOLBARRENDER],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      }
    ]
  },
  tree: {
    title: 'Tree 组件配置',
    key: '3',
    children: [
      {
        title: 'tree 属性配置',
        key: '3-1',
        code: 'treeAttr',
        hasComponents: [CONTROL.TREEATTR],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      }
    ]
  },
  tabs: {
    title: 'Tabs 组件配置',
    key: '4',
    children: [
      {
        title: 'tabs 属性配置',
        key: '3-1',
        code: 'tabsAttr',
        hasComponents: [CONTROL.TABSATTR],
        icon: <BoxPlotOutlined className=" relative -top-0.5 text-sm" />
      }
    ]
  }
}

export default function TableTemplate() {
  const [selectBlockList, setSelectBlockList] = useState<ListType[]>([])
  const [selectType, setSelectType] = useState('')
  const [drawerVisible, setDrawerVisible] = useState(false)

  /** 选中类型回调 */
  const checkSelect = (item: ListType) => {
    if (
      item.code == PAGEALL ||
      item.code == ABOUTLAYOUT ||
      item.code == PAGEALLTABS ||
      item.code == ABOUTLAYOUTTABS
    ) {
      setSelectType(item.code)
      let data = item.hasComponents.map(
        (item: string) => typeListChildren[item]
      )
      setSelectBlockList((list: ListType[]) => {
        if (list.length > 1) list.splice(1, list.length - 1)
        return [...list, ...data]
      })
    } else {
      setDrawerVisible(true)
    }
  }

  const drawerOnFinish = async () => {
    console.log('LKLLLLLLLLLLLL')
    return true
  }

  useEffect(() => {
    setSelectBlockList([typeList])
  }, [])

  return (
    <div className=" flex h-full">
      <div className=" w-64 ">
        <SelectBlock list={selectBlockList} callback={checkSelect} />
      </div>
      <div className=" flex-1 p-2">
        {selectType === PAGEALL && <CommonProTable />}
        {selectType === ABOUTLAYOUT && <CommonAboutLayout />}
        {selectType === PAGEALLTABS && <CommonTabs />}
        {selectType === ABOUTLAYOUTTABS && <CommonTabsTreeTable />}
      </div>
      <DrawerForm
        title="属性配置"
        open={drawerVisible}
        onFinish={drawerOnFinish}
        onOpenChange={setDrawerVisible}
        drawerProps={{
          maskClosable: false
        }}
      ></DrawerForm>
    </div>
  )
}
