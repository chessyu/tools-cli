import {
  DrawerForm,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components'
import { message } from 'antd'
import { waitTime } from 'kht-react-ui/es/utils'
import React, { useEffect, useRef } from 'react'
import { TableItemsType } from '..'

export type HandleType = 'add' | 'modify' | 'review'

type ModifyPropsType = {
  title?: string
  width?: number
  handleType: HandleType
  visible: boolean
  setDrawerVisit: (visible: boolean) => void
  tableItem?: TableItemsType
}

export default function Modify(props: ModifyPropsType) {
  const formRef = useRef<ProFormInstance>()

  const onFinish = async (values: any) => {
    console.log('FFFFFFF', values)
    if (props.handleType === 'add') {
      // 新增
    }
    if (props.handleType === 'modify') {
      // 修改
    }
    await waitTime(1500)
    message.success('仅模拟接口请求，真实接口需自行对接')
    return true
  }

  useEffect(() => {
    if (props.tableItem) {
      formRef.current?.setFieldsValue({
        AA: props.tableItem.AA,
        BB: props.tableItem.BB,
        FF: (+props.tableItem.FF).toString(),
        CC: props.tableItem.CC
      })
    }
  }, [props.tableItem])

  return (
    <>
      <DrawerForm
        title={
          props.title ?? props.handleType == 'review'
            ? '查看'
            : props.handleType == 'add'
            ? '新增'
            : '修改'
        }
        onVisibleChange={props.setDrawerVisit}
        visible={props.visible}
        onFinish={onFinish}
        width={480}
        formRef={formRef}
        drawerProps={{
          maskClosable: false,
          destroyOnClose: true,
          getContainer: document.getElementById('root') || document.body,
          footerStyle: {
            display: 'flex',
            justifyContent: 'center'
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="AA"
            label="名称"
            placeholder="请输入名称"
            rules={[{ required: true, message: '此项必填项' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="BB"
            label="区域"
            placeholder="请输入区域"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: '1',
                label: '启用'
              },
              {
                value: '0',
                label: '禁用'
              }
            ]}
            width="md"
            name="FF"
            label="状态"
            initialValue={'1'}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="CC" label="描述" />
        </ProForm.Group>
      </DrawerForm>
    </>
  )
}
