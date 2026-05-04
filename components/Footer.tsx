const links = ['Terms', 'Privacy', 'Shipping', 'Buy-Back', 'Contact'];

export default function Footer() {
  return (
    <footer
      id="help"
      className="mt-20 border-t border-gold-400/10 px-4 py-8 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="bg-gold-gradient flex h-6 w-6 items-center justify-center rounded-full font-serif text-xs font-bold text-ink-900">
            P
          </div>
          <span className="font-serif text-sm text-white">
            Place<span className="text-gold-400">holder</span>
          </span>
          <span className="ml-2 text-xs text-neutral-500">
            © {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-neutral-400 transition-colors hover:text-gold-300"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
