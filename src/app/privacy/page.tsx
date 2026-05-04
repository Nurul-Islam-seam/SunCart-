export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-24 pt-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Privacy Policy
        </p>
        <h1 className="font-display text-4xl text-slate-900">
          Your data, your sunshine
        </h1>
      </div>
      <div className="rounded-3xl border border-white/70 bg-white/90 p-8 text-sm text-slate-600 shadow-lg">
        <p>
          SunCart only collects the data needed to create your account and
          fulfill orders. We never sell personal information and use secure
          providers for authentication.
        </p>
        <p className="mt-4">
          Need help with your data? Email support@suncart.com and we will respond
          within 48 hours.
        </p>
      </div>
    </div>
  );
}
