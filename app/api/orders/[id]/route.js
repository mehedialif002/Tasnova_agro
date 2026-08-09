import { prisma } from "@/lib/prisma";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(request, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = token ? await verifyAdminToken(token) : null;
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();

  const allowed = ["pending", "confirmed", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await prisma.order.update({ where: { id }, data: { status } });
  return Response.json({ order });
}