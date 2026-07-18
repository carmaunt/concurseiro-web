const VISITOR_ID_KEY = "oconcurseiro_analytics_visitor_v1";
const ACQUISITION_ID_KEY = "oconcurseiro_acquisition_session_v1";
const LANDING_TRACKED_KEY = "oconcurseiro_landing_tracked_v1";
const EVENT_ENDPOINT = "/api/backend/api/v1/analytics/events";

let fallbackVisitorId: string | null = null;
let fallbackAcquisitionId: string | null = null;

type EventMetadata = Record<string, string | number | boolean>;

function opaqueId(prefix: string) {
  const value = globalThis.crypto?.randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${value}`;
}

function storedId(
  storage: Storage,
  key: string,
  prefix: string,
  fallback: string | null,
  saveFallback: (value: string) => void,
) {
  try {
    const current = storage.getItem(key);
    if (current) return current;
    const created = opaqueId(prefix);
    storage.setItem(key, created);
    return created;
  } catch {
    if (fallback) return fallback;
    const created = opaqueId(prefix);
    saveFallback(created);
    return created;
  }
}

export function getProductAnalyticsContext() {
  if (typeof window === "undefined") return null;

  const visitorId = storedId(
    window.localStorage,
    VISITOR_ID_KEY,
    "visitor",
    fallbackVisitorId,
    (value) => { fallbackVisitorId = value; },
  );
  const acquisitionId = storedId(
    window.sessionStorage,
    ACQUISITION_ID_KEY,
    "web",
    fallbackAcquisitionId,
    (value) => { fallbackAcquisitionId = value; },
  );
  return { visitorId, acquisitionId };
}

export function buildAttributedGooglePlayUrl(baseUrl: string, ctaId: string) {
  const context = getProductAnalyticsContext();
  if (!context) return baseUrl;

  try {
    const url = new URL(baseUrl);
    const referrer = new URLSearchParams({
      utm_source: "portal",
      utm_medium: "web",
      utm_campaign: "android_app",
      utm_content: ctaId,
      cta_id: ctaId,
      landing_session_id: context.acquisitionId,
    });
    url.searchParams.set("referrer", referrer.toString());
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function trackProductEvent(
  eventName: "portal_landing_viewed" | "store_cta_clicked",
  metadata: EventMetadata = {},
) {
  const context = getProductAnalyticsContext();
  if (!context) return;

  const body = {
    eventName,
    anonymousId: context.visitorId,
    sessionId: context.acquisitionId,
    screenName: window.location.pathname.slice(0, 120),
    appVersion: "web",
    platform: "web",
    eventSchemaVersion: 1,
    metadata: {
      ...metadata,
      acquisition_id: context.acquisitionId,
    },
  };

  void fetch(EVENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

function safeCampaignValue(value: string | null) {
  return value?.trim().slice(0, 120) || undefined;
}

export function trackPortalLanding() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(LANDING_TRACKED_KEY)) return;
    window.sessionStorage.setItem(LANDING_TRACKED_KEY, "1");
  } catch {
    // O evento continua útil mesmo quando o navegador bloqueia o armazenamento.
  }

  const search = new URLSearchParams(window.location.search);
  let referrerHost: string | undefined;
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname.slice(0, 120) : undefined;
  } catch {
    referrerHost = undefined;
  }

  trackProductEvent("portal_landing_viewed", {
    landing_path: window.location.pathname.slice(0, 120),
    ...(referrerHost ? { referrer_host: referrerHost } : {}),
    ...(safeCampaignValue(search.get("utm_source")) ? { utm_source: safeCampaignValue(search.get("utm_source"))! } : {}),
    ...(safeCampaignValue(search.get("utm_medium")) ? { utm_medium: safeCampaignValue(search.get("utm_medium"))! } : {}),
    ...(safeCampaignValue(search.get("utm_campaign")) ? { utm_campaign: safeCampaignValue(search.get("utm_campaign"))! } : {}),
  });
}

export function trackStoreClick(ctaId: string) {
  trackProductEvent("store_cta_clicked", {
    cta_id: ctaId.slice(0, 80),
    store: "google_play",
  });
}
