"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type UpdateProfileFormProps = {
  initialName: string;
  initialImage: string;
};

export default function UpdateProfileForm({
  initialName,
  initialImage,
}: UpdateProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    const { error: updateError } = await authClient.updateUser({
      name,
      image,
    });

    if (updateError) {
      setError(updateError.message || "Unable to update profile.");
      setIsSaving(false);
      return;
    }

    setMessage("Profile updated successfully.");
    setIsSaving(false);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg"
    >
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
          <span className="label-text">Image URL</span>
        </label>
        <input
          className="input input-bordered w-full"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://"
        />
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      {message && <p className="text-sm text-success">{message}</p>}
      <button className="btn btn-primary text-white" disabled={isSaving}>
        {isSaving ? "Updating..." : "Update Information"}
      </button>
    </form>
  );
}
