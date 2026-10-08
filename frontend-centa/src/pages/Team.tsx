export default function Team() {
  return (
    <div className="space-y-10">

    
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-700/60
          bg-slate-950
          p-7
          shadow-2xl
          shadow-black/20
          sm:p-9
        "
      >

       
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

      
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-24
            h-64
            w-64
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

        <div className="relative">

          {/* Company */}
          <span
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.24em]
              text-blue-400
            "
          >
            Centa Limited
          </span>

         
          <h1
            className="
              mt-2
              text-3xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-4xl
            "
          >
            Internal Team Structure
          </h1>

        
          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
              sm:text-base
            "
          >
            A streamlined overview of Centa Limited&apos;s internal teams,
            responsibilities, and organizational structure.
          </p>

        </div>
      </div>


     

      <div>

        <div
          className="
            mb-6
            flex
            flex-col
            justify-between
            gap-3
            sm:flex-row
            sm:items-end
          "
        >

         

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            5 members · 4 organizational units
          </p>

        </div>


      

        <div className="grid gap-5 md:grid-cols-2">

          <TeamCard
            title="Founder"
            description="Company leadership, vision, and strategic direction"
            members={["Yudi Ardata"]}
            accent="blue"
          />

          <TeamCard
            title="Web Development"
            description="Web platforms, systems, and digital products"
            members={["Goestaf Nurhidayat"]}
            accent="indigo"
          />

          <TeamCard
            title="Marketing"
            description="Brand growth, campaigns, and market strategy"
            members={["Moh. Rifqi", "Abdi"]}
            accent="pink"
          />

          <TeamCard
            title="UI/UX"
            description="User experience, interface, and visual design"
            members={["Desvita Putri Varizka"]}
            accent="pink"
          />

        </div>
      </div>
    </div>
  );
}


type TeamCardProps = {
  title: string;
  description: string;
  members: string[];
  accent: "blue" | "indigo" | "purple" | "pink" | "slate" | "red";
};


function TeamCard({
  title,
  description,
  members,
  accent,
}: TeamCardProps) {

  const accentStyles = {
  blue: {
    glow: "bg-blue-500",
    line: "bg-blue-500",
    text: "text-blue-400",
    avatar:
      "bg-blue-500/10 text-blue-400 ring-blue-400/20",
  },

  indigo: {
    glow: "bg-violet-600",
    line: "bg-violet-500",
    text: "text-violet-400",
    avatar:
      "bg-violet-600/10 text-violet-400 ring-violet-500/20",
  },

  purple: {
    glow: "bg-purple-500",
    line: "bg-purple-500",
    text: "text-purple-400",
    avatar:
      "bg-purple-500/10 text-purple-400 ring-purple-400/20",
  },

  pink: {
    glow: "bg-pink-500",
    line: "bg-pink-500",
    text: "text-pink-400",
    avatar:
      "bg-pink-500/10 text-pink-400 ring-pink-400/20",
  },

  red: {
    glow: "bg-red-500",
    line: "bg-red-400",
    text: "text-red-400",
    avatar:
      "bg-red-500/10 text-red-400 ring-red-400/20",
  },

  slate: {
    glow: "bg-slate-400",
    line: "bg-slate-400",
    text: "text-slate-300",
    avatar:
      "bg-white/[0.06] text-slate-300 ring-white/[0.08]",
  },
};

  const style = accentStyles[accent];


  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-950
        p-6
        shadow-xl
        shadow-black/20
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-slate-700
        hover:shadow-2xl
        dark:bg-slate-950
      "
    >

     

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />


      {/* =====================================================
          HOVER GLOW
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          ${style.glow}
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-[0.12]
        `}
      />

      <div
        className={`
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-40
          w-40
          rounded-full
          ${style.glow}
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover:opacity-[0.08]
        `}
      />


      <div className="relative">


        {/* =====================================================
            DEPARTMENT HEADER
        ===================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div className="min-w-0">

            {/* Department */}
            <h3
              className={`
                text-xl
                font-extrabold
                tracking-tight
                ${style.text}
              `}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              className="
                mt-1.5
                max-w-sm
                text-xs
                leading-5
                text-slate-500
              "
            >
              {description}
            </p>

          </div>


          {/* Member Count */}

          <span
            className="
              shrink-0
              rounded-full
              border
              border-slate-800
              bg-slate-900
              px-3
              py-1
              text-[10px]
              font-bold
              text-slate-400
              transition-all
              duration-300
              group-hover:border-slate-700
              group-hover:text-white
            "
          >
            {members.length}
          </span>

        </div>


        {/* =====================================================
            ACCENT LINE
        ===================================================== */}

        <div
          className="
            my-5
            flex
            items-center
            gap-2
          "
        >

          <span
            className={`
              h-1
              w-10
              rounded-full
              ${style.line}
              transition-all
              duration-500
              group-hover:w-16
            `}
          />

          <span
            className="
              h-px
              flex-1
              bg-slate-800
            "
          />

        </div>


        {/* =====================================================
            MEMBERS
        ===================================================== */}

        <div className="space-y-2">

          {members.map((member) => {

            const memberInitials = member
              .split(/\s+/)
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={member}
                className="
  flex
  items-center
  gap-4
  px-1
  py-3
"
              >

                {/* Avatar */}

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    text-xs
                    font-extrabold
                    ring-1
                    transition-all
                    duration-300
                    group-hover:scale-105
                    ${style.avatar}
                  `}
                >
                  {memberInitials}
                </div>


                {/* ONLY NAME */}
                <div className="min-w-0 flex-1">

                  <p
                    className="
                      truncate
                      text-base
                      font-bold
                      tracking-tight
                      text-white
                    "
                  >
                    {member}
                  </p>

                </div>


                {/* Status Dot */}

                <span
                  className={`
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    ${style.line}
                    opacity-60
                    transition-all
                    duration-500
                    group-hover:scale-125
                    group-hover:opacity-100
                  `}
                />

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}