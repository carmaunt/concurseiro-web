import { reportClientError } from "@/services/telemetry";

window.addEventListener("error", (event) => {
  reportClientError(event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  reportClientError(event.reason);
});
