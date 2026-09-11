"use client";

import { useActionState } from "react";
import styles from "./page.module.scss";
import { acceptInvite, type AccessFormState } from "@/lib/portal/actions";

const initialState: AccessFormState = {};

interface AcceptFormProps {
  token: string;
  email: string;
}

export default function AcceptForm({ token, email }: AcceptFormProps) {
  const [state, formAction, pending] = useActionState(
    acceptInvite,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="token" value={token} />

      <div className={styles.field}>
        <span className={styles.fieldLabel}>// WORK EMAIL</span>
        <span className={styles.readonlyValue}>{email}</span>
      </div>

      <label className={styles.checkboxRow}>
        <input type="checkbox" name="ndaAccepted" className={styles.checkbox} />
        <span className={styles.checkboxLabel}>
          I acknowledge that Tier-1 portal content is confidential, shared for
          partner evaluation only, and not for redistribution.
        </span>
      </label>

      {state.error ? (
        <p className={styles.error} role="alert">
          [ ! ] {state.error}
        </p>
      ) : null}

      <button type="submit" className={styles.submitButton} disabled={pending}>
        {pending ? "[ VERIFYING… ]" : "[ ENTER THE BRIEFING ROOM → ]"}
      </button>
    </form>
  );
}
