import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; message?: unknown; pathname?: unknown };
    if (typeof body.name !== "string" || typeof body.message !== "string") {
      return NextResponse.json({ error: "Invalid error payload" }, { status: 400 });
    }

    console.error(JSON.stringify({
      event: "client_error",
      name: body.name.slice(0, 120),
      message: body.message.slice(0, 500),
      pathname: typeof body.pathname === "string" ? body.pathname : undefined,
    }));
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  return new NextResponse(null, { status: 204 });
}
