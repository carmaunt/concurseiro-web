import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildAttributedGooglePlayUrl,
  getProductAnalyticsContext,
  trackPortalLanding,
  trackStoreClick,
} from "./productAnalytics";
import { GOOGLE_PLAY_URL } from "./store";

describe("productAnalytics", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 202 })));
  });

  it("mantém visitante entre sessões e usa uma aquisição por sessão", () => {
    const first = getProductAnalyticsContext();
    const second = getProductAnalyticsContext();

    expect(first).toEqual(second);
    expect(first?.visitorId).toMatch(/^visitor_/);
    expect(first?.acquisitionId).toMatch(/^web_/);
    expect(first?.visitorId).not.toBe(first?.acquisitionId);
  });

  it("inclui o identificador opaco no Install Referrer da Play Store", () => {
    const context = getProductAnalyticsContext();
    const attributed = new URL(buildAttributedGooglePlayUrl(GOOGLE_PLAY_URL, "download_page_primary"));
    const referrer = new URLSearchParams(attributed.searchParams.get("referrer") || "");

    expect(referrer.get("utm_source")).toBe("portal");
    expect(referrer.get("cta_id")).toBe("download_page_primary");
    expect(referrer.get("landing_session_id")).toBe(context?.acquisitionId);
  });

  it("registra uma entrada por sessão e o clique sem dados pessoais", async () => {
    trackPortalLanding();
    trackPortalLanding();
    trackStoreClick("download_page_primary");

    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    const calls = vi.mocked(fetch).mock.calls;
    const landing = JSON.parse(String(calls[0][1]?.body));
    const click = JSON.parse(String(calls[1][1]?.body));

    expect(landing.eventName).toBe("portal_landing_viewed");
    expect(click.eventName).toBe("store_cta_clicked");
    expect(click.metadata.acquisition_id).toBe(landing.metadata.acquisition_id);
    expect(JSON.stringify([landing, click])).not.toMatch(/email|nome|cpf|telefone/i);
  });
});
