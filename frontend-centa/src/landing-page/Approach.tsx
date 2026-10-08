import { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We understand the business, users, constraints, and technical requirements before defining the solution.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "We translate requirements into a clear technical direction, architecture, and delivery plan.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "We shape the experience and system structure around usability, performance, and maintainability.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Engineering turns the approved direction into reliable, scalable, and production-ready technology.",
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "We validate, refine, secure, and prepare the system for real-world use and future evolution.",
  },
];

export default function Approach() {
  const [activeProcess, setActiveProcess] = useState<string | null>(null);
const [,setVisibleCards] = useState(false);

const processRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCards(true);
        observer.disconnect();
      }
    },
    {
      threshold: 0.15,
    }
  );

  if (processRef.current) {
    observer.observe(processRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
<>

 <SEO
        title="Our Approach — Engineering Meets Cybersecurity | Centa Limited"
        description="Discover how Centa Limited combines software engineering, cybersecurity, infrastructure, and strategic thinking to build secure, scalable digital solutions."
        canonical="https://centa.ltd/approach"
      />

<section className="relative scroll-mt-24 overflow-hidden">
    

      <div className="pointer-events-none absolute right-[-180px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#15E0ED]/[0.035] blur-[140px]" />

      <div className="pointer-events-none absolute left-[-180px] bottom-[12%] h-[360px] w-[360px] rounded-full bg-[#15E0ED]/[0.02] blur-[130px]" />

      {/* Fine background grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(21,224,237,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.5)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
           

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-[#eef2f2] sm:text-5xl lg:text-[60px] lg:leading-[1.02]">
              From concept
              <span className="block bg-gradient-to-r from-white via-[#15E0ED] to-white bg-clip-text text-transparent">
                to production.
              </span>
            </h2>
          </div>

          <div className="lg:pl-16 lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-[#8a9494]">
              A structured delivery model that keeps business goals,
              engineering quality, and security aligned throughout the
              entire lifecycle.
            </p>
          </div>
        </div>



        <div className="relative mt-16">
          {/* Timeline */}
          <div
            className="
              pointer-events-none
              absolute
              left-[31px]
              top-8
              bottom-8
              w-px
              bg-gradient-to-b
              from-[#15E0ED]/40
              via-[#15E0ED]/10
              to-transparent
              md:left-1/2
              md:-translate-x-1/2
            "
          />

<div
  ref={processRef}
  className="space-y-4"
>
            {process.map((item, index) => {
              const isActive = activeProcess === item.step;

              return (
                <article
                  key={item.step}
                  onClick={() =>
                    setActiveProcess(isActive ? null : item.step)
                  }
                  className={`
                    group
                    relative
                    cursor-pointer
                    overflow-hidden
                    rounded-[1.75rem]
                    border
                    p-6
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    md:grid
                    md:grid-cols-[1fr_100px_1fr]
                    md:items-center
                    md:p-7

                    ${
                      isActive
                        ? `
                          border-[#15E0ED]/35
                          bg-[#0b0d0d]/95
                          shadow-[0_25px_90px_rgba(21,224,237,0.08)]
                        `
                        : `
                          border-[#1a1d1d]
                          bg-[#0b0d0d]/75
                          hover:-translate-y-0.5
                          hover:border-[#15E0ED]/25
                          hover:bg-[#0f1414]/90
                          hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                        `
                    }
                  `}
                >
                 

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-0
                      transition-opacity
                      duration-700
                      ${
                        isActive
                          ? "opacity-100"
                          : "group-hover:opacity-100"
                      }

                      [background-image:linear-gradient(rgba(21,224,237,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.055)_1px,transparent_1px)]
                      [background-size:28px_28px]

                      [mask-image:linear-gradient(to_right,black,transparent_75%)]
                    `}
                  />



                  <div
                    className={`
                      pointer-events-none
                      absolute
                      -right-32
                      -top-32
                      h-72
                      w-72
                      rounded-full
                      bg-[#15E0ED]/[0.025]
                      blur-3xl
                      transition-all
                      duration-700

                      ${
                        isActive
                          ? "bg-[#15E0ED]/[0.10]"
                          : "group-hover:bg-[#15E0ED]/[0.07]"
                      }
                    `}
                  />

                 
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      left-0
                      right-0
                      top-[-100%]
                      h-[50%]
                      bg-gradient-to-b
                      from-transparent
                      via-[#15E0ED]/[0.06]
                      to-transparent
                      transition-all
                      duration-[1400ms]
                      ${
                        isActive
                          ? "top-[120%]"
                          : "group-hover:top-[120%]"
                      }
                    `}
                  />


                  <div
                    className={`
                      pointer-events-none
                      absolute
                      left-3
                      top-3
                      h-3
                      w-3
                      border-l
                      border-t
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "h-5 w-5 border-[#15E0ED]/70"
                          : "border-[#15E0ED]/20 group-hover:border-[#15E0ED]/60"
                      }
                    `}
                  />

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      right-3
                      top-3
                      h-3
                      w-3
                      border-r
                      border-t
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "h-5 w-5 border-[#15E0ED]/70"
                          : "border-[#15E0ED]/20 group-hover:border-[#15E0ED]/60"
                      }
                    `}
                  />

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      bottom-3
                      left-3
                      h-3
                      w-3
                      border-b
                      border-l
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "h-5 w-5 border-[#15E0ED]/70"
                          : "border-[#15E0ED]/20 group-hover:border-[#15E0ED]/60"
                      }
                    `}
                  />

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      bottom-3
                      right-3
                      h-3
                      w-3
                      border-b
                      border-r
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "h-5 w-5 border-[#15E0ED]/70"
                          : "border-[#15E0ED]/20 group-hover:border-[#15E0ED]/60"
                      }
                    `}
                  />

                 

                  <div
                    className={`
                      relative
                      ${
                        index % 2 === 0
                          ? "md:order-1"
                          : "md:order-3 md:text-left"
                      }
                    `}
                  >
                    <div
                      className={`
                        font-mono
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        transition-colors
                        duration-300
                        ${
                          isActive
                            ? "text-[#15E0ED]"
                            : "text-[#5c6666] group-hover:text-[#15E0ED]"
                        }
                      `}
                    >
                      Phase {item.step}
                    </div>

                    <h3
                      className={`
                        mt-2.5
                        text-xl
                        font-bold
                        tracking-tight
                        transition-all
                        duration-500
                        sm:text-[22px]
                        ${
                          isActive
                            ? "text-[#15E0ED] [text-shadow:0_0_25px_rgba(21,224,237,0.25)]"
                            : "text-[#eef2f2] group-hover:text-[#15E0ED]"
                        }
                      `}
                    >
                      {item.title}
                    </h3>

                    {/* Active label */}
                    <div
                      className={`
                        mt-3
                        flex
                        items-center
                        gap-2
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0"
                        }
                        ${
                          index % 2 === 0
                            ? "md:justify-end"
                            : "md:justify-start"
                        }
                      `}
                    >
                      <span className="h-px w-5 bg-[#15E0ED]/40" />

                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#15E0ED]/70">
                        Active
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#15E0ED] shadow-[0_0_8px_rgba(21,224,237,0.8)]" />
                    </div>
                  </div>

              

                  <div className="relative z-10 my-6 flex md:order-2 md:my-0 md:justify-center">
                    <div
                      className={`
                        relative
                        flex
                        h-[64px]
                        w-[64px]
                        items-center
                        justify-center
                        rounded-xl
                        border
                        bg-[#060707]
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              border-[#15E0ED]/60
                              bg-[#15E0ED]/[0.07]
                              shadow-[0_0_45px_rgba(21,224,237,0.20)]
                            `
                            : `
                              border-[#15E0ED]/15
                              shadow-[0_0_30px_rgba(21,224,237,0.05)]
                              group-hover:border-[#15E0ED]/45
                              group-hover:bg-[#15E0ED]/[0.05]
                              group-hover:shadow-[0_0_40px_rgba(21,224,237,0.14)]
                            `
                        }
                      `}
                    >
                      {/* Grid */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-xl
                          opacity-50
                          [background-image:linear-gradient(rgba(21,224,237,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.10)_1px,transparent_1px)]
                          [background-size:9px_9px]
                        "
                      />

                      {/* Inner border */}
                      <div
                        className={`
                          absolute
                          inset-1.5
                          rounded-lg
                          border
                          transition-colors
                          duration-500
                          ${
                            isActive
                              ? "border-[#15E0ED]/30"
                              : "border-white/[0.06] group-hover:border-[#15E0ED]/20"
                          }
                        `}
                      />

                      {/* Center glow */}
                      <div
                        className={`
                          absolute
                          h-8
                          w-8
                          rounded-full
                          bg-[#15E0ED]/[0.06]
                          blur-xl
                          transition-all
                          duration-500
                          ${
                            isActive
                              ? "bg-[#15E0ED]/20"
                              : "group-hover:bg-[#15E0ED]/15"
                          }
                        `}
                      />

                      {/* Signal */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-1.5">
                          <div
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              transition-all
                              duration-500
                              ${
                                isActive
                                  ? "scale-150 bg-[#eef2f2] shadow-[0_0_14px_rgba(21,224,237,0.9)]"
                                  : "bg-[#15E0ED]/60 group-hover:scale-125 group-hover:bg-[#15E0ED]"
                              }
                            `}
                          />

                          {isActive && (
                            <div className="absolute inset-[-5px] animate-ping rounded-full border border-[#15E0ED]/30" />
                          )}
                        </div>

                        <span
                          className={`
                            font-mono
                            text-[10px]
                            font-bold
                            tracking-[0.18em]
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "text-[#eef2f2] [text-shadow:0_0_12px_rgba(21,224,237,0.6)]"
                                : "text-[#15E0ED]/70 group-hover:text-[#15E0ED]"
                            }
                          `}
                        >
                          {item.step}
                        </span>
                      </div>

                      {/* Active ring */}
                      <div
                        className={`
                          absolute
                          inset-[-5px]
                          rounded-[14px]
                          border
                          transition-all
                          duration-500
                          ${
                            isActive
                              ? "border-[#15E0ED]/20"
                              : "border-transparent"
                          }
                        `}
                      />
                    </div>
                  </div>


                  <div
                    className={`
                      relative
                      ${
                        index % 2 === 0
                          ? "md:order-3"
                          : "md:order-1 md:text-right"
                      }
                    `}
                  >
                    <p
                      className={`
                        text-sm
                        leading-7
                        transition-colors
                        duration-500
                        ${
                          isActive
                            ? "text-[#eef2f2]/90"
                            : "text-[#8a9494] group-hover:text-[#eef2f2]/80"
                        }
                      `}
                    >
                      {item.description}
                    </p>
                  </div>

                

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-y-0
                      left-0
                      w-[2px]
                      bg-gradient-to-b
                      from-[#15E0ED]
                      via-[#15E0ED]
                      to-transparent
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "opacity-100 shadow-[0_0_12px_rgba(21,224,237,0.8)]"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    `}
                  />

                 

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      bottom-0
                      left-8
                      right-8
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#15E0ED]
                      to-transparent
                      transition-all
                      duration-700
                      ${
                        isActive
                          ? "opacity-40"
                          : "opacity-0 group-hover:opacity-20"
                      }
                    `}
                  />
                </article>
              );
            })}
          </div>
        </div>

       

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "01",
              title: "Business-first",
              text: "Technology follows the problem.",
            },
            {
              label: "02",
              title: "Security-aware",
              text: "Protection starts before production.",
            },
            {
              label: "03",
              title: "Built to evolve",
              text: "Architecture leaves room to scale.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#1a1d1d]
                bg-[#0b0d0d]/55
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#15E0ED]/20
                hover:bg-[#15E0ED]/[0.025]
              "
            >
              {/* Grid */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                  [background-image:linear-gradient(rgba(21,224,237,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.05)_1px,transparent_1px)]
                  [background-size:24px_24px]
                "
              />

              <span className="relative font-mono text-[9px] font-bold tracking-[0.15em] text-[#15E0ED]">
                {item.label}
              </span>

              <h3 className="relative mt-4 text-sm font-bold text-[#eef2f2] transition-colors group-hover:text-[#15E0ED]">
                {item.title}
              </h3>

              <p className="relative mt-2 text-[10px] leading-5 text-[#5c6666]">
                {item.text}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#15E0ED]/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
}