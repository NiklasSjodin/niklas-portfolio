import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
};

export function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`py-16 sm:py-24 ${className}`.trim()}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
