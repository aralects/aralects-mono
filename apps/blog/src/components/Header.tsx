import React from "react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="flex w-full items-center justify-between bg-gray-100 px-4 py-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-700">{description}</p>
    </header>
  );
};

export default Header;
