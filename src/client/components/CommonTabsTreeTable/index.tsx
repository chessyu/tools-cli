import CommonAboutLayout from '@components/CommonAboutLayout'
import { Tabs } from 'antd'
import React from 'react'

export default function CommonTabsTreeTable() {
  const onChange = () => {}

  return (
    <Tabs
      className=" h-full"
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: `Tab 1`,
          key: '1',
          children: <CommonAboutLayout />
        },
        {
          label: `Tab 2`,
          key: '2',
          children: <CommonAboutLayout />
        },
        {
          label: `Tab 3`,
          key: '3',
          children: <CommonAboutLayout />
        }
      ]}
    />
  )
}
