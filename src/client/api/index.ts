import Request from '@utils/http/index'

export const getHistoryData = () =>
  Request.post('/history-template/get', { data: { a: 2, b: 3 } })
