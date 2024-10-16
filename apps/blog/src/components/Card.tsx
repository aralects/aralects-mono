import React from "react";

interface CardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const Card: React.FC<CardProps> = ({ title, excerpt, date, slug }) => {
  return (
    <div className="w-full rounded-lg border p-4 shadow-md md:w-1/3">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600">{date}</p>
      <p className="mt-2">{excerpt}</p>
      <a
        href={slug}
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        Read More
      </a>
    </div>
  );
};

export default Card;
