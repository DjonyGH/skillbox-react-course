import React from 'react'
import { Icon } from '../Icon'

interface IItem {
  text: string
  id: string
  onClick: (id: string) => void
  As?: 'a' | 'li' | 'button' | 'div'
  href?: string
  icon?: string
}

interface IGenericListProps {
  list: IItem[]
  classNameItem?: string
}

export function GenericList({ list, classNameItem }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'div', text, id, onClick, icon }) => (
        <As className={classNameItem} onClick={() => onClick(id)} key={id}>
          {icon && <Icon name={icon} />}
          <div>{text}</div>
        </As>
      ))}
    </>
  )
}
