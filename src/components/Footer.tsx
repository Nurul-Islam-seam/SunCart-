import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-slate-900">SunCart</p>
          <p className="mt-2 text-sm text-slate-600">
            Your summer essentials store for beach days, city strolls, and golden
            hour adventures.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </p>
          <p className="mt-3 text-sm text-slate-600">support@suncart.com</p>
          <p className="text-sm text-slate-600">+1 (555) 204-8899</p>
          <p className="text-sm text-slate-600">Seaside Avenue, LA</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Follow
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
          <Link
            href="/privacy"
            className="mt-4 inline-flex text-sm text-slate-500 hover:text-slate-900"
          >
            Privacy policy
          </Link>
        </div>
      </div>
      <div className="border-t border-white/60 py-4 text-center text-xs text-slate-500">
        © 2026 SunCart. All rights reserved.
      </div>
    </footer>
  );
}
