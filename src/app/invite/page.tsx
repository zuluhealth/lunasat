import { getOrigin } from "@/lib/portal/origin";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import styles from "./page.module.scss";
import TextReveal from "@/components/TextReveal/TextReveal";
import {
  PORTAL_ADMIN_COOKIE,
  inviteModeEnabled,
  isValidAdminCookie,
  listInvites,
  makeInviteUrl,
  type Invite,
} from "@/lib/portal/invites";
import {
  adminSignOut,
  reactivateInviteAction,
  revokeInviteAction,
} from "@/lib/portal/adminActions";
import AdminLoginForm from "./AdminLoginForm";
import CreateInviteForm from "./CreateInviteForm";
import CopyLinkButton from "./CopyLinkButton";

// Admin state depends on request cookies and runtime env — never prerender.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Invite Admin",
  description: "Manage personal, expiring partner access links for Lunasat.",
  robots: { index: false, follow: false },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toISOString().slice(0, 10);
}

function statusOf(invite: Invite): "active" | "revoked" | "expired" {
  if (invite.status === "revoked") return "revoked";
  if (new Date(invite.expiresAt).getTime() <= Date.now()) return "expired";
  return "active";
}

export default async function InviteAdminPage() {
  // --- Unconfigured -------------------------------------------------------
  if (!inviteModeEnabled()) {
    return (
      <main className={styles.main}>
        <div className={styles.strip}>
          <span className={styles.stripLeft}>
            <span className={styles.stripMark} aria-hidden="true" />
            <span className={styles.stripLabel}>
              RESTRICTED // INVITE ADMIN
            </span>
          </span>
          <span className={styles.stripMeta}>[ NOT CONFIGURED ]</span>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.subLabel}>[ INVITE MODE // STATUS ]</span>
            <h1 className={styles.title}>
              <TextReveal text="Invite Mode Not Configured" />
            </h1>
            <p className={styles.description}>
              Set both environment variables and restart the server to enable
              signed invite links.
            </p>
            <ul className={styles.envList}>
              <li className={styles.envItem}>// INVITE_SECRET</li>
              <li className={styles.envItem}>// ADMIN_PASSPHRASE</li>
            </ul>
            <p className={styles.note}>
              See SETUP.md for configuration details.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // --- Not authenticated --------------------------------------------------
  const cookieStore = await cookies();
  const authed = isValidAdminCookie(
    cookieStore.get(PORTAL_ADMIN_COOKIE)?.value,
  );

  if (!authed) {
    return (
      <main className={styles.main}>
        <div className={styles.strip}>
          <span className={styles.stripLeft}>
            <span className={styles.stripMark} aria-hidden="true" />
            <span className={styles.stripLabel}>
              RESTRICTED // INVITE ADMIN
            </span>
          </span>
          <span className={styles.stripMeta}>[ LOCKED ]</span>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.subLabel}>[ INVITE ADMIN // LOCKED ]</span>
            <h1 className={styles.title}>
              <TextReveal text="Invite Admin" />
            </h1>
            <p className={styles.description}>
              Enter the admin passphrase to manage partner access links.
            </p>
            <AdminLoginForm />
          </div>
        </div>
      </main>
    );
  }

  // --- Authenticated ------------------------------------------------------
  const origin = await getOrigin();
  const invites = await listInvites();
  const latest = invites[0] ?? null;
  const latestUrl = latest ? makeInviteUrl(latest.id, origin) : null;

  return (
    <main className={styles.main}>
      <div className={styles.strip}>
        <span className={styles.stripLeft}>
          <span className={styles.stripMark} aria-hidden="true" />
          <span className={styles.stripLabel}>RESTRICTED // INVITE ADMIN</span>
        </span>
        <form action={adminSignOut}>
          <button type="submit" className={styles.stripSignOut}>
            [ SIGN OUT ]
          </button>
        </form>
      </div>

      <div className={styles.container}>
        <div className={styles.wide}>
          <span className={styles.subLabel}>[ INVITE ADMIN // CONSOLE ]</span>
          <h1 className={styles.title}>
            <TextReveal text="Invite Admin" />
          </h1>

          <section className={styles.section} aria-labelledby="create-invite">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>// 01</span>
              <h2 id="create-invite" className={styles.sectionTitle}>
                Create Invite
              </h2>
            </div>
            <CreateInviteForm />

            {latest && latestUrl ? (
              <div className={styles.latestBlock}>
                <span className={styles.fieldLabel}>
                  // LATEST LINK — {latest.name}
                </span>
                <div className={styles.latestRow}>
                  <input
                    type="text"
                    readOnly
                    value={latestUrl}
                    className={styles.linkInput}
                    aria-label="Latest invite link"
                  />
                  <CopyLinkButton url={latestUrl} />
                </div>
              </div>
            ) : null}
          </section>

          <section className={styles.section} aria-labelledby="invite-ledger">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>// 02</span>
              <h2 id="invite-ledger" className={styles.sectionTitle}>
                Invite Ledger
              </h2>
            </div>

            {invites.length === 0 ? (
              <p className={styles.note}>// NO INVITES YET</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>NAME</th>
                      <th className={styles.th}>EMAIL</th>
                      <th className={styles.th}>EXPIRES</th>
                      <th className={styles.th}>STATUS</th>
                      <th className={styles.th}>OPENS</th>
                      <th className={styles.th}>LAST OPENED</th>
                      <th className={styles.th}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invites.map((invite) => {
                      const url = makeInviteUrl(invite.id, origin);
                      const state = statusOf(invite);
                      return (
                        <tr key={invite.id} className={styles.tr}>
                          <td className={styles.td}>{invite.name}</td>
                          <td className={styles.td}>{invite.email}</td>
                          <td className={styles.td}>
                            {formatDate(invite.expiresAt)}
                          </td>
                          <td className={styles.td}>
                            <span
                              className={`${styles.chip} ${styles[`chip_${state}`]}`}
                            >
                              {state.toUpperCase()}
                            </span>
                          </td>
                          <td className={styles.td}>{invite.opens}</td>
                          <td className={styles.td}>
                            {invite.lastOpenedAt
                              ? formatDate(invite.lastOpenedAt)
                              : "—"}
                          </td>
                          <td className={styles.td}>
                            <div className={styles.rowActions}>
                              <CopyLinkButton url={url} />
                              {invite.status === "revoked" ? (
                                <form action={reactivateInviteAction}>
                                  <input
                                    type="hidden"
                                    name="id"
                                    value={invite.id}
                                  />
                                  <button
                                    type="submit"
                                    className={styles.ghostButton}
                                  >
                                    [ REACTIVATE ]
                                  </button>
                                </form>
                              ) : (
                                <form action={revokeInviteAction}>
                                  <input
                                    type="hidden"
                                    name="id"
                                    value={invite.id}
                                  />
                                  <button
                                    type="submit"
                                    className={styles.dangerButton}
                                  >
                                    [ REVOKE ]
                                  </button>
                                </form>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
