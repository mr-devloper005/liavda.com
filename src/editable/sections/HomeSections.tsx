import Link from 'next/link'
import { ArrowRight, Building2, Check, MapPin, Search, Sparkles, Store, Tags } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'

type Props = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const wrap = 'mx-auto w-full max-w-[1180px] px-5 sm:px-8'
const allPosts = (posts: SitePost[], sections: HomeTimeSection[]) => Array.from(new Map([...posts, ...sections.flatMap(s => s.posts)].map(p => [p.slug || p.id || p.title, p])).values())
const content = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const excerpt = (post: SitePost, n=130) => {
  const c = content(post); const value = post.summary || (typeof c.description === 'string' ? c.description : '') || (typeof c.body === 'string' ? c.body : '')
  const clean = toPlainText(value); return clean ? (clean.length > n ? `${clean.slice(0,n).trim()}…` : clean) : 'Explore this newly published guide and discover practical ideas, useful details, and local context.'
}
const category = (post: SitePost) => { const c=content(post); return (typeof c.category === 'string' && c.category) || post.tags?.[0] || 'Featured' }

export function EditableHomeHero({ primaryRoute, posts, timeSections }: Props) {
  const pool=allPosts(posts,timeSections); const images=pool.map(getEditablePostImage).filter(Boolean).slice(0,6)
  return <section className="liavda-hero relative overflow-hidden bg-[#111b2b] text-white">
    <div className="absolute inset-0 opacity-55">{images.slice(0,3).map((src,i)=><img key={src+i} src={src} alt="" className={`liavda-hero-image absolute inset-0 h-full w-full object-cover hero-frame-${i}`} />)}</div>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,38,.96)_0%,rgba(12,22,38,.78)_50%,rgba(12,22,38,.36)_100%)]" />
    <div className={`relative grid min-h-[620px] items-center gap-10 py-20 lg:grid-cols-[1.05fr_.95fr] ${wrap}`}>
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em]"><Sparkles className="h-4 w-4 text-[#ffb300]"/> Local businesses, clearly listed</span>
        <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Find the right place.<br/><span className="text-[#ffb300]">Choose with confidence.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">Explore local businesses and services through useful, easy-to-compare listings with the details that matter.</p>
        <form action="/search" className="mt-9 flex max-w-xl overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
          <label className="flex min-w-0 flex-1 items-center gap-3 px-3"><Search className="h-5 w-5 text-slate-400"/><input name="q" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none" placeholder="Search guides, services, or places"/></label>
          <button className="rounded-xl bg-[#ffb300] px-6 text-sm font-extrabold text-[#111b2b]">Search</button>
        </form>
        <div className="mt-7 flex flex-wrap gap-3"><Link href={primaryRoute} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#111b2b]">Browse listings</Link><Link href="/search" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold">Search businesses</Link></div>
      </div>
      <div className="hidden grid-cols-2 gap-4 lg:grid">{images.slice(0,4).map((src,i)=><div key={src+i} className={`group relative overflow-hidden rounded-3xl border border-white/15 ${i===0?'col-span-2 aspect-[2.2/1]':'aspect-square'}`}><img src={src} alt="Latest discovery" className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-[#111b2b]/80 to-transparent"/><span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-[.16em]">{i===0?'Featured today':'Discover more'}</span></div>)}</div>
    </div>
  </section>
}

export function EditableStoryRail({ primaryRoute }: Props) {
 const links=[['All listings',primaryRoute,Building2],['Local services','/search',Store],['Browse categories','/listing',Tags],['Near you','/search',MapPin]] as const
 return <section className="bg-white"><div className={`${wrap} py-16`}><p className="text-center text-xs font-extrabold uppercase tracking-[.25em] text-[#4267e9]">Start exploring</p><h2 className="mt-3 text-center text-4xl font-extrabold text-[#111b2b]">What are you looking for?</h2><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{links.map(([label,href,Icon],i)=><Link key={label} href={href} className="liavda-topic group flex items-center gap-4 rounded-2xl border border-slate-200 p-5"><span className={`flex h-12 w-12 items-center justify-center rounded-xl ${i%2?'bg-[#eef2ff] text-[#4267e9]':'bg-[#fff4d6] text-[#d98b00]'}`}><Icon className="h-5 w-5"/></span><span className="font-extrabold text-[#111b2b]">{label}</span><ArrowRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-1"/></Link>)}</div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: Props) {
 const pool=allPosts(posts,timeSections).slice(0,7); if(!pool.length)return null; const lead=pool[0]
 return <section className="bg-[#f5f7fb]"><div className={`${wrap} py-20`}><div className="flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#4267e9]">Fresh perspectives</p><h2 className="mt-3 text-4xl font-extrabold text-[#111b2b]">Featured reads</h2></div><Link href={primaryRoute} className="hidden items-center gap-2 font-bold text-[#4267e9] sm:flex">View all <ArrowRight className="h-4 w-4"/></Link></div>
 <div className="mt-9 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><Link href={postHref(primaryTask,lead,primaryRoute)} className="group relative min-h-[470px] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#4267e9,#111b2b)]">{getEditablePostImage(lead)?<img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>:null}<div className="absolute inset-0 bg-gradient-to-t from-[#101a2b] via-[#101a2b]/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-8 text-white"><span className="rounded-full bg-[#ffb300] px-3 py-1 text-xs font-bold text-[#111b2b]">{category(lead)}</span><h3 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight">{lead.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">{excerpt(lead,170)}</p></div></Link>
 <div className="grid gap-4">{pool.slice(1,4).map(p=><Link key={p.slug||p.id} href={postHref(primaryTask,p,primaryRoute)} className="liavda-horizontal group grid grid-cols-[120px_1fr] overflow-hidden rounded-2xl bg-white sm:grid-cols-[170px_1fr]"><div className="min-h-36 bg-[linear-gradient(135deg,#eef2ff,#fff4d6)]">{getEditablePostImage(p)?<img src={getEditablePostImage(p)} alt={p.title} className="h-full min-h-36 w-full object-cover transition duration-500 group-hover:scale-105"/>:null}</div><div className="p-5"><span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#4267e9]">{category(p)}</span><h3 className="mt-2 line-clamp-2 text-lg font-extrabold text-[#111b2b]">{p.title}</h3><p className="mt-2 line-clamp-2 text-sm text-slate-500">{excerpt(p,85)}</p></div></Link>)}</div></div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: Props) {
 const pool=allPosts(posts,timeSections).slice(4,12); if(!pool.length)return null
 return <><section className="overflow-hidden bg-white py-20"><div className={wrap}><p className="text-center text-xs font-extrabold uppercase tracking-[.22em] text-[#4267e9]">Around Liavda</p><h2 className="mt-3 text-center text-4xl font-extrabold text-[#111b2b]">Popular discoveries</h2></div><div className="liavda-marquee mt-10 flex w-max gap-5">{[...pool,...pool].map((p,i)=><Link key={`${p.slug||p.id}-${i}`} href={postHref(primaryTask,p,primaryRoute)} className="group w-[290px] shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#eef2ff,#fff4d6)]">{getEditablePostImage(p)?<img src={getEditablePostImage(p)} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/>:null}</div><div className="p-5"><span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#d98b00]">{category(p)}</span><h3 className="mt-2 line-clamp-2 text-lg font-extrabold text-[#111b2b]">{p.title}</h3></div></Link>)}</div></section>
 <section className="bg-[#111b2b] text-white"><div className={`${wrap} grid gap-12 py-20 lg:grid-cols-2 lg:items-center`}><div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#ffb300]">Why Liavda</p><h2 className="mt-4 text-4xl font-extrabold">A clearer route to local businesses.</h2><p className="mt-5 text-lg leading-8 text-slate-300">Explore services, compare useful details, and move from discovery to a confident choice in one focused directory.</p></div><div className="grid gap-4">{['Relevant listings for everyday needs','Business details made easy to compare','Responsive discovery on every device'].map(x=><div key={x} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffb300] text-[#111b2b]"><Check className="h-5 w-5"/></span><span className="font-bold">{x}</span></div>)}</div></div></section></>
}

export function EditableHomeCta(){return <section className="bg-[#4267e9] text-white"><div className={`${wrap} flex flex-col items-center py-16 text-center`}><h2 className="text-4xl font-extrabold">Put your business where people can find it.</h2><p className="mt-4 max-w-2xl text-blue-100">Add a clear, useful listing so customers can discover your services and understand what you offer.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/create" className="rounded-xl bg-[#ffb300] px-6 py-3 font-extrabold text-[#111b2b]">Create a listing</Link><Link href="/contact" className="rounded-xl border border-white/40 px-6 py-3 font-bold">Contact us</Link></div></div></section>}
