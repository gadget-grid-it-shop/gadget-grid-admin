import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";

const buttonVariants = cva(
  "inline-flex items-center text-gray justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary shadow hover:bg-primary/90 text-pure-white",
        delete: "border-red text-red border text-md shadow hover:bg-red hover:text-pure-white",
        delete_solid: "text-md shadow bg-red text-pure-white",
        edit: "text-pure-white text-md shadow bg-vivid-orange",
        default_outline: "border border-primary shadow hover:bg-primary/90 text-primary hover:text-pure-white hover:bg-primary",
        icon: 'border-none p-0 m-0 text-xl'
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type TExtraProps = {
  loading?: boolean
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, TExtraProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} disabled={loading}>
    {
      loading ? <FiLoader className="animate-spin" size={20} /> : children
    }
  </Comp>;
});
Button.displayName = "Button";

export { Button, buttonVariants };
