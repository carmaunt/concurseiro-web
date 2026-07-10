import { NextResponse } from "next/server";

const metricNames = new Set(["CLS", "FCP", "INP", "LCP", "TTFB"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; value?: unknown; rating?: unknown; pathname?: unknown; id?: unknown };
    if (typeof body.name !== "string" || !metricNames.has(body.name) || typeof body.value !== "number") {
      return NextResponse.json({ error: "Invalid metric" }, { status: 400 });
    }

    console.info(JSON.stringify({
      event: "web_vital",
      name: body.name,
      value: body.value,
      rating: typeof body.rating === "string" ? body.rating : undefined,
      pathname: typeof body.pathname === "string" ? body.pathname : undefined,
      id: typeof body.id === "string" ? body.id : undefined,
    }));
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  return new NextResponse(null, { status: 204 });
}
