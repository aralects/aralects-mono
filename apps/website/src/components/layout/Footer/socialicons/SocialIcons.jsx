import React from "react";

const SocialIcons = () => {
  return (
    <div className="flex absolute md:hidden right-5 top-[10%] flex-col items-center space-y-2">
      {/* Facebook */}
      <div className="w-8 h-8 flex items-center justify-center  rounded-full">
       <img src="/images/facebook.svg" alt="" />
      </div>

      {/* Instagram */}
      <div className="w-8 h-8 flex items-center justify-center  rounded-full">
      <img src="/images/instagram.svg" alt="" />
      </div>

      {/* VK */}
      <div className="w-8 h-8 flex items-center justify-center  rounded-full">
      <img src="/images/Vkontakte.svg" alt="" />
      </div>

      {/* Telegram */}
      <div className="w-8 h-8 flex items-center justify-center  rounded-full">
      <img src="/images/telegram.svg" alt="" />
      </div>
    </div>
  );
};

export default SocialIcons;
