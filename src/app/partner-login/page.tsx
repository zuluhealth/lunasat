import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";
import { previewModeEnabled } from "@/lib/portal/auth";
import AccessForm from "./AccessForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner Access",
  description: "Secure portal for Lunasat partners and clients.",
  robots: { index: false, follow: false },
};

export default function PartnerLoginPage() {
  const preview = previewModeEnabled();

  return (
    <main className={styles.main}>
      <div className={styles.strip}>
        <span className={styles.stripLeft}>
          <span className={styles.stripMark} aria-hidden="true" />
          <span className={styles.stripLabel}>
            RESTRICTED // PARTNER ACCESS
          </span>
        </span>
        <span className={styles.stripMeta}>[ INVITATION ONLY ]</span>
      </div>

      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          &larr; Back to home
        </Link>

        <div className={styles.content}>
          <span className={styles.subLabel}>
            [ SECURE PORTAL // INVITATION ONLY ]
          </span>
          <h1 className={styles.title}>
            <TextReveal text="Partner Access" />
          </h1>
          <p className={styles.description}>
            Lunasat partners receive a personal, expiring sign-in link by email when
            they are added to the portal. There is no public sign-up.
          </p>

          {!preview ? null : (
            <>
              <div className={styles.divider} aria-hidden="true">
                <span className={styles.dividerLine} />
                <span className={styles.dividerLabel}>IDENTIFY YOURSELF</span>
                <span className={styles.dividerLine} />
              </div>

              <AccessForm />
            </>
          )}

          <Link href="/#contact" className={styles.contactButton}>
            [ GET IN TOUCH &rarr; ]
          </Link>
        </div>
      </div>
    </main>
  );
}
