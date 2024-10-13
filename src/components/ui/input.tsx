import * as React from "react";

import {cn} from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12  font-medium bg-white w-full rounded-md border-input border-gray text-gray px-3 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        className,
        "py-0 my-0 mt-0 mb-0 leading-loose"
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export {Input};
