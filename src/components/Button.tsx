import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-champagne focus-visible:bg-champagne",
  secondary:
    "border border-border bg-surface text-text hover:border-accent hover:text-champagne",
  ghost: "text-text-muted hover:bg-surface hover:text-text",
};

function classes(variant: ButtonVariant, className: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const { children, className = "", variant = "primary", href, external } =
      props;
    const classNames = classes(variant, className);

    if (external) {
      return (
        <a
          href={href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className = "",
    variant = "primary",
    type = "button",
    ...rest
  } = props;

  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
