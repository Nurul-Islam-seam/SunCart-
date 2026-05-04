"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    if (signInError) {
      setError(signInError.message || "Unable to sign in.");
      setIsSubmitting(false);
      return;
    }

    router.push(callbackUrl);
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError("");

    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
      errorCallbackURL: "/login",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl">
        <h1 className="font-display text-3xl text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to explore SunCart and complete your orders.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            className="btn btn-primary w-full text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            or
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link className="font-semibold text-slate-900" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
