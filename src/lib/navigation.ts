export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = (typeof navItems)[number];
