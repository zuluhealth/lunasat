"use client";

import { useState } from "react";
import styles from "./page.module.scss";

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — no-op.
    }
  }

  return (
    <button type="button" className={styles.ghostButton} onClick={handleCopy}>
      {copied ? "[ COPIED ]" : "[ COPY LINK ]"}
    </button>
  );
}
