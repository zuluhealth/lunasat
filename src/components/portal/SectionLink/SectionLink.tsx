"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SectionLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  "aria-current"?: React.AriaAttributes["aria-current"];
  "aria-label"?: string;
}

/**
 * Link to a section of the single-page portal.
 *
 * Native fragment navigation is unreliable here (the anchors live deep inside
 * the app-router tree and the hash change lands before the browser resolves a
 * scroll), so same-page jumps are performed explicitly. Cross-route links fall
 * back to a normal <Link>; `HashScrollOnMount` finishes the jump on arrival.
 */
const SectionLink: React.FC<SectionLinkProps> = ({
  href,
  className,
  children,
  onNavigate,
  ...rest
}) => {
  const pathname = usePathname() || "";
  const [path, hash] = href.split("#");
  const samePage = Boolean(hash) && pathname === path;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (!samePage) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    scrollToSection(hash);
    window.history.replaceState(null, "", href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

/**
 * Scroll a section under the sticky header; `top` returns to the cover.
 *
 * The jump is instant: globals.scss sets `scroll-behavior: smooth`, and
 * animating twenty-thousand pixels of briefing turns an index click into a
 * long blur. `instant` overrides the inherited CSS behaviour.
 */
export function scrollToSection(id: string): void {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "instant", block: "start" });
}

export default SectionLink;
