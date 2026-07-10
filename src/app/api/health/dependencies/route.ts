import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const apiOrigin = (process.env.CONCURSEIRO_API_URL || "").replace(/\/$/, "");

export async function GET() {
  if (!apiOrigin) {
    return NextResponse.json({ status: "degraded", checks: { api: "not_configured" } }, { status: 503 });
  }

  try {
    const response = await fetch(`${apiOrigin}/actuator/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });

    if (!response.ok) throw new Error(`API health returned ${response.status}`);

    return NextResponse.json(
      { status: "ok", checks: { api: "up" } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { status: "degraded", checks: { api: "down" } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
