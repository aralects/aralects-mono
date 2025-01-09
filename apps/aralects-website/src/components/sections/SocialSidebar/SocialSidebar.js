import React from 'react';
import { FaFacebook, FaTwitter,FaTelegramPlane } from 'react-icons/fa';


const SocialSidebar = () => {
  return (
    <div className=" absolute hidden  left-4 top-[200px] md:flex flex-col space-y-8">
      <a href="#" className="text-[#a07ed1] hover:text-[#946bcc]">
        <FaFacebook size={20} />
      </a>
      <a href="#" className="text-[#a07ed1] hover:text-[#946bcc]">
        <FaTwitter size={20} />
      </a>
      <a href="#" className="text-[#a07ed1] hover:text-[#946bcc]">
        <img src="/images/Vkontakte.png" alt="" width={20} height={20} />
      </a>
      <a href="#" className="text-[#a07ed1] hover:text-[#946bcc]">
        <FaTelegramPlane size={20} />
      </a>
    </div>
  );
};

export default SocialSidebar;