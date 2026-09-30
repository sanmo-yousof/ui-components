import React from "react";
import SectionTitle from "../typo/SectionTitle";
import SectionSubTitle from "../typo/SectionSubTitle";
import { cn } from "@/lib/utils";


type SectionHeadingProps = {
  className?: string;
  title?:string;
  subTitle?:string;
};

export default function SectionHeading({ className,title,subTitle }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2",
        className,
      )}
    >
      <SectionTitle>{title}</SectionTitle>
      <SectionSubTitle>{subTitle}</SectionSubTitle>
    </div>
  );
}
