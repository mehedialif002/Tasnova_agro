import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, phone, address, note } = await request.json();

    if (!name || !phone || !address) {
      return Response.json(
        { error: "Naam, phone o thikana required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Order" <${process.env.SMTP_USER}>`,
      to: process.env.SELLER_EMAIL,
      replyTo: process.env.SMTP_USER,
      subject: `Notun order — ${name}`,
      text: [
        `Naam: ${name}`,
        `Phone: ${phone}`,
        `Thikana: ${address}`,
        note ? `Note: ${note}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: sans-serif; line-height:1.6;">
          <h2 style="color:#1F4C2F;">Notun order eshe geche</h2>
          <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Thikana:</strong> ${escapeHtml(address)}</p>
          ${note ? `<p><strong>Note:</strong> ${escapeHtml(note)}</p>` : ""}
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Order email error:", err);
    return Response.json(
      { error: "Email pathano jayni, arektu por try korun" },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
