import { prisma } from "@/lib/prisma";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
  return Response.json({ banners });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = token ? await verifyAdminToken(token) : null;
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, image, link, order } = body;

  if (!image) {
    return Response.json({ error: "Image is required" }, { status: 400 });
  }

  const banner = await prisma.banner.create({
    data: {
      title: title || "",
      image,
      link: link || "",
      order: order ? parseInt(order, 10) : 0,
    },
  });

  return Response.json({ banner }, { status: 201 });
}