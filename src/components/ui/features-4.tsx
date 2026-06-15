import {
  Activity, XCircle, Flame, Route, HeartPulse,
  CalendarX, TrendingDown, AlertCircle, BrainCircuit, AlertTriangle, Heart,
  MessageCircleQuestion, FileText, DownloadCloud, MessageSquare,
  Calendar, Clock, Timer, Video, Tag, Users
} from "lucide-react";

export function Features() {
  const learnItems = [
    { icon: <Activity className="h-6 w-6" />, title: "The 4 types of PCOS", desc: "Which one is yours?" },
    { icon: <XCircle className="h-6 w-6" />, title: "Why generic diets don't work", desc: "Understand the root cause" },
    { icon: <Flame className="h-6 w-6" />, title: "Powerful kitchen foods", desc: "Fenugreek, Horse gram, Cinnamon" },
    { icon: <Route className="h-6 w-6" />, title: "How my protocol works", desc: "Step-by-step roadmap to healing" },
    { icon: <HeartPulse className="h-6 w-6" />, title: "Control blood sugar", desc: "Insulin and hormone management" },
  ];

  const whoItems = [
    { icon: <CalendarX className="h-5 w-5" />, title: "Irregular periods", desc: "35+ days gap between cycles" },
    { icon: <TrendingDown className="h-5 w-5" />, title: "Weight loss struggles", desc: "Tried everything but failed" },
    { icon: <AlertCircle className="h-5 w-5" />, title: "Stubborn belly fat", desc: "Hard to lose weight around the midsection" },
    { icon: <BrainCircuit className="h-5 w-5" />, title: "Severe mood swings", desc: "Fatigue, hair loss, and brain fog" },
    { icon: <AlertTriangle className="h-5 w-5" />, title: "Dark patches", desc: "Discoloration on neck and underarms" },
    { icon: <Heart className="h-5 w-5" />, title: "Future fertility", desc: "Worried about conception and pregnancy" },
  ];

  const getItems = [
    { icon: <MessageCircleQuestion className="h-6 w-6" />, title: "Live Q&A", desc: "Direct answers from Aysha Nasreen (12 yrs exp)" },
    { icon: <FileText className="h-6 w-6" />, title: "7-day meal plan", desc: "FREE downloadable template" },
    { icon: <DownloadCloud className="h-6 w-6" />, title: "Kitchen remedies PDF", desc: "Usage guide for fenugreek, horse gram" },
{ icon: <MessageSquare className="h-6 w-6" />, title: "WhatsApp support", desc: "Exclusive group invitation" },
  ];

  const detailItems = [
    { icon: <Calendar className="h-5 w-5" />, title: "Date", desc: "28.06.2026" },
    { icon: <Clock className="h-5 w-5" />, title: "Time", desc: "11:00 AM – 01:00 PM IST" },
    { icon: <Timer className="h-5 w-5" />, title: "Duration", desc: "2 hours (Live + Q&A)" },
    { icon: <Video className="h-5 w-5" />, title: "Platform", desc: "Zoom (link via WhatsApp)" },
    { icon: <Tag className="h-5 w-5" />, title: "Price", desc: "100% FREE" },
    { icon: <Users className="h-5 w-5" />, title: "Seats", desc: "Limited to 100 participants" },
  ];

  return (
    <section className="py-16 md:py-24" id="features">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#1f2937] md:text-5xl">
            Here's Everything You Get When You Join
          </h2>
          <p className="mt-4 text-lg text-[#555]">
            The ultimate blueprint to reverse your PCOS naturally
          </p>
        </div>

        <div className="mt-20 space-y-24">
          {/* SECTION 1: What You'll Learn (Card Grid) */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-[#1f2937] md:text-left md:text-3xl">
              What You'll Learn
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learnItems.map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center rounded-2xl bg-white border border-pink-100 p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-600 ring-1 ring-pink-500/20">
                    {item.icon}
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-[#1f2937]">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#555]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: Who Is This Webinar For? (Horizontal Checklist) */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-[#1f2937] md:text-left md:text-3xl">
              Who Is This Webinar For?
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {whoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl bg-purple-50/60 p-4 transition-colors hover:bg-purple-100/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white shadow-sm">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[#1f2937] text-base leading-snug">{item.title}</h4>
                    <p className="text-xs text-[#555] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: What You'll Get (Stacked List) */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-[#1f2937] md:text-left md:text-3xl">
              What You'll Get
            </h3>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5">
              <div className="bg-blue-600 px-6 py-4">
                <h4 className="text-center text-lg font-semibold text-white tracking-wide">Included with Your Registration</h4>
              </div>
              <div className="flex flex-col px-6 py-8 md:px-10">
                {getItems.map((item, i) => (
                  <div key={i} className={`flex items-start md:items-center gap-6 ${i !== getItems.length - 1 ? 'border-b border-gray-100 pb-5 mb-5' : ''}`}>
                    <div className="text-blue-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1f2937]">{item.title}</h4>
                      <p className="text-sm text-[#555] mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: Webinar Details (Event Ticket Dashboard) */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-[#1f2937] md:text-left md:text-3xl">
              Webinar Details
            </h3>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-emerald-50 p-2 shadow-lg">
              {/* Ticket inner border */}
              <div className="rounded-2xl border border-dashed border-emerald-500/30 bg-white p-8 md:p-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 text-center">
                  {detailItems.map((item, i) => (
                     <div key={i} className="flex flex-col items-center">
                      <div className="mb-3 text-emerald-600">
                        {item.icon}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700/80 mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm font-bold text-[#1f2937] md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
