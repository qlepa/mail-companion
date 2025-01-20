import { ChangeEvent } from "react";

interface TextFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  size?: "small" | "medium" | "large";
  error?: string;
  disabled?: boolean;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  label,
  size = "medium",
  error,
  disabled = false,
}: TextFieldProps) => {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: `px-3 py-2 text-base
      min-w-[754px]
      resize-y
      overflow-y-auto
      whitespace-pre-wrap
      leading-relaxed`,
    large: `
      px-6 py-4 
      text-lg 
      min-h-[500px]
      min-w-[990px]
      resize-y
      overflow-y-auto
      whitespace-pre-wrap
      leading-relaxed
    `,
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          ${sizeClasses[size]}
          border-2 rounded-md
          ${error ? "border-red-500" : "border-[#F5DEB3]"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-colors
          w-full
        `}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
