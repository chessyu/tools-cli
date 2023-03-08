import 'normalize.css'
import './index.css'
import 'antd/dist/antd.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { RoutesMenu } from '@routes/index'

const root = createRoot(document.getElementById('app'))
root.render(<RoutesMenu />)
