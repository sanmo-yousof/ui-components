import { cn } from "@/lib/utils";


type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-xl font-medium leading-tight md:text-2xl lg:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  );
}