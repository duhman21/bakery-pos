import Image from "next/image";
import { ASSETS } from "@/assets";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  label: string;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  textClassName?: string;
}

export function BrandLogo({
  label,
  alt,
  wrapperClassName,
  imageClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group", wrapperClassName)}>
      <Image
        src={ASSETS.logo}
        alt={alt}
        width={40}
        height={40}
        className={cn(
          "w-10 h-10 transition-all group-hover:-translate-y-1 group-hover:-translate-x-1",
          imageClassName,
        )}
      />
      <span className={cn("text-2xl font-black tracking-tight text-navy", textClassName)}>
        {label}
      </span>
    </div>
  );
}
