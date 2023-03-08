import React, { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import baseIcon from '@assets/images/base-icon.png'
import {
  GitlabOutlined,
  SettingOutlined,
  HistoryOutlined,
  TableOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname)

  const items: MenuProps['items'] = [
    {
      label: '历史模板',
      key: '/history-template',
      icon: <SettingOutlined style={{ verticalAlign: '0px' }} />
    },
    {
      label: '表格设计',
      key: '/table-template',
      icon: <TableOutlined style={{ verticalAlign: '0px' }} />
    },
    {
      label: '组件设计',
      key: '/',
      icon: <HistoryOutlined style={{ verticalAlign: '0px' }} />
    }
  ]

  const onClick: MenuProps['onClick'] = e => {
    navigate(e.key)
    setCurrent(e.key)
  }

  useEffect(() => {
    setCurrent(location.pathname)
  }, [location.pathname])

  return (
    <div className=" h-12 shadow-md sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 ">
      <div className=" w-full m-auto h-full flex">
        {/* <div className=" w-60 px-4 flex">
          <img
            className=" w-8 my-auto m-2 animate-spin-slow "
            src={baseIcon}
            alt=""
          />
          <span className=" m-auto font-bold text-indigo-500 text-2xl font-serif">
            LowCode
          </span>
        </div> */}
        <div className="flex-1 flex">
          <div className=" m-auto">
            <Menu
              style={{ borderBottom: 'unset' }}
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </div>
        </div>
        <div className=" w-20 flex ">
          <a
            className=" flex m-auto text-orange-500 block"
            href="http://xxx.xxx.0.200:9980/khtong/base/coustomer-node-cli"
            target="_black"
          >
            <GitlabOutlined className="text-2xl cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  )
}
