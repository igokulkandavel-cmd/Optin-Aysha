import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Features } from "@/components/ui/features-4";
import { Video } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "இலவச PCOS Masterclass | Aysha Nasreen" },
      {
        name: "description",
        content:
          "PCOS Symptoms Reverse பண்ற Proven Method. Free Live Webinar with Clinical Dietitian Aysha Nasreen on 14.06.2026.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    email: "",
    consent: true,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (success) {
      setSuccess(false);
      setForm({ name: "", mobile: "", email: "", consent: true });
    }
  };

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

  // Google Apps Script Web App URL for Sheets integration
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3Szfq8dec9iGIJJXOs254lwb4vqtOClG-Xf75qxm6R3c44sHA5_z2AVbRH5ChiME/exec";

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        source: "webinar_vsl_page",
      };
      
      console.log("Webinar registration:", payload);

      if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
        const searchParams = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => searchParams.append(key, value));

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParams.toString(),
        });
      } else {
        console.warn("Google Script URL is missing. Simulating request...");
        await new Promise((r) => setTimeout(r, 800));
      }

      // @ts-expect-error fbq global
      if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
      setSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] text-[#333]">
      {/* HERO + VSL */}
      <section className="bg-gradient-to-br from-[#064e3b] to-[#0f766e] px-5 py-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:text-sm">
            Exclusive FREE Training Reveals…
          </p>
          <div className="mx-auto mb-4 mt-4 inline-flex items-center gap-2 rounded-lg bg-[#022c22] px-4 py-2 font-black tracking-widest text-white shadow-2xl ring-1 ring-white/10">
            <span>LIVE</span>
            <div className="flex items-center justify-center rounded bg-[#ff0000] px-2 py-1">
              <Video className="h-4 w-4 fill-white text-white" />
            </div>
            <span>ZOOM</span>
          </div>
          <h1 className="mx-auto mt-2 text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            FREE PCOS Masterclass:<br className="hidden sm:block" /> PCOS Symptoms Reverse பண்ற Proven Method
          </h1>

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <div className="absolute inset-0 bg-black">
                  <video
                    id="vsl-video"
                    className="h-full w-full object-contain"
                    controls={isVideoPlaying}
                    preload="metadata"
                    poster="/vsl-thumbnail.jpg"
                    onPlay={() => {
                      setIsVideoPlaying(true);
                      // @ts-expect-error fbq
                      if (typeof window !== "undefined" && window.fbq)
                        // @ts-expect-error fbq
                        window.fbq("track", "ViewContent");
                      console.log("Video play tracked");
                    }}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src="/vsl-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {!isVideoPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer transition-colors hover:bg-black/40 group"
                      onClick={() => {
                        const vid = document.getElementById("vsl-video") as HTMLVideoElement;
                        if (vid) {
                          vid.play();
                        }
                      }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110 md:h-24 md:w-24">
                        <svg className="ml-1 h-8 w-8 text-[#0f766e] md:h-10 md:w-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={openModal}
              className="w-full max-w-xl rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-8 py-5 text-base font-extrabold uppercase tracking-wide text-white shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl md:text-lg"
            >
              ✓ START MY PCOS HEALING JOURNEY
            </button>
          </div>

          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 text-white/90">
            <span className="text-sm">Online Training Starts in:</span>
            <span className="rounded-md bg-white/10 px-3 py-1 text-sm font-semibold">📅 14.06.2026</span>
            <span className="rounded-md bg-white/10 px-3 py-1 text-sm font-semibold">⏰ 11:00 AM IST</span>
          </div>
        </div>
      </section>

      {/* DETAILS GRID */}
      <Features />

      {/* REGISTRATION FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl md:p-12">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            Register For FREE — Seats Limited!
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
                📅 14.06.2026 &nbsp;•&nbsp; ⏰ 11:00 AM – 01:00 PM IST
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <Field
                label="Name *"
                error={errors.name}
                input={
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    className="form-input"
                    required
                  />
                }
              />
              <Field
                label="WhatsApp Number *"
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
                label="Email *"
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
                  "Secure My FREE Seat →"
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
        </div>
      )}

      {/* SPEAKER */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            Meet Your Speaker
          </h2>
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <img src="/speaker.png" alt="Aysha Nasreen" className="h-40 w-40 shrink-0 rounded-full bg-[#f5f3ff] object-cover shadow-xl ring-4 ring-[#764ba2]/20" />
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

      {/* EVENT GLIMPSES */}
      <section className="bg-gray-50/50 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            Trusted by Hundreds at Our Live Workshops
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-base text-[#555] leading-relaxed">
            Aysha Nasreen regularly conducts physical masterclasses. Now, for the first time, you can access her proven protocol from the comfort of your home via our online webinar!
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <img src="/event1.png" alt="Live seminar slide presentation" className="h-64 w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <img src="/event2.jpg" alt="Live seminar explanation" className="h-64 w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <img src="/event3.jpg" alt="Live seminar exercises" className="h-64 w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            What Women Are Saying
          </h2>
          <p className="mt-2 text-xs text-[#764ba2] font-bold animate-pulse">
            🔍 Click/Tap any image to zoom & read in full screen
          </p>
          <div className="mt-8 flex flex-col gap-8 items-center">
            <div 
              onClick={() => setZoomImage("/feedback1.png")}
              className="group relative cursor-zoom-in rounded-3xl bg-white p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-gray-100 w-full max-w-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/feedback1.png" 
                  alt="Mahalakshmi's Webinar Feedback" 
                  className="w-full h-auto rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-[#764ba2]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <span className="bg-black/75 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    🔍 Click to Zoom & Read
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-[#764ba2] pb-1">
                💬 Live WhatsApp Feedback from Mahalakshmi
              </p>
            </div>

            <div 
              onClick={() => setZoomImage("/feedback2.png")}
              className="group relative cursor-zoom-in rounded-3xl bg-white p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-gray-100 w-full max-w-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="/feedback2.png" 
                  alt="Keerthana's Webinar Feedback" 
                  className="w-full h-auto rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-[#764ba2]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <span className="bg-black/75 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    🔍 Click to Zoom & Read
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-[#764ba2] pb-1">
                💬 Live WhatsApp Feedback from Keerthana
              </p>
            </div>
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
            Webinar 14.06.2026 — 11:00 AM IST-க்கு start ஆகும். Miss பண்ணாதீங்க!
          </p>
          <ul className="mx-auto mt-6 inline-block text-left text-sm opacity-95">
            <li>✓ உங்க PCOS type</li>
            <li>✓ சரியான diet order</li>
            <li>✓ Kitchen remedies</li>
            <li>✓ 100-day protocol</li>
          </ul>
          <div className="mt-8">
            <button
              onClick={openModal}
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-[#764ba2] shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Secure My FREE Seat Now →
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
            <span>📞 <a href="tel:+919976192688" className="hover:text-[#764ba2] transition-colors">+91 99761 92688</a></span>
            <span>📧 <a href="mailto:sheizenwellness@gmail.com" className="hover:text-[#764ba2] transition-colors">sheizenwellness@gmail.com</a></span>
          </div>

          <p className="mt-4 text-xs">
            © 2026 Aysha Nasreen Nutrition. All rights reserved.
          </p>
        </div>
      {/* LIGHTBOX ZOOM MODAL */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl font-bold bg-white/10 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
              onClick={() => setZoomImage(null)}
            >
              &times;
            </button>
            <img 
              src={zoomImage} 
              alt="Zoomed Feedback" 
              className="w-full h-auto object-contain rounded-2xl max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}

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
