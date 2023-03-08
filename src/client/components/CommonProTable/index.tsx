import { ProTable, ProTableProps } from '@ant-design/pro-components'
import React from 'react'

type CommonProTablePropsType<T, U, ValueType> = ProTableProps<
  T,
  U,
  ValueType
> & {}

export default function CommonProTable<T, U, ValueType>(
  props: CommonProTablePropsType<T, U, ValueType>
) {
  return <ProTable {...props} />
}
