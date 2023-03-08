import React from 'react'
import { ProTable } from '@ant-design/pro-components'
import { Avatar, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function HistoryTemplate() {
  const navigate = useNavigate()

  const columns: any = [
    {
      title: '类目名称',
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: '类目描述',
      dataIndex: 'remark',
      ellipsis: true
    },
    {
      title: '类目图片',
      dataIndex: 'imgUrl',
      ellipsis: true,
      search: false,
      render: (text: string, record: any) => {
        return <Avatar shape="square" size="large" src={record.imgUrl} />
      }
    },

    {
      title: '创建时间',
      dataIndex: 'created',
      search: false
    },
    {
      title: '操作',
      search: false,
      fixed: 'right',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <Space>
            <Button type="link" key={1}>
              编辑
            </Button>
            <Button
              danger
              type="link"
              key={2}
              onClick={() => {
                // deleteFunc(batchDeletedNaireCategory, { idList: [record.id] })
              }}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const getTableList = async () => {
    return {
      success: true,
      total: 100,
      data: []
    }
  }

  const addTemplate = () => {
    navigate('/table-template')
  }

  const HeaderTitle = () => (
    <>
      <Button type="primary" onClick={addTemplate}>
        新增模板
      </Button>
    </>
  )

  return (
    <>
      <ProTable
        request={getTableList}
        columns={columns}
        headerTitle={<HeaderTitle />}
      />
    </>
  )
}
