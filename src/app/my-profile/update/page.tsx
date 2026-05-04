import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login?callbackUrl=/my-profile/update");
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-24 pt-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Update Profile
        </p>
        <h1 className="font-display text-4xl text-slate-900">
          Refresh your details
        </h1>
        <p className="text-base text-slate-600">
          Update your name and image to keep your SunCart profile glowing.
        </p>
      </div>
      <UpdateProfileForm
        initialName={session.user.name ?? ""}
        initialImage={session.user.image ?? ""}
      />
    </div>
  );
}
