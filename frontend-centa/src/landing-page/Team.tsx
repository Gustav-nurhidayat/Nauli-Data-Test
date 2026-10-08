import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { teamMembers } from "./teamData";
import SEO from "../components/SEO";

export default function Team() {
  return (
   <>
   <SEO
  title="Goestaf Nurhidayat"
  description="Combining software engineering, cybersecurity, infrastructure, and digital innovation."
  canonical="https://centa.ltd/team"
/>
    <section
      id="team"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        bg-[#060707]
        text-white
      "
    >
     
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.012]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />



      <div
        className="
          pointer-events-none
          absolute
          inset-x-0yang sekarang pake logo yang dulu itu, di replace ke logo yang baru
22.03



          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#15E0ED]/20
          to-transparent
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          py-24
          sm:px-8
          lg:px-10
          lg:py-32
        "
      >
       

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
          "
        >
          {/* LEFT */}

          <div>
            <h2
              className="
                mt-6
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                lg:text-[60px]
              "
            >
             My Journey in the world
              <span
                className="
                  block
                  text-[#15E0ED]
                "
              >
                Of the technology
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="lg:pl-16 lg:pb-1">
            <p
              className="
                max-w-xl
                text-sm
                leading-7
                text-[#7f8989]
              "
            >
              A focused team across engineering, design,
              security, and growth — working together to
              turn complex problems into useful, reliable,
              and secure technology.
            </p>
          </div>
        </div>

       
        <div
          className="
            mt-16
            flex
            flex-wrap
            justify-center
            gap-5
          "
        >
          {teamMembers.slice(0, 2).map((member,) => (
            <Link
              key={member.name}
              to={`/team/${member.slug}`}
              className="
                group
                block
                w-full
                sm:w-[300px]
              "
            >
              <article
                className="
                  relative
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-[#1a1d1d]
                  bg-[#0b0d0d]
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#15E0ED]/25
                  hover:bg-[#0d1010]
                  hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)]
                "
              >
              

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-52
                    w-52
                    rounded-full
                    bg-[#15E0ED]/[0.04]
                    blur-[80px]
                    opacity-0
                    transition-opacity
                    duration-700
                    group-hover:opacity-100
                  "
                />

                
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-3
                    z-30
                    h-4
                    w-4
                    border-l
                    border-t
                    border-[#15E0ED]/20
                    transition-all
                    duration-500
                    group-hover:h-5
                    group-hover:w-5
                    group-hover:border-[#15E0ED]/60
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-3
                    z-30
                    h-4
                    w-4
                    border-r
                    border-t
                    border-[#15E0ED]/20
                    transition-all
                    duration-500
                    group-hover:h-5
                    group-hover:w-5
                    group-hover:border-[#15E0ED]/60
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    left-3
                    z-30
                    h-4
                    w-4
                    border-b
                    border-l
                    border-[#15E0ED]/20
                    transition-all
                    duration-500
                    group-hover:h-5
                    group-hover:w-5
                    group-hover:border-[#15E0ED]/60
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    right-3
                    z-30
                    h-4
                    w-4
                    border-b
                    border-r
                    border-[#15E0ED]/20
                    transition-all
                    duration-500
                    group-hover:h-5
                    group-hover:w-5
                    group-hover:border-[#15E0ED]/60
                  "
                />


                <div
                  className="
                    relative
                    aspect-[0.88]
                    overflow-hidden
                    bg-[#080a0a]
                  "
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-[center_35%]
                      grayscale-[20%]
                      brightness-[0.9]
                      transition-all
                      duration-700
                      group-hover:scale-[1.05]
                      group-hover:grayscale-0
                      group-hover:brightness-100
                    "
                  />

                  {/* Image overlay */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#0b0d0d]
                      via-[#0b0d0d]/10
                      to-transparent
                    "
                  />

                  {/* Cyan atmosphere */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[radial-gradient(circle_at_50%_40%,rgba(21,224,237,0.12),transparent_58%)]
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                 

                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-black/30
                      px-3
                      py-1.5
                      backdrop-blur-md
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#15E0ED]
                        shadow-[0_0_8px_rgba(21,224,237,0.8)]
                      "
                    />

                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-white/55
                      "
                    >
                     My Journey
                    </span>
                  </div>
                </div>



                <div className="relative z-20 p-5">
                  <h2
                    className="
                      text-[15px]
                      font-bold
                      leading-6
                      tracking-[-0.01em]
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-[#15E0ED]
                    "
                  >
                    {member.name}
                  </h2>

                  <p
                    className="
                      mt-2
                      min-h-[28px]
                      text-[9px]
                      font-bold
                      uppercase
                      leading-4
                      tracking-[0.14em]
                      text-[#606a6a]
                      transition-colors
                      duration-300
                      group-hover:text-[#7f8989]
                    "
                  >
                    {member.role}
                  </p>

                  {/* Divider */}

                  <div
                    className="
                      mt-5
                      h-px
                      bg-[#1a1d1d]
                      transition-colors
                      duration-300
                      group-hover:bg-[#15E0ED]/15
                    "
                  />

                  {/* Footer */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#555f5f]
                        transition-colors
                        duration-300
                        group-hover:text-[#15E0ED]/70
                      "
                    >
                      View Profile
                    </span>

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-white/[0.02]
                        transition-all
                        duration-300
                        group-hover:border-[#15E0ED]/30
                        group-hover:bg-[#15E0ED]/[0.06]
                      "
                    >
                      <ArrowRight
                        className="
                          h-3
                          w-3
                          text-[#606a6a]
                          transition-all
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:text-[#15E0ED]
                        "
                      />
                    </div>
                  </div>
                </div>

              

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-5
                    left-0
                    z-40
                    w-[2px]
                    rounded-full
                    bg-[#15E0ED]
                    opacity-0
                    shadow-[0_0_12px_rgba(21,224,237,0.7)]
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Bottom line */}

                <div
                  className="
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
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-30
                  "
                />
              </article>
            </Link>
          ))}
        </div>


        <div
          className="
            relative
            mt-5
            overflow-hidden
            rounded-[1.5rem]
            border
            border-[#1a1d1d]
            bg-[#0b0d0d]/70
            backdrop-blur-xl
          "
        >
          {/* Grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.012]
              [background-image:linear-gradient(rgba(21,224,237,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(21,224,237,0.5)_1px,transparent_1px)]
              [background-size:28px_28px]
            "
          />

          <div
            className="
              relative
              grid
              md:grid-cols-[1fr_auto]
              md:items-center
            "
          >
            {/* IDENTITY */}

            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-4">
                {/* Avatar Stack */}

                <div className="flex -space-x-2">
                  {teamMembers
                    .slice(0, 4)
                    .map((member) => (
                      <div
                        key={member.name}
                        className="
                          flex
                          h-8
                          w-8
                          overflow-hidden
                          rounded-full
                          border-2
                          border-[#0b0d0d]
                          bg-[#080a0a]
                        "
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            object-[center_30%]
                          "
                        />
                      </div>
                    ))}
                </div>

                <div>
                  <span
                    className="
                      block
                      text-[10px]
                      font-semibold
                      text-[#7f8989]
                    "
                  >
                    Goestaf Nurhidayat
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-[#4f5959]
                    "
                  >
                    Engineering · Design · Security · Growth
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}

            <div
              className="
                border-t
                border-[#1a1d1d]
                p-6
                md:border-l
                md:border-t-0
                sm:p-7
              "
            >
              <a
                href="#contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#15E0ED]/20
                  bg-[#15E0ED]/[0.04]
                  px-4
                  py-2.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#15E0ED]
                  transition-all
                  duration-300
                  hover:border-[#15E0ED]/40
                  hover:bg-[#15E0ED]/[0.08]
                "
              >
                Work with us

                <ArrowRight
                  className="
                    h-3
                    w-3
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}