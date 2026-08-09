import { prisma } from "@/lib/prisma";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();
  const { customerName, phone, address, notes, items } = body;

  if (!customerName || !phone || !address || !items || items.length === 0) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== productIds.length) {
    return Response.json({ error: "Some products not found" }, { status: 400 });
  }

  let totalAmount = 0;
  const orderItemsData = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const qty = parseInt(item.quantity, 10) || 1;
    totalAmount += product.price * qty;
    return { productId: product.id, quantity: qty, price: product.price };
  });

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      address,
      notes: notes || "",
      totalAmount,
      items: { create: orderItemsData },
    },
    include: { items: { include: { product: true } } },
  });

  return Response.json({ order }, { status: 201 });
}

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = token ? await verifyAdminToken(token) : null;
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const orders = await prisma.order.findMany({
    where: status ? { status } : undefined,
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ orders });
}