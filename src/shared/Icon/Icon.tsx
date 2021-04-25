import React from 'react';
import styles from './icon.css';

interface IIconProps {
  name: string
  size?: number
}

export function Icon({name, size=16}:IIconProps) {
  return (
    <img
      src={require(`../../assets/img/${name}.svg`).default}
      alt={name}
      style={{width:`${size}.px`, height:`${size}.px` }}
    />
  );
}
