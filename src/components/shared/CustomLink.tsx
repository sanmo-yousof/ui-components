import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type SectionHeadingProps = {
  className?: string;
  href:string;
  text?:string;
};

export default function CustomLink({ className,href,text }: SectionHeadingProps) {
  return (
    <Link href={href}>
        <span className={cn("text-sm leading-tight underline text-primary font-medium",className)}>{text}</span>
    </Link>
  )
}




