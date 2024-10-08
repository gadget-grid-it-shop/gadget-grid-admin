import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PiTrashSimpleFill } from "react-icons/pi";

import { cn } from "@/lib/utils";
import { FiLoader, FiPlus } from "react-icons/fi";
import { BiSolidEditAlt } from "react-icons/bi";
import { HiEye } from "react-icons/hi2";

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
        icon: 'border-none p-0 m-0 text-xl',
        create_button: "border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-primary hover:text-pure-white hover:bg-primary",
        edit_button: "border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-vivid-orange hover:text-pure-white hover:bg-vivid-orange",
        delete_button: "border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-red hover:text-pure-white hover:bg-red",
        view_button: "border border-border-color h-10 w-10 text-lg p-0 hover:bg-bright-turquoise text-bright-turquoise hover:text-pure-white hover:bright-turquoise"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        base: 'p-0'
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default"
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
      loading ? <FiLoader className="animate-spin" size={20} /> : variant === 'delete_button' ? <PiTrashSimpleFill /> : variant === 'edit_button' ? <BiSolidEditAlt /> : variant === 'view_button' ? <HiEye /> : variant === 'create_button' ? <FiPlus /> : children
    }
  </Comp>;
});
Button.displayName = "Button";

export { Button, buttonVariants };
