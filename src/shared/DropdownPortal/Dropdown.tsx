import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useCloseOnClickOut } from '../../hooks/useCloseOnClickOut'
import styles from './dropdown.css'

interface IDropdownProps {
  button: ReactNode
  children: ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const NOOP = () => {}

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)
  const [buttonX, setButtonX] = useState<number>(0)
  const [buttonY, setButtonY] = useState<number>(0)

  useEffect(() => {
    setIsDropdownOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    isDropdownOpen ? onOpen : onClose
  }, [isDropdownOpen])

  const handleOpen = (event: React.MouseEvent) => {
    const button = event.currentTarget

    const buttonX = button.getBoundingClientRect().left + pageXOffset
    const buttonY = button.getBoundingClientRect().top + pageYOffset

    setButtonX(buttonX)
    setButtonY(buttonY)

    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const [ref] = useCloseOnClickOut(() => setIsDropdownOpen(false))

  const node = document.querySelector('.modal_root')
  if (!node) return null
  return (
    <div className={styles.dropdown} ref={ref}>
      <div className={styles.button} onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen &&
        ReactDOM.createPortal(
          <div className={styles.listContainer} style={{ top: `${buttonY + 40}px`, left: `${buttonX - 130}px` }}>
            <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
              {children}
            </div>
          </div>,
          node
        )}
    </div>
  )
}
