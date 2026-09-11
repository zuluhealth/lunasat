"use client";

import { useActionState } from "react";
import styles from "./page.module.scss";
import { enterPortal, type AccessFormState } from "@/lib/portal/actions";

const initialState: AccessFormState = {};

export default function AccessForm() {
  const [state, formAction, pending] = useActionState(
    enterPortal,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="fullName" className={styles.fieldLabel}>
          // FULL NAME *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.fieldLabel}>
          // WORK EMAIL *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="organization" className={styles.fieldLabel}>
          // ORGANIZATION
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          autoComplete="organization"
          className={styles.input}
        />
      </div>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          name="ndaAccepted"
          className={styles.checkbox}
        />
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
