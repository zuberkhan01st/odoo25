"use client"

export default function SiteDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/30 to-transparent blur-3xl dark:from-emerald-500/20" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-400/30 to-transparent blur-3xl dark:from-white/10" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_40%)]"
        style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_95%,rgba(0,0,0,0.05)_95%),linear-gradient(to_bottom,transparent_0,transparent_95%,rgba(0,0,0,0.05)_95%)] bg-[length:20px_20px] opacity-40 dark:opacity-30" />
    </div>
  )
}
