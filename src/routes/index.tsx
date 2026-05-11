import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "இலவச PCOS Masterclass | Aysha Nasreen" },
      {
        name: "description",
        content:
          "PCOS Symptoms Reverse பண்ற Proven Method. Free Live Webinar with Clinical Dietitian Aysha Nasreen on 31.05.2026.",
      },
      { property: "og:title", content: "இலவச PCOS Masterclass — Aysha Nasreen" },
      {
        property: "og:description",
        content: "Free 2-hour live webinar to reverse PCOS symptoms naturally.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

type FormState = { name: string; mobile: string; email: string; consent: boolean };
type Errors = Partial<Record<keyof FormState, string>>;

function Landing() {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    email: "",
    consent: true,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[6-9][0-9]{9}$/.test(form.mobile))
      e.mobile = "Enter valid 10-digit mobile (starts with 6-9)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      console.log("Webinar registration:", {
        ...form,
        timestamp: new Date().toISOString(),
        source: "webinar_vsl_page",
      });
      // @ts-expect-error fbq global
      if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
      await new Promise((r) => setTimeout(r, 800));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] text-[#333]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-2xl md:p-14">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#f3f0ff] px-4 py-1.5 text-sm font-semibold text-[#764ba2]">
              FREE LIVE WEBINAR
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f2937] md:text-5xl">
              இலவச PCOS Masterclass
            </h1>
            <p className="mt-4 text-lg text-[#555] md:text-2xl">
              PCOS Symptoms Reverse பண்ற Proven Method
            </p>
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] px-6 py-4 text-white shadow-lg">
              <span className="font-semibold">📅 31.05.2026</span>
              <span className="opacity-60">|</span>
              <span className="font-semibold">⏰ 11:00 AM – 01:00 PM IST</span>
            </div>
            <div className="mt-8">
              <button
                onClick={scrollToForm}
                className="rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl md:text-lg"
              >
                Secure My Seat (இலவசம்) →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VSL VIDEO */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e]">
                <button
                  aria-label="Play video"
                  onClick={() => {
                    // @ts-expect-error fbq
                    if (typeof window !== "undefined" && window.fbq)
                      // @ts-expect-error fbq
                      window.fbq("track", "ViewContent");
                    console.log("Video play tracked");
                  }}
                  className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform hover:scale-110 md:h-24 md:w-24"
                >
                  <svg
                    className="ml-1 h-8 w-8 text-[#764ba2] md:h-10 md:w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="absolute bottom-6 text-sm text-white/70">
                  ▶ Watch this 2-min video before registering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS GRID */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <DetailCard icon="🎯" title="இந்த Webinar-ல நீங்க கத்துப்பீங்க:">
            <li>4 வகை PCOS — உங்களுது எது?</li>
            <li>ஏன் generic diet work ஆகல?</li>
            <li>Kitchen-லேயே இருக்குற powerful foods (வெந்தயம், கொள்ளு, பட்டை)</li>
            <li>Ennoda protocol எப்படி work ஆகும்?</li>
            <li>Blood sugar, insulin, hormones எப்படி control பண்றது?</li>
          </DetailCard>
          <DetailCard icon="✅" title="இந்த Webinar யாருக்கு?">
            <li>Period irregular-ஆ இருக்குறவங்க (35+ days gap)</li>
            <li>Weight loss try பண்ணி fail ஆனவங்க</li>
            <li>Belly fat stubborn-ஆ இருக்குறவங்க</li>
            <li>Mood swings, fatigue, brain fog அதிகம்</li>
            <li>Dark patches (neck, underarms)</li>
            <li>Future fertility பத்தி worried ஆ இருக்குறவங்க</li>
          </DetailCard>
          <DetailCard icon="🎁" title="நீங்க கிடைக்கும்:">
            <li>Live Q&amp;A with Aysha Nasreen (12 years experience)</li>
            <li>7-day meal plan template (FREE download)</li>
            <li>Kitchen remedies PDF (வெந்தயம், கொள்ளு usage guide)</li>
            <li>Lifetime access to webinar recording</li>
            <li>WhatsApp support group invitation</li>
          </DetailCard>
          <DetailCard icon="📅" title="Webinar Details:">
            <li><b>Date:</b> 31.05.2026</li>
            <li><b>Time:</b> 11:00 AM – 01:00 PM IST</li>
            <li><b>Duration:</b> 2 hours (Live + Q&amp;A)</li>
            <li><b>Platform:</b> Zoom (link via WhatsApp)</li>
            <li><b>Price:</b> 100% இலவசம் (FREE)</li>
            <li><b>Seats:</b> Limited to 100 participants</li>
          </DetailCard>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section ref={formRef} id="register" className="px-5 py-12 md:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-7 shadow-xl md:p-12">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            இப்போவே Register பண்ணுங்க — Seats Limited!
          </h2>
          <p className="mt-2 text-center text-[#555]">
            Webinar link WhatsApp-ல instant-ஆ கிடைக்கும்
          </p>

          {success ? (
            <div className="mt-8 rounded-2xl border-2 border-[#28a745]/30 bg-[#f0fdf4] p-6 text-center">
              <div className="text-2xl font-bold text-[#28a745]">
                ✅ Registration Successful!
              </div>
              <p className="mt-3 text-[#333]">
                உங்க webinar seat confirm ஆயிருச்சு!
              </p>
              <p className="mt-2 text-sm text-[#555]">
                📱 Webinar link அடுத்த 5 நிமிஷத்துல WhatsApp-க்கு வரும்.
                <br />
                📧 Email-லும் confirmation அனுப்பியாச்சு.
              </p>
              <div className="mt-4 rounded-xl bg-white p-4 text-sm">
                📅 31.05.2026 &nbsp;•&nbsp; ⏰ 11:00 AM – 01:00 PM IST
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <Field
                label="👤 உங்க பெயர் *"
                error={errors.name}
                input={
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="உங்க பெயர்"
                    className="form-input"
                    required
                  />
                }
              />
              <Field
                label="📱 Mobile Number (WhatsApp-க்கு) *"
                error={errors.mobile}
                input={
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                    }
                    placeholder="9876543210"
                    className="form-input"
                    required
                  />
                }
              />
              <Field
                label="📧 Email *"
                error={errors.email}
                input={
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="yourname@example.com"
                    className="form-input"
                    required
                  />
                }
              />

              <label className="flex items-start gap-3 text-sm text-[#555]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-1 h-5 w-5 accent-[#764ba2]"
                />
                <span>WhatsApp-ல webinar link + reminders receive பண்ணணும்</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Securing...
                  </span>
                ) : (
                  "Secure My Seat (இலவசம்) →"
                )}
              </button>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#555]">
                <span>🔒 100% Free</span>
                <span>⚡ Limited Seats</span>
                <span>📱 Link via WhatsApp</span>
              </div>
              <p className="text-center text-xs text-[#777]">
                No spam. Webinar link WhatsApp-ல secure-ஆ அனுப்பப்படும். Privacy guaranteed.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* SPEAKER */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            Meet Your Speaker
          </h2>
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-5xl font-bold text-white shadow-xl">
              AN
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1f2937]">Aysha Nasreen</h3>
              <p className="text-sm text-[#764ba2]">
                Clinical Dietitian | MPhil Nutrition | 12 Years Experience
              </p>
              <p className="mt-4 leading-relaxed text-[#555]">
                12 வருஷமா clinical dietitian-ஆ PCOS, diabetes, weight management-ல suffer
                பண்ற பெண்களுக்கு help பண்றேன். கடந்த 3 மாசத்துல மட்டும் 10+ பெண்களுக்கு PCOS
                symptoms reverse பண்ண help பண்ணிருக்கேன் — weight loss, periods regular, energy
                improvement எல்லாம். இந்த webinar-ல என்னோட proven 100-day protocol-ஐ உங்களுக்கு
                step-by-step teach பண்ண போறேன்.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-[#333] sm:grid-cols-2">
                <li>✓ MPhil in Nutrition</li>
                <li>✓ Clinical Dietitian</li>
                <li>✓ 12 years experience</li>
                <li>✓ 100+ PCOS transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            What Women Are Saying
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="Aysha ma'am-ஓட personalized diet plan follow பண்ணி 3 months-ல 8kg weight loss. Periods regular ஆச்சு, energy levels doubled!"
              name="— Ramya, Chennai"
            />
            <Testimonial
              quote="High cholesterol, bloating எல்லாம் இருந்தது. Cholesterol improved, more energy, feeling much healthier overall!"
              name="— Client, Coimbatore"
            />
            <Testimonial
              quote="என் college பொண்ணுக்கு periods regular-ஆவே இல்ல. இப்போ regular, face bright and shining. Rombha grateful!"
              name="— Parent, Madurai"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            இன்னும் 23 Seats மட்டும் Available!
          </h2>
          <p className="mt-4 text-lg opacity-95">
            Webinar 31.05.2026 — 11:00 AM IST-க்கு start ஆகும். Miss பண்ணாதீங்க!
          </p>
          <ul className="mx-auto mt-6 inline-block text-left text-sm opacity-95">
            <li>✓ உங்க PCOS type</li>
            <li>✓ சரியான diet order</li>
            <li>✓ Kitchen remedies</li>
            <li>✓ 100-day protocol</li>
          </ul>
          <div className="mt-8">
            <button
              onClick={scrollToForm}
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-[#764ba2] shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Secure My Seat Now →
            </button>
          </div>
          <p className="mt-4 text-xs opacity-80">
            Limited to 100 participants. First come, first served basis.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 px-5 py-10 text-sm text-[#555]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold text-[#333]">
            Powered by Aysha Nasreen | Clinical Dietitian | 12 Years Experience
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>📞 +91 98765 43210</span>
            <span>📧 aysha@example.com</span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3">
            <a href="#" className="hover:text-[#764ba2]">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#764ba2]">Terms</a>
            <span>|</span>
            <a href="#" className="hover:text-[#764ba2]">Refund Policy</a>
          </div>
          <p className="mt-4 text-xs">
            © 2026 Aysha Nasreen Nutrition. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        .form-input {
          width: 100%;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 16px;
          color: #1f2937;
          background: #fff;
          transition: all .2s;
          outline: none;
        }
        .form-input:focus {
          border-color: #764ba2;
          box-shadow: 0 0 0 4px rgba(118,75,162,.12);
        }
      `}</style>
    </div>
  );
}

function DetailCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-md transition-shadow hover:shadow-xl">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-bold text-[#1f2937]">{title}</h3>
      <ul className="mt-4 space-y-2 text-[#555] [&>li]:relative [&>li]:pl-5 [&>li:before]:absolute [&>li:before]:left-0 [&>li:before]:top-2.5 [&>li:before]:h-1.5 [&>li:before]:w-1.5 [&>li:before]:rounded-full [&>li:before]:bg-[#764ba2]">
        {children}
      </ul>
    </div>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#333]">{label}</label>
      {input}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function Testimonial({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
      <div className="text-3xl text-[#764ba2]">"</div>
      <p className="-mt-2 leading-relaxed text-[#444]">{quote}</p>
      <p className="mt-4 text-sm font-semibold text-[#764ba2]">{name}</p>
    </div>
  );
}
