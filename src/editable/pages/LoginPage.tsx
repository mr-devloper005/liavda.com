import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Check, MapPin } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-[calc(100vh-5rem)] bg-[#f5f7fb] text-[#111b2b]">
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1180px] items-stretch px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-14">
          <div className="relative overflow-hidden rounded-t-[2rem] bg-[#111b2b] p-8 text-white sm:p-12 lg:rounded-l-[2rem] lg:rounded-tr-none lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,179,0,.28),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(66,103,233,.42),transparent_32%)]" />
            <div className="relative flex h-full flex-col justify-center">
              <p className="text-xs font-extrabold uppercase tracking-[.24em] text-[#ffb300]">Welcome back to Liavda</p>
              <h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[.98] sm:text-6xl">Continue discovering <span className="text-[#ffb300]">local businesses.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">Sign in to create listings and manage the business information you share with the community.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{[[Building2,'Create clear listings'],[MapPin,'Help customers find you']].map(([Icon,label])=><div key={label as string} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffb300] text-[#111b2b]"><Icon className="h-5 w-5"/></span><span className="text-sm font-bold">{label as string}</span></div>)}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-b-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(17,27,43,.1)] sm:p-12 lg:rounded-r-[2rem] lg:rounded-bl-none">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eef2ff] text-[#4267e9]"><Check className="h-6 w-6"/></span>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[.22em] text-[#4267e9]">Member access</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight">Sign in</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-slate-100 pt-6 text-sm text-slate-500">New here? <Link href="/signup" className="inline-flex items-center gap-1 font-extrabold text-[#4267e9] hover:text-[#111b2b]">{pagesContent.auth.login.createCta}<ArrowRight className="h-4 w-4"/></Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
