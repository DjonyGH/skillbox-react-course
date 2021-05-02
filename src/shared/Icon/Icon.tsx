import React, { useEffect, useState } from 'react';
import styles from './icon.css';

interface IIconProps {
  name: string
  size?: number
}

export function Icon({name, size=16}:IIconProps) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    const src = require(`../../assets/img/${name}.svg`).default
    setSrc(src)
  }, [])
  
  return (    
    <img
      src={src}
      alt={name}
      style={{width:`${size}.px`, height:`${size}.px` }}
    />
  );
}
