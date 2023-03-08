import React from 'react'

type SelectBlockPropsType = {
  list: ListType[]

  callback?: (item: ListType) => void
}

export type ListType = {
  title: string
  key: string
  code?: string
  hasComponents?: string[]
  icon?: React.ReactNode
  children?: ListType[]
}

export default function SelectBlock(props: SelectBlockPropsType) {
  return (
    <div className=" p-2 my-4 border-dotted border-cyan-200 border">
      {props.list.map((item: ListType) => (
        <div key={item.key} className=" text-center ">
          <span className=" text-lg font-bold">{item.title}</span>
          {item.children.map((keys: ListType) => (
            <div
              key={keys.key}
              className=" my-3 py-2 cursor-pointer bg-sky-100 "
              onClick={() => props.callback && props.callback(keys)}
            >
              <span className=" mr-2">{keys.icon}</span>
              <span className=" ">{keys.title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
