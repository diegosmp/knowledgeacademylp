import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cleanPhone = String(body.whatsapp || "").replace(/\D/g, "")

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json(
        { error: "Número de WhatsApp inválido." },
        { status: 400 },
      )
    }

    await resend.emails.send({
      from: "Knowledge Academy <onboarding@resend.dev>",
      to: "diiegosmp@gmail.com",
      subject: `Novo lead na Lista VIP: ${body.whatsapp}`,
      html: `
        <h2>Novo professor na Lista VIP!</h2>
        <p><strong>Nome:</strong> ${body.name}</p>
        <p><strong>WhatsApp:</strong> ${body.whatsapp}</p>
        <p><strong>Link direto:</strong> <a href="https://wa.me/55${cleanPhone}">Abrir conversa no WhatsApp</a></p>
        <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
      `,
    })
    // await fetch(process.env.WEBHOOK_WAITLIST_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ whatsapp: cleanPhone, createdAt: new Date().toISOString() }),
    // });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar na waitlist:", error)
    return NextResponse.json(
      { error: "Não foi possível salvar seu contato agora." },
      { status: 500 },
    )
  }
}
