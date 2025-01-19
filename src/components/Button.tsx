import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = false,
  disabled,
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
          Ładowanie...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
