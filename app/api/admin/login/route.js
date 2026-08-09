import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAdminToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "Email and password required" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signAdminToken({ id: admin.id, email: admin.email });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });

  return Response.json({ success: true, admin: { email: admin.email, name: admin.name } });
}