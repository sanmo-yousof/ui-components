import { cn } from "@/lib/utils";


type SectionSubTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionSubTitle({
  children,
  className,
}: SectionSubTitleProps) {
  return (
    <p
      className={cn(
        "text-sm leading-tight text-foreground-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}