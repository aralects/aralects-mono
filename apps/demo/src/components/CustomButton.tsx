import { FC, ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}

export const CustomButton: FC<Props> = ({ children }) => {
  return <footer className="footer">{children ?? children}</footer>;
};
