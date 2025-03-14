import { FC, ReactNode } from 'react';

export interface Props {
  children?: ReactNode
}

export const Header: FC<Props> = ({ children }) => {
  return (
    <header className='header'>
      {children ?? children}
    </header>
  )
}