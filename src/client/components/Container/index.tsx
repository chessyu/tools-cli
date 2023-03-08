import React from 'react'
import { KhtScrollbars } from 'kht-react-ui'
import useStore from '@recoil/store'
import { Outlet } from 'react-router-dom'

export default function Container() {
  const test = useStore()

  console.log(test)
  return (
    <div className=" flex-1 flex border-b">
      <div className="flex-1">
        <KhtScrollbars>
          <div className=" w-full h-full m-auto">
            <Outlet />
          </div>
        </KhtScrollbars>
      </div>
    </div>
  )
}
