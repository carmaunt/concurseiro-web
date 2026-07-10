type TelemetryPayload = Record<string, string | number | boolean | null | undefined>;

const enabled = process.env.NEXT_PUBLIC_TELEMETRY_ENABLED === "true";

function send(path: string, payload: TelemetryPayload) {
  if (!enabled || typeof window === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    pathname: window.location.pathname,
    occurredAt: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(path, new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch(path, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });
}

export function reportWebVital(metric: TelemetryPayload) {
  send("/api/telemetry/web-vitals", metric);
}

export function reportClientError(error: unknown) {
  const normalized = error instanceof Error ? error : new Error(String(error));
  send("/api/telemetry/errors", {
    name: normalized.name,
    message: normalized.message.slice(0, 500),
  });
}
