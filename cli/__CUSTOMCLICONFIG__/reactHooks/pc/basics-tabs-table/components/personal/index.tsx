import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch } from 'antd'
import { KhtTableOverflowTool } from 'kht-react-ui'
import { AttrTypeItem, useMock, useTableCommon } from 'kht-react-ui/es/hooks'
import React, { useEffect, useState } from 'react'
import Modify, { HandleType } from './modify'

export type TableItemsType = {
  id: string
  AA: string
  BB: string
  CC: string
  DD: any[]
  EE: string
  FF: string
}

export default function PersonalChildren() {
  const {
    baseProps,
    rowProps,
    selectedRowKeys,
    selectStatus,
    reloadCurrentPage,
    removeSelected,
    deleteFunc,
    updateFunc,
    queryListFunc
  } = useTableCommon()
  const [open, setOpen] = useState(false)
  const [handleType, setHandleType] = useState<HandleType>('add')
  const [tableItem, setTableItem] = useState<TableItemsType>()

  const columns: ProColumns<TableItemsType>[] = [
    {
      title: '名称',
      dataIndex: 'AA',
      ellipsis: true
    },
    {
      title: '区域',
      dataIndex: 'BB',
      ellipsis: true
    },
    {
      title: '描述',
      dataIndex: 'CC',
      ellipsis: true
    },
    {
      title: '创建人',
      dataIndex: 'DD',
      search: false,
      render: (text, record) => {
        let flowData = record.DD.map((item: any) => item.GG)
        return <KhtTableOverflowTool arr={flowData} tips={'人员'} />
      }
    },
    {
      title: '创建时间',
      dataIndex: 'EE',
      search: false
    },
    {
      title: '启用状态',
      dataIndex: 'FF',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '启用'
        },
        0: {
          text: '禁用'
        }
      },
      render: (text, record) => {
        return (
          <Switch
            onChange={checked => batchEnable(checked)}
            checked={Boolean(+record.FF)}
          />
        )
      }
    },
    {
      title: '操作',
      fixed: 'right',
      valueType: 'option',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Button type="link" key={1} onClick={() => modify(record)}>
              编辑
            </Button>
            <Button
              danger
              type="link"
              key={2}
              onClick={() => batchDelete([record.id])}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 列表接口请求
  const getTableList = async (values: any) => {
    let result: any = await useMock(
      [
        {
          type: AttrTypeItem.id,
          value: 'string',
          key: 'id'
        },
        {
          type: AttrTypeItem.cname,
          value: 'string',
          key: 'AA'
        },
        {
          type: AttrTypeItem.county,
          key: 'BB'
        },
        {
          type: AttrTypeItem.cparagraph,
          key: 'CC'
        },
        {
          type: AttrTypeItem.datetime,
          key: 'EE'
        },
        {
          type: AttrTypeItem.boolean,
          key: 'FF'
        },
        {
          type: AttrTypeItem.cname,
          key: 'DD',
          value: [
            {
              type: AttrTypeItem.cname,
              key: 'GG'
            },
            {
              type: AttrTypeItem.cname,
              key: 'KK'
            }
          ]
        }
      ],
      15,
      true
    )
    console.log('FFFFFFFFFFF', result)
    return {
      success: true,
      total: result.response.totalCount || 0,
      data: result.response.dataList || []
    }
  }

  /** 批量删除 */
  const batchDelete = (keys: string[]) => {
    console.log('批量删除,取到的 keys', keys)
    deleteFunc(
      async () => {
        // 删除时 请求接口 的回调
        console.log(' 删除时 请求接口 的回调')
        removeSelected()
      },
      { idList: keys },
      {
        title: '提示',
        content: `是否【${keys.length > 1 ? '批量删除' : '删除'}】此数据`
      }
    )
  }

  /** 批量修改状态 */
  const batchEnable = (type: boolean) => {
    console.log('批量删除,取到的 keys', type)
    updateFunc(
      async () => {
        // 改变状态时 请求接口 的回调
        console.log('修改状态的回调')
        removeSelected()
        // { aa: type } 请求接口参数
      },
      { aa: type },
      {
        title: '提示',
        content: `是否【${type ? '禁用' : '启用'}】此条数据`,
        isDelete: type
      }
    )
  }

  /** 新增 */
  const add = () => {
    setOpen(true)
    setHandleType('add')
  }

  /** 修改 */
  const modify = (record: TableItemsType) => {
    setOpen(true)
    setHandleType('modify')
    setTableItem(record)
  }

  /** 表头 操作按钮 */
  const HeaderTitle = () => {
    return (
      <Space>
        <Button type="primary" onClick={add}>
          新增类目
        </Button>
        <Button
          onClick={() => batchDelete(selectedRowKeys)}
          disabled={selectStatus}
        >
          删除选中
        </Button>
        <Button onClick={() => batchEnable(true)} disabled={selectStatus}>
          启用选中
        </Button>
        <Button onClick={() => batchEnable(false)} disabled={selectStatus}>
          停用选中
        </Button>
      </Space>
    )
  }

  useEffect(() => {
    if (!open) {
      setTableItem(undefined)
    }
  }, [open])

  return (
    <>
      <ProTable
        {...baseProps}
        {...rowProps}
        request={getTableList}
        columns={columns}
        headerTitle={<HeaderTitle />}
      />
      <Modify
        setDrawerVisit={setOpen}
        handleType={handleType}
        visible={open}
        tableItem={tableItem}
      />
    </>
  )
}
