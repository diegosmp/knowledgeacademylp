import type { Metadata, Viewport } from "next"
import { Momo_Trust_Display, Nunito_Sans } from "next/font/google"
import "./globals.css"
import localFont from "next/font/local"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
})

const momoTrustDisplay = Momo_Trust_Display({
  subsets: ["latin"],
  variable: "--font-momo",
  display: "swap",
  weight: ["400"],
})

const quiniaRetro = localFont({
  src: "../fonts/QuiniaRetro.otf",
  variable: "--font-quinia",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#6410C9",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Knowledge Academy | Organize Suas Aulas e Engaje Seus Alunos",
    template: "%s | Knowledge Academy",
  },
  description:
    "Transforme o conteúdo das suas aulas de inglês em prática diária com flashcards personalizados, áudio nativo, revisões inteligentes e simulador de conversação. Comece grátis.",
  keywords: [
    "plataforma para professores de inglês",
    "flashcards para alunos de inglês",
    "app de repetição espaçada inglês",
    "material para aulas particulares de inglês",
    "simulador de conversação em inglês",
    "ferramenta para escola de idiomas",
    "Knowledge Academy",
  ],
  authors: [{ name: "Knowledge Academy" }],
  creator: "Knowledge Academy",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Knowledge Academy | Plataforma para Professores de Inglês",
    description:
      "Crie baralhos de flashcards em segundos e acompanhe a evolução dos seus alunos entre uma aula e outra. Teste gratuitamente.",
    siteName: "Knowledge Academy",
    locale: "pt_BR",
    type: "website",
    url: "http://localhost:3000",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Knowledge Academy - Plataforma de Flashcards e Prática para Professores de Inglês",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Academy | Acelere a Fluência dos Seus Alunos",
    description:
      "Flashcards personalizados, áudio nativo e revisões inteligentes para seus alunos de inglês. Teste grátis.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt_BR"
      className={`${nunitoSans.variable} ${momoTrustDisplay.variable} ${quiniaRetro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
