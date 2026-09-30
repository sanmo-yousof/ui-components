import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 50 }: LogoProps) {
  return (
    <Link href="/" className="inline-flex">
      <Image
        src={"/logo.png"}
        alt="Logo"
        width={size}
        height={size}
        className="h-auto w-auto"
      />
    </Link>
  );
}