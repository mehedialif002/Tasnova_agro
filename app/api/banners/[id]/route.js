
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return token ? await verifyAdminToken(token) : null;
}

export async function PUT(request, { params }) {
  const admin = await requireAdmin();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, image, link, order, isActive } = body;

  const banner = await prisma.banner.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(image !== undefined && { image }),
      ...(link !== undefined && { link }),
      ...(order !== undefined && { order: parseInt(order, 10) }),
      ...(isActive !== undefined && { isActive }),
    },
  });

  return Response.json({ banner });
}

export async function DELETE(request, { params }) {
  const admin = await requireAdmin();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.banner.delete({ where: { id } });
  return Response.json({ success: true });
}