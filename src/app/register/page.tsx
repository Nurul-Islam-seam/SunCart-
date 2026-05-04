"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
      callbackURL: "/login",
    });

    if (signUpError) {
      setError(signUpError.message || "Unable to register.");
      setIsSubmitting(false);
      return;
    }

    router.push("/login");
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError("");

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/register",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl">
        <h1 className="font-display text-3xl text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Join SunCart to save your favorites and order in seconds.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
            />
          </div>
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
              <span className="label-text">Photo URL</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://"
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
              placeholder="Create a password"
              required
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            className="btn btn-primary w-full text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Register"}
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
          Already have an account?{" "}
          <Link className="font-semibold text-slate-900" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
