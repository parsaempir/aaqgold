const cols = [
  {
    title: 'Shop',
    links: ['1g Bars', '5g Bars', '10g Bars', '50g Bars', 'All Products'],
  },
  {
    title: 'Company',
    links: ['About', 'Vault & Custody', 'Press', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Live Price', 'Market News', 'Buy-Back', 'FAQ', 'Help Center'],
  },
];

const socials = ['twitter', 'instagram', 'linkedin', 'youtube'] as const;
type Social = (typeof socials)[number];

const SocialIcon = ({ name }: { name: Social }) => {
  const p = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
  };
  switch (name) {
    case 'twitter':
      return (
        <svg {...p}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...p}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4-.7.7-1.1 1.4-1.4 2.2C.3 5 .1 5.8.1 7.1.1 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.1.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.5 1.3 20.8.9 20 .6c-.8-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8C8.6 5.8 5.8 8.6 5.8 12s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...p}>
          <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7c-1 0-1.7-.7-1.7-1.7s.7-1.7 1.7-1.7 1.7.7 1.7 1.7-.7 1.7-1.7 1.7zM20 19h-3v-5.6c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V19h-3V8h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...p}>
          <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.6 9.4.6s7.5 0 9.4-.6c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
        </svg>
      );
  }
};

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-400/10 pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-gold-gradient flex h-9 w-9 items-center justify-center rounded-full font-serif font-bold text-ink-900">
                A
              </div>
              <span className="font-serif text-xl text-white">
                Aaq<span className="text-gold-400">Gold</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-neutral-400">
              Premium certified gold bullion with cash and installment plans.
              Transparent pricing, insured delivery, lifetime buy-back.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/20 text-gold-300 transition-all hover:border-gold-400/50 hover:bg-gold-400/10"
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-medium text-white">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-neutral-400 transition-colors hover:text-gold-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold-400/10 pt-8 md:flex-row">
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} AaqGold. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-neutral-500">
            <a href="#" className="hover:text-gold-300">
              Terms
            </a>
            <a href="#" className="hover:text-gold-300">
              Privacy
            </a>
            <a href="#" className="hover:text-gold-300">
              Cookies
            </a>
            <a href="#" className="hover:text-gold-300">
              Compliance
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>support@aaqgold.com</span>
            <span className="text-gold-400">·</span>
            <span>+1 (800) 482-4653</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
