import React, { useEffect } from 'react'
import { generateId } from '../../../../utils/react/generateRandomIndex'
import { merge } from '../../../../utils/js/merge'
import { GenericList } from '../../../GenericList'
import styles from './cardDropdownMenuMobile.css'
import { Dropdown } from '../../../Dropdown'
import { CardMenuButton } from '../CardMenuButton'

const MENU = [
  { text: 'Скрыть', icon: 'icon-hide' },
  { text: 'Пожаловаться', icon: 'icon-complain' },
  { text: 'Закрыть' },
].map(generateId)

export function CardDropdownMenuMobile() {
  const handleItemClick = (id: string) => {
    console.log('id', id)
  }
  return (
    <div className={styles.cardDropdownMenuMobile}>
      <CardMenuButton />
      {/* <Dropdown button={<CardMenuButton />}>
        <GenericList
          classNameItem={styles.dropdownMenuItem}
          list={MENU.map(
            merge({
              onClick: (id: string) => {
                handleItemClick(id)
              },
            })
          )}
        />
      </Dropdown> */}
    </div>
  )
}
