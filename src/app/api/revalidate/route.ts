import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const secret = process.env.REVALIDATE_SECRET;

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("conteudos", "max");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true });
}
