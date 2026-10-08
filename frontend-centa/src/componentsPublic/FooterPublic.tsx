import { FaWhatsapp } from "react-icons/fa6";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

type CompanyLink =
  | {
      name: string;
      type: "section";
      section: string;
    }
  | {
      name: string;
      type: "page";
      path: string;
    };

export default function FooterPublic() {
  const navigate = useNavigate();
  const location = useLocation();

  const companyLinks: CompanyLink[] = [
    {
      name: "About",
      type: "section",
      section: "about",
    },
    {
      name: "Approach",
      type: "page",
      path: "/approach",
    },
    {
      name: "Team",
      type: "page",
      path: "/team",
    },
    {
      name: "Articles",
      type: "page",
      path: "/articles",
    },
    {
      name: "Contact",
      type: "section",
      section: "contact",
    },
  ];

  const capabilities = [
    "Software Engineering",
    "Web Development",
    "Application Development",
    "Cyber Security Service",
    "Cloud Infrastructure",
    "Security Advisory",
  ];

  const handleSectionNavigation = (section: string) => {
    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate(`/#${section}`);
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[#1a1d1d]
        bg-[#060707]
      "
    >
      {/* =========================================================
          GRID BACKGROUND
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(21,224,237,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,224,237,0.035)_1px,transparent_1px)]
          bg-[size:64px_64px]
          opacity-40
        "
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          px-6
          py-20
          lg:px-10
          xl:px-12
        "
      >
        {/* =========================================================
            MAIN GRID
        ========================================================== */}

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[1.7fr_1fr_1fr]
          "
        >
          {/* =====================================================
              BRAND
          ====================================================== */}

          <div>
            {/* =================================================
                BRAND NAME
            ================================================== */}

            <Link
              to="/"
              className="
                group
                inline-flex
                items-baseline
                gap-3
              "
            >
              <span
                className="
                  text-2xl
                  font-black
                  tracking-[0.16em]
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-[#eef2f2]
                  sm:text-[27px]
                "
              >
                GOESTAF
              </span>

              <span
                className="
                  text-2xl
                  font-black
                  tracking-[0.16em]
                  text-[#15E0ED]
                  transition-colors
                  duration-300
                  group-hover:text-[#15E0ED]
                  sm:text-[27px]
                "
              >
                NURHIDAYAT
              </span>
            </Link>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-7
                max-w-md
                text-sm
                leading-7
                text-white/50
              "
            >
              Engineering secure digital products,
              scalable software systems,
              infrastructure, and cybersecurity
              solutions for modern businesses.
            </p>

            {/* =================================================
                SOCIAL / CONTACT
            ================================================== */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {/* =================================================
                  INSTAGRAM
              ================================================== */}

              <a
                href="https://instagram.com/gustafboy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Centa Limited"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-4
                  py-3
                  text-xs
                  text-white/45
                  transition-all
                  duration-300
                  hover:border-[#15E0ED]/25
                  hover:bg-[#15E0ED]/[0.05]
                  hover:text-[#15E0ED]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="
                    h-4
                    w-4
                    text-white/40
                    transition-colors
                    duration-300
                    group-hover:text-[#15E0ED]
                  "
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>

                <span>
                  Gustav Nurhidayat
                </span>
              </a>


           
              {/* =================================================
                  WHATSAPP
              ================================================== */}

         <a
  href="https://wa.me/62895320756331"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="My Whatsapp"
  className="
    group
    inline-flex
    items-center
    gap-3
    rounded-xl
    border
    border-white/[0.08]
    bg-white/[0.025]
    px-4
    py-3
    text-xs
    text-white/45
    transition-all
    duration-300
    hover:border-[#15E0ED]/25
    hover:bg-[#15E0ED]/[0.05]
    hover:text-[#15E0ED]
  "
>
  <FaWhatsapp
    className="
      h-4
      w-4
      text-white/40
      transition-colors
      duration-300
      group-hover:text-[#15E0ED]
    "
  />

  <span>
    +62 895-3207-56331
  </span>
</a>
            </div>

         

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2
              "
            >
              {[
                "ISO 27001 Ready",
                "Secure Architecture",
                "24/7 Monitoring",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-lg
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-2
                    text-[11px]
                    text-white/50
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* =====================================================
              COMPANY
          ====================================================== */}

          <div>
            <h4
              className="
                text-xs
                font-semibold
                tracking-[0.35em]
                text-white/70
              "
            >
              RESOURCES
            </h4>

            <ul
              className="
                mt-7
                space-y-4
              "
            >
              {companyLinks.map((item) => (
                <li key={item.name}>
                  {item.type === "page" ? (
                    <Link
                      to={item.path}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        text-sm
                        text-white/45
                        transition-all
                        hover:translate-x-1
                        hover:text-cyan-300
                      "
                    >
                      <span
                        className="
                          h-px
                          w-0
                          bg-cyan-400
                          transition-all
                          group-hover:w-4
                        "
                      />

                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleSectionNavigation(item.section)
                      }
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        text-sm
                        text-white/45
                        transition-all
                        hover:translate-x-1
                        hover:text-cyan-300
                      "
                    >
                      <span
                        className="
                          h-px
                          w-0
                          bg-cyan-400
                          transition-all
                          group-hover:w-4
                        "
                      />

                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              SERVICES
          ====================================================== */}

          <div>
            <h4
              className="
                text-xs
                font-semibold
                tracking-[0.35em]
                text-white/70
              "
            >
              SERVICES
            </h4>

            <ul
              className="
                mt-7
                space-y-4
              "
            >
              {capabilities.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() =>
                      handleSectionNavigation("services")
                    }
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-3
                      text-left
                      text-sm
                      text-white/45
                      transition-all
                      hover:translate-x-1
                      hover:text-cyan-300
                    "
                  >

                    <span className="transition-colors">
                      {item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

    
        {/* =========================================================
            BOTTOM
        ========================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.08]
            pt-7
            text-xs
            text-white/40
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © 2026 Centa Limited. All rights reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-5
            "
          >
          
          </div>
        </div>
      </div>
    </footer>
  );
}