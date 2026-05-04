export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-400/10 bg-ink-800/40">
      <div className="relative aspect-square overflow-hidden bg-ink-800">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-400/5 to-transparent animate-[shimmer_1.6s_linear_infinite]" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-5 w-12 rounded bg-ink-700" />
            <div className="h-2 w-20 rounded bg-ink-700/60" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-14 rounded bg-ink-700 ml-auto" />
            <div className="h-2 w-10 rounded bg-ink-700/60 ml-auto" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="h-7 rounded-full bg-ink-700" />
          <div className="h-7 rounded-full border border-gold-400/15" />
        </div>
      </div>
    </div>
  );
}
