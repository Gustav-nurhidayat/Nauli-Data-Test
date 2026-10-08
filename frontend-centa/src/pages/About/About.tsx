const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-indigo-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

      {/* =========================================================
          PAGE CONTENT
      ========================================================= */}

      <div className="relative space-y-6">

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Centa Administration
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              About Centa
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Company information, platform identity, and organizational
              overview for the Centa administration system.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-500/15 bg-blue-500/[0.06] px-4 py-2.5 text-xs font-medium text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            System Information
          </div>

        </div>


        {/* =======================================================
            HERO CARD
        ======================================================= */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[22px]
            border
            border-white/[0.08]
            bg-[#050918]
            p-6
            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-blue-500/20
            hover:shadow-[0_25px_80px_rgba(37,99,235,0.10)]
            sm:p-8
          "
        >

          {/* Glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px] transition-all duration-500 group-hover:bg-blue-500/15" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-600/[0.06] blur-[100px]" />


          <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">

            {/* Main */}

            <div>

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/15 bg-blue-500/10 text-xl font-bold text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.08)]">
                C
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Centa Limited
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-400">
                Digital Operations & Management Platform
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                Centa is a modern digital organization focused on building
                structured, scalable, and efficient solutions. This
                administration platform provides a centralized environment
                for managing content, services, categories, and other
                operational resources.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400">
                  Digital Platform
                </span>

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400">
                  Modern Infrastructure
                </span>

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400">
                  Scalable Systems
                </span>

              </div>

            </div>


            {/* Side Identity */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-5
              "
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

              <div className="relative">

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Platform
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                  Centa Admin
                </p>

                <div className="mt-5 h-px bg-white/[0.06]" />

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Environment
                    </span>

                    <span className="text-xs font-medium text-emerald-400">
                      Production
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Platform
                    </span>

                    <span className="text-xs font-medium text-slate-300">
                      Web
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Status
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      Operational
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =======================================================
            VALUES
        ======================================================= */}

        <div className="grid gap-4 md:grid-cols-3">

          {/* Card 1 */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]
              p-5
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-blue-500/20
              hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)]
            "
          >

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3 4 7l8 4 8-4-8-4Z" />
                  <path d="m4 12 8 4 8-4" />
                  <path d="m4 17 8 4 8-4" />
                </svg>
              </div>

              <h3 className="mt-5 font-semibold text-white">
                Innovation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Creating modern solutions with a strong focus on
                technology, usability, and continuous improvement.
              </p>

            </div>

          </div>


          {/* Card 2 */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]
              p-5
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-emerald-500/20
              hover:shadow-[0_20px_50px_rgba(16,185,129,0.07)]
            "
          >

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <h3 className="mt-5 font-semibold text-white">
                Reliability
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Building dependable systems that keep operations
                organized, secure, and ready to scale.
              </p>

            </div>

          </div>


          {/* Card 3 */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.07]
              bg-[#050918]
              p-5
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-indigo-500/20
              hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)]
            "
          >

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </svg>
              </div>

              <h3 className="mt-5 font-semibold text-white">
                Efficiency
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Streamlining daily workflows through a centralized
                and intuitive management experience.
              </p>

            </div>

          </div>

        </div>


        {/* =======================================================
            COMPANY OVERVIEW
        ======================================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.07]
            bg-[#050918]
            p-6
            sm:p-7
          "
        >

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-[90px]" />

          <div className="relative">

            <div className="flex items-center gap-3">

              <div className="h-8 w-1 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.7)]" />

              <div>

                <h2 className="font-semibold text-white">
                  Company Overview
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  A closer look at the Centa organization
                </p>

              </div>

            </div>


            <div className="mt-6 grid gap-8 lg:grid-cols-2">

              <div>

                <p className="text-sm leading-7 text-slate-400">
                  Centa Limited is built around the idea of combining
                  technology, structure, and creative thinking to
                  deliver effective digital experiences. Our approach
                  emphasizes clarity, scalability, and long-term
                  maintainability.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  The Centa administration platform acts as a central
                  control layer for managing the organization's digital
                  resources and operational content.
                </p>

              </div>


              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Focus
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    Digital Operations
                  </p>

                </div>


                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Approach
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    Modern & Scalable
                  </p>

                </div>


                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Platform
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    Centralized
                  </p>

                </div>


                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Philosophy
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    Build Better
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =======================================================
            FOOTER
        ======================================================= */}

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-5 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Centa Limited. All rights reserved.
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-700">
            Centa Administration Platform
          </p>

        </div>

      </div>
    </div>
  );
};

export default About;