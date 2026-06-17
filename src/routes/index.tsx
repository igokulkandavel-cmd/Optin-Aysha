import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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

function DigyGoWebinarForm() {
  useEffect(() => {
    const formEl = document.getElementById("dgf_webinar_form_f") as HTMLFormElement | null;
    if (!formEl) return;

    const _m: Record<string, string[]> = {};
    (window as unknown as Record<string, unknown>)["dgf_webinar_form_ms"] = (k: string, el: HTMLInputElement) => {
      _m[k] = _m[k] || [];
      const i = _m[k].indexOf(el.value);
      el.checked ? (i < 0 && _m[k].push(el.value)) : (i >= 0 && _m[k].splice(i, 1));
    };

    function handleSubmit(e: Event) {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const missing: string[] = [];
      target.querySelectorAll<HTMLInputElement>("[required]").forEach((el) => {
        if (!el.value || !el.value.trim()) {
          const l =
            el.getAttribute("data-label") ||
            el.closest(".dgf-field")?.querySelector(".dgf-label")?.textContent ||
            "Field";
          missing.push(l.replace(/\*$/, "").trim());
        }
      });
      if (missing.length) {
        alert("Please fill in: " + missing.join(", "));
        return;
      }

      const btn = target.querySelector<HTMLButtonElement>("button[type=submit]")!;
      btn.disabled = true;
      btn.textContent = "Submitting…";

      const data: Record<string, string> = {};
      target.querySelectorAll<HTMLInputElement>("[data-label]").forEach((el) => {
        const k = el.getAttribute("data-label")!;
        if (el.type === "radio") {
          if (el.checked) data[k] = el.value;
        } else if (el.type === "checkbox" && !el.dataset["declaration"]) {
          data[k] = el.checked ? "true" : "";
        } else if (el.type !== "checkbox") {
          data[k] = el.value;
        }
      });
      Object.keys(_m).forEach((k) => { data[k] = _m[k].join(","); });

      fetch("https://crm.digygo.in/api/public/forms/webinar-form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })
        .then((r) => r.json())
        .then((j) => {
          const wrap = document.getElementById("dgf_webinar_form")?.querySelector(".dgf-wrap");
          if (wrap) {
            wrap.innerHTML =
              `<div class="dgf-ok"><div class="dgf-ok-icon"><svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#ffffff" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></div><p class="dgf-ok-msg">${j.message || "Thank you!"}</p></div>`;
          }
          // @ts-expect-error fbq global
          if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
        })
        .catch(() => {
          btn.disabled = false;
          btn.textContent = "Secure My FREE Seat →";
          alert("Submission failed. Please try again.");
        });
    }

    formEl.addEventListener("submit", handleSubmit);
    return () => formEl.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div id="dgf_webinar_form" style={{ fontFamily: "system-ui,-apple-system,sans-serif", maxWidth: "448px", margin: "0 auto" }}>
      <style>{`
        #dgf_webinar_form *{box-sizing:border-box}
        #dgf_webinar_form .dgf-wrap{background:#ffffff;border-radius:16px;padding:32px;box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)}
        #dgf_webinar_form .dgf-field{margin-bottom:16px}
        #dgf_webinar_form .dgf-label{display:block;font-size:12px;font-weight:600;color:#1c1410;margin-bottom:6px}
        #dgf_webinar_form .dgf-req{color:#ef4444;margin-left:2px}
        #dgf_webinar_form .dgf-input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(0,0,0,.1);background:rgba(255,255,255,.7);font-size:13px;color:#1c1410;outline:none;font-family:inherit;transition:border-color .15s}
        #dgf_webinar_form .dgf-input:focus{border-color:#108a00}
        #dgf_webinar_form .dgf-btn{width:100%;padding:12px;border-radius:12px;border:none;font-size:14px;font-weight:600;cursor:pointer;background:#108a00;color:#ffffff;margin-top:8px;font-family:inherit;transition:opacity .2s}
        #dgf_webinar_form .dgf-btn:disabled{opacity:.6;cursor:not-allowed}
        #dgf_webinar_form .dgf-ok{text-align:center;padding:32px 16px}
        #dgf_webinar_form .dgf-ok-icon{width:64px;height:64px;border-radius:50%;background:#108a00;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
        #dgf_webinar_form .dgf-ok-msg{font-size:18px;font-weight:700;color:#1c1410}
      `}</style>
      <div className="dgf-wrap">
        <p className="dgf-title">Webinar Form</p>
        <form id="dgf_webinar_form_f">
          <div className="dgf-field">
            <label className="dgf-label">Full Name<span className="dgf-req">*</span></label>
            <input type="text" className="dgf-input" data-label="Full Name" placeholder="Your name" required />
          </div>
          <div className="dgf-field">
            <label className="dgf-label">WhatsApp Number<span className="dgf-req">*</span></label>
            <input type="tel" className="dgf-input" data-label="WhatsApp Number" placeholder="" required />
          </div>
          <div className="dgf-field">
            <label className="dgf-label">Email<span className="dgf-req">*</span></label>
            <input type="email" className="dgf-input" data-label="Email" placeholder="" required />
          </div>
          <button type="submit" className="dgf-btn">Secure My FREE Seat →</button>
        </form>
      </div>
    </div>
  );
}

function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div className="mt-6">
              <DigyGoWebinarForm />
            </div>
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
      </footer>

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
    </div>
  );
}
