import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';
import { CONTACT_COLORS, CONTACT_LAYOUT } from '../../constants/contact';

interface ContactLayoutProps {
  children: ReactNode;
  className?: string;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withPattern?: boolean;
}

export const WhiteSection: FC<SectionProps> = ({ 
  children, 
  className,
  containerClassName,
  withPattern = false 
}) => (
  <div className={clsx('w-full bg-white relative flex items-center', className)}>
    {withPattern && <span className="contact-bg-pattern" />}
    <div className={clsx(
      'xl:container xl:mx-auto',
      CONTACT_LAYOUT.CONTAINER_PADDING.XL,
      CONTACT_LAYOUT.CONTAINER_PADDING.DEFAULT,
      CONTACT_LAYOUT.CONTAINER_PADDING.MD,
      containerClassName
    )}>
      {children}
    </div>
  </div>
);

export const PurpleSection: FC<SectionProps> = ({ 
  children, 
  className,
  containerClassName 
}) => (
  <div 
    className={clsx(
      'h-[70%] w-full flex-1 relative bg-[#8262B0]',
      className
    )}
  >
    <div className={clsx(
      'h-full xl:container xl:mx-auto',
      CONTACT_LAYOUT.CONTAINER_PADDING.XL,
      CONTACT_LAYOUT.CONTAINER_PADDING.DEFAULT,
      CONTACT_LAYOUT.CONTAINER_PADDING.MD,
      containerClassName
    )}>
      {children}
    </div>
  </div>
);

const ContactLayout: FC<ContactLayoutProps> = ({ children, className }) => {
  return (
    <main className={clsx('flex flex-col h-full', className)}>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </main>
  );
};

export default ContactLayout; 