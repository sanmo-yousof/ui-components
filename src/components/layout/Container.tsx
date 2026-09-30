import { cn } from "@/lib/utils";


type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-full  mx-auto px-4",
        "md:max-w-3xl md:px-6",
        "lg:max-w-7xl lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}