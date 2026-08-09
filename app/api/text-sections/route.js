import { prisma } from "@/lib/prisma";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const sections = await prisma.textSection.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
  return Response.json({ sections });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = token ? await verifyAdminToken(token) : null;
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, content, order } = body;

  if (!title || !content) {
    return Response.json({ error: "Title and content are required" }, { status: 400 });
  }

  const section = await prisma.textSection.create({
    data: {
      title,
      content,
      order: order ? parseInt(order, 10) : 0,
    },
  });

  return Response.json({ section }, { status: 201 });
}