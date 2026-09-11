"use client";

import { useActionState } from "react";
import styles from "./page.module.scss";
import {
  createInviteAction,
  type CreateInviteState,
} from "@/lib/portal/adminActions";

const initialState: CreateInviteState = {};

export default function CreateInviteForm() {
  const [state, formAction, pending] = useActionState(
    createInviteAction,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.fieldLabel}>
            // RECIPIENT NAME *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="off"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.fieldLabel}>
            // RECIPIENT EMAIL *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="off"
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
            autoComplete="off"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="days" className={styles.fieldLabel}>
            // VALIDITY
          </label>
          <select id="days" name="days" defaultValue="14" className={styles.input}>
            <option value="7">7 DAYS</option>
            <option value="14">14 DAYS</option>
            <option value="30">30 DAYS</option>
            <option value="90">90 DAYS</option>
          </select>
        </div>
      </div>

      {state.error ? (
        <p className={styles.error} role="alert">
          [ ! ] {state.error}
        </p>
      ) : null}

      <button type="submit" className={styles.submitButton} disabled={pending}>
        {pending ? "[ CREATING… ]" : "[ CREATE INVITE → ]"}
      </button>
    </form>
  );
}
