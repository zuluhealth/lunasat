import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";
import { getActiveInvite, verifyToken } from "@/lib/portal/invites";
import AcceptForm from "./AcceptForm";

export const metadata: Metadata = {
  title: "Access",
  description: "Personal, expiring partner access link for Lunasat.",
  robots: { index: false, follow: false },
};

interface AccessPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function AccessPage({ searchParams }: AccessPageProps) {
  const params = await searchParams;
  const rawToken = params.token;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  const id = token ? verifyToken(token) : null;
  const invite = id ? await getActiveInvite(id) : null;

  return (
    <main className={styles.main}>
      <div className={styles.strip}>
        <span className={styles.stripLeft}>
          <span className={styles.stripMark} aria-hidden="true" />
          <span className={styles.stripLabel}>RESTRICTED // PARTNER ACCESS</span>
        </span>
        <span className={styles.stripMeta}>[ PERSONAL ACCESS LINK ]</span>
      </div>

      <div className={styles.container}>
        {!invite || !token ? (
          <div className={styles.content}>
            <span className={styles.subLabel}>[ ACCESS LINK // STATUS ]</span>
            <h1 className={styles.title}>
              <TextReveal text="Link No Longer Valid" />
            </h1>
            <p className={styles.description}>
              This access link has expired or been withdrawn. Contact your
              Lunasat counterpart.
            </p>
            <Link href="/#contact" className={styles.contactButton}>
              [ GET IN TOUCH &rarr; ]
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <span className={styles.subLabel}>
              [ SECURE PORTAL // INVITATION ]
            </span>
            <h1 className={styles.title}>
              <TextReveal text={`Welcome, ${invite.name}`} />
            </h1>
            <p className={styles.description}>
              You have been granted personal access to the Lunasat partner
              briefing room. Acknowledge the confidentiality terms below to
              enter.
            </p>

            <AcceptForm token={token} email={invite.email} />
          </div>
        )}
      </div>
    </main>
  );
}
