import { useState, useEffect } from "react";
import { Features } from "@/components/ui/features-4";
import { Video } from "lucide-react";

// Countdown target: June 28 2026, 11:00 AM IST = 05:30 UTC
const WEBINAR_DATE = new Date("2026-06-28T05:30:00Z");

function getTimeLeft() {
  const diff = WEBINAR_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const CRM_FORM_HTML = `<style>
#dgf_webinar_form *{box-sizing:border-box}
#dgf_webinar_form .dgf-wrap{background:transparent;border-radius:0;padding:0;box-shadow:none}
#dgf_webinar_form .dgf-title{display:none}
#dgf_webinar_form .dgf-field{margin-bottom:16px}
#dgf_webinar_form .dgf-label{display:block;font-size:14px;font-weight:600;color:#333;margin-bottom:6px}
#dgf_webinar_form .dgf-req{color:#ef4444;margin-left:2px}
#dgf_webinar_form .dgf-input{width:100%;padding:14px 16px;border-radius:12px;border:2px solid #e5e7eb;background:#ffffff;font-size:15px;color:#1c1410;outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s}
#dgf_webinar_form .dgf-input:focus{border-color:#764ba2;box-shadow:0 0 0 4px rgba(118,75,162,.1)}
#dgf_webinar_form .dgf-btn{width:100%;padding:16px;border-radius:9999px;border:none;font-size:16px;font-weight:700;cursor:pointer;background:linear-gradient(to right,#22c55e,#16a34a);color:#ffffff;margin-top:8px;font-family:inherit;transition:all .2s;box-shadow:0 4px 6px -1px rgba(0,0,0,.1)}
#dgf_webinar_form .dgf-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 15px -3px rgba(0,0,0,.15)}
#dgf_webinar_form .dgf-btn:disabled{opacity:.6;cursor:not-allowed}
#dgf_webinar_form .dgf-ok{text-align:center;padding:32px 16px}
#dgf_webinar_form .dgf-ok-icon{width:64px;height:64px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
#dgf_webinar_form .dgf-ok-msg{font-size:18px;font-weight:700;color:#1c1410}
</style>
<div class="dgf-wrap">
<form id="dgf_webinar_form_f" novalidate>
<div class="dgf-field"><label class="dgf-label">Full Name<span class="dgf-req">*</span></label><input type="text" class="dgf-input" data-label="Full Name" placeholder="Your name" required></div>
<div class="dgf-field"><label class="dgf-label">WhatsApp Number<span class="dgf-req">*</span></label><input type="tel" class="dgf-input" data-label="WhatsApp Number" placeholder="9876543210" required></div>
<div class="dgf-field"><label class="dgf-label">Email<span class="dgf-req">*</span></label><input type="email" class="dgf-input" data-label="Email" placeholder="yourname@example.com" required></div>
<button type="submit" class="dgf-btn">Secure My FREE Seat →</button>
</form>
</div>`;

const CRM_SUCCESS_HTML = `<div class="dgf-ok"><div class="dgf-ok-icon"><svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#ffffff" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></div><p class="dgf-ok-msg">Thank you for your submission!</p></div>`;

const FAQS = [
  {
    q: "Is this really free? What's the catch?",
    a: "100% free — no hidden fee, no product sale during the session. Aysha runs this masterclass to share her proven protocol with as many Tamil women as possible. You pay nothing, you owe nothing.",
  },
  {
    q: "I've tried many diets before. Why will this be different?",
    a: "Because generic diets ignore your PCOS type. This session first identifies which of the 4 types you have — then gives a protocol specific to your hormonal pattern. You've been eating right for the wrong type.",
  },
  {
    q: "Is the session in Tamil or English?",
    a: "Primarily Tamil with some English medical terms explained clearly. If you're comfortable reading this page, you'll be comfortable in the session.",
  },
  {
    q: "My doctor already gave me medicines. Should I still attend?",
    a: "Yes. Diet and lifestyle directly support your medication's effectiveness. Many women reduce their dependence on medication after following this protocol — always in consultation with their doctor. This session complements, not replaces, medical treatment.",
  },
  {
    q: "Will they try to sell me something expensive?",
    a: "No sales pitch during the session. Pure clinical education only. Aysha's goal is to give you enough knowledge to start seeing results on your own.",
  },
  {
    q: "Will this work for my type or severity of PCOS?",
    a: "Yes. The session covers all 4 types: insulin-resistant, adrenal, inflammatory, and post-pill PCOS. It has worked on women with mild and severe PCOS, and even on women who've had PCOS for 5–15 years.",
  },
  {
    q: "Can I join from my phone? Do I need a laptop?",
    a: "Yes — you can join Zoom on any smartphone. No laptop needed. Just download the free Zoom app and you're set.",
  },
  {
    q: "Will my WhatsApp number be shared or spammed?",
    a: "Never. Your number is used only to send your Zoom link. We do not share your data with anyone, ever.",
  },
  {
    q: "Do I have to speak or show my face on the call?",
    a: "No. You can attend with your camera and microphone fully off. Just listen, learn, and take notes.",
  },
  {
    q: "What if I can't attend the live session?",
    a: "We strongly recommend attending live — the Q&A session is where most women get their specific doubts answered by Aysha directly. Register anyway to stay informed about future sessions.",
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // CRM form submit handler
  useEffect(() => {
    if (!isModalOpen) return;
    const form = document.getElementById("dgf_webinar_form_f") as HTMLFormElement | null;
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const btn = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
      btn.disabled = true;
      btn.textContent = "Submitting…";

      const data: Record<string, string> = {};
      form.querySelectorAll<HTMLInputElement>("[data-label]").forEach((el) => {
        const k = el.getAttribute("data-label")!;
        if (el.type !== "checkbox" && el.type !== "radio") data[k] = el.value;
        else if (el.type === "checkbox") data[k] = el.checked ? "true" : "";
        else if (el.type === "radio" && el.checked) data[k] = el.value;
      });

      try {
        await fetch("https://crm.digygo.in/api/public/forms/webinar-form/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        const wrap = document.getElementById("dgf_webinar_form")?.querySelector(".dgf-wrap");
        if (wrap) wrap.innerHTML = CRM_SUCCESS_HTML;
      } catch {
        btn.disabled = false;
        btn.textContent = "Secure My FREE Seat →";
        alert("Submission failed. Please try again.");
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [isModalOpen]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] text-[#333]">

      {/* ── HERO ── */}
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

          {/* NEW HEADLINE */}
          <h1 className="mx-auto mt-2 text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            Tamil Women With PCOS: Discover the 100-Day Protocol That Reversed Irregular Periods, Stubborn Weight & Hormonal Chaos —{" "}
            <span className="text-[#6ee7b7]">Naturally, Without Expensive Medicines</span>
          </h1>

          {/* SUBHEADLINE */}
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Join Clinical Dietitian <strong className="text-white">Aysha Nasreen</strong> (MPhil Nutrition · 12 Yrs · 100+ PCOS Reversals) for a FREE 2-Hour Live Zoom Masterclass — and finally understand WHY your body isn't responding to regular diets.
          </p>

          {/* SOCIAL PROOF BAR */}
          <div className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-xl bg-white/10 px-5 py-3 text-sm text-white backdrop-blur-sm">
            <span>🔴 <strong>847 women</strong> already registered</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>⚡ Only <strong>23 seats</strong> remaining</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>⭐ <strong>4.9/5</strong> from past attendees</span>
          </div>

          {/* BENEFIT BULLETS */}
          <ul className="mx-auto mt-6 max-w-lg space-y-2 text-left text-sm text-white/95 md:text-base">
            {[
              "Identify your exact PCOS type in the first 20 minutes",
              "The food sequence that lowers insulin and balances hormones naturally",
              "Why 90% of PCOS diets fail — and what to do instead",
              "3 kitchen foods that reduce cysts and lower testosterone",
              "The step-by-step 100-day roadmap Aysha used with 100+ Tamil women",
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-[#6ee7b7]">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* VSL VIDEO */}
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
                      if (typeof window !== "undefined" && window.fbq) window.fbq("track", "ViewContent");
                    }}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src="/vsl-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {!isVideoPlaying && (
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/40 group"
                      onClick={() => {
                        const vid = document.getElementById("vsl-video") as HTMLVideoElement;
                        if (vid) vid.play();
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

          {/* COUNTDOWN TIMER */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">
              Webinar starts in
            </p>
            <div className="inline-flex gap-3 md:gap-5">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-2xl font-extrabold text-white backdrop-blur-sm ring-1 ring-white/20 md:h-16 md:w-16 md:text-3xl">
                    {pad(value)}
                  </div>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={openModal}
              className="w-full max-w-xl rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-8 py-5 text-base font-extrabold uppercase tracking-wide text-white shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl md:text-lg"
            >
              YES! Reserve My FREE Seat Now →
            </button>
            <p className="mt-2 text-xs text-white/60">
              ⚡ Registrations close when seats fill · No waitlist · Zoom link via WhatsApp instantly
            </p>
          </div>

          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 text-white/90">
            <span className="text-sm">📅 28.06.2026</span>
            <span className="text-white/40">·</span>
            <span className="text-sm">⏰ 11:00 AM – 1:00 PM IST</span>
            <span className="text-white/40">·</span>
            <span className="text-sm">🎓 100% FREE</span>
          </div>
        </div>
      </section>

      {/* ── SPEAKER (moved up for early authority) ── */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#764ba2]">Your Masterclass Host</p>
          <h2 className="mt-1 text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">Meet Aysha Nasreen</h2>
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <img src="/speaker.png" alt="Aysha Nasreen" className="h-40 w-40 shrink-0 rounded-full bg-[#f5f3ff] object-cover shadow-xl ring-4 ring-[#764ba2]/20" />
            <div>
              <h3 className="text-xl font-bold text-[#1f2937]">Aysha Nasreen</h3>
              <p className="text-sm text-[#764ba2]">Clinical Dietitian | MPhil Nutrition | 12 Years Experience</p>
              {/* Credibility bar */}
              <div className="mt-3 flex flex-wrap gap-2">
                {["🎓 MPhil Nutrition", "🏥 12 Yrs Clinical Practice", "👩 100+ PCOS Reversals", "📍 Tamil Nadu"].map((badge) => (
                  <span key={badge} className="rounded-full bg-[#f5f3ff] px-3 py-1 text-xs font-semibold text-[#764ba2]">{badge}</span>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-[#555]">
                12 வருஷமா clinical dietitian-ஆ PCOS, diabetes, weight management-ல suffer பண்ற பெண்களுக்கு help பண்றேன். கடந்த 3 மாசத்துல மட்டும் 10+ பெண்களுக்கு PCOS symptoms reverse பண்ண help பண்ணிருக்கேன் — weight loss, periods regular, energy improvement எல்லாம். இந்த webinar-ல என்னோட proven 100-day protocol-ஐ உங்களுக்கு step-by-step teach பண்ண போறேன்.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-[#333] sm:grid-cols-2">
                <li>✓ MPhil in Nutrition</li>
                <li>✓ Clinical Dietitian</li>
                <li>✓ 12 years experience</li>
                <li>✓ 100+ PCOS transformations</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={openModal}
              className="rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-8 py-4 text-base font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Learn From Aysha — Register FREE →
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <Features />

      {/* ── EVENT GLIMPSES ── */}
      <section className="bg-gray-50/50 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">
            Trusted by Hundreds at Our Live Workshops
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-base text-[#555] leading-relaxed">
            Aysha Nasreen regularly conducts physical masterclasses. Now, for the first time, you can access her proven protocol from the comfort of your home via our online webinar!
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {["/event1.png", "/event2.jpg", "/event3.jpg"].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <img src={src} alt={`Live seminar ${i + 1}`} className="h-64 w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">What Women Are Saying</h2>
          <p className="mt-2 text-xs text-[#764ba2] font-bold animate-pulse">
            🔍 Click/Tap any image to zoom & read in full screen
          </p>
          <div className="mt-8 flex flex-col gap-8 items-center">
            {[
              { src: "/feedback1.png", label: "Live WhatsApp Feedback from Mahalakshmi" },
              { src: "/feedback2.png", label: "Live WhatsApp Feedback from Keerthana" },
              { src: "/feedback3.png", label: "Live WhatsApp Feedback" },
              { src: "/feedback4.png", label: "Live WhatsApp Feedback" },
            ].map(({ src, label }) => (
              <div
                key={src}
                onClick={() => setZoomImage(src)}
                className="group relative cursor-zoom-in rounded-3xl bg-white p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-gray-100 w-full max-w-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={src} alt={label} className="w-full h-auto rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]" />
                  <div className="absolute inset-0 bg-[#764ba2]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <span className="bg-black/75 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                      🔍 Click to Zoom & Read
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-[#764ba2] pb-1">💬 {label}</p>
              </div>
            ))}
          </div>

          {/* CTA after testimonials */}
          <div className="mt-10">
            <button
              onClick={openModal}
              className="rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-8 py-4 text-base font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              I Want Results Like These — Reserve My Seat →
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50/50 px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-extrabold text-[#1f2937] md:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-2 text-center text-[#555]">Everything you need to know before you register</p>
          <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-2xl bg-white shadow-sm">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#1f2937]">{faq.q}</span>
                  <span className="shrink-0 text-xl font-bold text-[#764ba2]">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#555]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">இன்னும் 23 Seats மட்டும் Available!</h2>
          <p className="mt-4 text-lg opacity-95">Webinar 28.06.2026 — 11:00 AM IST-க்கு start ஆகும். Miss பண்ணாதீங்க!</p>
          <ul className="mx-auto mt-6 inline-block text-left text-sm opacity-95 space-y-1">
            <li>✓ உங்க PCOS type identify பண்ணுங்க</li>
            <li>✓ சரியான diet order தெரிஞ்சுக்கோங்க</li>
            <li>✓ Kitchen remedies — natural healing</li>
            <li>✓ 100-day protocol step by step</li>
          </ul>
          <div className="mt-8">
            <button
              onClick={openModal}
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-[#764ba2] shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Secure My FREE Seat Now →
            </button>
            <p className="mt-3 text-xs opacity-70">⚡ Registrations close when 100 seats fill. No waitlist.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-100 px-5 py-10 text-sm text-[#555]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold text-[#333]">Powered by Aysha Nasreen | Clinical Dietitian | 12 Years Experience</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>📞 <a href="tel:+919976192688" className="hover:text-[#764ba2] transition-colors">+91 99761 92688</a></span>
            <span>📧 <a href="mailto:sheizenwellness@gmail.com" className="hover:text-[#764ba2] transition-colors">sheizenwellness@gmail.com</a></span>
          </div>
          <p className="mt-4 text-xs">© 2026 Aysha Nasreen Nutrition. All rights reserved. · Your data is never shared or sold.</p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <button
          onClick={openModal}
          className="w-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-4 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-2xl"
        >
          🔴 Only 23 Seats Left — Register FREE →
        </button>
      </div>

      {/* ── REGISTRATION MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl md:p-12">
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

            <div
              id="dgf_webinar_form"
              className="mt-7"
              dangerouslySetInnerHTML={{ __html: CRM_FORM_HTML }}
            />

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#555]">
              <span>🔒 100% Free</span>
              <span>⚡ Limited Seats</span>
              <span>📱 Link via WhatsApp</span>
            </div>
            <p className="mt-2 text-center text-xs text-[#777]">
              No spam. Your data is never shared. Privacy guaranteed.
            </p>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
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
    </div>
  );
}
