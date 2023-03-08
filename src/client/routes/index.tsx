import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Button, Result } from 'antd'
import Layout from '@pages/Layout'
import Design from '@pages/Design'
import HistoryTemplate from '@pages/HistoryTemplate'
import Review from '@pages/Review'
import TableTemplate from '@pages/TableTemplate'
import { RecoilRoot } from 'recoil'

export const RoutesMenu = () => {
  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Design />} />
            <Route path="/history-template" element={<HistoryTemplate />} />
            <Route path="/table-template" element={<TableTemplate />} />
          </Route>
          <Route path="/review" element={<Review />} />
          <Route
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, 此路由地址不存在"
                extra={
                  <Button
                    onClick={() => {
                      window.history.back()
                    }}
                    type="primary"
                  >
                    返回
                  </Button>
                }
              />
            }
          />
        </Routes>
      </HashRouter>
    </RecoilRoot>
  )
}
