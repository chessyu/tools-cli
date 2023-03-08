import { useContext, createContext } from 'react'
// import { getHistoryData } from '@api/index'

// const getLocal = async () => {
//   let result = await getHistoryData()

//   console.log('FFFFF', result)
// }
// getLocal()
const Context = createContext({ text: 2, number: '23' })

const useStore = () => {
  return useContext(Context)
}
export default useStore
