import { type FC } from "react";
import SocialSidebar from "../Home/SocialSidebar";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface ContactInfoCardProps {
  email: string;
  phoneNumber: string;
  location: string;
}

interface ContactField {
  icon: {
    path?: string;
    paths?: string[];
  };
  label: string;
  value: string;
  isEmail?: boolean;
}

interface SocialLink {
  platform: string;
  href: string;
  path?: string;
  isImage?: boolean;
}

interface SocialIconProps {
  platform: string;
  path?: string;
  isImage?: boolean;
}

const SocialIcon: FC<SocialIconProps> = ({ platform, path, isImage }) => {
  if (isImage) {
    return <img src="/img/Vkontakte.png" alt={platform} className="h-6 w-6" />;
  }

  const IconComponent = {
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    LinkedIn: FaLinkedin,
  }[platform];

  return IconComponent ? (
    <IconComponent className="h-6 w-6 text-[#8262B0]" />
  ) : null;
};

const ContactInfoCard: FC<ContactInfoCardProps> = ({
  email,
  phoneNumber,
  location,
}) => {
  const contactFields: ContactField[] = [
    {
      icon: {
        path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      label: "Email",
      value: email,
      isEmail: true,
    },
    // {
    //   icon: {
    //     path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    //   },
    //   label: "Phone Number",
    //   value: phoneNumber
    // },
    {
      icon: {
        paths: [
          "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
          "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
        ],
      },
      label: "Our Location",
      value: location,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: "Facebook",
      href: "https://www.facebook.com/people/Aralects/61572407105723/",
    },
    {
      platform: "Instagram",
      href: "https://www.instagram.com/ara.lects/",
    },
    {
      platform: "LinkedIn",
      href: "https://www.linkedin.com/company/105135861/",
    },
  ];

  return (
    <div className="relative z-20 flex h-[fit-content] max-h-[285px] max-w-[559px] flex-col justify-center rounded-[9px] border-[6px] border-[#F2F0F6] bg-white pb-6 pl-4 pr-4 pt-6 shadow-lg">
      {/* Background Pattern */}
      <span className="info-card-bg-pattern overflow-hidden rounded-[9px]" />
      <div className="relative z-10 grid grid-cols-[85%_15%]">
        <div className="grid grid-cols-1 gap-4">
          {contactFields.map(({ icon, label, value, isEmail }, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#676767]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {icon.paths ? (
                    icon.paths.map((path, pathIndex) => (
                      <path
                        key={pathIndex}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={path}
                      />
                    ))
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={icon.path}
                    />
                  )}
                </svg>
                <span className="font-SpaceGrotesk text-md font-medium leading-[20px] text-[#1a1a1a] md:text-lg">
                  {label}
                </span>
              </div>
              {isEmail ? (
                <a
                  href={`mailto:${value}`}
                  className="font-SpaceGrotesk text-md pl-1 font-light leading-[20px] text-[#666666] transition-colors hover:text-[#8262B0] md:text-lg"
                >
                  {value}
                </a>
              ) : (
                <span className="font-SpaceGrotesk text-md pl-1 font-light leading-[20px] text-[#666666] md:text-lg">
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <div className="flex flex-col items-center gap-5 sm:gap-4 md:gap-5 lg:gap-6">
            {socialLinks.map(({ platform, href, path, isImage }, index) => (
              <a
                key={index}
                href={href}
                className="cursor-pointer transition-opacity hover:opacity-70"
                aria-label={`Visit our ${platform} page`}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon platform={platform} path={path} isImage={isImage} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
