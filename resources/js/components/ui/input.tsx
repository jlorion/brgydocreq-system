import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode | ((showPassword: boolean) => React.ReactNode);
  onIconClick?: () => void; 
}

function Input({ className, type, icon, onIconClick, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleIconClick = () =>{
    if (type === "password"){
      setShowPassword((prev) => !prev);
    }
    if(onIconClick){
      onIconClick();
    }
  }

  return (
    <div className="relative flex items-center justify-between w-full">
   
      <input
        type={type === "password" && showPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 border bg-transparent px-3 py-1",
          icon ? "pr-10" : "pl-3",
          "text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed rounded-md md:text-sm",
          "focus-visible:border-s1 focus-visible:ring-s1/10 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
         {icon && (
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute right-3 flex items-center justify-center text-gray-500"
        >
          {typeof icon === "function" ? icon(showPassword) : icon}
        </button>
      )}
    </div>
  );
}

export { Input };