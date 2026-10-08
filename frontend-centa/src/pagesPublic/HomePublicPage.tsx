import React from "react";
import { Link } from "react-router-dom";
import ArticleSection from "../componentsPublic/ArticleSection";

export const HomePublicPage: React.FC = () => {
  const services = [
    {
      number: "01",
      title: "Software Development",
      description:
        "Mengembangkan software yang scalable, reliable, dan disesuaikan dengan kebutuhan operasional maupun bisnis Anda.",
      tag: "Software Solutions",
    },
    {
      number: "02",
      title: "Web & Application Development",
      description:
        "Membangun website dan aplikasi modern dengan performa tinggi, user experience yang baik, serta arsitektur yang siap berkembang.",
      tag: "Digital Development",
    },
    {
      number: "03",
      title: "Cyber Security",
      description:
        "Melindungi aplikasi, sistem, dan infrastruktur digital melalui security assessment, penetration testing, dan strategi keamanan.",
      tag: "Security Solutions",
    },
  ];

  const stats = [
    {
      value: "01",
      label: "Technology Partner",
    },
    {
      value: "360°",
      label: "Digital Solutions",
    },
    {
      value: "100%",
      label: "Client Focused",
    },
    {
      value: "∞",
      label: "Scalable Solutions",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
     

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#00BFFF]/10 blur-[150px]" />

        <div className="absolute right-[-250px] top-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />



      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}
            <div>
              {/* Eyebrow */}
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#00BFFF]/20 bg-[#00BFFF]/5 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00BFFF] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00BFFF]" />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00BFFF]">
                  Software Development & Cyber Security
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Building Digital
                <br />

                <span className="bg-gradient-to-r from-[#00BFFF] via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Solutions. Securely.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                <span className="font-semibold text-slate-200">
                  Centa Limited
                </span>{" "}
                bergerak di bidang teknologi dengan fokus pada software
                development, pengembangan website dan aplikasi, serta layanan
                cyber security untuk membantu bisnis membangun dan melindungi
                ekosistem digital mereka.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#00BFFF] px-6 py-3.5 text-sm font-bold text-[#050816] shadow-lg shadow-[#00BFFF]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  Explore Our Services

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5"
                >
                  Start a Project
                </Link>
              </div>

              {/* Trust line */}
              <div className="mt-9 flex items-center gap-4 text-xs text-slate-600">
                <div className="h-px w-10 bg-white/10" />

                <span>
                  Technology, development & security under one roof
                </span>
              </div>
            </div>

            {/* RIGHT — TECHNOLOGY VISUAL */}
            <div className="relative mx-auto w-full max-w-[460px]">
              <div className="relative aspect-square">
                {/* Outer Rings */}
                <div className="absolute inset-[5%] rounded-full border border-[#00BFFF]/10" />

                <div className="absolute inset-[14%] rounded-full border border-[#00BFFF]/10" />

                <div className="absolute inset-[23%] rounded-full border border-dashed border-[#00BFFF]/20" />

                {/* Glow */}
                <div className="absolute inset-[25%] rounded-full bg-[#00BFFF]/10 blur-[70px]" />

                {/* Center */}
                <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[#00BFFF]/30 bg-[#07101f]/90 shadow-[0_0_80px_rgba(0,191,255,0.15)] backdrop-blur-xl">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-7 w-7 text-[#00BFFF]"
                      >
                        <path
                          d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V5.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />

                        <path
                          d="M8 9L10.5 12L8 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M13 15H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Build
                    </div>

                    <div className="mt-1 text-[10px] text-slate-500">
                      Secure Digital Solutions
                    </div>
                  </div>
                </div>

                {/* Floating Card — Development */}
                <div className="absolute left-0 top-[18%] rounded-xl border border-white/10 bg-[#080d1d]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      {"</>"}
                    </span>

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-600">
                        Development
                      </div>

                      <div className="text-xs font-semibold text-white">
                        Software & Apps
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card — Security */}
                <div className="absolute bottom-[18%] right-0 rounded-xl border border-white/10 bg-[#080d1d]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00BFFF]/10 text-[#00BFFF]">
                      ✓
                    </span>

                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-600">
                        Security
                      </div>

                      <div className="text-xs font-semibold text-emerald-400">
                        Protected
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nodes */}
                <div className="absolute right-[18%] top-[8%] h-2 w-2 rounded-full bg-[#00BFFF] shadow-[0_0_15px_#00BFFF]" />

                <div className="absolute bottom-[10%] left-[22%] h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-4 sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-7 text-center sm:py-8"
            >
              <div className="text-2xl font-black text-[#00BFFF] sm:text-3xl">
                {stat.value}
              </div>

              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
                Our Expertise
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Technology Built Around
                <br />

                <span className="text-slate-500">
                  Your Business.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Dari pengembangan software hingga keamanan digital, kami
              membantu bisnis membangun teknologi yang scalable, reliable,
              dan secure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#00BFFF]/30 hover:bg-white/[0.045] hover:shadow-[0_25px_80px_rgba(0,191,255,0.07)]"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#00BFFF]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-10 flex items-start justify-between">
                    <span className="text-4xl font-black tracking-tight text-white/10 transition-colors group-hover:text-[#00BFFF]/20">
                      {service.number}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#00BFFF]">
                    {service.title}
                  </h3>

                  <p className="mt-4 min-h-[96px] text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-slate-400 transition-colors group-hover:text-[#00BFFF]">
                    Learn more

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-[#00BFFF]"
            >
              View all services

              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

     

      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
              One Technology Partner
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              From{" "}
              <span className="text-slate-500">
                Development
              </span>{" "}
              to{" "}
              <span className="bg-gradient-to-r from-[#00BFFF] to-blue-400 bg-clip-text text-transparent">
                Security.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">
              Centa mengintegrasikan proses development dan security sejak
              awal, sehingga solusi digital tidak hanya berfungsi dengan baik,
              tetapi juga dibangun dengan mempertimbangkan keamanan,
              reliability, dan scalability.
            </p>
          </div>

          {/* Capability Flow */}
          <div className="relative mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Build",
                subtitle: "Software & Applications",
                text: "Merancang dan mengembangkan solusi digital sesuai kebutuhan bisnis.",
              },
              {
                number: "02",
                title: "Scale",
                subtitle: "Web & Digital Platforms",
                text: "Membangun platform yang siap berkembang mengikuti kebutuhan pengguna dan bisnis.",
              },
              {
                number: "03",
                title: "Secure",
                subtitle: "Cyber Security",
                text: "Mengidentifikasi risiko dan memperkuat keamanan aplikasi maupun infrastruktur.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group relative rounded-2xl border border-white/10 bg-[#080d1d]/60 p-6 transition-all duration-300 hover:border-[#00BFFF]/25"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00BFFF]">
                    {item.number}
                  </span>

                  <div className="h-px flex-1 bg-white/5 ml-4" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <div className="mt-1 text-xs font-medium text-[#00BFFF]/70">
                  {item.subtitle}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ARTICLES
      ========================================================== */}

      <section className="relative">
        <ArticleSection />
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#00BFFF]/20 bg-gradient-to-br from-[#00BFFF]/10 via-white/[0.025] to-transparent p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#00BFFF]/10 blur-[120px]" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#00BFFF]">
                Let's Build Something Great
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Have an idea?
                <br />

                <span className="text-slate-500">
                  We can build it securely.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                Apakah Anda membutuhkan software, website, aplikasi,
                atau solusi cyber security? Diskusikan kebutuhan Anda
                bersama tim Centa Limited.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="rounded-xl bg-[#00BFFF] px-7 py-3.5 text-sm font-bold text-[#050816] transition-all hover:bg-cyan-300"
                >
                  Start a Project →
                </Link>

                <Link
                  to="/services"
                  className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePublicPage;
