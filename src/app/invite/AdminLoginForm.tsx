"use client";

import { useActionState } from "react";
import styles from "./page.module.scss";
import { adminLogin, type AdminLoginState } from "@/lib/portal/adminActions";

const initialState: AdminLoginState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="passphrase" className={styles.fieldLabel}>
          // ADMIN PASSPHRASE
        </label>
        <input
          id="passphrase"
          name="passphrase"
          type="password"
          required
          autoComplete="off"
          className={styles.input}
        />
      </div>

      {state.error ? (
        <p className={styles.error} role="alert">
          [ ! ] {state.error}
        </p>
      ) : null}

      <button type="submit" className={styles.submitButton} disabled={pending}>
        {pending ? "[ CHECKING… ]" : "[ UNLOCK ADMIN → ]"}
      </button>
    </form>
  );
}
