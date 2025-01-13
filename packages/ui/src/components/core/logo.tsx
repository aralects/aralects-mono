import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const logoVariants = cva("relative flex text-center", {
  variants: {
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-4xl",
      lg: "text-6xl",
      xl: "text-8xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Logo = ({
  className,
  size = "md",
  ...rest
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={cn(logoVariants({ size, className }))} {...rest}>
      <span className="font-semibold">Aralects</span>
    </h1>
  );
};
