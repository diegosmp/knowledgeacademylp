"use client"

import React, { useEffect, useState } from "react"
import { Bell, CheckCircle2, Sparkles, MessageCircle } from "lucide-react"

//(Formato ISO com fuso de Brasília -03:00)
const LAUNCH_DATE = new Date("2026-12-19T10:00:00-03:00").getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (): TimeLeft => {
  const now = Date.now()
  const difference = LAUNCH_DATE - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length === 0) return ""
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [whatsapp, setWhatsapp] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const initialTick = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 0)

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => {
      clearTimeout(initialTick)
      clearInterval(timer)
    }
  }, [])

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("")
    setWhatsapp(formatWhatsApp(e.target.value))
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const cleanDigits = whatsapp.replace(/\D/g, "")

    if (cleanDigits.length < 10) {
      setError("Digite um WhatsApp válido com DDD.")
      return
    }

    setSubmitted(true)
    setWhatsapp("")
    setError("")
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="min-h-screen flex flex-col justify-between bg-linear-to-b from-[#5CBCE2] via-[#3eb1df] to-[#E8E3FF] text-white selection:bg-[#FCF800] selection:text-black">
      {/* Barra Superior com Quinia Retro (font-logo) */}
      <header className="w-full py-6 px-6 flex justify-center">
        <div className="font-logo flex items-center gap-2 text-2xl sm:text-3xl tracking-wide">
          <span className="text-white">Knowledge</span>
          <span className="bg-[#FCF800] text-black px-3 py-0.5 rounded-lg text-xl sm:text-2xl">
            Academy
          </span>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-3xl mx-auto py-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-[#FCF800]" />
          <span>Inauguração Oficial em Breve</span>
        </div>

        {/* Headline com Momo Trust Display (font-display) */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
          Transforme suas aulas de inglês em{" "}
          <span className="text-[#FCF800] underline decoration-4 underline-offset-8">
            prática diária
          </span>
        </h1>

        {/* Subheadline com Nunito Sans (font-sans padrão) */}
        <p className="text-base sm:text-lg text-white/90 max-w-xl mb-10 font-medium">
          Estamos finalizando os últimos detalhes da plataforma de flashcards,
          áudio nativo e conversação para professores de idiomas.
        </p>

        {/* Relógio Regressivo com números em Momo Trust Display (font-display) */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-lg mb-10">
          {[
            {
              label: "Dias",
              value: timeLeft ? formatNumber(timeLeft.days) : "--",
            },
            {
              label: "Horas",
              value: timeLeft ? formatNumber(timeLeft.hours) : "--",
            },
            {
              label: "Minutos",
              value: timeLeft ? formatNumber(timeLeft.minutes) : "--",
            },
            {
              label: "Segundos",
              value: timeLeft ? formatNumber(timeLeft.seconds) : "--",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-black/35 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center shadow-xl"
            >
              <span className="font-display text-3xl sm:text-5xl text-[#FCF800] tabular-nums">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wider text-white/80 font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Formulário Lista VIP */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-zinc-900">
          {submitted ? (
            <div className="flex flex-col items-center py-3 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#6410C9] mb-2" />
              <h2 className="font-display text-xl text-black">
                Você está na Lista VIP!
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Avisaremos no seu WhatsApp em primeira mão assim que liberarmos
                as vagas gratuitas.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl sm:text-2xl text-black mb-1">
                Garanta acesso antecipado
              </h2>
              <p className="text-sm text-zinc-600 mb-4">
                Deixe seu WhatsApp para ser avisado na abertura e liberar seu
                plano gratuito.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={15}
                    required
                    value={whatsapp}
                    onChange={handleWhatsAppChange}
                    placeholder="(85) 99999-9999"
                    className={`w-full px-4 py-3.5 rounded-full border text-sm transition-colors focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-300 focus:border-[#6410C9] focus:ring-[#6410C9]/20"
                    }`}
                  />
                  {error && (
                    <p className="text-xs text-red-600 font-semibold mt-1.5 text-left pl-4">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FCF800] hover:bg-[#f2ee00] active:scale-[0.99] transition-all text-black font-extrabold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span>Avise-me na inauguração</span>
                </button>
              </form>
              <p className="text-xs text-zinc-500 mt-3">
                Sem spam • Acesso prioritário aos 5 alunos grátis
              </p>
            </>
          )}
        </div>
      </main>

      {/* Botão Flutuante WhatsApp Expansível */}
      <a
        href="https://wa.me/5585999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20inaugura%C3%A7%C3%A3o%20da%20Knowledge%20Academy."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tirar dúvidas no WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] text-black font-bold rounded-full p-3.5 shadow-xl transition-all duration-300 hover:pr-5"
      >
        <MessageCircle className="w-6 h-6 shrink-0 text-white fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm text-white font-bold transition-all duration-300 group-hover:max-w-xs group-hover:ml-2.5">
          Tirar dúvidas no WhatsApp
        </span>
      </a>

      {/* Rodapé Preto */}
      <footer className="w-full bg-zinc-800 text-white py-6 px-4 text-center">
        <p className="font-logo text-lg tracking-wide text-white mb-1">
          Knowledge Academy
        </p>
        <p className="text-xs text-zinc-400">
          © 2026 Knowledge Academy. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
