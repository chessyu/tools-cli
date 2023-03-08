import { Tabs } from 'antd'
import React, { useState } from 'react'
import CompanyChildren from './components/company'
import PersonalChildren from './components/personal'

export default function QuestionTemplate() {
  let [activeKey, setActiveKey] = useState('company')

  const activeChange = (actived: string) => {
    setActiveKey(actived)
  }

  return (
    <div>
      <Tabs
        tabBarStyle={{
          background: '#fff',
          padding: '0 15px 15px 15px',
          marginBottom: '-1px'
        }}
        activeKey={activeKey}
        onChange={activeChange}
        items={[
          {
            label: `企业问卷`,
            key: 'company',
            children: <CompanyChildren />
          },
          {
            label: `个人问卷`,
            key: 'personal',
            children: <PersonalChildren />
          }
        ]}
      />
    </div>
  )
}
