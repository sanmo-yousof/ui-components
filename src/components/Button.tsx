import { cn } from "@/lib/utils";
import { LuLoaderCircle } from "react-icons/lu";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonSize = "sm" | "md" | "lg";



interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?:string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90",
  outline:
    "border border-primary bg-transparent text-primary hover:text-white hover:bg-primary",
  ghost:
    "bg-transparent text-primary hover:bg-primary/5",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "py-2 px-3 text-sm",
  md: "md:py-2.5 py-2 md:px-5 px-4 text-sm",
  lg: "py-3 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  loadingText="",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading && (
        <LuLoaderCircle className="animate-spin"/>
      )}

      {loading ? loadingText : children}
    </button>
  );
}