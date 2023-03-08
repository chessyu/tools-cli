import { ProCard } from '@ant-design/pro-components'
import { Tabs } from 'antd'
import React from 'react'

type CommonAboutLayoutPropsType = {}

export default function CommonAboutLayout(props: CommonAboutLayoutPropsType) {
  return (
    <ProCard gutter={16} ghost className=" h-full">
      <ProCard
        colSpan="20%"
        className=" h-full border-r border-solid border-r-gray-100"
      >
        Col
      </ProCard>
      <ProCard className=" h-full">Col</ProCard>
    </ProCard>
  )
}
