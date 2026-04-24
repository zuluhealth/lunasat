import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Partner Login | Lunasat",
  description: "Secure portal for Lunasat partners and clients.",
  robots: { index: false, follow: false },
};

export default function PartnerLoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          &larr; Back to home
        </Link>
        <h1 className={styles.title}>Partner Login</h1>
        <p className={styles.description}>
          This area is reserved for Lunasat partners and clients.
          Authentication is coming soon.
        </p>
      </div>
    </main>
  );
}
