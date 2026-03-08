import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center max-w-2xl mx-auto mb-16", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-black text-navy mb-4", titleClassName)}>
        {title}
      </h2>
      <p className={cn("text-lg text-navy/60", descriptionClassName)}>{description}</p>
    </div>
  );
}
