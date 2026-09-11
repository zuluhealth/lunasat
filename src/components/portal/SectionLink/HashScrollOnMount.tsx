"use client";

import { useEffect } from "react";
import { scrollToSection } from "./SectionLink";

// The app router restores scroll to the top of a soft navigation after the
// page mounts, and the section stack keeps growing as fonts and images settle.
// Re-applying the jump on a short schedule wins both races; any real user
// input cancels the remaining attempts.
const RETRY_DELAYS_MS = [0, 100, 300, 600, 1000];

/**
 * Completes a jump that arrived with the page rather than from a click inside
 * it: a pasted /portal#section URL, a link followed from a nested route such as
 * the airports deck, or a hash edited in the address bar.
 */
export default function HashScrollOnMount() {
  useEffect(() => {
    let timers: number[] = [];

    const cancel = () => {
      timers.forEach(window.clearTimeout);
      timers = [];
    };

    const jumpToHash = (retry: boolean) => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      cancel();
      const delays = retry ? RETRY_DELAYS_MS : [0];
      timers = delays.map((delay) =>
        window.setTimeout(() => scrollToSection(id), delay),
      );
    };

    // Arriving with a hash: race the router's scroll reset and late layout.
    jumpToHash(true);

    // Same-document hash changes (address bar, back/forward) need no retries —
    // the page is already laid out.
    const onHashChange = () => jumpToHash(false);
    const events = ["wheel", "touchstart", "keydown"] as const;

    window.addEventListener("hashchange", onHashChange);
    events.forEach((event) =>
      window.addEventListener(event, cancel, { passive: true }),
    );

    return () => {
      cancel();
      window.removeEventListener("hashchange", onHashChange);
      events.forEach((event) => window.removeEventListener(event, cancel));
    };
  }, []);

  return null;
}
