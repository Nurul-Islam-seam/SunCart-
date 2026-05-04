"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SC";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
    setIsSigningOut(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-glow">
            SC
          </span>
          <div className="leading-tight">
            <span className="font-display text-xl text-slate-900">SunCart</span>
            <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">
              Summer Essentials
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-32 animate-pulse rounded-full bg-white/80" />
          ) : user ? (
            <>
              <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1.5">
                <div
                  className="h-9 w-9 rounded-full bg-cover bg-center"
                  style={
                    user.image
                      ? { backgroundImage: `url(${user.image})` }
                      : undefined
                  }
                  aria-label="User avatar"
                >
                  {!user.image && (
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-secondary/20 text-xs font-semibold text-secondary">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs text-slate-500">Signed in</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name ?? "SunCart Member"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline border-slate-300 text-slate-700"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? "Signing out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-sm btn-ghost" href="/login">
                Login
              </Link>
              <Link className="btn btn-sm btn-primary text-white" href="/register">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            Menu
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-56 rounded-box border border-white/70 bg-white/95 p-2 shadow-lg"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li className="mt-2 border-t border-slate-200 pt-2">
              {user ? (
                <button type="button" onClick={handleSignOut}>
                  Logout
                </button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
            {!user && (
              <li>
                <Link href="/register">Register</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
