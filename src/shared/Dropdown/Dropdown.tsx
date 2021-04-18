import React, { ReactNode } from 'react';
import styles from './dropdown.css';

interface IDropdownProps {
  button: ReactNode
  children: ReactNode
}

export function Dropdown({button, children}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <div>
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {button}
      </div>
      {isDropdownOpen && (
        <div>
          <div onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
