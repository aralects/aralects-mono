import { FC, ReactNode } from 'react';

export interface Props {
  children?: ReactNode
}

export const Main: FC<Props> = ({ children }) => {
  return (
    <main className='main'>
      {children ?? children}
    </main>
  )
}