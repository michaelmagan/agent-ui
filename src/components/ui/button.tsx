import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-[#43AA8B] border-[#43AA8B] border-2 hover:bg-[#43AA8B] hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-[#277DA1] bg-transparent text-[#277DA1] hover:bg-[#277DA1] hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline277DA1: "border-2 border-[#277DA1] bg-transparent text-[#277DA1] hover:bg-[#277DA1] hover:text-white",
        outline4D908E: "border-2 border-[#4D908E] bg-transparent text-[#4D908E] hover:bg-[#4D908E] hover:text-white",
        outline90BE6D: "border-2 border-[#90BE6D] bg-transparent text-[#90BE6D] hover:bg-[#90BE6D] hover:text-white",
        outlineF8961E: "border-2 border-[#F8961E] bg-transparent text-[#F8961E] hover:bg-[#F8961E] hover:text-white",
        outlineX: "border-2 dark:border-[#FFF] dark:hover:bg-white dark:hover:text-black dark:text-white border-black bg-transparent text-black hover:bg-black hover:text-white",
        outlineLinkedin: "border-2 border-[#0A66C2] bg-transparent text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
