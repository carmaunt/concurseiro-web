import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/telemetry/web-vitals", () => {
  it("aceita somente métricas conhecidas", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const response = await POST(new Request("http://localhost/api/telemetry/web-vitals", {
      method: "POST",
      body: JSON.stringify({ name: "LCP", value: 1200, pathname: "/" }),
    }));

    expect(response.status).toBe(204);
    expect(log).toHaveBeenCalledOnce();
    log.mockRestore();
  });

  it("rejeita métricas inválidas", async () => {
    const response = await POST(new Request("http://localhost/api/telemetry/web-vitals", {
      method: "POST",
      body: JSON.stringify({ name: "CUSTOM", value: 1 }),
    }));

    expect(response.status).toBe(400);
  });
});
