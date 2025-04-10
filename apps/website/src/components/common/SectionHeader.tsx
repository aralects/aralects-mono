import { type FC } from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  useDefaultDescriptionClasses?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
  containerClassName,
  useDefaultDescriptionClasses = true
}) => {
  return (
    <div className={clsx('flex flex-col gap-4 pt-14', containerClassName)}>
      <h1 
        className={clsx(
          'text-3xl font-LivvicMedium md:text-5xl font-bold',
          titleClassName
        )}
      >
        {title}
      </h1>
      {description && (
        <p 
          className={clsx(
            useDefaultDescriptionClasses && 'text-gray-600 font-SpaceGrotesk text-md md:text-xl lg:w-[50%] md:w-[60%]',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader; 