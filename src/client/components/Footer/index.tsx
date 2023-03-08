import React from 'react'
import { TrademarkOutlined } from '@ant-design/icons'

export default function Footer() {
  return (
    <div className=" h-12 text-center text-gray-500 flex">
      <div className=" m-auto">
        <span className=" mx-2">
          前端团队出品{' '}
          <TrademarkOutlined
            className=" text-base "
            style={{ verticalAlign: '1px' }}
          />
        </span>
        <a
          href="http://xxx.xxx.0.xxxx:18808/coustomer-react-ui/#/coustomer-react-ui/"
          target="_black"
        >
          组件库在线文档
        </a>
      </div>
    </div>
  )
}
