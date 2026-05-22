import { NextResponse } from "next/server";

// Demo-only port of /projects/headless-cms/handler.php.
// The original wrote JSON to disk and (commented out) ran git push.
// On Vercel the filesystem is ephemeral, so this is a no-op that mirrors
// the response shape the original JS expects.
export async function POST(request: Request) {
  const formData = await request.formData();
  const action = formData.get("action")?.toString() ?? "";

  switch (action) {
    case "load":
      return new NextResponse("repo updated", { status: 200 });
    case "save":
    case "auto_save":
      return new NextResponse("saved", { status: 200 });
    case "zone":
      return new NextResponse("zone deploy queued (demo)", { status: 200 });
    case "prod":
      return new NextResponse("prod deploy queued (demo)", { status: 200 });
    default:
      return new NextResponse("ok", { status: 200 });
  }
}
