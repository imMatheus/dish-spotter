import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "rounded-lg border border-black px-4 py-1 text-sm transition-opacity hover:opacity-80",
        variant === "primary" && "bg-black text-white",
        variant === "outline" && "bg-white text-black"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
