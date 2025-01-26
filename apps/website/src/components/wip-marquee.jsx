import Marquee from "react-fast-marquee";
import { cn } from "@repo/ui";

export const WipMarquee = ({ className, ...rest }) => {
  return (
    <Marquee
      className={cn(
        "border-y border-[#BDA3E2] bg-[#42463B] py-4 text-2xl capitalize text-[#BDA3E2]",
        className,
      )}
      gradient={false}
      direction="left"
      autoFill
      {...rest}
      // play={false}
    >
      <div className="flex items-center">
        <span className="font-SpaceGroteskLight whitespace-nowrap leading-8">
          UNDER CONSTRUCTION
        </span>
        <span className="font-SpaceGroteskBold mx-12 text-base leading-8">
          X
        </span>
      </div>
    </Marquee>
  );
};

// return (
//   <div
//     className={cn(
//       "overflow-hidden border border-[#BDA3E2] bg-[#42463B] py-2 capitalize text-[#BDA3E2]",
//       className,
//     )}
//   >
//     <div className="animate-infinite-scroll flex flex-nowrap items-center gap-x-8">
//       {Array(30)
//         .fill(null)
//         .map((_, i) => (
//           <Fragment key={i}>
//             <span className="whitespace-nowrap font-semibold">
//               UNDER CONSTRUCTION
//             </span>
//             <span className="text-xs">x</span>
//           </Fragment>
//         ))}
//     </div>
//   </div>
// );
