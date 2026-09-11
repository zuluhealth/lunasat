"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sessionCookieOptions } from "./auth";
import { takeAdminLoginAttempt } from "./rate-limit";
import {
  PORTAL_ADMIN_COOKIE,
  checkAdminPassphrase,
  createInvite,
  inviteModeEnabled,
  isValidAdminCookie,
  makeAdminCookieValue,
  reactivateInvite,
  revokeInvite,
} from "./invites";

async function requireAdmin(): Promise<boolean> {
  if (!inviteModeEnabled()) return false;
  const cookieStore = await cookies();
  return isValidAdminCookie(cookieStore.get(PORTAL_ADMIN_COOKIE)?.value);
}

export interface AdminLoginState {
  error?: string;
}

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!inviteModeEnabled()) {
    return { error: "Invite mode is not configured." };
  }

  if (!(await takeAdminLoginAttempt())) return { error: "Sign-in is temporarily unavailable. Try again in 15 minutes." };
  const passphrase = String(formData.get("passphrase") || "");
  if (!checkAdminPassphrase(passphrase)) {
    return { error: "Incorrect passphrase." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    PORTAL_ADMIN_COOKIE,
    makeAdminCookieValue(),
    sessionCookieOptions(),
  );
  revalidatePath("/invite");
  return {};
}

export interface CreateInviteState {
  error?: string;
}

export async function createInviteAction(
  _prevState: CreateInviteState,
  formData: FormData,
): Promise<CreateInviteState> {
  if (!(await requireAdmin())) {
    return { error: "Not authorized." };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const organization = String(formData.get("organization") || "").trim();
  const days = Number(formData.get("days") || 0);

  if (name.length > 150 || email.length > 254 || organization.length > 200) {
    return { error: "Name, email or organization exceeds the allowed length." };
  }
  if (!name) {
    return { error: "Recipient name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "A valid recipient email is required." };
  }
  if (![7, 14, 30, 90].includes(days)) {
    return { error: "Select a validity period." };
  }

  await createInvite({
    name,
    email,
    organization: organization || undefined,
    days,
  });
  revalidatePath("/invite");
  return {};
}

export async function revokeInviteAction(formData: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") || "");
  if (id) await revokeInvite(id);
  revalidatePath("/invite");
}

export async function reactivateInviteAction(
  formData: FormData,
): Promise<void> {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") || "");
  if (id) await reactivateInvite(id);
  revalidatePath("/invite");
}

export async function adminSignOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PORTAL_ADMIN_COOKIE);
  revalidatePath("/invite");
}
