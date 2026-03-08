import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button text-base font-black ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-[length:var(--border-width-base)] border-navy hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-navy hover:shadow-[4px_4px_0px_0px_#131721]",
        navy: "bg-navy text-white hover:shadow-[4px_4px_0px_0px_#F0A500]",
        outline:
          "bg-offwhite text-navy hover:shadow-[4px_4px_0px_0px_#131721]",
        ghost: "border-transparent hover:bg-navy/5 text-navy hover:border-navy hover:shadow-[4px_4px_0px_0px_#131721]",
        white:
          "bg-white text-navy hover:shadow-[4px_4px_0px_0px_#131721]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-button px-4",
        lg: "h-14 rounded-button px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
