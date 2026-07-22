'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#111b2b] outline-none transition placeholder:text-slate-400 focus:border-[#4267e9] focus:shadow-[0_0_0_4px_rgba(66,103,233,.1)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const task = 'listing' as TaskKey
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = SITE_CONFIG.tasks.find((item) => item.key === task)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#f5f7fb] px-5 py-12 text-[#111b2b] sm:px-8 lg:py-16">
          <section className="mx-auto grid max-w-[1080px] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_90px_rgba(17,27,43,.12)] md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[#111b2b] text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,179,0,.34),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(66,103,233,.5),transparent_32%)]"/><Lock className="relative h-20 w-20 text-[#ffb300]" />
            </div>
            <div className="self-center p-8 sm:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[.24em] text-[#4267e9]">Listing access</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-[.95] tracking-tight">Sign in to create a listing.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-500">Use your Liavda account to add complete business details and help local customers discover what you offer.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[#4267e9] px-6 py-3 text-sm font-extrabold text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f5f7fb] text-[#111b2b]">
        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2.5rem] bg-white p-6 shadow-[0_30px_90px_rgba(17,27,43,.1)] lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
            <aside className="rounded-[2rem] bg-[#111b2b] p-7 text-white sm:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[.24em] text-[#ffb300]">Add to Liavda</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">Add accurate, useful details so customers can understand and discover your business.</p>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-slate-200 bg-[#f8fafc] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] opacity-50">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.06em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-[#eef2ff] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#4267e9]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#4267e9] px-6 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(66,103,233,.25)] transition hover:-translate-y-0.5 hover:bg-[#3155d5]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
