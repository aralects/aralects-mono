import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { cn } from "@repo/ui";

const SocialSidebar = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "hidden flex-col gap-y-4 text-[#a07ed1] hover:text-[#946bcc] md:flex",
        className,
      )}
      {...props}
    >
      <a
        href="https://www.facebook.com/people/Aralects/61572407105723/"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebook size={28} />
      </a>
      <a
        href="https://www.instagram.com/ara.lects/"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram size={28} />
      </a>
      <a
        href="https://www.linkedin.com/company/105135861/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin size={28} />
      </a>
    </div>
  );
};

export default SocialSidebar;
