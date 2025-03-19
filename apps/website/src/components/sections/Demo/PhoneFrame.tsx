import { type FC } from 'react';
import clsx from 'clsx';
import { DEMO_LAYOUT, DEMO_COLORS, DEMO_CONTENT } from '../../../constants/demo';

interface PhoneFrameProps {
  className?: string;
  onStartDemo?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PhoneFrame: FC<PhoneFrameProps> = ({ className, onStartDemo }) => {
  return (
    <div className={`${DEMO_LAYOUT.PHONE_FRAME.WIDTH.DEFAULT}`}>
      <div className="relative">
        <div className="relative">
          <img 
            src="/img/svg/Iphone-13-frame.svg" 
            alt="iPhone Frame" 
            className="w-full h-full object-contain"
          />
          <div className="w-[90%] h-[95%] absolute inset-[5px] left-[5%] top-[2.5%] bg-white rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className={clsx(
                DEMO_LAYOUT.LOGO.SIZE.DEFAULT,
                DEMO_LAYOUT.LOGO.SIZE.SM,
                DEMO_LAYOUT.LOGO.SIZE.MD,
                DEMO_LAYOUT.LOGO.SIZE.LG
              )}>
                <img 
                  src="/img/svg/letter-logo.svg" 
                  alt="Aralects Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <button
                id="start-demo-btn"
                onClick={onStartDemo}
                className={clsx(
                  `bg-[${DEMO_COLORS.BACKGROUND}]`,
                  'text-white px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3',
                  'rounded-[6px] sm:rounded-[8px] md:rounded-[10px]',
                  `hover:bg-[${DEMO_COLORS.BUTTON.HOVER}]`,
                  'transition-colors duration-300',
                  'text-sm sm:text-base md:text-lg'
                )}
              >
                {DEMO_CONTENT.BUTTON.START}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame; 