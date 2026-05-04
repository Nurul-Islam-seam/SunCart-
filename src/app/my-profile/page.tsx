import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login?callbackUrl=/my-profile");
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SC";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          My Profile
        </p>
        <h1 className="font-display text-4xl text-slate-900">
          Welcome back, {user.name ?? "SunCart Member"}
        </h1>
        <p className="text-base text-slate-600">
          Manage your details and keep your summer plans on track.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[0.7fr_1fr]">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div
              className="h-20 w-20 rounded-full bg-cover bg-center"
              style={
                user.image
                  ? { backgroundImage: `url(${user.image})` }
                  : undefined
              }
              aria-label="User avatar"
            >
              {!user.image && (
                <span className="flex h-full w-full items-center justify-center rounded-full bg-secondary/20 text-base font-semibold text-secondary">
                  {initials}
                </span>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {user.name ?? "SunCart Member"}
              </p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <Link
            href="/my-profile/update"
            className="btn btn-primary mt-6 text-white"
          >
            Update Information
          </Link>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Account Snapshot
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Member status</span>
              <span className="font-semibold text-slate-900">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Favorite season</span>
              <span className="font-semibold text-slate-900">Summer</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Orders ready</span>
              <span className="font-semibold text-slate-900">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Next delivery</span>
              <span className="font-semibold text-slate-900">Plan ahead</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
