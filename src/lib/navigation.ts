export type NavItem = {
  href: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

/**
 * Navigation for the current build. Notes is left out until there is at least
 * one note to show, so the menu never leads to an empty page.
 */
export function getNavItems({ hasNotes }: { hasNotes: boolean }): NavItem[] {
  return navItems.filter((item) => hasNotes || item.href !== "/notes");
}
