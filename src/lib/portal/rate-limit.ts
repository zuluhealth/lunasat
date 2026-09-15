import "server-only";
import { updateStored } from "./storage";
import { reportPortalError } from "./diagnostics";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

// One administrator account: a shared budget cannot be bypassed by spoofing
// forwarded IP headers, changing cookies, restarting, or switching instances.
export async function takeAdminLoginAttempt(): Promise<boolean> {
  try {
    return await updateStored("admin-login", { startedAt: 0, attempts: 0 }, (state) => {
      const now = Date.now();
      if (now - state.startedAt >= WINDOW_MS) {
        state.startedAt = now;
        state.attempts = 0;
      }
      if (state.attempts >= MAX_ATTEMPTS) return false;
      state.attempts += 1;
      return true;
    });
  } catch (error) {
    reportPortalError(error, { stage: "admin-login", route: "/invite" });
    return false; // Storage failure must not disable throttling.
  }
}
