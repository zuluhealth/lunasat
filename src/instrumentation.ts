import type { Instrumentation } from "next";
import { isExpectedNavigation, privateRoute, reportPortalError } from "./lib/portal/diagnostics";

// Next invokes this for unhandled server render, action and route failures.
// Deliberately do not pass request headers, bodies or URLs to the logger.
export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  const route = privateRoute(request.path);
  if (!route || isExpectedNavigation(error)) return;
  reportPortalError(error, { stage: context.routeType, route });
};
