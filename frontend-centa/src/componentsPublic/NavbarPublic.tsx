import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  /*
   * =====================================================
   * SERVICES NAVIGATION
   * =====================================================
   */

  const handleServicesClick = () => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/#services");
  };

  /*
   * =====================================================
   * SECTION NAVIGATION
   * =====================================================
   */

  const handleSectionClick = (section: string) => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate(`/#${section}`);
  };

  /*
   * =====================================================
   * NAV LINK CLASS
   * =====================================================
   */

  const navLinkClass = (path: string) => `
    relative
    flex
    items-center
    h-full
    text-[14px]
    font-semibold
    tracking-[-0.01em]
    transition-all
    duration-200

    ${
      isActive(path)
        ? "text-[#eef2f2]"
        : "text-[#8a9494] hover:text-[#eef2f2]"
    }
  `;

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-500

        ${
          isScrolled
            ? `
              border-b
              border-[#1a1d1d]
              bg-[#060707]/90
              shadow-[0_12px_45px_rgba(0,0,0,0.35)]
              backdrop-blur-2xl
            `
            : `
              bg-transparent
            `
        }
      `}
    >

      {/* =====================================================
          AMBIENT NAVBAR GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[18%]
            top-[-5rem]
            h-32
            w-64
            rounded-full
            bg-[#15E0ED]/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[20%]
            top-[-6rem]
            h-36
            w-72
            rounded-full
            bg-[#15E0ED]/[0.025]
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          MAIN NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          h-[82px]
          max-w-[1440px]
          items-center
          px-6
          lg:px-10
          xl:px-12
        "
      >

        {/* =====================================================
            BRAND — LEFT
        ====================================================== */}

        <Link
          to="/"
          className="
            group
            flex
            shrink-0
            items-baseline
            gap-3
          "
        >
          <span
            className="
              text-xl
              font-black
              tracking-[0.12em]
              text-white
              transition-colors
              duration-300
              group-hover:text-[#eef2f2]
              sm:text-2xl
              lg:text-[27px]
            "
          >
            GUSTAV
          </span>

          <span
            className="
              text-xl
              font-black
              tracking-[0.12em]
              text-[#15E0ED]
              transition-colors
              duration-300
              group-hover:text-[#15E0ED]
              sm:text-2xl
              lg:text-[27px]
            "
          >
            ASSESSMENT
          </span>
        </Link>


        {/* =====================================================
            DESKTOP CENTER NAVIGATION
        ====================================================== */}

        <nav
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            h-full
            -translate-x-1/2
            -translate-y-1/2
            items-center
            gap-7
            lg:flex
          "
        >

          {/* HOME */}

          <Link
            to="/"
            className={navLinkClass("/")}
          >
            Home

            {isActive("/") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#15E0ED]
                  shadow-[0_0_12px_rgba(21,224,237,0.6)]
                "
              />
            )}
          </Link>


          {/* ARTICLES */}

         



          {/* APPROACH */}

          <Link
            to="/approach"
            className={navLinkClass("/approach")}
          >
            Approach

            {isActive("/approach") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#15E0ED]
                  shadow-[0_0_12px_rgba(21,224,237,0.6)]
                "
              />
            )}
          </Link>


          {/* TEAM */}

          <Link
            to="/team"
            className={navLinkClass("/team")}
          >
            Me

            {isActive("/team") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#15E0ED]
                  shadow-[0_0_12px_rgba(21,224,237,0.6)]
                "
              />
            )}
          </Link>


          {/* FEEDBACK */}

          <Link
            to="/feedback"
            className={navLinkClass("/feedback")}
          >
            Feedback

            {isActive("/feedback") && (
              <span
                className="
                  absolute
                  bottom-[17px]
                  left-1/2
                  h-[2px]
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#15E0ED]
                  shadow-[0_0_12px_rgba(21,224,237,0.6)]
                "
              />
            )}
          </Link>


          {/* SERVICES */}

          <button
            type="button"
            onClick={handleServicesClick}
            className="
              flex
              h-full
              items-center
              border-0
              bg-transparent
              p-0
              text-[14px]
              font-semibold
              tracking-[-0.01em]
              text-[#8a9494]
              transition-colors
              duration-200
              hover:text-[#eef2f2]
            "
          >
            Services
          </button>


          {/* ABOUT */}

          <button
  type="button"
  onClick={() => handleSectionClick("why")}
  className="
    flex
    h-full
    items-center
    border-0
    bg-transparent
    p-0
    text-[14px]
    font-semibold
    tracking-[-0.01em]
    text-[#8a9494]
    transition-colors
    duration-200
    hover:text-[#eef2f2]
  "
>
  About
</button>


          {/* FAQ */}

          <button
            type="button"
            onClick={() => handleSectionClick("faq")}
            className="
              flex
              h-full
              items-center
              border-0
              bg-transparent
              p-0
              text-[14px]
              font-semibold
              tracking-[-0.01em]
              text-[#8a9494]
              transition-colors
              duration-200
              hover:text-[#eef2f2]
            "
          >
            FAQ
          </button>

        </nav>


        {/* =====================================================
            DESKTOP CTA — RIGHT
        ====================================================== */}

        <div
          className="
            ml-auto
            hidden
            lg:flex
            lg:items-center
          "
        >
          <button
            type="button"
            onClick={() => handleSectionClick("contact")}
            className="
              group
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#15E0ED]/30
              bg-[#15E0ED]
              px-5
              py-3
              text-[12px]
              font-black
              tracking-wide
              text-[#00171a]
              shadow-[0_8px_30px_rgba(21,224,237,0.12)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#15E0ED]
              hover:shadow-[0_12px_40px_rgba(21,224,237,0.22)]
            "
          >
            Contact Me

            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>


        {/* =====================================================
            MOBILE MENU BUTTON — RIGHT
        ====================================================== */}

        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() =>
            setMobileMenuOpen((open) => !open)
          }
          className="
            ml-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[#1a1d1d]
            bg-[#0b0d0d]
            text-[#8a9494]
            shadow-[0_8px_25px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-[#15E0ED]/30
            hover:bg-[#15E0ED]/[0.06]
            hover:text-[#eef2f2]
            lg:hidden
          "
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-[#1a1d1d]
          bg-[#060707]/95
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          backdrop-blur-2xl
          transition-all
          duration-300
          lg:hidden

          ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-82px)] opacity-100"
              : "max-h-0 border-t-transparent opacity-0"
          }
        `}
      >

        <nav
          className="
            mx-auto
            flex
            max-w-[1440px]
            flex-col
            gap-1.5
            px-6
            py-5
          "
        >

          {/* HOME */}

          <Link
            to="/"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            Home
          </Link>




          {/* APPROACH */}

          <Link
            to="/approach"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            Approach
          </Link>


          {/* TEAM */}

          <Link
            to="/team"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            Team
          </Link>


          {/* FEEDBACK */}

          <Link
            to="/feedback"
            className="
              rounded-2xl
              px-4
              py-3.5
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            Feedback
          </Link>


          {/* SERVICES */}

          <button
            type="button"
            onClick={handleServicesClick}
            className="
              rounded-2xl
              px-4
              py-3.5
              text-left
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            Services
          </button>


          {/* ABOUT */}

<button
  type="button"
  onClick={() => handleSectionClick("why")}
  className="
    w-full
    rounded-2xl
    px-4
    py-3.5
    text-left
    text-[15px]
    font-semibold
    text-[#8a9494]
    transition-all
    hover:bg-[#0b0d0d]
    hover:text-[#eef2f2]
  "
>
  About
</button>


          {/* FAQ */}

          <button
            type="button"
            onClick={() => handleSectionClick("faq")}
            className="
              w-full
              rounded-2xl
              px-4
              py-3.5
              text-left
              text-[15px]
              font-semibold
              text-[#8a9494]
              transition-all
              hover:bg-[#0b0d0d]
              hover:text-[#eef2f2]
            "
          >
            FAQ
          </button>


          {/* =================================================
              MOBILE CTA — RIGHT
          ================================================== */}

          <div
            className="
              mt-3
              flex
              justify-end
            "
          >
            <button
              type="button"
              onClick={() => handleSectionClick("contact")}
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-[#15E0ED]/30
                bg-[#15E0ED]
                px-5
                py-3
                text-[15px]
                font-black
                text-[#00171a]
                shadow-[0_10px_35px_rgba(21,224,237,0.12)]
                transition-all
                duration-300
                hover:bg-[#15E0ED]
                hover:shadow-[0_12px_40px_rgba(21,224,237,0.2)]
              "
            >
              Contact Me

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>

        </nav>

      </div>

    </header>
  );
}