import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  onClick,
  active = true,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={!active}
      onClick={onClick}
      className={`w-[90px] height-[40px] bg-blue-800 text-lime-100 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
